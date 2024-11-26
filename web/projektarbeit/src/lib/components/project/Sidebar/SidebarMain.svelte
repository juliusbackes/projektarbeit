<script lang="ts">
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import { CalendarRange, GitGraph, Settings, ChevronRight } from "lucide-svelte";
	import type { Snippet } from "svelte";
	import { page } from "$app/stores";
	import type { Database } from "$lib/types";
    import { Badge } from "$lib/components/ui/badge";

	let { links, currentProject }: { links: { general: { title: string, url: string, icon: Snippet }[], settings: { title: string, url: string, icon: Snippet }[] }, currentProject: Database["public"]["Tables"]["projects"]["Row"] } = $props();

</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Projekt</Sidebar.GroupLabel>
	<Sidebar.Menu>
        {#each links.general as item (item.title)}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton isActive={$page.url.pathname === item.url}>
					{#snippet child({ props })}
						<a href={item.url} {...props}>
							<item.icon class={$page.url.pathname === item.url ? "text-emerald-700" : ""} />
							<span>{item.title}</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		{/each}
        
        <Collapsible.Root open={false} class="group/collapsible">
            {#snippet child({ props })}
                <Sidebar.MenuItem {...props}>
                    <Collapsible.Trigger>
                        {#snippet child({ props })}
                            <Sidebar.MenuButton {...props}>
                                {#snippet tooltipContent()}
                                    Einstellungen
                                {/snippet}
                                <Settings />
                                <span>Einstellungen</span>
                                {@const incompleteCount = [
                                    !currentProject?.has_uploaded_course_list,
                                    !currentProject?.has_defined_exam_period,
                                    !currentProject?.has_selected_course_days_and_lks
                                ].filter(Boolean).length}
                                {#if incompleteCount > 0}
                                    <Badge class="ml-auto bg-emerald-700 text-white hover:bg-emerald-800">
                                        {incompleteCount}
                                    </Badge>
                                {/if}
                                <ChevronRight
                                    class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                />
                            </Sidebar.MenuButton>
                        {/snippet}
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                        {#if links.settings.length > 0}
                            <Sidebar.MenuSub>
                                {#each links.settings as subItem (subItem.title)}
                                    <Sidebar.MenuSubItem>
                                        <Sidebar.MenuSubButton isActive={$page.url.pathname === subItem.url}>
                                            {#snippet child({ props }) }
                                                <a href={subItem.url} {...props}>
                                                    <span>{subItem.title}</span>
                                                    {#if (subItem.url.includes('course-list') && !currentProject?.has_uploaded_course_list) || 
                                                        (subItem.url.includes('timeperiod') && !currentProject?.has_defined_exam_period) || 
                                                        (subItem.url.includes('courses') && !currentProject?.has_selected_course_days_and_lks)}
                                                        <Badge class="ml-auto bg-emerald-700 text-white hover:bg-emerald-800">
                                                            1
                                                        </Badge>
                                                    {/if}
                                                </a>
                                            {/snippet}
                                        </Sidebar.MenuSubButton>
                                    </Sidebar.MenuSubItem>
                                {/each}
                            </Sidebar.MenuSub>
                        {/if}
                    </Collapsible.Content>
                </Sidebar.MenuItem>
            {/snippet}
        </Collapsible.Root>
	</Sidebar.Menu>
</Sidebar.Group>
