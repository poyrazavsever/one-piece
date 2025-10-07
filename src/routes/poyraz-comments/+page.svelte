<script lang="ts">
  import { onMount } from 'svelte';

  // ---- Types ----
  type Comment = {
    id: number;
    title: string;
    content: string;
    category: 'karakter' | 'arc' | 'teori' | 'genel';
    date: string;
    readTime: number; // dakika
    tags: string[];
  };

  // ---- Data ----
  const comments: Comment[] = [
    {
      id: 1,
      title: "Luffy'nin Gerçek Gücü: Sadece Gum-Gum Değil",
      content: `Luffy'nin gücü sadece şeytan meyvesinden gelmiyor. Onun asıl gücü, insanları etkileme ve arkadaş edinme yeteneği. Her ada'da insanları kendi yanına çekiyor ve onlar için savaşıyor. Bu, fiziksel güçten çok daha değerli bir yetenek.

      Ayrıca Luffy'nin savaş zekası gerçekten etkileyici. Crocodile'a karşı suyla savaşması, Enel'e karşı altını kullanması gibi yaratıcı çözümler buluyor. Bu da onun sadece kas değil, beyin de kullandığını gösteriyor.`,
      category: 'karakter',
      date: '2024-12-15',
      readTime: 3,
      tags: ['Luffy', 'Karakter Analizi', 'Güç']
    },
    {
      id: 2,
      title: "Marineford: One Piece'in En Dramatik Anı",
      content: `Marineford savaşı sadece bir savaş değil, duygusal bir hikaye. Ace'in ölümü, Whitebeard'ın son sözleri, Luffy'nin çaresizliği... Her sahne mükemmel kurgulanmış.

      Bu arc'ta Oda sensei'nin hikaye anlatma yeteneği zirveye çıkıyor. Savaşın ortasında bile karakter gelişimi devam ediyor. Luffy'nin büyümesi, Garp'ın ikilemleri, Sengoku'nun adaleti... Hepsi birbirine bağlı.

      Ve o final sahnesi! "One Piece gerçek!" sözleri tüm dünyayı değiştiriyor. Bu sadece bir manga değil, bu bir efsane.`,
      category: 'arc',
      date: '2024-12-10',
      readTime: 4,
      tags: ['Marineford', 'Ace', 'Whitebeard', 'Drama']
    },
    {
      id: 3,
      title: "Teorim: Shanks'ın Gerçek Planı",
      content: `Shanks'ın her hareketi hesaplı. Luffy'ye şapkayı vermesi, Marineford'a gelişi, Kaido'yu durdurması... Bunların hepsi bir planın parçası.

      Bence Shanks, One Piece'in ne olduğunu biliyor ve Luffy'nin onu bulmasını istiyor. Ama direkt yardım etmiyor, çünkü Luffy'nin kendi gücüyle başarması gerekiyor.

      Elbaph arc'ında bu teorimin doğru çıkacağını düşünüyorum. Shanks ve Luffy'nin karşılaşması epik olacak!`,
      category: 'teori',
      date: '2024-12-05',
      readTime: 2,
      tags: ['Shanks', 'Teori', 'One Piece', 'Luffy']
    },
    {
      id: 4,
      title: "Zoro'nun Karakteri Neden Bu Kadar Seviliyor?",
      content: `Zoro sadece güçlü değil, aynı zamanda sadık ve ilkeli. Kaptan'ına olan bağlılığı mutlak. Thriller Bark'ta "Luffy'nin acısını ben alırım" sahnesi bu sadakatin en güzel örneği.

      Ayrıca Zoro'nun espri anlayışı da mükemmel. Sanji ile kavgaları, yön bulma sorunu, ciddi anların ortasında bile komik olması... Bu karakter derinliği One Piece'i özel yapan şeylerden biri.

      Mihawk ile olan ilişkisi de çok güzel işlenmiş. Rakip olup saygı duymak, büyümek için birbirlerini itele... Bu anime'nin en iyi rivalliklarından biri.`,
      category: 'karakter',
      date: '2024-12-01',
      readTime: 3,
      tags: ['Zoro', 'Karakter', 'Sadakat', 'Mihawk']
    },
    {
      id: 5,
      title: "One Piece'in Asıl Mesajı: Özgürlük ve Arkadaşlık",
      content: `One Piece sadece macera değil, derin mesajlar içeriyor. Özgürlük kavramı her karakterde farklı şekilde karşımıza çıkıyor. Luffy için özgürlük, istediği yeri gezebilmek. Robin için, geçmişini kabul ettiren insanlar bulmak.

      Arkadaşlık teması da muhteşem işlenmiş. Straw Hat'ların birbirleri için neler yapmaya hazır olduklarını görüyoruz. Enies Lobby'de Robin için dünyaya savaş açmaları bu arkadaşlığın gücünü gösteriyor.

      Bu değerler sadece mangada kalmıyor, gerçek hayata da taşınabiliyor. One Piece okuyan herkes bu değerleri öğreniyor.`,
      category: 'genel',
      date: '2024-11-28',
      readTime: 4,
      tags: ['Özgürlük', 'Arkadaşlık', 'Mesaj', 'Değerler']
    },
    {
      id: 6,
      title: "Wano Arc'ı: Samurai Kültürü ve Modern Hikayecilik",
      content: `Wano arc'ı Oda'nın Japon kültürüne olan sevgisinin mükemmel bir yansıması. Samurai onuru, bushido ruhu, geleneksel mimarı... Her detay özenle işlenmiş.

      Oden'in hikayesi beni çok etkiledi. Özgürlük için her şeyi feda eden bir karakter. Roger'la yolculuğu, Whitebeard'la geçirdiği zamanlar... Bunlar One Piece evreninin en güzel flashback'lerinden.

      Luffy'nin Gear 5'i ilk kullandığı an ise serinin dönüm noktalarından biri. Nika'nın efsanesi gerçek oluyor ve hikaye bambaşka bir boyut kazanıyor.`,
      category: 'arc',
      date: '2024-11-25',
      readTime: 5,
      tags: ['Wano', 'Oden', 'Samurai', 'Gear 5', 'Nika']
    }
  ];

  // ---- UI State ----
  let selectedCategory: string = 'all';
  let searchQuery: string = '';
  let selectedComment: Comment | null = null;

  // ---- Computed ----
  $: filteredComments = comments.filter(comment => {
    const matchesCategory = selectedCategory === 'all' || comment.category === selectedCategory;
    const matchesSearch = comment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'Tümü', count: comments.length },
    { id: 'karakter', name: 'Karakter Analizleri', count: comments.filter(c => c.category === 'karakter').length },
    { id: 'arc', name: 'Arc İncelemeleri', count: comments.filter(c => c.category === 'arc').length },
    { id: 'teori', name: 'Teoriler', count: comments.filter(c => c.category === 'teori').length },
    { id: 'genel', name: 'Genel Yorumlar', count: comments.filter(c => c.category === 'genel').length }
  ];

  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      'karakter': 'bg-blue-100 text-blue-800 border-blue-200',
      'arc': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'teori': 'bg-purple-100 text-purple-800 border-purple-200',
      'genel': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  }

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }

  function getCategoryName(category: string): string {
    const names: Record<string, string> = {
      'karakter': 'Karakter Analizi',
      'arc': 'Arc İncelemesi',
      'teori': 'Teori',
      'genel': 'Genel Yorum'
    };
    return names[category] || category;
  }
</script>

<svelte:head>
  <title>Poyraz'ın Yorumları — One Piece Analizleri & Teoriler</title>
  <meta name="description" content="One Piece hakkında kişisel yorumlarım, karakter analizleri, arc incelemeleri ve teoriler. Luffy'den Zoro'ya, Marineford'dan Wano'ya kadar her şey burada!" />
</svelte:head>

<!-- HERO -->
<section class="relative bg-gradient-to-br from-blue-50 via-white to-orange-50">
  <div class="mx-auto max-w-7xl px-4 sm:px-0 pt-12 pb-8">
    <div class="text-center">
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-800">
        Poyraz'ın Yorumları
      </h1>
      <p class="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
        One Piece evrenine dair kişisel düşüncelerim, analizlerim ve teorilerim. 
        25+ yıllık bu efsane seriye olan tutkumdan doğan yazılar.
      </p>
      
      <!-- Stats -->
      <div class="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <div class="inline-flex items-center rounded-full border bg-white px-4 py-2">
          <span class="font-medium text-neutral-600">Toplam Yazı:</span>
          <span class="ml-2 font-bold text-blue-600">{comments.length}</span>
        </div>
        <div class="inline-flex items-center rounded-full border bg-white px-4 py-2">
          <span class="font-medium text-neutral-600">Okuma Süresi:</span>
          <span class="ml-2 font-bold text-emerald-600">{comments.reduce((sum, c) => sum + c.readTime, 0)} dk</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FILTERS -->
<section class="mx-auto max-w-7xl px-4 sm:px-0 py-8">
  <div class="bg-white rounded-2xl border border-neutral-200 p-6">
    <!-- Search -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-neutral-700 mb-2">Arama</label>
      <input 
        type="text" 
        placeholder="Başlık, içerik veya etiket ara..." 
        class="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        bind:value={searchQuery}
      />
    </div>

    <!-- Categories -->
    <div>
      <label class="block text-sm font-medium text-neutral-700 mb-3">Kategoriler</label>
      <div class="flex flex-wrap gap-2">
        {#each categories as category}
          <button
            class="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors border"
            class:bg-blue-100={selectedCategory === category.id}
            class:text-blue-800={selectedCategory === category.id}
            class:border-blue-200={selectedCategory === category.id}
            class:bg-neutral-50={selectedCategory !== category.id}
            class:text-neutral-700={selectedCategory !== category.id}
            class:border-neutral-200={selectedCategory !== category.id}
            class:hover:bg-neutral-100={selectedCategory !== category.id}
            on:click={() => selectedCategory = category.id}
          >
            {category.name}
            <span class="ml-2 text-xs opacity-75">({category.count})</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- COMMENTS -->
<section class="mx-auto max-w-7xl px-4 sm:px-0 pb-12">
  {#if filteredComments.length === 0}
    <div class="text-center py-12">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-semibold text-neutral-800 mb-2">Sonuç bulunamadı</h3>
      <p class="text-neutral-600">Arama kriterlerinizi değiştirip tekrar deneyin.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {#each filteredComments as comment}
        <article class="group bg-white rounded-2xl border border-neutral-200 p-6 hover:border-neutral-300 hover:bg-neutral-50 transition-all">
          <!-- Header -->
          <div class="flex items-start justify-between gap-4 mb-4">
            <div class="flex-1">
              <h2 class="text-xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                {comment.title}
              </h2>
              <div class="flex items-center gap-3 text-sm text-neutral-600">
                <span>{formatDate(comment.date)}</span>
                <span>•</span>
                <span>{comment.readTime} dk okuma</span>
              </div>
            </div>
            <span class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium {getCategoryColor(comment.category)}">
              {getCategoryName(comment.category)}
            </span>
          </div>

          <!-- Content Preview -->
          <p class="text-neutral-700 leading-relaxed mb-4 line-clamp-3">
            {comment.content}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-4">
            {#each comment.tags as tag}
              <span class="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700">
                #{tag}
              </span>
            {/each}
          </div>

          <!-- Read More Button -->
          <button 
            class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            on:click={() => selectedComment = comment}
          >
            Devamını oku
            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </article>
      {/each}
    </div>
  {/if}
</section>

<!-- MODAL -->
{#if selectedComment}
  <div class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" on:click={() => selectedComment = null} role="button" tabindex="-1" on:keydown={(e) => e.key === 'Escape' && (selectedComment = null)}></div>
    <div class="absolute inset-4 md:inset-8 lg:inset-16">
      <div class="h-full bg-white rounded-2xl border border-neutral-300 flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="flex items-start justify-between gap-4 p-6 border-b border-neutral-200 bg-gradient-to-r from-blue-50 to-orange-50">
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-neutral-900 mb-2">
              {selectedComment.title}
            </h2>
            <div class="flex items-center gap-4 text-sm text-neutral-600">
              <span class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium {getCategoryColor(selectedComment.category)}">
                {getCategoryName(selectedComment.category)}
              </span>
              <span>{formatDate(selectedComment.date)}</span>
              <span>•</span>
              <span>{selectedComment.readTime} dk okuma</span>
            </div>
          </div>
          <button 
            class="rounded-lg p-2 hover:bg-white/80 transition"
            on:click={() => selectedComment = null}
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-6">
          <div class="prose prose-neutral max-w-none">
            {#each selectedComment.content.split('\n\n') as paragraph}
              <p class="mb-4 leading-relaxed text-neutral-700">{paragraph.trim()}</p>
            {/each}
          </div>

          <!-- Tags -->
          <div class="mt-8 pt-6 border-t border-neutral-200">
            <h4 class="text-sm font-medium text-neutral-900 mb-3">Etiketler</h4>
            <div class="flex flex-wrap gap-2">
              {#each selectedComment.tags as tag}
                <span class="inline-flex items-center rounded-md bg-blue-100 text-blue-800 px-3 py-1 text-sm font-medium">
                  #{tag}
                </span>
              {/each}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t border-neutral-200 bg-neutral-50">
          <div class="flex items-center justify-between">
            <div class="text-sm text-neutral-600">
              Bu yazı hakkında ne düşünüyorsun? Benimle sosyal medyadan iletişime geçebilirsin! 
            </div>
            <button 
              class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
              on:click={() => selectedComment = null}
            >
              Kapat
            </button>
          </div>
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
  
  .line-clamp-3 { 
    display: -webkit-box; 
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical; 
    overflow: hidden;
    line-clamp: 3;
  }
</style>