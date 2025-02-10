<script lang="ts">
	import { SectionTitle } from '$lib/components';
	import { Input } from '$lib/components/ui/input';
	import * as Alert from '$lib/components/ui/alert';
	import { Info } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { page } from '$app/stores';
	import * as Table from '$lib/components/ui/table';
	import { convertXLSXtoJSON } from '$lib/utils';
	import { spBrowserClient } from '$lib';
	import { createExam, deleteAllExams, updateProject } from '$lib/db';
	import { Loader2 } from 'lucide-svelte';

	let files = $state<FileList>();
	let isUploading = $state(false);

	let { data } = $props();

	const project = data.sidebarData?.projects.find((p) => `${p.id}` == $page.params.id);

	const handleUpload = async (e: Event) => {
		e.preventDefault();
		isUploading = true;

		try {
			const file = files?.[0];

			if (!file) {
				return;
			}

			const columns = await convertXLSXtoJSON(file);

			const exams = Object.keys(columns).map((key) => ({
				name: key,
				studentList: columns[key]
			}));

			let hasError = false;

			await deleteAllExams(`${$page.params.id}`, spBrowserClient);

			for (const exam of exams) {
				const { error } = await createExam(
					`${$page.params.id}`,
					{
						name: exam.name,
						studentList: exam.studentList
					},
					spBrowserClient
				);

				if (error) {
					alert(error.message);
					hasError = true;
					break;
				}
			}

			if (!hasError) {
				const { error } = await updateProject(
					`${$page.params.id}`,
					{
						has_uploaded_course_list: true
					},
					spBrowserClient
				);

				alert('Kursliste erfolgreich hochgeladen');
				window.location.reload();
			}
		} finally {
			isUploading = false;
		}
	};
</script>

<SectionTitle>Kursliste</SectionTitle>

<div class="max-w-xl py-6">
	{#if project?.has_uploaded_course_list}
		<Alert.Root class="my-6" variant="info">
			<Info class="size-4" />
			<Alert.Title>Kursliste bereits hochgeladen</Alert.Title>
			<Alert.Description>Sie können die Kursliste jederzeit ändern.</Alert.Description>
		</Alert.Root>
	{/if}
	<Input type="file" name="file" accept=".xlsx" required aria-required="true" bind:files />
	<Button
		class="mt-3 bg-emerald-700 hover:bg-emerald-900"
		disabled={!files || isUploading}
		onclick={handleUpload}
	>
		{#if isUploading}
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
		{/if}
		Hochladen
	</Button>

	<Card class="my-32 p-6">
		<p class="scroll-m-20 text-2xl font-semibold tracking-tight">Hinweise</p>

		<p class="mt-3">1. Akzeptierter Dateityp: .xlsx (Excel-Datei)</p>
		<p>2. Max. Dateigröße 50MB</p>
		<p>3. Formatierung der Kursliste</p>
		<Table.Root class="max-w-xl">
			<Table.Caption>Beispiel für die Formatierung der Kursliste</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Kurs_1</Table.Head>
					<Table.Head>Kurs_2</Table.Head>
					<Table.Head>Kurs_3</Table.Head>
					<Table.Head>Kurs_4</Table.Head>
					<Table.Head>...</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell>Schüler_1</Table.Cell>
					<Table.Cell>Schüler_2</Table.Cell>
					<Table.Cell>Schüler_3</Table.Cell>
					<Table.Cell>Schüler_4</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Schüler_5</Table.Cell>
					<Table.Cell>Schüler_6</Table.Cell>
					<Table.Cell>Schüler_7</Table.Cell>
					<Table.Cell>Schüler_8</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>...</Table.Cell>
					<Table.Cell>...</Table.Cell>
					<Table.Cell>...</Table.Cell>
					<Table.Cell>...</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</Card>
</div>
