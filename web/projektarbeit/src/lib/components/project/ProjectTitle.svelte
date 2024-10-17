
<script lang="ts">
	let { data }: { data: any } = $props();
</script>

<div class="flex justify-between items-center">
	<h1 class="text-4xl font-semibold tracking-tight">{data?.project?.name}</h1>
	<p>{data?.project?.description}</p>
</div>

