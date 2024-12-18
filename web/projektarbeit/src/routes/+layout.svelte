<script lang="ts">
	import type { Snippet } from 'svelte'; 
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';
	import '../app.css';
	import { Logo } from '$lib/icons';
	import { GithubIcon, Menu, X } from 'lucide-svelte';

	let { children, data }: { children: Snippet, data: PageData } = $props();
	let { session, supabase } = $derived(data);

	let isMenuOpen = $state(false);

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Schedulo</title>
</svelte:head>

<div class="font-sf-display flex flex-col">
	{#if !$page.url.pathname.startsWith('/app') && !$page.url.pathname.startsWith('/login') && !$page.url.pathname.startsWith('/register')}
		<Navbar />
	{/if}
	
	<div class="min-h-screen">	
		{@render children()}
	</div>

	{#if !$page.url.pathname.startsWith('/app') && !$page.url.pathname.startsWith('/login') && !$page.url.pathname.startsWith('/register')}
		<Footer />
	{/if}
</div>

{#snippet Navbar()}
	<header class="bg-white shadow-sm">
		<nav class="container mx-auto flex items-center justify-between px-4 py-4">
			<a  class="flex items-center gap-2 text-2xl font-bold text-emerald-700 cursor-pointer" href="/">
				<Logo />
				Schedulo
			</a>
			<div class="md:hidden">
				<button onclick={toggleMenu} class="text-gray-600 hover:text-emerald-700">
					{#if isMenuOpen}
						<X size={24} />
					{:else}
						<Menu size={24} />
					{/if}
				</button>
			</div>

			<div class="hidden md:flex items-center space-x-4">
				<a href="#features" class="text-gray-600 hover:text-emerald-700">Funktionen</a>
				<a href="#how-it-works" class="text-gray-600 hover:text-emerald-700">Wie es funktioniert</a>
				<a href="/playground" class="text-gray-600 hover:text-emerald-700">Playground</a>
				<a href="/login" class="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-md">
					Anmelden
				</a>
			</div>
		</nav>

		{#if isMenuOpen}
			<div class="md:hidden absolute top-16 left-0 right-0 bg-white p-4 shadow-md z-50">
				<div class="flex flex-col space-y-4">
					<a href="#features" class="text-gray-600 hover:text-emerald-700">Funktionen</a>
					<a href="#how-it-works" class="text-gray-600 hover:text-emerald-700">Wie es funktioniert</a>
					<a href="/playground" class="text-gray-600 hover:text-emerald-700">Playground</a>
					<a href="/login" class="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-center">
						Anmelden
					</a>
				</div>
			</div>
		{/if}
	</header>
{/snippet}

{#snippet Footer()}
	<footer class="bg-emerald-700 py-8 text-white">
		<div class="container mx-auto px-4">
			<div class="flex flex-col items-center justify-between md:flex-row">
				<div class="mb-4 text-center md:mb-0 md:text-left">
					<div class="mb-2 text-2xl font-bold">Schedulo</div>
					<p class="text-sm">&copy; 2024 Schedulo. Alle Rechte vorbehalten.</p>
				</div>
				<div class="flex space-x-4">
					<a
						href="https://github.com/juliusbackes/projektarbeit"
						class="rounded-full p-2 transition-colors hover:bg-emerald-600"
					>
						<span class="sr-only">GitHub</span>
						<GithubIcon />
					</a>
				</div>
			</div>
		</div>
	</footer>
{/snippet}
