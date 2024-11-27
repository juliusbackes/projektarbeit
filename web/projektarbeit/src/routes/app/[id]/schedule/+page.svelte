<script lang="ts">
    import { SectionTitle } from "$lib/components";
    import { page } from "$app/stores";
    import * as Alert from "$lib/components/ui/alert";
    import { Button } from "$lib/components/ui/button";
    import { Info } from "lucide-svelte";

    let { data } = $props();

    const project = data.sidebarData?.projects.find((p: any) => `${p.id}` == $page.params.id);

    const canCreatePlan = project?.has_uploaded_course_list && project?.has_selected_course_days_and_lks && project?.has_defined_exam_period && project?.graph_data_evaluated;
</script>

<section class="container mx-auto">
    <SectionTitle>Klausurenplan</SectionTitle>

    {#if project?.has_created_plan}
        <Alert.Root class="my-6" variant="info">
            <Info class="size-4"/>
            <Alert.Title>Klausurenplan erstellt</Alert.Title>
            <Alert.Description>
                Sie können den Klausurenplan jederzeit ändern.
            </Alert.Description>
        </Alert.Root>
    {/if}

    {#if !canCreatePlan}
        <Alert.Root class="my-6" variant="destructive">
            <Info class="size-4"/>
            <Alert.Title>Klausurenplan kann nicht erstellt werden</Alert.Title>
            <Alert.Description>
                Sie müssen alle notwendigen Informationen eingeben, um einen Klausurenplan erstellen zu können.
            </Alert.Description>
        </Alert.Root>
    {/if}

    {#if canCreatePlan && !project?.has_created_plan}
        <div class="w-full flex justify-center">    
            <Button class="bg-emerald-700 hover:bg-emerald-800">Klausurenplan erstellen</Button>
        </div>
    {/if}

    
</section>  