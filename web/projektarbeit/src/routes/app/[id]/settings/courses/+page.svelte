<script lang="ts">
	import { SectionTitle } from '$lib/components';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import * as Table from '$lib/components/ui/table';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { checkForGrade, checkForUpperCase, parseCourseName } from '$lib/utils';
	import * as Alert from '$lib/components/ui/alert';
	import { AlertCircle } from 'lucide-svelte';
	import { updateExam, updateProject } from '$lib/db';
	import { spBrowserClient } from '$lib';
	import type { Database } from '$lib/types';

	let { data: propData } = $props();
	const project = propData.sidebarData?.projects.find((p: any) => `${p.id}` == $page.params.id);
	const { exams } = propData;

	if (!exams) {
		alert('Fehler beim Laden der Klausuren');
	}

	let courseData = $state(
		exams?.map((exam) => {
			const parsedName = parseCourseName(exam.name || '');
			console.log(parsedName, exam.possibleExamDates, (exam.possibleExamDates ?? [])?.length > 0);
			return {
				...exam,
				possibleExamDates: (exam.possibleExamDates ?? [])?.length > 0 ? exam.possibleExamDates : parsedName?.weekIndexes || [],
				is2xHJ: exam.is2xHJ || parsedName?.is2xHJ || false,
				grade: exam.grade ?? parsedName?.grade ?? checkForGrade(exam.name || '')
			};
		}) || []
	);

	const toggleWeekday = (exam: Database['public']['Tables']['exams']['Row'], weekday: number) => {
		const index = exam.possibleExamDates?.indexOf(weekday) || -1;
		if (index === -1) {
			exam.possibleExamDates = [...(exam.possibleExamDates || []), weekday];
		} else {
			exam.possibleExamDates = exam.possibleExamDates?.filter((d) => d !== weekday) || [];
		}
		courseData = courseData;
	};

	const updateIs2xHJ = (exam: Database['public']['Tables']['exams']['Row']) => {
		exam.is2xHJ = !exam.is2xHJ;
		courseData = courseData;
	};

	const toggleGrade = (exam: Database['public']['Tables']['exams']['Row'], grade: number) => {
        exam.grade = grade;
		courseData = courseData;
	};

	const weekdays = new Map([
		[0, 'Mo'],
		[1, 'Di'],
		[2, 'Mi'],
		[3, 'Do'],
		[4, 'Fr']
	]);

	const grades = new Map([
		[0, 'E'],
		[1, 'Q1'],
		[2, 'Q2']
	]);

	let hasInvalidCourses = $state(false);
	let attempted = $state(false);

	$effect(() => {
		hasInvalidCourses = courseData.some((exam) => (exam.possibleExamDates ?? []).length === 0) || courseData.some((exam) => exam.grade === null);
	});

	const saveData = async () => {
		attempted = true;
		if (hasInvalidCourses) {
			return;
		}

		for (const exam of courseData) {
			const { error } = await updateExam(
				`${exam.id}`,
				{
					is2xHJ: exam.is2xHJ,
					grade: exam.grade,
					possibleExamDates: exam.possibleExamDates
				},
				spBrowserClient
			);

			if (error) {
				console.error(error);
				alert('Fehler beim Speichern');
				return;
			}
		}

		const { error } = await updateProject(
			`${project?.id}`,
			{
				has_selected_course_days_and_lks: true
			},
			spBrowserClient
		);

		if (error) {
			console.error(error);
			alert('Fehler beim Speichern');
			return;
		}

		alert('Daten gespeichert');
		window.location.reload();
	};
</script>

<SectionTitle>Kurse</SectionTitle>

<NoDatesSelectedError />

<section class="mx-auto my-6 max-w-2xl">
	<div class="w-full rounded-md border">
		<Table.Root>
			<Table.Header>
				<TableHeader />
			</Table.Header>
			<Table.Body>
				{#each courseData as exam}
					{@render TableExamRow(exam)}
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<SaveButton />
</section>

<!-- Helper Snippets -->
{#snippet NoDatesSelectedError()}
	{#if attempted && hasInvalidCourses}
		<Alert.Root class="my-4" variant="destructive">
			<AlertCircle class="size-4" />
			<Alert.Title>Fehler</Alert.Title>
			<Alert.Description>Jeder Kurs muss einen mögl. Prüfungstag und eine Jahrgangsstufe haben</Alert.Description>
		</Alert.Root>
	{/if}
{/snippet}

{#snippet TableHeader()}
	<Table.Row>
		<Table.Head>Kursname</Table.Head>
		<Table.Head>Anzahl Schüler</Table.Head>
		<Table.Head>2x/HJ</Table.Head>
		<Table.Head>Mögl. Prüfungstag</Table.Head>
		<Table.Head>Jahrgangsstufe</Table.Head>
	</Table.Row>
{/snippet}

{#snippet TableExamRow(exam: Database['public']['Tables']['exams']['Row'])}
	<Table.Row
		class={attempted && (exam.possibleExamDates?.length === 0 || exam.grade === null)
			? 'bg-destructive/10 hover:bg-destructive/5'
			: ''}
	>
		<Table.Cell class="font-semibold">
			{exam.name}
		</Table.Cell>
		<Table.Cell>
			{exam.studentList?.length || 0}
		</Table.Cell>
		<Table.Cell>
			<Checkbox checked={exam.is2xHJ || false} onCheckedChange={() => updateIs2xHJ(exam)} />
		</Table.Cell>
		<Table.Cell class="flex gap-2">
			{#each weekdays as [key, value]}
				<Button
					variant="outline"
					size="icon"
					class="size-6 p-0 text-sm font-normal {exam.possibleExamDates?.includes(key)
						? 'bg-emerald-700 text-primary-foreground hover:bg-emerald-800 hover:text-primary-foreground'
						: 'text-gray-500 hover:bg-gray-100'} rounded"
					onclick={() => toggleWeekday(exam, key)}
				>
					{value}
				</Button>
			{/each}
		</Table.Cell>
		<Table.Cell>
			{#each grades as [key, value]}
				<Button
					variant="outline"
					size="icon"
					class="size-6 p-0 mx-1 text-sm font-normal {exam.grade === key
						? 'bg-emerald-700 text-primary-foreground hover:bg-emerald-800 hover:text-primary-foreground'
						: 'text-gray-500 hover:bg-gray-100'} rounded"
					onclick={() => toggleGrade(exam, key)}
				>
					{value}
				</Button>
			{/each}
		</Table.Cell>
	</Table.Row>
{/snippet}

{#snippet SaveButton()}
	<Button
		class="mt-4 bg-emerald-700 hover:bg-emerald-800"
		onclick={saveData}
		disabled={attempted && hasInvalidCourses}
	>
		Speichern
	</Button>
{/snippet}
