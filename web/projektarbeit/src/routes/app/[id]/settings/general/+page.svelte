<script lang="ts">
    import { SectionTitle } from "$lib/components";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button";
    import { page } from "$app/stores";
    import * as Popover from "$lib/components/ui/popover";

    let { data } = $props();

    const project = data.sidebarData?.projects.find(p => `${p.id}` == $page.params.id);

    let name = $state("");
</script>

<SectionTitle>Allgemein</SectionTitle>

<form action="?/updateProject" method="POST" class="flex flex-col gap-3 max-w-lg my-6">
    <div class="flex flex-col gap-1.5">
        <Label for="name">Projektname</Label>
        <Input type="text" id="name" name="name" value={project?.name} required aria-required />
    </div>
    <div class="flex flex-col gap-1.5">
        <Label for="description">Beschreibung</Label>
        <Input type="text" id="description" name="description" value={project?.description}  />
    </div>
    <Button class="w-fit bg-emerald-700 hover:bg-emerald-800" type="submit">Speichern</Button>
</form>

<Popover.Root>
    <Popover.Trigger>
        <Button variant="destructive" class="w-fit bg-red-700 hover:bg-red-800">Projekt löschen</Button>
    </Popover.Trigger>
    <Popover.Content class="z-30 w-full max-w-[500px] rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
        <form action="?/deleteProject" method="POST">
            <p>Schreibe <span class="font-semibold">"{project?.name}"</span>, um das Projekt zu löschen.</p>
            <Input type="text" name="name" required aria-required="true" class="focus-visible:ring-emerald-700 my-3"   bind:value={name}/>
            <Button variant="destructive" class="w-full" type="submit" disabled={project?.name !== name}>Projekt löschen</Button>
        </form>
        <Popover.Close />
    </Popover.Content>
</Popover.Root>