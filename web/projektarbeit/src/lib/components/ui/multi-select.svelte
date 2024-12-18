<script lang="ts">
	import { Check } from 'lucide-svelte';
	import { Button } from './button';
	import * as Popover from '$lib/components/ui/popover';

	export let options: { value: string; label: string }[] = [];
	export let placeholder = 'Select options...';
	export let value: string[] = [];

	function toggleOption(optionValue: string) {
		if (value.includes(optionValue)) {
			value = value.filter((v) => v !== optionValue);
		} else {
			value = [...value, optionValue];
		}
	}

	$: selectedLabels = value
		.map((val) => options.find((opt) => opt.value === val)?.label)
		.filter(Boolean)
		.join(', ');
</script>

<div class="relative">
	<Popover.Root>
		<Popover.Trigger>
			<Button variant="outline" class="w-full justify-between">
				{selectedLabels || placeholder}
				<span class="ml-2">▼</span>
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-[var(--radix-popover-trigger-width)] p-0">
			<div class="max-h-[300px] overflow-y-auto">
				{#each options as option}
					<button
						class="flex w-full items-center justify-between px-4 py-2 hover:bg-gray-100"
						on:click={() => toggleOption(option.value)}
					>
						{option.label}
						{#if value.includes(option.value)}
							<Check class="h-4 w-4" />
						{/if}
					</button>
				{/each}
			</div>
		</Popover.Content>
	</Popover.Root>
</div>
