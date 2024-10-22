<script lang="ts">
	import type { PageData } from './$types';
	import { ProjectAuthGuard, ProjectNav, ProjectTitle, UploadFile, DetectedCourses, SelectDates } from '$lib/components';
	import { Step, MultiStepForm } from '$lib/components';

	let { data }: { data: PageData } = $props();

</script>

<ProjectAuthGuard status={data.status}>	
	<ProjectNav {data} />
	<ProjectTitle {data} />
<!-- 
	<div class="flex flex-col gap-3">
		<p>1. Kurs-Datei (Sie <span class="underline">muss</span> dem Format entsprechen)</p>
	</div>

	<MultiStepForm /> -->

	<Step step={0} currentStep={data?.project?.step ?? 0}>
		<UploadFile {data} />
	</Step>

	<Step step={1} currentStep={data?.project?.step ?? 0}>
		<DetectedCourses {data}/>
	</Step>

	<Step step={2} currentStep={data?.project?.step ?? 0}>
		<SelectDates {data} />
	</Step>

	<Step step={3} currentStep={data?.project?.step ?? 0}>
		<h1>Klausurphase</h1>
	</Step>
</ProjectAuthGuard>

