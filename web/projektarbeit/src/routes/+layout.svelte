<script lang="ts">
	import type { Snippet } from 'svelte'; 
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';
	import '../app.css';
	import { Toaster, setToastState } from '$lib/components';

	let { children, data }: { children: Snippet, data: PageData } = $props();

	let { session, supabase } = $derived(data);

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

</script>

<!-- <Toaster /> -->

<svelte:head>
	<title>Schedulo</title>
</svelte:head>

<div class="font-sf-display">
	{@render children()}
</div>



