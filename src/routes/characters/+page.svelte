<script lang="ts">
  import { onMount } from 'svelte';

  // ---- Types ----
  type Crew = {
    id: number;
    name: string;
    description?: string;
    status?: string;
    number?: string;
    roman_name?: string;
    total_prime?: string; // total bounty
    is_yonko?: string;
  };

  type Fruit = {
    id: number;
    name: string;
    description?: string;
    type?: string;
    filename?: string;
    roman_name?: string;
    technicalFile?: string;
  } | null;

  type Character = {
    id: number;
    name: string;
    job?: string;
    size?: string;
    birthday?: string;
    age?: string;
    bounty?: string; // as string in API
    status?: string;
    crew?: Crew | null;
    fruit?: Fruit;
  };

  // ---- Config ----
  const BASE = '/api/op';
  const ENDPOINTS = {
    characters: `${BASE}/v2/characters/en`,
    charactersSearch: `${BASE}/v2/characters/en/search`,
    charactersByCrew: (id: number) => `${BASE}/v2/characters/en/crew/${id}`,
    crews: `${BASE}/v2/crews/en`
  } as const;

  // ---- UI State ----
  let loading = true;
  let errorMsg = '';

  // Data
  let characters: Character[] = [];
  let crews: Crew[] = [];

  // Filters
  let qName = '';
  let qJob = '';
  let qCrewId: string = '';
  let bountyMin: string = '';
  let bountyMax: string = '';
  let onlyWithFruit = false;

  // Sorting
  type SortKey = 'name' | 'bountyDesc' | 'bountyAsc';
  let sortBy: SortKey = 'name';

  // Modal
  let selected: Character | null = null;

  // Debounce helper
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  function debounce(fn: () => void, ms = 400) {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(fn, ms);
  }

  function parseBounty(val?: string): number | null {
    if (!val) return null;
    // API stores bounty as string; allow formats like "3,000,000,000" or "3.000.000.000" or with Beli symbol
    const digits = val.replace(/[^0-9]/g, '');
    return digits ? Number(digits) : null;
  }

  function withinBountyRange(c: Character): boolean {
    const b = parseBounty(c.bounty) ?? -1;
    const min = bountyMin ? Number(bountyMin) : -Infinity;
    const max = bountyMax ? Number(bountyMax) : Infinity;
    return b === -1 ? false : b >= min && b <= max;
  }

  function applyClientFilters(rows: Character[]): Character[] {
    let list = [...rows];

    if (onlyWithFruit) list = list.filter((c) => !!c.fruit);

    // If min/max provided but remote search didn't handle numeric range, filter here
    if (bountyMin || bountyMax) list = list.filter(withinBountyRange);

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
      const ba = parseBounty(a.bounty) ?? -1;
      const bb = parseBounty(b.bounty) ?? -1;
      if (sortBy === 'bountyDesc') return bb - ba;
      if (sortBy === 'bountyAsc') return ba - bb;
      return 0;
    });

    return list;
  }

  async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetch(url, { headers: { 'accept': 'application/json' } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  }

  async function loadCrews() {
    try {
      crews = await fetchJSON<Crew[]>(ENDPOINTS.crews);
    } catch (e: any) {
      console.error(e);
    }
  }

  async function loadCharacters(initial = false) {
    loading = true; errorMsg = '';
    try {
      // Build remote search if possible to reduce payload
      const params = new URLSearchParams();
      if (qName.trim()) params.set('name', qName.trim());
      if (qJob.trim()) params.set('job', qJob.trim());
      if (bountyMin && !bountyMax) params.set('bounty', String(bountyMin));
      if (!qCrewId) {
        const url = params.toString()
          ? `${ENDPOINTS.charactersSearch}?${params.toString()}`
          : ENDPOINTS.characters;
        characters = await fetchJSON<Character[]>(url);
      } else {
        // crew filtered route
        characters = await fetchJSON<Character[]>(ENDPOINTS.charactersByCrew(Number(qCrewId)));
        // If also name/job search is provided, filter client-side
        if (qName.trim()) characters = characters.filter((c) => c.name?.toLowerCase().includes(qName.trim().toLowerCase()));
        if (qJob.trim()) characters = characters.filter((c) => c.job?.toLowerCase().includes(qJob.trim().toLowerCase()));
      }

      characters = applyClientFilters(characters);
    } catch (e: any) {
      console.error(e);
      errorMsg = e?.message ?? 'Veri alınamadı.';
    } finally {
      loading = false;
    }
  }

  function triggerSearch() {
    debounce(() => loadCharacters());
  }

  onMount(async () => {
    await Promise.all([loadCrews(), loadCharacters(true)]);
  });
</script>

<svelte:head>
  <title>One Piece Karakterleri — Filtrele & Keşfet</title>
  <meta name="description" content="One Piece karakterlerini ada ada, tayfa tayfa keşfet. İsim, meslek, tayfa ve ödül aralığına göre filtrele; kartlara tıklayıp detayları modalla gör." />
</svelte:head>

<!-- HERO / Filters -->
<section class="relative">
  <div class="mx-auto max-w-7xl px-4 sm:px-0 pt-10">
    <div class="flex items-start justify-between gap-6 flex-wrap">
      <div>
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-neutral-800">One Piece Karakterleri</h1>
        <p class="mt-2 text-neutral-600 max-w-2xl">Ada ada ilerleyen büyük yolculukta kim kimdir? Aşağıdan <strong>isim</strong>, <strong>meslek</strong>, <strong>tayfa</strong> ve <strong>ödül</strong>e göre arat.</p>
      </div>
      <div class="flex items-center gap-2 text-sm text-neutral-600">
        <span class="inline-flex items-center rounded-full border bg-white px-2.5 py-1">Toplam: {characters.length}</span>
      </div>
    </div>

    <!-- Controls -->
    <div class="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3">
      <div class="md:col-span-3">
        <label class="block text-xs font-medium text-neutral-600 mb-1">İsim</label>
        <input class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" placeholder="Luffy, Zoro…" bind:value={qName} on:input={triggerSearch} />
      </div>
      <div class="md:col-span-3">
        <label class="block text-xs font-medium text-neutral-600 mb-1">Meslek / Unvan</label>
        <input class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" placeholder="Kılıç ustası, kaptan…" bind:value={qJob} on:input={triggerSearch} />
      </div>
      <div class="md:col-span-3">
        <label class="block text-xs font-medium text-neutral-600 mb-1">Tayfa</label>
        <select class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" bind:value={qCrewId} on:change={loadCharacters}>
          <option value="">Hepsi</option>
          {#each crews as c}
            <option value={c.id}>{c.name}</option>
          {/each}
        </select>
      </div>
      <div class="md:col-span-3">
        <label class="block text-xs font-medium text-neutral-600 mb-1">Sırala</label>
        <select class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" bind:value={sortBy} on:change={() => (characters = applyClientFilters(characters))}>
          <option value="name">Adaçık: Ada (A→Z)</option>
          <option value="bountyDesc">Ödül: Yüksek → Düşük</option>
          <option value="bountyAsc">Ödül: Düşük → Yüksek</option>
        </select>
      </div>

      <div class="md:col-span-3">
        <label class="block text-xs font-medium text-neutral-600 mb-1">Ödül min (Beli)</label>
        <input type="number" class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" placeholder="0" bind:value={bountyMin} on:input={triggerSearch} />
      </div>
      <div class="md:col-span-3">
        <label class="block text-xs font-medium text-neutral-600 mb-1">Ödül max (Beli)</label>
        <input type="number" class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" placeholder="3000000000" bind:value={bountyMax} on:input={triggerSearch} />
      </div>
      <div class="md:col-span-3 flex items-end gap-3">
        <label class="inline-flex items-center gap-2 select-none">
          <input type="checkbox" class="h-4 w-4" bind:checked={onlyWithFruit} on:change={triggerSearch} />
          <span class="text-sm text-neutral-700">Sadece Meyve Sahipleri</span>
        </label>
      </div>
      <div class="md:col-span-3 flex items-end">
        <button class="inline-flex w-full items-center justify-center rounded-lg bg-neutral-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800" on:click={() => loadCharacters()}>Uygula</button>
      </div>
    </div>
  </div>
</section>

<!-- Results -->
<section class="mx-auto max-w-7xl px-4 sm:px-0 py-8">
  {#if errorMsg}
    <div class="rounded-lg border border-red-200 bg-red-50 p-3 text-red-800">{errorMsg}</div>
  {/if}

  {#if loading}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {#each Array(8) as _, i}
        <div class="rounded-2xl border border-neutral-200 bg-white p-4 animate-pulse">
          <div class="h-5 w-2/3 bg-neutral-200 rounded"></div>
          <div class="mt-3 h-3 w-1/2 bg-neutral-200 rounded"></div>
          <div class="mt-4 h-24 w-full bg-neutral-100 rounded"></div>
        </div>
      {/each}
    </div>
  {:else}
    {#if characters.length === 0}
      <p class="text-neutral-600">Kriterlere uygun sonuç yok.</p>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {#each characters as c}
          <button class="group text-left rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow" on:click={() => (selected = c)}>
            <div class="flex items-start justify-between gap-3">
              <h3 class="text-base font-semibold text-neutral-900 group-hover:underline">{c.name}</h3>
              {#if c.crew?.name}
                <span class="inline-flex shrink-0 items-center rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] text-neutral-700">{c.crew.name}</span>
              {/if}
            </div>
            <p class="mt-1 text-sm text-neutral-600 line-clamp-2">{c.job ?? '—'}</p>
            <div class="mt-3 grid grid-cols-2 gap-2 text-xs text-neutral-700">
              <div class="rounded-lg border bg-neutral-50 p-2">
                <div class="font-medium">Ödül</div>
                <div class="mt-0.5 tabular-nums">{c.bounty ?? '—'}</div>
              </div>
              <div class="rounded-lg border bg-neutral-50 p-2">
                <div class="font-medium">Yaş</div>
                <div class="mt-0.5">{c.age ?? '—'}</div>
              </div>
            </div>
            {#if c.fruit?.name}
              <div class="mt-3 text-xs text-neutral-700">
                <span class="rounded-md bg-amber-100/80 px-1.5 py-0.5 border border-amber-200">Meyve: {c.fruit.name}</span>
              </div>
            {/if}
          </button>
        {/each}
      </div>
    {/if}
  {/if}
</section>

<!-- Modal -->
{#if selected}
  <div class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black/40" on:click={() => (selected = null)}></div>
    <div class="absolute inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center">
      <div class="mx-auto max-w-2xl w-full md:w-[720px] md:rounded-2xl md:shadow-2xl md:my-10 bg-white border md:border-neutral-200">
        <div class="flex items-start justify-between gap-3 p-4 md:p-5 border-b">
          <div>
            <h3 class="text-lg font-semibold text-neutral-900">{selected.name}</h3>
            <p class="text-sm text-neutral-600">{selected.job ?? '—'}</p>
          </div>
          <button class="rounded-lg p-2 hover:bg-neutral-100" on:click={() => (selected = null)} aria-label="Kapat">✕</button>
        </div>

        <div class="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="rounded-xl border bg-neutral-50 p-3">
            <div class="text-xs text-neutral-600">Tayfa</div>
            <div class="mt-0.5 font-medium">{selected.crew?.name ?? '—'}</div>
          </div>
          <div class="rounded-xl border bg-neutral-50 p-3">
            <div class="text-xs text-neutral-600">Ödül</div>
            <div class="mt-0.5 tabular-nums">{selected.bounty ?? '—'}</div>
          </div>
          <div class="rounded-xl border bg-neutral-50 p-3">
            <div class="text-xs text-neutral-600">Yaş</div>
            <div class="mt-0.5">{selected.age ?? '—'}</div>
          </div>
          <div class="rounded-xl border bg-neutral-50 p-3">
            <div class="text-xs text-neutral-600">Doğum günü</div>
            <div class="mt-0.5">{selected.birthday ?? '—'}</div>
          </div>
          <div class="rounded-xl border bg-neutral-50 p-3">
            <div class="text-xs text-neutral-600">Durum</div>
            <div class="mt-0.5">{selected.status ?? '—'}</div>
          </div>
          <div class="rounded-xl border bg-neutral-50 p-3">
            <div class="text-xs text-neutral-600">Boy</div>
            <div class="mt-0.5">{selected.size ?? '—'}</div>
          </div>

          <div class="sm:col-span-2 rounded-xl border bg-amber-50 p-3">
            <div class="text-xs text-amber-700">Şeytan Meyvesi</div>
            {#if selected.fruit}
              <div class="mt-0.5 font-medium">{selected.fruit?.name} <span class="text-xs text-neutral-500">({selected.fruit?.type ?? '—'})</span></div>
              <p class="mt-1 text-sm text-neutral-700">{selected.fruit?.description ?? '—'}</p>
            {:else}
              <div class="mt-0.5 text-sm text-neutral-600">Bilgi yok / sahip değil.</div>
            {/if}
          </div>
        </div>

        <div class="p-4 md:p-5 border-t flex items-center justify-end gap-2">
          <a class="text-sm text-neutral-600 hover:underline" href={`https://api.api-onepiece.com/v2/characters/en/${selected.id}`} target="_blank" rel="noreferrer">Kaynak (API)</a>
          <button class="inline-flex items-center rounded-lg bg-neutral-900 px-3 py-2 text-sm font-semibold text-white hover:bg-neutral-800" on:click={() => (selected = null)}>Kapat</button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* line-clamp utility if not using plugin */
  .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>