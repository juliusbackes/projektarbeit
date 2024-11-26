<script lang="ts">
	import { Sidebar as AppSidebar } from "$lib/components";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { CalendarRange, GitGraph } from "lucide-svelte";
    import { Separator } from "$lib/components/ui/separator/index";
    import type { LayoutData } from "./$types";
	import type { Snippet } from "svelte";
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index";
    import { page } from "$app/stores";

    let { data, children }: { data: LayoutData, children: Snippet } = $props();

	const links = $derived({
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
				"title": "Kursliste",
				"url": `/next-app/${data.sidebarData?.routeId}/settings/course-list`,
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
	});

	const sidebarData = $derived({ ...data.sidebarData, links });

    const urlToGerman = {
        "next-app": "Projekte",
        "settings": "Einstellungen",
        "general": "Allgemein",
        "course-list": "Kursliste",
        "courses": "Kurse",
        "timeperiod": "Zeitraum",
        "schedule": "Klausurenplan",
        "graph": "Graph"
    };

    let pathSegments = $derived($page.url.pathname.split('/').filter(segment => segment));
    
    let breadcrumbItems = $derived(pathSegments.map((segment, index) => {
        const path = '/' + pathSegments.slice(0, index + 1).join('/');
        const label = segment === data.sidebarData?.routeId 
            ? data.sidebarData?.currentProject?.name 
            : urlToGerman[segment as keyof typeof urlToGerman] || segment;
        return { path, label };
    }));
</script>

<Sidebar.Provider>
	<AppSidebar {sidebarData} user={data.user}/>
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						{#each breadcrumbItems as { path, label }, index}
							{#if index > 0}
								<Breadcrumb.Separator class="hidden md:block" />
							{/if}
							<Breadcrumb.Item class="hidden md:block">
								{#if index === breadcrumbItems.length - 1}
									<Breadcrumb.Page>{label}</Breadcrumb.Page>
								{:else}
									<Breadcrumb.Link href={path}>{label}</Breadcrumb.Link>
								{/if}
							</Breadcrumb.Item>
						{/each}
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
		</header>
		<div class="p-6">{@render children()}</div>
	</Sidebar.Inset>
</Sidebar.Provider>