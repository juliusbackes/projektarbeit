<script lang="ts">
	import type { PageData } from './$types';
	import { ProjectAuthGuard, ProjectNav, ProjectTitle, UploadFile, DetectedCourses } from '$lib/components';

	let { data }: { data: PageData } = $props();
</script>

	<ProjectAuthGuard status={data.status}>	
		<ProjectNav {data} />
		<ProjectTitle {data} />

		<UploadFile {data} />
		<DetectedCourses {data}/>
	</ProjectAuthGuard>

