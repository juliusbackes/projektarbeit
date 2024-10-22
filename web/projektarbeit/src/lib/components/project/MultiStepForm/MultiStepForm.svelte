<script>
	import { Button } from "$lib/components/ui/button";
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import Intro from "./Intro.svelte";
	// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "$lib/components/ui/select";
	// import { Checkbox } from "$lib/components/ui/checkbox";

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

<div class="flex justify-center">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle class="text-2xl font-semibold">Informationen sammeln</CardTitle>
			<p class="text-sm text-gray-500">Befolge die untenstehenden Schritte, um den Plan zu erstellen.</p>
		</CardHeader>
		<CardContent>
			{#if currentStep === 1}
				<Intro />
			{:else if currentStep === 2}
				<div class="space-y-4">
					<div>
						<Label for="age">Age</Label>
						<Input id="age" type="number" bind:value={formData.age} placeholder="Enter your age" />
					</div>
					<div>
						<Label for="occupation">Occupation</Label>
						<!-- <Select bind:value={formData.occupation}>
							<SelectTrigger>
								<SelectValue placeholder="Select occupation" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="student">Student</SelectItem>
								<SelectItem value="employed">Employed</SelectItem>
								<SelectItem value="unemployed">Unemployed</SelectItem>
								<SelectItem value="retired">Retired</SelectItem>
							</SelectContent>
						</Select> -->
					</div>
				</div>
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
			<Button variant="outline" onclick={prevStep} disabled={currentStep === 1}>Previous</Button>
			{#if currentStep < 4}
				<Button onclick={nextStep}>Next</Button>
			{:else}
				<Button onclick={submitForm} disabled={!formData.termsAccepted}>Submit</Button>
			{/if}
		</CardFooter>
	</Card>
</div>
