<script lang="ts">
	import type { Snippet } from "svelte";
	import { cubicOut, cubicIn, cubicInOut } from "svelte/easing";
	import { tweened } from "svelte/motion";
	import { fade, scale } from "svelte/transition";

    type Props = {
        children: Snippet;
        step: number;
        currentStep: number;    
    }

    let { children, step, currentStep }: Props = $props();

</script>


{#if step <= currentStep}
    <div class="mt-6 w-full bg-white p-10 border border-gray-300 rounded-xl shadow-lg">
        {@render children()}
    </div>
{/if}