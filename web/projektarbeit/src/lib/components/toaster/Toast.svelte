<script lang="ts">
    import type { Toast } from '$lib/types';

    let { toast }: { toast: Toast } = $props();
</script>

<div
	class="relative flex h-16 w-60 flex-col justify-center rounded-md border border-gray-500 bg-gray-300 p-2 shadow-md"
>
	<span class="text-xs">{toast.message}</span>
	<button class="absolute right-2 top-2 size-5">
		<span class="sr-only">Close toast</span>
		x
	</button>
</div>