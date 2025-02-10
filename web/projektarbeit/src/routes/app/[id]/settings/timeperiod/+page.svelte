<script lang="ts">
	import { SectionTitle } from '$lib/components';
	import { Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import { Info, Loader2 } from 'lucide-svelte';
	import { RangeCalendar } from '$lib/components/ui/range-calendar';
	import { page } from '$app/stores';
	import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
	import { spBrowserClient } from '$lib';
	import { updateProject } from '$lib/db';
	import { isDateInPast } from '$lib/utils';
	let { data } = $props();

	const project = data.sidebarData?.projects.find((p) => `${p.id}` == $page.params.id);

	const startDate = new Date(project?.exam_start_date ?? '');
	const endDate = new Date(project?.exam_end_date ?? '');

	const startCalendarDate = new CalendarDate(
		startDate.getFullYear(),
		startDate.getMonth() + 1,
		startDate.getDate()
	);
	const endCalendarDate = new CalendarDate(
		endDate.getFullYear(),
		endDate.getMonth() + 1,
		endDate.getDate()
	);

	let value = $state({
		start: project?.exam_start_date ? startCalendarDate : today(getLocalTimeZone()),
		end: project?.exam_end_date ? endCalendarDate : today(getLocalTimeZone()).add({ days: 7 })
	});

	let isLoading = $state(false);

	/**
	 * Handles the continuation of the project setup process
	 * Updates the project with selected exam dates and increments the step
	 */
	const handleContinue = async (e: Event) => {
		e.preventDefault();
		isLoading = true;

		try {
			const startDate = new Date(value.start.year, value.start.month - 1, value.start.day);
			const endDate = new Date(value.end.year, value.end.month - 1, value.end.day);

			if (!project?.id) {
				return;
			}

			const { error } = await updateProject(
				`${project?.id}`,
				{
					exam_start_date: startDate,
					exam_end_date: endDate,
					has_defined_exam_period: true
				},
				spBrowserClient
			);

			if (error) {
				throw error;
			}

			alert('Zeitraum gespeichert');
			window.location.reload();
		} catch (error) {
			console.error('Error updating project:', error);
			alert('Fehler beim Speichern');
		} finally {
			isLoading = false;
		}
	};
</script>

<SectionTitle>Zeitraum</SectionTitle>

<section class="my-6 max-w-xl">
	{#if project?.has_defined_exam_period}
		<Alert.Root class="mb-6" variant="info">
			<Info class="size-4" />
			<Alert.Title>Zeitraum bereits definiert</Alert.Title>
			<Alert.Description>Sie können den Zeitraum jederzeit ändern.</Alert.Description>
		</Alert.Root>
	{/if}

	<div class="flex flex-col justify-center gap-3">
		<p>Wählen Sie einen Zeitraum für die Klausurphase aus.</p>
		<RangeCalendar
			class="w-fit rounded-md border"
			bind:value
			locale="de-DE"
			isDateUnavailable={(date) => isDateInPast(date)}
		/>
		<Button
			class="w-[278px] bg-emerald-700 hover:bg-emerald-800 {isLoading
				? 'cursor-not-allowed opacity-50'
				: ''}"
			disabled={!value ||
				(value.start === startCalendarDate && value.end === endCalendarDate) ||
				isLoading}
			onclick={handleContinue}
		>
			{#if isLoading}
				<Loader2 class="mr-2 size-4 animate-spin" />
			{/if}
			{isLoading ? 'Speichern...' : 'Speichern'}
		</Button>
	</div>
</section>
