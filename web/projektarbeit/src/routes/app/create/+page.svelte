<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Alert, AlertDescription, AlertTitle } from "$lib/components/ui/alert";
	import { CircleAlert } from "lucide-svelte";;

	let name = $state("");
	let description = $state("");
	let error = $state("");
</script>

<div class="container mx-auto p-4 max-w-md h-[100dvh] flex flex-col justify-center">
	<h1 class="text-2xl font-bold mb-4">Projekt erstellen</h1>

	<form action="?/createProject" method="POST"  class="space-y-4">
		<div class="space-y-2">
			<Label for="name">Name</Label>
			<Input type="text" name="name" id="name" bind:value={name} placeholder="Geben Sie einen Namen für das Projekt ein" required aria-required />
		</div>

		<div class="space-y-2">
			<Label for="description">Beschreibung (optional)</Label>
			<Input type="text" name="description" id="description" bind:value={description} placeholder="Geben Sie eine Beschreibung ein" />
		</div>

		{#if error}
			<Alert variant="destructive">
				<CircleAlert class="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		{/if}

		<Button type="submit" class="w-full bg-emerald-700 hover:bg-emerald-800">Erstellen</Button>
	</form>
</div>