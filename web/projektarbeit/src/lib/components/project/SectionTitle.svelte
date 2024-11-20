<script lang="ts">
    import { type Snippet } from "svelte";

    let { children }: { children: Snippet } = $props();
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{@render children()}</h1>