<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { CreateProject } from '$lib/components';
</script>

<div class="w-full grid place-items-center">
    <h1 class="text-2xl md:text-5xl text-emerald-700 font-semibold">Du hast noch keine Projekte erstellt</h1>
    <CreateProject>
        <Button class="bg-transparent flex gap-2 mt-3" variant="outline">
            {@render PlusIcon()}
            Projekt erstellen
        </Button>
    </CreateProject>
</div>

{#snippet PlusIcon()}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>  
{/snippet}