<script lang="ts">
    import { SectionTitle } from "$lib/components";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button";
    import { page } from "$app/stores";

    let { data } = $props();

    const project = data.sidebarData?.projects.find(p => `${p.id}` == $page.params.id);
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
