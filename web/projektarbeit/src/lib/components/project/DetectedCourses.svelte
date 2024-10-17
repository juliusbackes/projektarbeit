<script lang="ts">
    import { Tooltip } from 'bits-ui';
    import { flyAndScale } from '$lib/utils';
    import { Button } from '$lib/components/ui/button';
    import { spBrowserClient } from '$lib';

    let { data }: { data: any } = $props();

    const courses = Object.keys(data?.project?.graph_data_raw ?? []);

    let submitted = $state(false);

    const checkForUpperCase = (str: string) => str === str.toUpperCase(); 

    const graph_data_evaluated: any = {};

    for (const course of courses) {
        graph_data_evaluated[course] = {
            '2x': checkForUpperCase(course),
            data: data?.project?.graph_data_raw[course]
        }
    }

    const handleContinue = async (e: Event) => {
        e.preventDefault();

        for (const course of courses) {
            const checkbox = document.querySelector(`#row-${course} input[type="checkbox"]`) as HTMLInputElement;
            if (checkbox) {
                graph_data_evaluated[course]['2x'] = checkbox.checked;
            }
        }

        const { data: updateData, error: updateError } = await spBrowserClient
            .from('projects')
            .update({
                graph_data_evaluated: graph_data_evaluated,
                step: data.project.step + 1 || 2
            })
            .eq('id', data.project.id)
            .select()
            .single();

        if (updateError) {
            console.error('Error updating project data:', updateError);
        }

        submitted = true;
            
        window.location.reload();
    }
</script>

{#if 1 <= data?.project?.step}
    
        <h1 class="text-xl font-semibold ">Diese Kurse wurden erkannt</h1>
        <p class="text-gray-500">Überprüfen Sie die erkannten Kurse und passen Sie sie bei Bedarf an.</p>

        <div class="mt-6">
            <table id="detected-courses" class="w-full rounded-lg">
                <thead class="border-none">
                    <tr class="">
                        <th class="p-4">Kurs</th>
                        <th class="">
                            <p class="flex items-center gap-2">
                                2x/HJ
                                <Tooltip.Root openDelay={0}>
                                    <Tooltip.Trigger>
                                        <span class="text-emerald-700">
                                            {@render QuestionMark()}
                                        </span>
                                    </Tooltip.Trigger>
                                    <Tooltip.Content class="top-3 rounded-xl border border-emerald-700/50 bg-white p-4 shadow-lg"  transition={flyAndScale}>
                                        <p>Wenn Sie einen Kurs als 2x/HJ makieren, werden pro Halbjahr zwei Klausuren erstellt.</p>
                                    <Tooltip.Arrow />
                                    </Tooltip.Content>
                                </Tooltip.Root>
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {#each courses as course (course)}
                    <tr id={`row-${course}`} class="hover:bg-gray-200">
                        <td class="p-4">{course}</td>
                        <td><input type="checkbox" class="w-4 h-4" checked={checkForUpperCase(course) || data?.project?.graph_data_evaluated?.[course]['2x']}  /></td>
                    </tr>
                    {/each}
                </tbody>
            </table>
            <Button 
                class="w-full bg-emerald-700 hover:bg-emerald-900 transition-all duration-500 mt-3" 
                onclick={handleContinue}
                disabled={submitted}
            >
                Weiter
            </Button>
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