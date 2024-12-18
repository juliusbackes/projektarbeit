<script lang="ts">
	import { SectionTitle } from '$lib/components';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Alert from '$lib/components/ui/alert';
	import { AlertCircle, Plus, X, ArrowUpDown, Monitor } from 'lucide-svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Popover from '$lib/components/ui/popover';
	import { RangeCalendar } from "$lib/components/ui/range-calendar";
	import { getLocalTimeZone, today } from "@internationalized/date";
	import { isDateInPast } from "$lib/utils";

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

	let showError = $state(false);

	let availableCourses = $state([
		{
			id: 5,
			name: 'BIO-GK1',
			studentCount: 14,
			is2xHJ: false,
			possibleExamDates: [1],
			grade: 1,
			conflicts: [6, 8]
		},
		{
			id: 6,
			name: 'CHE-GK1',
			studentCount: 16,
			is2xHJ: true,
			possibleExamDates: [2],
			grade: 2,
			conflicts: [5, 10]
		},
		{
			id: 7,
			name: 'GES-LK1',
			studentCount: 22,
			is2xHJ: false,
			possibleExamDates: [1, 3],
			grade: 0,
			conflicts: [3, 9]
		},
		{
			id: 8,
			name: 'POL-GK1',
			studentCount: 19,
			is2xHJ: false,
			possibleExamDates: [4],
			grade: 1,
			conflicts: [5, 9]
		},
		{
			id: 9,
			name: 'KUN-GK1',
			studentCount: 17,
			is2xHJ: false,
			possibleExamDates: [0],
			grade: 2,
			conflicts: [7, 8]
		},
		{
			id: 10,
			name: 'SPO-LK1',
			studentCount: 25,
			is2xHJ: true,
			possibleExamDates: [2, 4],
			grade: 0,
			conflicts: [6]
		}
	]);

	let selectedCourses = $state([
		{
			id: 1,
			name: 'MAT-LK1',
			studentCount: 15,
			is2xHJ: true,
			possibleExamDates: [0, 2],
			grade: 0,
			conflicts: [2, 3]
		},
		{
			id: 2,
			name: 'PHY-GK1',
			studentCount: 12,
			is2xHJ: false,
			possibleExamDates: [3],
			grade: 1,
			conflicts: [1, 4]
		},
		{
			id: 3,
			name: 'DEU-LK1',
			studentCount: 20,
			is2xHJ: true,
			possibleExamDates: [1, 2],
			grade: 2,
			conflicts: [1, 4]
		},
		{
			id: 4,
			name: 'ENG-GK1',
			studentCount: 18,
			is2xHJ: false,
			possibleExamDates: [1],
			grade: 0,
			conflicts: [2, 3]
		}
	]);

	let value = $state({
		start: today(getLocalTimeZone()),
		end: today(getLocalTimeZone()).add({ days: 7 })
	});

	const toggleWeekday = (exam: any, weekday: number) => {
		const index = exam.possibleExamDates?.indexOf(weekday) || -1;
		if (index === -1) {
			exam.possibleExamDates = [...(exam.possibleExamDates || []), weekday];
		} else {
			exam.possibleExamDates = exam.possibleExamDates?.filter((d: number) => d !== weekday) || [];
		}
		selectedCourses = selectedCourses;
	};

	const updateIs2xHJ = (exam: any) => {
		exam.is2xHJ = !exam.is2xHJ;
		selectedCourses = selectedCourses;
	};

	const toggleGrade = (exam: any, grade: number) => {
		exam.grade = grade;
		selectedCourses = selectedCourses;
	};

	const addCourse = (course: any) => {
		selectedCourses = [...selectedCourses, course];
		availableCourses = availableCourses.filter((c) => c.id !== course.id);
	};

	const removeCourse = (course: any) => {
		if (selectedCourses.length <= 4) {
			showError = true;
			return;
		}
		showError = false;
		1;
		availableCourses = [...availableCourses, course];
		selectedCourses = selectedCourses.filter((c) => c.id !== course.id);
	};

	const toggleConflict = (course1: any, course2: any) => {
		const conflicts1 = course1.conflicts || [];
		const index1 = conflicts1.indexOf(course2.id);

		const conflicts2 = course2.conflicts || [];

		if (index1 === -1) {
			course1.conflicts = [...conflicts1, course2.id];
			course2.conflicts = [...conflicts2, course1.id];
		} else {
			course1.conflicts = conflicts1.filter((id: number) => id !== course2.id);
			course2.conflicts = conflicts2.filter((id: number) => id !== course1.id);
		}
		selectedCourses = selectedCourses;
	};

	const toggleAllConflicts = (exam: any, selected: boolean) => {
		const otherCourses = selectedCourses.filter((c) => c.id !== exam.id);

		if (selected) {
			exam.conflicts = otherCourses.map((c) => c.id);
			otherCourses.forEach((course) => {
				course.conflicts = [...(course.conflicts || []), exam.id];
			});
		} else {
			exam.conflicts = [];
			otherCourses.forEach((course) => {
				course.conflicts = (course.conflicts || []).filter((id: number) => id !== exam.id);
			});
		}
		selectedCourses = selectedCourses;
	};
</script>

<div class="container mx-auto mt-3 space-y-8 p-4">
	<div class="md:hidden fixed left-0 right-0 top-1/2 -translate-y-1/2 z-50 px-4">
		<div class="rounded-lg bg-white p-6 shadow-lg backdrop-blur-sm border">
			<div class="flex flex-col items-center gap-4 text-center">
				<Monitor class="size-12 text-emerald-700" />
				<h2 class="text-lg font-semibold">Bitte verwenden Sie ein Tablet oder PC</h2>
				<p class="text-sm text-muted-foreground">
					Diese Anwendung ist für größere Bildschirme optimiert.
				</p>
			</div>
		</div>
	</div>

	<SectionTitle>Playground</SectionTitle>

	{#if showError}
		<Alert.Root variant="destructive">
			<div class="flex items-start justify-between">
				<div class="flex gap-2">
					<AlertCircle class="size-4" />
					<div>
						<Alert.Title>Fehler</Alert.Title>
						<Alert.Description>Es müssen mindestens 4 Kurse ausgewählt sein.</Alert.Description>
					</div>
				</div>
				<Button
					variant="ghost"
					size="icon"
					class="hover:bg-red-800"
					onclick={() => (showError = false)}
				>
					<X class="size-4" />
				</Button>
			</div>
		</Alert.Root>
	{/if}

	<div class="grid-cols-1 gap-4 md:grid-cols-2 hidden md:grid">
		<Card.Root class="col-span-2 shadow">
			{@render CourseOverview()}
		</Card.Root>
		<Card.Root class="shadow">
			{@render TimePeriod()}
		</Card.Root>
		<Card.Root class="shadow">
			{@render Graph()}
		</Card.Root>
	</div>
</div>

{#snippet CourseOverview()}
	<Card.Header>
		<Card.Title>Kursübersicht</Card.Title>
		<Card.Description>Übersicht über alle ausgewählten Kurse und deren Konflikte.</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="w-full rounded-md border">
			<Table.Root>
				<Table.Header>
					{@render TableHeader()}
				</Table.Header>
				<Table.Body>
					{#each selectedCourses as exam}
						{@render TableExamRow(exam)}
					{/each}
				</Table.Body>
			</Table.Root>
		</div>

		<Accordion.Root type="single"  class="mt-4">
			<Accordion.Item value="available-courses">
				<Accordion.Trigger class="flex w-full items-center justify-between">
					<span class="font-semibold">Weitere Kurse</span>
				</Accordion.Trigger>
				<Accordion.Content>
					<div class="mt-4 space-y-2">
						{#each availableCourses as course}
							<div class="flex items-center justify-between rounded-md bg-gray-50 p-2">
								<span>{course.name}</span>
								<Button
									variant="ghost"
									size="icon"
									onclick={() => addCourse(course)}
									class="hover:bg-emerald-100 hover:text-emerald-700"
								>
									<Plus class="size-4" />
								</Button>
							</div>
						{/each}
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</Card.Content>
{/snippet}

{#snippet TableHeader()}
	<Table.Row>
		<Table.Head>Kursname</Table.Head>
		<Table.Head>Anzahl Schüler</Table.Head>
		<Table.Head>2x/HJ</Table.Head>
		<Table.Head>Mögl. Prüfungstag</Table.Head>
		<Table.Head>Jahrgangsstufe</Table.Head>
		<Table.Head>Konflikte</Table.Head>
		<Table.Head></Table.Head>
	</Table.Row>
{/snippet}

{#snippet TableExamRow(exam: any)}
	<Table.Row>
		<Table.Cell class="font-semibold">
			{exam.name}
		</Table.Cell>
		<Table.Cell>
			{exam.studentCount}
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
					class="mx-1 size-6 p-0 text-sm font-normal {exam.grade === key
						? 'bg-emerald-700 text-primary-foreground hover:bg-emerald-800 hover:text-primary-foreground'
						: 'text-gray-500 hover:bg-gray-100'} rounded"
					onclick={() => toggleGrade(exam, key)}
				>
					{value}
				</Button>
			{/each}
		</Table.Cell>
		<Table.Cell>
			<Popover.Root>
				<Popover.Trigger>
					<Button variant="ghost" size="icon" class="hover:bg-blue-100 hover:text-blue-700">
						<ArrowUpDown class="size-4" />
					</Button>
				</Popover.Trigger>
				<Popover.Content class="p-2">
					<div class="space-y-2">
						<div class="mb-4 flex items-center justify-between">
							<p class="text-sm font-medium">Konflikte auswählen:</p>
							<Button
								variant="outline"
								size="sm"
								class="h-7 px-2 text-xs"
								onclick={() => toggleAllConflicts(exam, !exam.conflicts?.length)}
							>
								{exam.conflicts?.length === selectedCourses.length - 1
									? 'Alle abwählen'
									: 'Alle auswählen'}
							</Button>
						</div>
						{#each selectedCourses as course}
							{#if course.id !== exam.id}
								<div class="flex items-center gap-2">
									<Checkbox
										checked={exam.conflicts?.includes(course.id) || false}
										onCheckedChange={() => toggleConflict(exam, course)}
									/>
									<span class="text-sm">{course.name}</span>
								</div>
							{/if}
						{/each}
					</div>
				</Popover.Content>
			</Popover.Root>
		</Table.Cell>
		<Table.Cell>
			<Button
				variant="ghost"
				size="icon"
				onclick={() => removeCourse(exam)}
				class="hover:bg-red-100 hover:text-red-700"
			>
				<X class="size-4" />
			</Button>
		</Table.Cell>
	</Table.Row>
{/snippet}

{#snippet TimePeriod()}
	<Card.Header>
		<Card.Title>Zeitraum auswählen</Card.Title>
		<Card.Description>
			Legen Sie den Zeitraum fest, in dem die Klausuren stattfinden sollen.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col gap-3">
			<div class="flex items-center gap-4 w-full">
				<div class="flex-1">
					<p class="text-sm font-medium">Von:</p>
					<p class="text-sm text-muted-foreground">
						{value.start ? new Date(value.start.year, value.start.month - 1, value.start.day).toLocaleDateString('de-DE') : 'Nicht ausgewählt'}
					</p>
				</div>
				<div class="flex-1">
					<p class="text-sm font-medium">Bis:</p>
					<p class="text-sm text-muted-foreground">
						{value.end ? new Date(value.end.year, value.end.month - 1, value.end.day).toLocaleDateString('de-DE') : 'Nicht ausgewählt'}
					</p>
				</div>
			</div>
			<RangeCalendar 
				class="rounded-md border w-full" 
				bind:value 
				locale="de-DE" 
				numberOfMonths={2}
				isDateUnavailable={(date) => isDateInPast(date)}
			/>
		</div>
	</Card.Content>
{/snippet}

{#snippet Graph()}
	<Card.Header>
		<Card.Title>Graph</Card.Title>
		<Card.Description>
			Visualisierung der Kursbeziehungen und Konflikte als interaktiver Graph.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex items-center justify-center p-8 text-muted-foreground">
			Graph nicht verfügbar
		</div>
	</Card.Content>
{/snippet}
