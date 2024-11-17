<script lang="ts">
	import { Sidebar as AppSidebar } from "$lib/components";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { CalendarRange, GitGraph } from "lucide-svelte";
    import type { LayoutData } from "./$types";

    let { data }: { data: LayoutData } = $props();

	const links = {
		general: [
			{
				"title": "Klausurenplan",
				"url": `/next-app/${data.sidebarData?.routeId}/schedule`,
				"icon": CalendarRange
        	},
        	{
				"title": "Graph",
				"url": `/next-app/${data.sidebarData?.routeId}/graph`,
				"icon": GitGraph
        	},
		],
		settings: [
			{
				"title": "Allgemein",
				"url": `/next-app/${data.sidebarData?.routeId}/settings/general`,
        	},
			{
				"title": "Datei",
				"url": `/next-app/${data.sidebarData?.routeId}/settings/file`,
			},
			{
				"title": "Kurse",
				"url": `/next-app/${data.sidebarData?.routeId}/settings/courses`,
			},
			{
				"title": "Zeitraum",
				"url": `/next-app/${data.sidebarData?.routeId}/settings/timeperiod`,
			}
		]
	};

	const sidebarData = { ...data.sidebarData, links: links };
</script>

<Sidebar.Provider>
	<AppSidebar {sidebarData} user={data.user}/>
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div class="grid auto-rows-min gap-4 md:grid-cols-3">
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
			</div>
			<div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"></div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>