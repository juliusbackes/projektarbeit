<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = {
        status: number | null | undefined;
        children: Snippet;
    }

    let { status, children }: Props = $props();
</script>

{#if status === 403}
    <div class="flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center gap-3">
        <h1 class="text-2xl font-semibold text-emerald-700 md:text-5xl">
            Du bist nicht der Besitzer dieses Projekts
        </h1>
        <a href="/app" class="rounded-lg border-2 border-gray-200 px-3 py-2">Zurück zu meinen Projekten</a>
    </div>
{:else}
    {@render children()}
{/if}