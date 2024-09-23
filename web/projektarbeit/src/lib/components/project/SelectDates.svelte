<script lang="ts">
    import { DropdownMenu } from "bits-ui";
    import { getLocalTimeZone, today } from "@internationalized/date";
    import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";
    import { flyAndScale } from "$lib/utils";

    const start = today(getLocalTimeZone());
  const end = start.add({ days: 7 });
 
  let value = {
    start,
    end
  };

</script>

<h2 class="font-bold text-xl">Wähle den Zeitraum (Kalenderwoche) der Klausurenphase</h2> 

<div class="flex justify-center mt-6 flex-col gap-3 items-center">
    <DropdownMenu.Root>
        <DropdownMenu.Trigger class="text-emerald-700 py-2 px-3 border-2 border-emerald-700 rounded-xl transition-all duration-500">
            Auswählen
        </DropdownMenu.Trigger>
       
        <DropdownMenu.Content
            class="top-3 rounded-xl border border-emerald-700/50 bg-white p-4 shadow-lg"
            transition={flyAndScale}>
            <RangeCalendar bind:value class="rounded-md border" />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    
    
    {#if value} 
       <p>{value.start.toLocaleString()} - {value.end.toLocaleString()}</p>
    {/if}
</div>