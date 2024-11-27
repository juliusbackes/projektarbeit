<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Search } from 'lucide-svelte';
	import type { Database } from '$lib/types';

	let { data }: { data: { projects: Database['public']['Tables']['projects']['Row'][] } } =
		$props();

	let searchTerm = $state('');

	const projects = data?.projects;

	let filteredProjects = $derived(
		projects.filter(
			(project) =>
				project?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project?.description?.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);
</script>

<div class="container mx-auto mt-10 p-4">
	<h1 class="mb-6 text-3xl font-bold">Meine Projekte</h1>

	<div class="relative mb-6">
		<Search class="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
		<input
			type="text"
			placeholder="Projekt suchen..."
			class="w-full rounded-md border py-2 pl-10 pr-4"
			bind:value={searchTerm}
		/>
	</div>

	{#if projects.length === 0}
		<div class="mx-auto flex flex-col items-center justify-center">
			<p class="mt-8 text-center text-gray-500">Keine Projekte gefunden.</p>
			<a href="/app/create" class="text-center text-emerald-700 hover:text-emerald-800"
				>Neues Projekt erstellen</a
			>
		</div>
	{/if}

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each filteredProjects as project (project.id)}
			<a href={`/app/${project.id}`}>
				<Card class="transition-shadow duration-300 hover:shadow-lg">
					<CardHeader>
						<CardTitle>{project.name}</CardTitle>
						<CardDescription>{project.description} ss</CardDescription>
					</CardHeader>
					<CardContent class="bottom-0 mt-auto flex h-[75px] items-end justify-start">
						<Badge variant={project.has_created_plan ? 'paFull' : 'warning'}>
							{project.has_created_plan ? 'Fertig' : 'In Bearbeitung'}
						</Badge>
					</CardContent>
				</Card>
			</a>
		{/each}
	</div>

	{#if filteredProjects.length === 0}
		<p class="mt-8 text-center text-gray-500">
			Keine Projekte gefunden, die zu Ihrer Suche passen.
		</p>
	{/if}
</div>
