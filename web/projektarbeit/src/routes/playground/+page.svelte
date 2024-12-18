<script lang="ts">
    import { Graph } from '$lib/graph';
    import { onMount } from 'svelte';
    import { Button } from '$lib/components/ui/button';
    import { MultiSelect } from '$lib/components';
    import { Calendar } from '$lib/components/ui/calendar';

    let graph = new Graph();
    let selectedCourses: string[] = [];
    let startDate: Date | undefined = undefined;
    let endDate: Date | undefined = undefined;

    // Dummy courses data
    const courses = [
        { value: 'math', label: 'Mathematics 101' },
        { value: 'physics', label: 'Physics 101' },
        { value: 'chemistry', label: 'Chemistry 101' },
        { value: 'biology', label: 'Biology 101' },
        { value: 'cs', label: 'Computer Science 101' },
        { value: 'history', label: 'History 101' },
        { value: 'english', label: 'English 101' },
        { value: 'art', label: 'Art 101' }
    ];

    // Initialize graph with some dummy data
    onMount(() => {
        // Add vertices
        graph.addMultipleVertices(['math', 'physics', 'chemistry', 'biology', 'cs', 'history', 'english', 'art']);
        
        // Add some example edges (conflicts)
        graph.addMultipleEdges([
            ['math', 'physics'],
            ['chemistry', 'biology'],
            ['cs', 'math'],
            ['history', 'english']
        ]);

        // Add some example time slots
        const startDate = new Date(2024, 0, 1);
        for (let i = 0; i < 10; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            graph.addColor(date);
        }

        // Set weekday constraints for each vertex
        graph.vertexToWeekdays.set('math', [1, 3]); // Monday, Wednesday
        graph.vertexToWeekdays.set('physics', [2, 4]); // Tuesday, Thursday
        graph.vertexToWeekdays.set('chemistry', [1, 5]); // Monday, Friday
        graph.vertexToWeekdays.set('biology', [2, 4]); // Tuesday, Thursday
        graph.vertexToWeekdays.set('cs', [3, 5]); // Wednesday, Friday
        graph.vertexToWeekdays.set('history', [1, 3]); // Monday, Wednesday
        graph.vertexToWeekdays.set('english', [2, 4]); // Tuesday, Thursday
        graph.vertexToWeekdays.set('art', [3, 5]); // Wednesday, Friday
    });

    function handleCourseSelection(event: CustomEvent) {
        selectedCourses = event.detail;
        graph = new Graph();
        graph.addMultipleVertices(selectedCourses);
        
        const allEdges: [string, string][] = [
            ['math', 'physics'],
            ['chemistry', 'biology'],
            ['cs', 'math'],
            ['history', 'english']
        ];
        const edges = allEdges.filter(([v1, v2]) => selectedCourses.includes(v1) && selectedCourses.includes(v2));
        graph.addMultipleEdges(edges);
    }

    function handleDateSelection(date: Date) {
        if (!startDate || (startDate && endDate)) {
            startDate = date;
            endDate = undefined;
        } else {
            endDate = date;
            // Add time slots between start and end date
            const current = new Date(startDate);
            while (current <= endDate) {
                graph.addColor(new Date(current));
                current.setDate(current.getDate() + 1);
            }
        }
    }

    function generateSchedule() {
        const coloring = graph.getColoring();
        // Convert coloring to a more readable format
        return Array.from(coloring.entries()).map(([course, date]) => ({
            course,
            date: date.toLocaleDateString()
        }));
    }

    let schedule: { course: string; date: string }[] = [];
</script>

<div class="container mx-auto p-4 space-y-8">
    <h1 class="text-3xl font-bold mb-6">Exam Schedule Playground</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-4">
            <h2 class="text-xl font-semibold">Course Selection</h2>
            <MultiSelect
                options={courses}
                bind:value={selectedCourses}
                placeholder="Select courses..."
            />
        </div>

        <div class="space-y-4">
            <h2 class="text-xl font-semibold">Time Period</h2>
            <!-- <Calendar
                numberOfMonths={2}

            /> -->
        </div>
    </div>

    <div class="space-y-4">
        <h2 class="text-xl font-semibold">Graph Visualization</h2>
        <div class="border rounded-lg p-4 min-h-[300px] bg-white">
            {#if selectedCourses.length > 0}
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h3 class="font-medium mb-2">Selected Courses:</h3>
                        <ul class="list-disc pl-5">
                            {#each selectedCourses as course}
                                <li>{course}</li>
                            {/each}
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-medium mb-2">Conflicts:</h3>
                        <ul class="list-disc pl-5">
                            {#each Array.from(graph.graph.entries()) as [course, conflicts]}
                                {#if conflicts.length > 0}
                                    <li>{course} conflicts with: {conflicts.join(', ')}</li>
                                {/if}
                            {/each}
                        </ul>
                    </div>
                </div>
            {:else}
                <p class="text-gray-500 text-center">Select courses to see the graph</p>
            {/if}
        </div>
    </div>

    <div class="space-y-4">
        <div class="flex justify-between items-center">
            <Button 
                onclick={() => schedule = generateSchedule()}
                disabled={!startDate || !endDate || selectedCourses.length === 0}
            >
                Generate Schedule
            </Button>
            <Button variant="outline" onclick={() => window.location.href = '/download'}>
                Download Full Project
            </Button>
        </div>

        {#if schedule.length > 0}
            <div class="border rounded-lg p-4 bg-white">
                <h3 class="font-medium mb-2">Generated Schedule:</h3>
                <ul class="space-y-2">
                    {#each schedule as item}
                        <li>{item.course}: {item.date}</li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
</div>

<style>
    :global(body) {
        background-color: #f5f5f5;
    }
</style> 