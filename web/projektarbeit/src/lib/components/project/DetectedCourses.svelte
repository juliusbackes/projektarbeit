<script lang="ts">
    import { Tooltip } from 'bits-ui';
    import { flyAndScale } from '$lib/utils';

    let { data }: { data: any } = $props();

    const courses = Object.keys(data?.project?.graph_data_raw ?? []);

    const checkForUpperCase = (str: string) => str === str.toUpperCase(); 
</script>

{#if data?.project?.file_added}
    <div class="mt-6 w-full bg-white p-10 border border-gray-300 rounded-xl">
        <h1 class="text-xl font-semibold ">Diese Kurse wurden erkannt</h1>


        <div class="mt-3">
            <table id="detected-courses" >
                <thead class="">
                    <tr class="">
                        <th class="p-4">Kurs</th>
                        <th>
                            LK
                            <Tooltip.Root openDelay={0}>
                                <Tooltip.Trigger>
                                    <span class="text-emerald-700 underline">?</span>
                                </Tooltip.Trigger>
                                <Tooltip.Content class="top-3 rounded-xl border border-emerald-700/50 bg-white p-4 shadow-lg"  transition={flyAndScale}>
                                    <p>Wenn Sie einen Kurs als LK (Leitsungskurs) makieren, werden pro HJ zwei Klausuren erstellt.</p>
                                    <p>In der E-Phase müssen die Hauptfächer als LKs makiert werden.</p>
                                  <Tooltip.Arrow />
                                </Tooltip.Content>
                            </Tooltip.Root>
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