<script lang="ts">
	import type { PageData } from './$types';
	import { ProjectAuthGuard, ProjectNav, ProjectTitle, UploadFile, DetectedCourses } from '$lib/components';
	import { Step } from '$lib/components';

	let { data }: { data: PageData } = $props();

	let currentStep = 100;
</script>

	<ProjectAuthGuard status={data.status}>	
		<ProjectNav {data} />
		<ProjectTitle {data} />

		<Step step={0} {currentStep}>
			<UploadFile {data} />
		</Step>

		<Step step={1} {currentStep}>
			<DetectedCourses {data}/>
		</Step>
	</ProjectAuthGuard>

