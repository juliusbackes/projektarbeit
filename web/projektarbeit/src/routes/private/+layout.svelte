<script>
	/** @type {{data: any, children?: import('svelte').Snippet}} */
	let { data, children } = $props();
	let { supabase } = $derived(data);

	let logout = $derived(async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	});
</script>

<header>
	<nav>
		<a href="/">Home</a>
	</nav>
	<button onclick={logout}>Logout</button>
</header>
<main>
	{@render children?.()}
</main>