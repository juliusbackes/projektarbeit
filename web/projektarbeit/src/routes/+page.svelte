<script>
	export let data;
	$: ({ countries } = data);
</script>

<h1>Welcome to Supabase!</h1>
<ul>
	{#each countries as country}
		<li>{country.name}</li>
	{/each}
</ul>