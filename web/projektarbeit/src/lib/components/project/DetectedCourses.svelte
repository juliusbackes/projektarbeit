<script lang="ts">
    import { Tooltip } from 'bits-ui';
    import { flyAndScale } from '$lib/utils';

    let { data }: { data: any } = $props();

    const courses = Object.keys(data?.project?.graph_data_raw ?? []);

    const checkForUpperCase = (str: string) => str === str.toUpperCase(); 
</script>

{#if data?.project?.file_added}
    
        <h1 class="text-xl font-semibold ">Diese Kurse wurden erkannt</h1>


        <div class="mt-3">
            <table id="detected-courses" >
                <thead class="">
                    <tr class="">
                        <th class="p-4">Kurs</th>
                        <th class="">
                            <p class="flex items-center gap-2">
                                LK
                                <Tooltip.Root openDelay={0}>
                                    <Tooltip.Trigger>
                                        <span class="text-emerald-700">
                                            {@render QuestionMark()}
                                        </span>
                                    </Tooltip.Trigger>
                                    <Tooltip.Content class="top-3 rounded-xl border border-emerald-700/50 bg-white p-4 shadow-lg"  transition={flyAndScale}>
                                        <p>Wenn Sie einen Kurs als LK (Leitsungskurs) makieren, werden pro HJ zwei Klausuren erstellt.</p>
                                        <p>In der E-Phase müssen die Hauptfächer als LKs makiert werden.</p>
                                    <Tooltip.Arrow />
                                    </Tooltip.Content>
                                </Tooltip.Root>
                            </p>
                        </th>
                        <th>Optionen</th>
                    </tr>
                </thead>
                <tbody>
                    {#each courses as course (course)}
                    <tr id={`row-${course}`} class="hover:bg-gray-200">
                        <td class="p-4">{course}</td>
                        <td><input type="checkbox" class="w-4 h-4" checked={checkForUpperCase(course)}  /></td>
                        <td>Edit / Delete</td>
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    
{/if}

<style>
    #detected-courses {
        width: 100%;
        --tw-divide-y-reverse: 0;
        border-top-width: calc(2px * calc(1 - var(--tw-divide-y-reverse)));
        border-bottom-width: calc(2px * var(--tw-divide-y-reverse));
        --tw-divide-opacity: 1;
        border-color: rgb(229 231 235 / var(--tw-divide-opacity));
        --tw-bg-opacity: 1;
        background-color: rgb(243 244 246 / var(--tw-bg-opacity));
        text-align: left;
    }
</style>

{#snippet QuestionMark()}
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
</svg>  
{/snippet}