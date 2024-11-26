<script lang="ts">
	import { SidebarMain, ProjectSwitcher, SidebarUser } from "$lib/components";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	let {
		sidebarData,
		user,
		...restProps
	}: any = $props();
</script>

<Sidebar.Root collapsible="icon" {...restProps}>
	<Sidebar.Header>
		<ProjectSwitcher projects={sidebarData.projects} currentProject={sidebarData.currentProject} />
	</Sidebar.Header>
	<Sidebar.Content>
		<SidebarMain links={sidebarData.links} currentProject={sidebarData.currentProject} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<SidebarUser {user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
