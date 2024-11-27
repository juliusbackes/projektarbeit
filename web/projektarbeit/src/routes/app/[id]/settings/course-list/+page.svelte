<script lang="ts">
    import { SectionTitle } from "$lib/components";
    import { Input } from "$lib/components/ui/input";
    import * as Alert from "$lib/components/ui/alert";
    import { Info } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
    import { Card } from "$lib/components/ui/card";
    import { page } from "$app/stores";
    import * as Table from "$lib/components/ui/table";
    import { convertXLSXtoJSON } from "$lib/utils";
    import { spBrowserClient } from "$lib";
    import { updateProject } from "$lib/db";
    let files = $state<FileList>();

        let { data } = $props();

        const project = data.sidebarData?.projects.find(p => `${p.id}` == $page.params.id);

    const handleUpload = async (e: Event) => {
		e.preventDefault();
		
		const file = files?.[0];

		if (!file) {
			return;
		}

		const columns = await convertXLSXtoJSON(file);

        const { data: updateData, error } = await updateProject(`${$page.params.id}`, {
            graph_data_raw: columns,
            has_uploaded_course_list: true,
            has_selected_course_days_and_lks: false
        }, spBrowserClient);
        
		if (error) {
			console.error(error);
			return {
				status: 400,
			};
		};

		if (updateData) {
			window.location.reload();
		}
	}
</script>

<SectionTitle>Kursliste</SectionTitle>

<div class="py-6 max-w-xl">
    {#if project?.has_uploaded_course_list}
        <Alert.Root class="my-6" variant="info">
            <Info class="size-4"/>
            <Alert.Title>Kursliste bereits hochgeladen</Alert.Title>
            <Alert.Description>
                Sie können die Kursliste jederzeit ändern.
            </Alert.Description>
        </Alert.Root>
    {/if}
    <Input type="file" name="file" accept=".xlsx" required aria-required="true" bind:files={files} />
    <Button class="bg-emerald-700 hover:bg-emerald-900 mt-3" disabled={!files} onclick={handleUpload}>Hochladen</Button>

    <Card class="p-6 my-32">
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
