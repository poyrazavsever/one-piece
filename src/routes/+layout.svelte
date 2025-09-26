<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-col min-h-screen">
	<Navbar />

	<main class="flex-grow">
		{@render children?.()}
	</main>

	<Footer />
</div>
