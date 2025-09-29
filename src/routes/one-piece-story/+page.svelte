<script lang="ts">
  type Arc = {
    title: string;
    period?: string;
    summary: string;
    href?: string;
  };

  const arcs: Arc[] = [
    {
      title: 'East Blue',
      period: 'Başlangıç',
      summary:
        "Luffy, Grand Line’a yelken açmadan önce tayfasını toplamaya başlar: Zoro, Nami, Usopp ve Sanji ile ekibin çekirdeği oluşur.",
      href: '/arc-summaries/east-blue'
    },
    {
      title: 'Alabasta',
      summary:
        "Baroque Works’e karşı Prenses Vivi’yle ittifak kurulur. Luffy’nin Crocodile’la mücadelesi korsan dünyasındaki ciddiyetini perçinler.",
      href: '/arc-summaries/alabasta'
    },
    {
      title: 'Skypiea',
      summary:
        "Gökyüzündeki ada ve “eski çağ” gizemleri: D’nin iradesi ve tarih taşları (Poneglyph) üstüne ilk büyük ipuçları belirir.",
      href: '/arc-summaries/skypiea'
    },
    {
      title: 'Water 7 & Enies Lobby',
      summary:
        "Robin’i geri almak için Dünya Hükümeti’ne meydan okurlar. “CP9”, Going Merry’nin vedası ve yeni gemi Thousand Sunny…",
      href: '/arc-summaries/water7-enies-lobby'
    },
    {
      title: 'Thriller Bark',
      summary:
        "Gekko Moriah ve gölgeler. Zoro’nun fedakârlığı ekip bağlarını benzersiz şekilde derinleştirir.",
      href: '/arc-summaries/thriller-bark'
    },
    {
      title: 'Sabaody → Amazon Lily → Impel Down → Marineford',
      summary:
        "Tayfa dağılır; Ace’i kurtarma yolculuğu tüm dünyayı sarsar. Marineford Savaşı sonrası “zaman atlaması” (timeskip) kararı.",
      href: '/arc-summaries/paramount-war'
    },
    {
      title: 'Fish-Man Island',
      summary:
        "Zaman atlaması sonrası ilk durak. Irklar arası önyargılar, yeni güçler ve Yeni Dünya’ya geçiş eşiği.",
      href: '/arc-summaries/fishman-island'
    },
    {
      title: 'Punk Hazard → Dressrosa',
      summary:
        "Law ile ittifak; Doflamingo ve SMILE zinciri. Kaido’ya giden yolun taşları döşenir.",
      href: '/arc-summaries/dressrosa'
    },
    {
      title: 'Whole Cake Island',
      summary:
        "Sanji’yi geri alma görevi. Big Mom İmparatorluğu’nda aile, bağlılık ve özgürlük temaları öne çıkar.",
      href: '/arc-summaries/whole-cake-island'
    },
    {
      title: 'Wano Country',
      summary:
        "Samuraylar, Kozuki klanı ve Kaido. Dünyanın dengelerini etkileyen dev kapışmalar ve “efsanelerin” yankısı.",
      href: '/arc-summaries/wano'
    },
    {
      title: 'Egghead (Dr. Vegapunk)',
      summary:
        "Antik Krallık, Boş Yüzyıl ve dünya düzeninin sırrına yaklaşan adımlar. Yeni çağın eşiği…",
      href: '/arc-summaries/egghead'
    }
  ];
</script>

<svelte:head>
  <title>One Piece Hikayesi — Arc Arc Zaman Çizelgesi</title>
  <meta name="description" content="One Piece’i seven bir yazılımcının not defteri: hikâyenin genel çerçevesi ve arc arc timeline." />
</svelte:head>

<!-- HERO (fotoğrafsız) -->
<section class="relative overflow-hidden">
  <div class="absolute inset-0 bg-[#FFF7D1]">
    <!-- çok hafif doku ve vurgu -->
    <div
      class="absolute inset-0 opacity-10"
      style="
        background-image:
          radial-gradient(38rem 38rem at 8% 12%, #FFCE00 0%, transparent 55%),
          radial-gradient(28rem 28rem at 92% 0%, #FFE680 0%, transparent 55%),
          repeating-linear-gradient(45deg, #00000010 0px, #00000010 2px, transparent 2px, transparent 6px);
      "
    ></div>
  </div>

  <div class="relative mx-auto max-w-7xl px-4 sm:px-0 py-12 md:py-16">
    <span class="inline-flex items-center rounded-full border border-[#D70000]/20 bg-[#FFCE00]/30 px-2.5 py-1 text-xs font-semibold text-[#9a0000]">
      One Piece notları & özetler
    </span>

    <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-700">
      One Piece Hikayesi
    </h1>

    <p class="mt-4 max-w-3xl text-neutral-700 leading-relaxed">
      Bu sayfada, One Piece’in geniş dünyasını <strong>arc arc</strong> derli toplu şekilde özetliyorum.
      Amaç; yeni başlayanlara yol haritası sunmak ve takip edenlere anımsatma sağlamak.
      Aşağıdaki zaman çizelgesinde, mürettebatın yolculuğundaki dönüm noktalarını kısa ve net biçimde bulacaksın.
    </p>

    <div class="mt-6 flex gap-3">
      <a
        href="/arc-summaries"
        class="inline-flex items-center rounded-xl bg-[#D70000] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D70000]/50"
      >
        Arc Özetlerine Git
      </a>
      <a
        href="/poyraz-comments"
        class="inline-flex items-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300"
      >
        Poyraz’ın Yorumları
      </a>
    </div>
  </div>
</section>

<!-- TIMELINE -->
<section class="relative mx-auto max-w-7xl px-4 sm:px-0 py-16">
  <header class="mb-6">
    <h2 class="text-2xl font-bold text-neutral-900">Zaman Çizelgesi</h2>
    <p class="mt-1 text-neutral-600 text-sm">
      Yukarıdan aşağı inen çizgide, her durak kısa bir özet ve ilgili bağlantılarla yer alır.
    </p>
  </header>

  <div class="relative">
    <!-- Dikey çizgi -->
    <div class="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-neutral-300"></div>

    <ol class="space-y-2">
      {#each arcs as arc, i}
        <li class="relative pl-14 md:pl-16">
          <!-- İşaret (marker) -->
          <div class="absolute left-2 md:left-3 top-4 h-7 w-7 rounded-full bg-white border-2 border-[#D70000] shadow-sm flex items-center justify-center">
            <div class="h-2.5 w-2.5 rounded-full bg-[#D70000]"></div>
          </div>

          <article class="rounded-2xl border border-neutral-200 bg-white p-4 md:p-5 shadow-sm">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="text-lg md:text-xl font-semibold text-neutral-900">{arc.title}</h3>
              {#if arc.period}
                <span class="inline-flex items-center rounded-full border border-[#D70000]/20 bg-[#FFCE00]/40 px-2 py-0.5 text-[11px] font-semibold text-[#9a0000]">
                  {arc.period}
                </span>
              {/if}
            </div>
            <p class="mt-2 text-neutral-700 leading-relaxed">
              {arc.summary}
            </p>

            {#if arc.href}
              <div class="mt-3">
                <a
                  href={arc.href}
                  class="inline-flex items-center gap-1 text-sm font-semibold text-[#D70000] hover:underline"
                >
                  Detayları oku
                  <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            {/if}
          </article>
        </li>
      {/each}
    </ol>
  </div>
</section>
