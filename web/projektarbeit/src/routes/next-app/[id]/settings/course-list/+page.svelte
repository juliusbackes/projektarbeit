<script lang="ts">
    import { SectionTitle } from "$lib/components";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button";
    import { Card } from "$lib/components/ui/card";
    import { page } from "$app/stores";
    import * as Table from "$lib/components/ui/table";
    import { convertXLSXtoJSON } from "$lib/utils";
    import { spBrowserClient } from "$lib";

    let { data } = $props();

    let files = $state<FileList>();

    const handleUpload = async (e: Event) => {
		e.preventDefault();
		
		const file = files?.[0];

		if (!file) {
			return;
		}

		const columns = await convertXLSXtoJSON(file);

		const { data: updateData, error: updateError } = await spBrowserClient
			.from('projects')
			.update({
				graph_data_raw: columns,
				step: 1,
			})
			.eq('id', $page.params.id)
			.select()
			.single();
		
		if (updateError) {
			console.error(updateError);
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
