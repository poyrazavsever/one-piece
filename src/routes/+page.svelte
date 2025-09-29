<script lang="ts">
  const actions = [
    { href: '/one-piece-hikayesi', label: 'One Piece Hikayesi' },
    { href: '/karakterler',        label: 'Karakterler' },
    { href: '/arc-ozetleri',       label: 'Arc Özetleri' },
    { href: '/poyraz-yorumlari',   label: "Poyraz'ın Yorumları" }
  ];
</script>

<section
  class="relative overflow-hidden"
  aria-label="Hero"
>
  <!-- Yumuşak arkaplan: çok açık sarı + hafif doku -->
  <div class="absolute inset-0">
    <div
      class="absolute inset-0 opacity-10"
      style="
        background-image:
          radial-gradient(40rem 40rem at 10% 10%, #FFCE00 0%, transparent 55%),
          radial-gradient(28rem 28rem at 90% 0%, #FFE680 0%, transparent 55%),
          repeating-linear-gradient(45deg, #00000010 0px, #00000010 2px, transparent 2px, transparent 6px);
      "
    ></div>
  </div>

  <div class="relative mx-auto max-w-7xl px-4 sm:px-0">
    <div class="grid items-center gap-8 py-12 md:py-20 md:grid-cols-2">
      <!-- Sol: Görsel -->
      <div class="order-1 md:order-none">
        <div class="aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-sm bg-white">
          <img
            src="/images/hero.jpg"
            alt="One Piece temalı kapak görseli"
            class="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
      </div>

      <!-- Sağ: Metin -->
      <div class="flex flex-col items-start">
        <span class="inline-flex items-center rounded-full border border-[#D70000]/20 bg-[#FFCE00]/20 px-2.5 py-1 text-xs font-medium text-[#9a0000]">
          One Piece notları & yorumlar
        </span>

        <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-700">
          One Piece’i seven bir yazılımcının not defteri.
        </h1>

        <p class="mt-4 max-w-prose text-neutral-700 leading-relaxed">
          Burada One Piece bölümlerini özetliyor, karakterleri kendi bakış açımdan anlatıyor
          ve <em>“Poyraz’ın Yorumları”</em>nda fikirlerimi paylaşıyorum.
        </p>

        <!-- CTA’lar -->
        <div class="mt-6 flex flex-wrap gap-3">
          <a
            href="/one-piece-hikayesi"
            class="inline-flex items-center rounded-xl bg-[#D70000] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D70000]/50"
          >
            Hikâyeyi Keşfet
          </a>
          <a
            href="/karakterler"
            class="inline-flex items-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300"
          >
            Karakterler
          </a>
          <a
            href="/arc-ozetleri"
            class="inline-flex items-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300"
          >
            Arc Özetleri
          </a>
          <a
            href="/poyraz-yorumlari"
            class="inline-flex items-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300"
          >
            Poyraz’ın Yorumları
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
