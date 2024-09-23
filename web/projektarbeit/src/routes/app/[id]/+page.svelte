<script lang="ts">
	import type { PageData } from './$types';
	import { ProjectAuthGuard, ProjectNav, ProjectTitle, UploadFile, DetectedCourses, SelectDates } from '$lib/components';
	import { Step } from '$lib/components';

	let { data }: { data: PageData } = $props();

	console.log(data?.project?.step)
</script>

	<ProjectAuthGuard status={data.status}>	
		<ProjectNav {data} />
		<ProjectTitle {data} />

		<Step step={0} currentStep={data?.project?.step ?? 0}>
			<UploadFile {data} />
		</Step>

		<Step step={1} currentStep={data?.project?.step ?? 0}>
			<DetectedCourses {data}/>
		</Step>

		<Step step={2} currentStep={2}>
			<SelectDates />
		</Step>
	</ProjectAuthGuard>

