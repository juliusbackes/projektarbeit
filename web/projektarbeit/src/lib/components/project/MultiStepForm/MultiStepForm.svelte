<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import Intro from "./Intro.svelte";
	import Upload from "./01_Upload.svelte";


	let { data } = $props();

	let currentStep = $state(1);
	let formData = $state({
		name: "",
		email: "",
		password: "",
		age: "",
		occupation: "",
		interests: [],
		termsAccepted: false,
	});

	function nextStep() {
		if (currentStep < 4) currentStep++;
	}

	function prevStep() {
		if (currentStep > 1) currentStep--;
	}

	function submitForm() {
		console.log("Form submitted:", formData);
		// Here you would typically send the data to a server
	}
</script>

<div class="flex justify-center mt-16">
	<Card class="w-full max-w-lg shadow-lg">
		<CardHeader>
			<CardTitle class="text-2xl font-semibold text-emerald-700">Informationen sammeln</CardTitle>
			<p class="text-sm text-gray-500">Wir brauchen einige Informationen von Ihnen, um den Klausurenplan zu erstellen.</p>
		</CardHeader>
		<CardContent>
			{#if currentStep === 1}
				<Intro />
			{:else if currentStep === 2}
				<Upload {data}/>
			{:else if currentStep === 3}
				<div class="space-y-4">
					<Label>Interests</Label>
					{#each ["Sports", "Music", "Movies", "Reading", "Travel"] as interest}
						<div class="flex items-center space-x-2">
							<!-- <Checkbox
								id={interest.toLowerCase()}
								checked={formData.interests.includes(interest)}
								onchange={(e) => {
									if (e.target.checked) {
										formData.interests = [...formData.interests, interest];
									} else {
										formData.interests = formData.interests.filter((i) => i !== interest);
									}
								}}
							/> -->
							<Label for={interest.toLowerCase()}>{interest}</Label>
						</div>
					{/each}
				</div>
			{:else if currentStep === 4}
				<div class="space-y-4">
					<div class="flex items-center space-x-2">
						<!-- <Checkbox id="terms" checked={formData.termsAccepted} onchange={(e) => (formData.termsAccepted = e.target.checked)} /> -->
						<Label for="terms">I accept the terms and conditions</Label>
					</div>
				</div>
			{/if}
		</CardContent>
		<CardFooter class="flex justify-between">
			<Button variant="outline" onclick={prevStep} class={currentStep === 1 ? "hidden" : "border-emerald-700 hover:border-emerald-900 text-emerald-700 hover:text-emerald-900"}>Zurück</Button>
			{#if currentStep < 4}
				<Button onclick={nextStep} class="bg-emerald-700 text-white hover:bg-emerald-900">{currentStep === 1 ? "Beginnen" : "Weiter"}</Button>
			{:else}
				<Button onclick={submitForm} disabled={!formData.termsAccepted}>Submit</Button>
			{/if}
		</CardFooter>
	</Card>
</div>
