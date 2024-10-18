
<script lang="ts">
	import { spBrowserClient } from '$lib';
	import { convertXLSXtoJSON } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';

	let { data: importData }: { data: any } = $props();

	let data = $state<any>(importData);
	let files = $state<FileList>();

	const handleUpload = async (e: Event) => {
		e.preventDefault();
		
		const file = files?.[0];

		if (!file) {
			return;
		}

		const columns = await convertXLSXtoJSON(file);

		const { data: updateData, error: updateError } = await spBrowserClient
			.from('projects')
			.update({
				graph_data_raw: columns,
				step: 1,
			})
			.eq('id', data?.project?.id)
			.select()
			.single();
		
		if (updateError) {
			console.error(updateError);
			return {
				status: 400,
			};
		};

		console.log(updateData);
		data = { ...data, project: updateData };

		if (updateData) {
			window.location.reload();
		}
	}

</script>
	

{#if data?.project?.step > 0}
<div class="flex flex-col items-center gap-3 justify-center">
	{@render docIcon()}
	Sie haben Ihre Datei bereits hochgeladen.
</div>
{/if}

{#if data?.project?.step === 0}
	<form  class="flex flex-col items-center gap-3 justify-center">
		{@render docIcon()}
		<p class="text-lg">Klicken Sie hier, um Ihre Datei hochzuladen</p>
		<input bind:files={files}  type="file" name="file" accept=".xlsx" class="w-full rounded-lg border-2 border-gray-200 p-2 mt-3" required aria-required="true" />
		<p class="text-gray-500">Akzeptierter Dateityp: .xlsx</p>
		<p class="text-gray-500">Max. Dateigröße 50MB</p>
		<p class="text-gray-500">Nach dem Hochladen kann die Datei nicht mehr geändert werden.</p>
		<Button 
			class="mt-3 w-full bg-emerald-700 font-medium text-white transition-all duration-300 hover:bg-emerald-900"  
			disabled={files ? false : true}
			onclick={(e: Event) => handleUpload(e)}
		>
			Hochladen
		</Button>
	</form>
{/if}

{#snippet docIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-24 text-emerald-700">
		<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
	</svg>  
{/snippet} 
