<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<header>
	<nav>
		<a href="/">Home</a>
	</nav>
</header>
{@render children?.()}