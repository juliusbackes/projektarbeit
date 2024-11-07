<script lang="ts">
	import { run } from 'svelte/legacy';

	import { invalidate } from '$app/navigation';
	import type { EventHandler } from 'svelte/elements';

	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let { notes, supabase, user } = $derived(data);

	let handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = $state();
	run(() => {
		handleSubmit = async (evt) => {
			evt.preventDefault();
			if (!evt.target) return;

			const form = evt.target as HTMLFormElement;

			const note = (new FormData(form).get('note') ?? '') as string;
			if (!note) return;

			const { error } = await supabase.from('notes').insert({ note });
			if (error) console.error(error);

			invalidate('supabase:db:notes');
			form.reset();
		};
	});
</script>

<h1>Private page for user: {user?.email}</h1>
<h2>Notes</h2>
<ul>
	{#each notes as note}
		<li>{note.note}</li>
	{/each}
</ul>
<form onsubmit={handleSubmit}>
	<label>
		Add a note
		<input name="note" type="text" />
	</label>
</form>