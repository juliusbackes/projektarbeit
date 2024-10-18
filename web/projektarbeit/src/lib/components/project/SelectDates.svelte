<script lang="ts">
    import { DropdownMenu } from "bits-ui";
    import { getLocalTimeZone, today } from "@internationalized/date";
    import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";
    import { flyAndScale } from "$lib/utils";
    import { Button } from '$lib/components/ui/button';
    import { spBrowserClient } from "$lib";
    import { CalendarDate } from "@internationalized/date";
    import type { TODO } from "$lib/types";

    type Props = TODO;

    const { data }: Props = $props();

    const start = today(getLocalTimeZone());
    const end = start.add({ days: 7 });

    let value = $state({
        start,
        end
    });

    /**
     * Converts a date object to a German date string format (DD.MM.YYYY)
     * @param {CalendarDate} date - The date object to convert
     * @returns {string} The formatted date string
     */
    const toGermanDateString = (date: CalendarDate): string => {
        if (!date) return '';
        return `${date.day.toString().padStart(2, '0')}.${date.month.toString().padStart(2, '0')}.${date.year}`;
    };

    /**
     * Handles the continuation of the project setup process
     * Updates the project with selected exam dates and increments the step
     */
    const handleContinue = async (e: Event) => {
        e.preventDefault();
      
        const startDate = new Date(value.start.year, value.start.month - 1, value.start.day);
        const endDate = new Date(value.end.year, value.end.month - 1, value.end.day);

        const { error } = await spBrowserClient
            .from('projects')
            .update({
                exam_start_date: startDate,
                exam_end_date: endDate,
                step: data.project.step + 1
            })
            .eq('id', data.project.id);

        if (error) {
            console.error('Error updating project:', error);
        } else {
            // Optionally handle successful update
            window.location.reload();
        }
    };
</script>

<h1 class="text-xl font-semibold">Klausurphase</h1>
{#if !data?.project?.exam_start_date && !data?.project?.exam_end_date}
    <p class="text-gray-500">Wählen Sie den Zeitraum (in KW) der Klausurphase aus.</p>

    <div class="flex justify-center mt-6 flex-col gap-3 items-center">
        <div class="flex justify-center gap-4">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger class="">
                    <Button variant="outline" class="flex gap-2 items-center">
                        {@render DateRangeIcon()}
                        {(value.start === start && value.end === end || !value.start || !value.end) 
                            ? 'Zeitraum auswählen' 
                            : `${toGermanDateString(value.start)} - ${toGermanDateString(value.end)}`}
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                    class="top-3 rounded-xl border border-emerald-700/50 bg-white p-4 shadow-lg"
                    transition={flyAndScale}>
                    <RangeCalendar bind:value class="rounded-md border" />
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
        <Button 
            class="w-full mt-3 bg-emerald-700 text-white hover:bg-emerald-900"
            disabled={(value.start === start && value.end === end || !value.start || !value.end)}
            on:click={handleContinue}
        >
            Weiter
        </Button>
    </div>
{:else}
    <p class="text-gray-500">Sie haben bereits einen Zeitraum ausgewählt.</p>
  
    {@const startDate = new Date(data.project.exam_start_date)}
    {@const endDate = new Date(data.project.exam_end_date)}
    <div class="flex justify-center text-xl font-semibold mt-5">
      <p>
        {toGermanDateString(new CalendarDate(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()))}
         -
        {toGermanDateString(new CalendarDate(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()))}
      </p>
    </div>
  {/if}
{#snippet DateRangeIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
  </svg>
{/snippet}