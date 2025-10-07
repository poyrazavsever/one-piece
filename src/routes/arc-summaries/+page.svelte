<script lang="ts">
  import { onMount } from 'svelte';

  // ---- Types ----
  type Saga = {
    id: number;
    title: string;
    saga_number: number;
    saga_chapitre: string;
    saga_volume: string;
    saga_episode: string;
  };

  // ---- Config ----
  const API_URL = 'https://api.api-onepiece.com/v2/sagas/en';

  // ---- UI State ----
  let loading = true;
  let errorMsg = '';

  // Data
  let sagas: Saga[] = [];

  // Modal
  let selected: Saga | null = null;

  async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetch(url, { headers: { 'accept': 'application/json' } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  }

  function getSagaColor(sagaNumber: number): string {
    const colors = [
      'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-orange-500', 
      'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-red-500',
      'bg-amber-500', 'bg-cyan-500'
    ];
    return colors[(sagaNumber - 1) % colors.length] || 'bg-gray-500';
  }

  function getSagaGradient(sagaNumber: number): string {
    const gradients = [
      'from-blue-500 to-blue-600', 'from-emerald-500 to-emerald-600', 
      'from-purple-500 to-purple-600', 'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600', 'from-indigo-500 to-indigo-600',
      'from-teal-500 to-teal-600', 'from-red-500 to-red-600',
      'from-amber-500 to-amber-600', 'from-cyan-500 to-cyan-600'
    ];
    return gradients[(sagaNumber - 1) % gradients.length] || 'from-gray-500 to-gray-600';
  }

  async function loadSagas() {
    loading = true; 
    errorMsg = '';
    try {
      sagas = await fetchJSON<Saga[]>(API_URL);
    } catch (e: any) {
      console.error(e);
      errorMsg = e?.message ?? 'Saga verileri alınamadı.';
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadSagas();
  });
</script>

<svelte:head>
  <title>One Piece Arc Özetleri — Saga Saga Yolculuk</title>
  <meta name="description" content="One Piece'deki tüm arc'ları keşfet. East Blue'dan Final Saga'ya kadar her arc'ın bölüm, cilt ve episode bilgilerini gör." />
</svelte:head>

<!-- HERO -->
<section class="relative">
  <div class="mx-auto max-w-7xl px-4 sm:px-0 pt-10">
    <div class="text-center">
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-800">
        One Piece Arc Özetleri
      </h1>
      <p class="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
        Büyük yolculuğun her durağını keşfet. East Blue'dan Final Saga'ya kadar, <strong>Luffy</strong> ve ekibinin yaşadığı tüm maceraları arc arc incele.
      </p>
      <div class="mt-6 inline-flex items-center rounded-full border bg-white px-4 py-2 text-sm text-neutral-600">
        <span class="font-medium">Toplam Saga:</span>
        <span class="ml-2 font-semibold text-neutral-900">{sagas.length}</span>
      </div>
    </div>
  </div>
</section>

<!-- SAGAS -->
<section class="mx-auto max-w-7xl px-4 sm:px-0 py-12">
  {#if errorMsg}
    <div class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 text-center">
      ⚠️ {errorMsg}
    </div>
  {/if}

  {#if loading}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(6) as _, i}
        <div class="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 animate-pulse">
          <div class="h-6 w-3/4 bg-neutral-200 rounded mb-4"></div>
          <div class="h-4 w-1/2 bg-neutral-200 rounded mb-2"></div>
          <div class="h-4 w-2/3 bg-neutral-200 rounded mb-2"></div>
          <div class="h-4 w-1/2 bg-neutral-200 rounded"></div>
        </div>
      {/each}
    </div>
  {:else}
    {#if sagas.length === 0}
      <p class="text-center text-neutral-600">Henüz saga bulunamadı.</p>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each sagas as saga}
          <button 
            class="group text-left rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:bg-neutral-50"
            on:click={() => (selected = saga)}
          >
            <!-- Saga Number Badge -->
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br {getSagaGradient(saga.saga_number)} flex items-center justify-center text-white font-bold text-lg">
                {saga.saga_number}
              </div>
              <span class="text-xs text-neutral-500">Arc #{saga.saga_number}</span>
            </div>
            
            <!-- Title -->
            <h3 class="text-xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
              {saga.title}
            </h3>
            
            <!-- Details Grid -->
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-neutral-600">Bölümler:</span>
                <span class="font-medium text-neutral-900">{saga.saga_chapitre || '—'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Ciltler:</span>
                <span class="font-medium text-neutral-900">{saga.saga_volume || '—'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Episode:</span>
                <span class="font-medium text-neutral-900">{saga.saga_episode || '—'}</span>
              </div>
            </div>

            <!-- Progress Indicator -->
            <div class="mt-4 pt-4 border-t border-neutral-100">
              <div class="flex items-center text-xs text-neutral-500">
                <div class="w-2 h-2 rounded-full {getSagaColor(saga.saga_number)} mr-2"></div>
                Saga {saga.saga_number} detayları için tıkla
              </div>
            </div>
          </button>
        {/each}
      </div>
    {/if}
  {/if}
</section>

<!-- MODAL -->
{#if selected}
  <div class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" on:click={() => (selected = null)} role="button" tabindex="-1" on:keydown={(e) => e.key === 'Escape' && (selected = null)}></div>
    <div class="absolute inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-0 md:flex md:items-center md:justify-center">
      <div class="mx-auto max-w-2xl w-full md:w-[600px] rounded-2xl bg-white border border-neutral-300">
        <!-- Header -->
        <div class="relative p-6 border-b border-neutral-200">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br {getSagaGradient(selected.saga_number)} flex items-center justify-center text-white font-bold text-2xl">
              {selected.saga_number}
            </div>
            <div>
              <h3 class="text-2xl font-bold text-neutral-900">{selected.title}</h3>
              <p class="text-sm text-neutral-600">Saga #{selected.saga_number}</p>
            </div>
          </div>
          <button 
            class="absolute top-4 right-4 rounded-lg p-2 hover:bg-neutral-100 transition"
            on:click={() => (selected = null)} 
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>

        <!-- Content -->
        <div class="p-6">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="rounded-xl border border-neutral-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-center">
              <div class="text-2xl font-bold text-blue-900">{selected.saga_chapitre || '—'}</div>
              <div class="text-sm text-blue-700 font-medium">Manga Bölümleri</div>
            </div>
            <div class="rounded-xl border border-neutral-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 text-center">
              <div class="text-2xl font-bold text-emerald-900">{selected.saga_volume || '—'}</div>
              <div class="text-sm text-emerald-700 font-medium">Manga Ciltleri</div>
            </div>
            <div class="rounded-xl border border-neutral-200 bg-gradient-to-br from-purple-50 to-purple-100 p-4 text-center">
              <div class="text-2xl font-bold text-purple-900">{selected.saga_episode || '—'}</div>
              <div class="text-sm text-purple-700 font-medium">Anime Bölümleri</div>
            </div>
          </div>

          <!-- Additional Info -->
          <div class="mt-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <h4 class="font-semibold text-neutral-900 mb-2">Arc Hakkında</h4>
            <p class="text-sm text-neutral-700">
              <strong>{selected.title}</strong> saga'sı One Piece serisinin {selected.saga_number}. ana story arc'ıdır. 
              {#if selected.saga_chapitre !== '-'}
                Manga'da {selected.saga_chapitre} bölümleri, anime'de {selected.saga_episode} episode'ları kapsar.
              {:else}
                Henüz devam eden veya gelecekte yayınlanacak bir saga.
              {/if}
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t border-neutral-200 flex items-center justify-end gap-3">
          <a 
            class="text-sm text-neutral-600 hover:underline" 
            href="https://api.api-onepiece.com/v2/sagas/en/{selected.id}" 
            target="_blank" 
            rel="noreferrer"
          >
            API Kaynağı
          </a>
          <button 
            class="inline-flex items-center rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 transition"
            on:click={() => (selected = null)}
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .line-clamp-2 { 
    display: -webkit-box; 
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical; 
    overflow: hidden;
    line-clamp: 2;
  }
</style>