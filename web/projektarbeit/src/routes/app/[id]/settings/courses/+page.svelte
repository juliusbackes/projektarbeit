<script lang="ts">
    import { SectionTitle } from "$lib/components";
    import { Button } from "$lib/components/ui/button";
    import { page } from "$app/stores";
    import * as Table from "$lib/components/ui/table";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { checkForUpperCase } from "$lib/utils";
    import * as Alert from "$lib/components/ui/alert";
    import { AlertCircle } from "lucide-svelte";
    import { updateProject } from "$lib/db";
    import { spBrowserClient } from "$lib";

    let { data: propData } = $props();
    const project = propData.sidebarData?.projects.find((p: any) => `${p.id}` == $page.params.id);

    type Course = {
        name: string;
        studentCount: number;
        is2xHJ: boolean;
        possibleExamDates: number[];
        adjancencyList: string[];
    };

    const rawData = project?.graph_data_raw as Record<string, string[]>;
    const evaluatedData = project?.graph_data_evaluated as Course[];

    let courseData: Course[] = $state(
        evaluatedData || 
        Object.keys(rawData || {}).map(course => ({
            name: course,
            studentCount: rawData[course]?.length || 0,
            is2xHJ: checkForUpperCase(course),
            possibleExamDates: [],
            adjancencyList: rawData[course] || []
        }))
    );

    const toggleWeekday = (course: Course, weekday: number) => {
        const index = course.possibleExamDates.indexOf(weekday);
        if (index === -1) {
            course.possibleExamDates = [...course.possibleExamDates, weekday];
        } else {
            course.possibleExamDates = course.possibleExamDates.filter(d => d !== weekday);
        }
        courseData = courseData;
    }

    const updateIs2xHJ = (course: Course) => {
        course.is2xHJ = !course.is2xHJ;
        courseData = courseData;
    }

    const weekdays = new Map([
        [0, "Mo"],
        [1, "Di"],
        [2, "Mi"],
        [3, "Do"],
        [4, "Fr"]
    ])

    let hasInvalidCourses = $state(false);
    let attempted = $state(false);

    $effect(() => {
        hasInvalidCourses = courseData.some(course => course.possibleExamDates.length === 0);
    });

    const saveData = async () => {
        attempted = true;
        if (hasInvalidCourses) {
            return;
        }


        const { error } = await updateProject(`${project?.id}`, {
            graph_data_evaluated: courseData,
            has_selected_course_days_and_lks: true
        }, spBrowserClient);

        if (error) {
            console.error(error);
            alert("Fehler beim Speichern");
        }

        alert("Daten gespeichert");
        window.location.reload();
    }
</script>


<SectionTitle>Kurse</SectionTitle>

<NoDatesSelectedError />

<section class="my-6 max-w-2xl mx-auto">
    <div class="rounded-md border w-full">
        <Table.Root>
            <Table.Header>
                <TableHeader />
            </Table.Header>
            <Table.Body>
                {#each courseData as course}
                    {@render TableCourseRow(course)}
                {/each}
            </Table.Body>
        </Table.Root>
    </div>
    <SaveButton />
</section>

<!-- Helper Snippets -->

{#snippet NoDatesSelectedError()}
    {#if attempted && hasInvalidCourses}
        <Alert.Root class="my-4" variant="destructive">
            <AlertCircle class="size-4" />
            <Alert.Title>Fehler</Alert.Title>
            <Alert.Description>
                Jeder Kurs muss einen mögl. Prüfungstag haben
            </Alert.Description>
        </Alert.Root>
    {/if}
{/snippet}

{#snippet TableHeader()}
    <Table.Row>
        <Table.Head>Kursname</Table.Head>
        <Table.Head>Anzahl Schüler</Table.Head>
        <Table.Head>2x/HJ</Table.Head>
        <Table.Head>Mögl. Prüfungstag</Table.Head>
    </Table.Row>
{/snippet}

{#snippet TableCourseRow(course: Course)}
    <Table.Row class={attempted && course.possibleExamDates.length === 0 ? 'bg-destructive/10 hover:bg-destructive/5' : ''}>
        <Table.Cell class="font-semibold">
            {course.name}
        </Table.Cell>
        <Table.Cell>
            {course.studentCount}
        </Table.Cell>
        <Table.Cell>
            <Checkbox 
                checked={course.is2xHJ}
                onCheckedChange={() => updateIs2xHJ(course)}
            />
        </Table.Cell>
        <Table.Cell class="flex gap-2">
            {#each weekdays as [key, value]}
                <Button 
                    variant="outline" 
                    size="icon" 
                    class="size-6 p-0 text-sm font-normal {course.possibleExamDates.includes(key) ? 'bg-emerald-700 text-primary-foreground hover:text-primary-foreground hover:bg-emerald-800' : 'text-gray-500 hover:bg-gray-100'} rounded"
                    onclick={() => toggleWeekday(course, key)}
                >
                    {value}
                </Button>
            {/each}
        </Table.Cell>
    </Table.Row>
{/snippet}

{#snippet SaveButton()}
    <Button 
        class="mt-4 bg-emerald-700 hover:bg-emerald-800" 
        onclick={saveData}
        disabled={attempted && hasInvalidCourses}
    >
        Speichern
    </Button>
{/snippet}