<script lang="ts">
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import { CalendarRange, GitGraph, Settings, ChevronRight } from "lucide-svelte";
	import type { Snippet } from "svelte";
	import { page } from "$app/stores";

	let { links }: { links: { general: { title: string, url: string, icon: Snippet }[], settings: { title: string, url: string, icon: Snippet }[] } } = $props();

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
                                            {#snippet child({ props })}
                                                <a href={subItem.url} {...props}>
                                                    <span>{subItem.title}</span>
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
