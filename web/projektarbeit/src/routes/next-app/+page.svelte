<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import { Search } from "lucide-svelte";
	import type { Database } from "$lib/types";

    let { data }: { data: { projects: Database['public']['Tables']['projects']['Row'][] } } = $props();

	let searchTerm = $state("");

    const projects = data?.projects;

	let filteredProjects = $derived(projects.filter((project) => project?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || project?.description?.toLowerCase().includes(searchTerm.toLowerCase())));
</script>

<div class="container mx-auto p-4 mt-10">
	<h1 class="text-3xl font-bold mb-6">Meine Projekte</h1>

	<div class="relative mb-6">
		<Search class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
		<input type="text" placeholder="Projekt suchen..." class="pl-10 pr-4 py-2 w-full border rounded-md" bind:value={searchTerm} />
	</div>
    
        {#if projects.length === 0}
            <div class="flex flex-col items-center justify-center mx-auto">
                <p class="text-center text-gray-500 mt-8">Keine Projekte gefunden.</p>
                <a href="/next-app/create" class="text-center text-emerald-700 hover:text-emerald-800">Neues Projekt erstellen</a>
            </div>
        {/if}

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each filteredProjects as project (project.id)}
            <a href={`/next-app/${project.id}`}>
                <Card class="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription>{project.description} ss</CardDescription>
                    </CardHeader>
                    <CardContent class="flex justify-start items-end bottom-0 mt-auto h-[75px]">
                        <Badge variant={project.has_created_plan ? "paFull" : "warning"}>
                            {project.has_created_plan ? "Fertig" : "In Bearbeitung"}
                        </Badge>
                    </CardContent>
                </Card>
            </a>
        {/each}
	</div>

	{#if filteredProjects.length === 0}
		<p class="text-center text-gray-500 mt-8">Keine Projekte gefunden, die zu Ihrer Suche passen.</p>
	{/if}
</div>