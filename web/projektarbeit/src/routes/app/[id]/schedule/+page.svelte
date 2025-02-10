<script lang="ts">
	import { SectionTitle } from '$lib/components';
	import { page } from '$app/stores';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import { Info, Loader2 } from 'lucide-svelte';
	import { createProjectGraph, getSchoolStartDate, getWorkingDays } from '$lib/utils';
	import { writeCalendarToFile } from '$lib/excel';
	import { getExams, updateProject } from '$lib/db';
	import { spBrowserClient } from '$lib';

	let { data } = $props();

	let project = $state(data.sidebarData?.projects.find((p: any) => `${p.id}` == $page.params.id));

	const canCreatePlan = $derived(
		project?.has_uploaded_course_list &&
			project?.has_selected_course_days_and_lks &&
			project?.has_defined_exam_period
	);

	let isLoading = $state(false);

	const createPlan = async () => {
		if (!(project?.exam_start_date && project?.exam_end_date)) {
			alert('FEHLER: Bitte geben Sie zuerst einen Prüfungszeitraum ein.');
			return;
		}

		isLoading = true;

		try {
			const startDate = new Date(project.exam_start_date);
			const endDate = new Date(project.exam_end_date);

			const { data: exams, error } = await getExams(`${project.id}`, spBrowserClient);

			if (error) {
				alert('Fehler beim Laden der Klausuren');
				return;
			}

			const workingDays = await getWorkingDays(startDate, endDate);
			const graph = createProjectGraph(exams, workingDays);

			const coloring = graph.getColoring();

			writeCalendarToFile(startDate, endDate, coloring, exams);

			const { data: updatedProject, error: updateError } = await updateProject(
				`${project.id}`,
				{
					has_created_plan: true,
					graph: graph.toJSON()
				},
				spBrowserClient
			);

			if (updateError) {
				alert('Fehler beim Erstellen des Klausurenplans');
				return;
			}

			project = updatedProject;
		} catch (error) {
			if (error instanceof Error && error.message.startsWith('No valid colors available for vertex')) {
				alert('Es konnte kein Klausurenplan erstellt werden, da der Prüfungszeitraum zu kurz ist.');
			} else {
				alert('Ein Fehler ist aufgetreten');
			}
		} finally {
			isLoading = false;
		}
	};
</script>

<section class="container mx-auto">
	<SectionTitle>Klausurenplan</SectionTitle>

	<PlanExists />
	<CannotCreatePlan />

	{#if canCreatePlan}
		<div class="mt-6 flex w-full justify-center">
			<Button
				onclick={createPlan}
				class="bg-emerald-700 hover:bg-emerald-800 {isLoading
					? 'cursor-not-allowed opacity-50'
					: ''}"
				disabled={isLoading}
			>
				{#if isLoading}
					<Loader2 class="mr-2 size-4 animate-spin" />
				{/if}
				{isLoading ? 'Erstelle Plan...' : 'Klausurenplan erstellen'}
			</Button>
		</div>
	{/if}
</section>

<!-- Helper Snippets -->

{#snippet PlanExists()}
	{#if project?.has_created_plan}
		<Alert.Root class="my-6" variant="info">
			<Info class="size-4" />
			<Alert.Title>Klausurenplan erstellt</Alert.Title>
			<Alert.Description>Sie können den Klausurenplan jederzeit ändern.</Alert.Description>
		</Alert.Root>
	{/if}
{/snippet}

{#snippet CannotCreatePlan()}
	{#if !canCreatePlan}
		<Alert.Root class="my-6" variant="destructive">
			<Info class="size-4" />
			<Alert.Title>Klausurenplan kann nicht erstellt werden</Alert.Title>
			<Alert.Description>
				Sie müssen alle notwendigen Informationen bereitstellen, um einen Klausurenplan erstellen zu
				können.
			</Alert.Description>
		</Alert.Root>
	{/if}
{/snippet}
