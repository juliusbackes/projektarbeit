<script lang="ts">
    import { SectionTitle } from "$lib/components";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button";
    import * as Alert from "$lib/components/ui/alert";
    import { Info } from "lucide-svelte";
    import { RangeCalendar } from "$lib/components/ui/range-calendar";
    import { page } from "$app/stores";
    import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
    import { spBrowserClient } from "$lib";
    import { updateProject } from "$lib/db";
    
    let { data } = $props();

    const project = data.sidebarData?.projects.find(p => `${p.id}` == $page.params.id);

    const startDate = new Date(project?.exam_start_date ?? '');
    const endDate = new Date(project?.exam_end_date ?? '');

    const startCalendarDate = new CalendarDate(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
    const endCalendarDate = new CalendarDate(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate());

    let value = $state({
        start: project?.exam_start_date ? startCalendarDate : today(getLocalTimeZone()),
        end: project?.exam_end_date ? endCalendarDate : today(getLocalTimeZone()).add({ days: 7 })
    });
    
    /**
     * Handles the continuation of the project setup process
     * Updates the project with selected exam dates and increments the step
     */
    const handleContinue = async (e: Event) => {
        e.preventDefault();
      
        const startDate = new Date(value.start.year, value.start.month - 1, value.start.day);
        const endDate = new Date(value.end.year, value.end.month - 1, value.end.day);

        if (!project?.id) {
            return;
        };

        const { error } = await updateProject(`${project?.id}`, {
            exam_start_date: startDate,
            exam_end_date: endDate,
            has_defined_exam_period: true
        }, spBrowserClient);

        if (error) {
            console.error('Error updating project:', error);
        } else {
            // Optionally handle successful update
            window.location.reload();
        }
    };
</script>

<SectionTitle>Zeitraum</SectionTitle>

<section class="max-w-xl my-6 ">

    {#if project?.has_defined_exam_period}
        <Alert.Root class="mb-6" variant="info">
            <Info class="size-4"/>
            <Alert.Title>Zeitraum bereits definiert</Alert.Title>
            <Alert.Description>
                Sie können den Zeitraum jederzeit ändern.
            </Alert.Description>
        </Alert.Root>
    {/if}

    <p class="text-sm text-muted-foreground">
        <!-- {value.start.toString()} - {value.end.toString()} -->
    </p>

    <div class="flex flex-col gap-3 justify-center">
        <p>Wählen Sie einen Zeitraum für die Klausurphase aus.</p>
        <RangeCalendar class="rounded-md border w-fit" bind:value locale="de-DE"/>
        <Button 
            class="w-[278px] bg-emerald-700 hover:bg-emerald-800" 
            disabled={!value || (value.start === startCalendarDate && value.end === endCalendarDate)}
            onclick={handleContinue}
        >
            Speichern
        </Button>
    </div>
</section>
