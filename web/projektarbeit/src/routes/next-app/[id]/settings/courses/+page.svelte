<script lang="ts">
    import { SectionTitle } from "$lib/components";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button";
    import { page } from "$app/stores";
    import * as Table from "$lib/components/ui/table";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { MoreHorizontal } from "lucide-svelte";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { checkForUpperCase } from "$lib/utils";

    let { data: propData } = $props();

    const project = propData.sidebarData?.projects.find(p => `${p.id}` == $page.params.id);

    const data = project?.graph_data_raw as Record<string, string[]> || {};
    const courses = Object.keys(data);

    type Course = {
        name: string;
        studentCount: number;
        is2xHJ: boolean;
        possibleExamDates: number[];
    };

    let courseData: Course[] = $state(courses.map(course => ({
        name: course,
        studentCount: data[course]?.length || 0,
        is2xHJ: checkForUpperCase(course),
        possibleExamDates: []
    })));

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
</script>

<SectionTitle>Kurse</SectionTitle>
<button class="bg-primary text-primary-foreground px-4 py-2 rounded-md" onclick={() => console.log(courseData)}>Speichern</button>

<section class="my-6 max-w-2xl mx-auto">
    <div class="rounded-md border w-full">
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Kursname</Table.Head>
                    <Table.Head>Anzahl Schüler</Table.Head>
                    <Table.Head>2x/HJ</Table.Head>
                    <Table.Head>Mögl. Prüfungstag</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each courseData as course}
                    <Table.Row>
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
                                    class="size-6 p-0 text-sm font-normal {course.possibleExamDates.includes(key) ? 'bg-primary text-primary-foreground' : 'text-gray-500'} rounded"
                                    onclick={() => toggleWeekday(course, key)}
                                >
                                    {value}
                                </Button>
                            {/each}
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </div>
</section>