<script lang="ts">
  import { page } from '$app/stores';

  let open = false;

  // Linklerin tipi net: href string, label string
  const links = [
    { href: '/one-piece-story', label: 'One Piece Hikayesi' },
    { href: '/characters',        label: 'Karakterler' },
    { href: '/arc-summaries',       label: 'Arc Özetleri' },
    { href: '/poyraz-comments',   label: "Poyraz'ın Yorumları" }
  ] as const;

  // $page.url bir URL objesi -> pathname string
  $: pathname = $page.url.pathname;

  const isActive = (path: string) =>
    pathname === path || (path !== '/' && pathname.startsWith(path));
</script>

<nav class="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/70 backdrop-blur-2xl">
  <div class="mx-auto max-w-7xl px-4 sm:px-0">
    <div class="flex h-24 items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center hover:scale-105 transition-all gap-3 shrink-0">
        <img
          src="/images/luffy.jpg" 
          alt="Luffy logo"
          class="h-16"
          loading="eager"
          decoding="async"
        />
      </a>

      <!-- Desktop menu -->
      <ul class="hidden md:flex items-center gap-1">
        {#each links as { href, label }}
          <li>
            <a
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              class="group relative rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/80 transition-colors"
            >
              {label}
              <span
                class="pointer-events-none absolute inset-x-2 -bottom-0.5 h-px origin-left scale-x-0 bg-current/70 transition-transform duration-200 group-hover:scale-x-100"
                class:scale-x-100={isActive(href)}
              ></span>
            </a>
          </li>
        {/each}
      </ul>

      <!-- Mobile toggle -->
      <button
        class="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-neutral-700 hover:bg-neutral-100/80 hover:text-neutral-900 not-first:transition"
        aria-label="Menüyü aç/kapat"
        aria-expanded={open}
        on:click={() => (open = !open)}
      >
        {#if !open}
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        {:else}
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" d="M6 6l12 12M18 6l-12 12" />
          </svg>
        {/if}
      </button>
    </div>

    <!-- Mobile menu -->
    <div class="md:hidden overflow-hidden transition-[max-height] duration-300" style="max-height: {open ? '320px' : '0px'}">
      <ul class="py-2 space-y-1">
        {#each links as { href, label }}
          <li>
            <a
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              class="block rounded-xl px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-100/80 transition"
              on:click={() => (open = false)}
            >
              {label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>
