<script lang="ts">
    import type { PageData } from './$types';
    import { NoProjects, CreateProject } from '$lib/components';
    import { Button } from '$lib/components/ui/button';


    type ProjectItem = any;
 
    let { data }: { data: PageData } = $props();

</script>

{#if data?.projects?.length === 0}
  <NoProjects />  
{:else}

    <div class="flex items-center justify-between px-3">
        <h1 class="font-semibold text-2xl md:text-5xl" >Meine Projekte</h1>
        <CreateProject>
            <Button class="bg-transparent flex gap-2 border-2 text-emerald-700 hover:text-emerald-900 transition-all duration-300" variant="outline">
                {@render plusIcon()}
                Projekt erstellen
            </Button>
        </CreateProject>
    </div>
  
    <div class="flex justify-center mt-6">
      <div class="flex flex-wrap gap-6">
          {#each data.projects ?? [] as item}
              {@render projectItem(item)}
          {/each}
      </div>
    </div>
    {/if} 

{#snippet projectItem(item: ProjectItem)}
    <a class="p-4 bg-white rounded-xl md:h-40 w-full md:w-96 border-2 border-emerald-700/50 flex flex-col justify-between gap-2 shadow-xl hover:bg-emerald-700/10 transition-all duration-300 cursor-pointer hover:scale-110"  href={`/app/${item.id}`}>
        <div>
            <h2 class="font-semibold text-xl md:text-2xl">{item.name}</h2>
            <p class="text-gray-500">{item.description}</p>
        </div>
    </a>
{/snippet}

{#snippet plusIcon()}
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>  
{/snippet}