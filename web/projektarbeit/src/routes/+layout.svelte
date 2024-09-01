<script lang="ts">
	import type { Snippet } from 'svelte'; 
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';
	import '../app.css';

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

{@render children()}



