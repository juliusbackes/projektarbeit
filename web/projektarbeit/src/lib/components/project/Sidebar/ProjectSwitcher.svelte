<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import Plus from 'lucide-svelte/icons/plus';
	import FolderKanban from 'lucide-svelte/icons/folder-kanban';
	import { Logo } from '$lib/icons';
	import { type TODO } from '$lib/types';

	let { projects, currentProject }: { projects: TODO[]; currentProject: TODO } = $props();

	const sidebar = useSidebar();

	let activeProject = $state(currentProject);
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<div
							class="flex aspect-square size-8 items-center justify-center rounded-lg border-none"
						>
							<Logo />
						</div>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">
								{activeProject.name}
							</span>
						</div>
						<ChevronsUpDown class="ml-auto" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-[--bits-dropdown-menu-anchor-width] min-w-56 rounded-lg"
				align="start"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				sideOffset={4}
			>
				<DropdownMenu.Label class="text-xs text-muted-foreground">Projekte</DropdownMenu.Label>
				{#each projects as project, index (project.name)}
					<a href={`/app/${project.id}`}>
						<DropdownMenu.Item
							onSelect={() => (activeProject = project)}
							class="cursor-pointer gap-2 p-2"
						>
							<div class="flex size-6 items-center justify-center rounded-sm border">
								<FolderKanban class="size-4" />
							</div>
							{project.name}
						</DropdownMenu.Item>
					</a>
				{/each}
				<DropdownMenu.Separator />
				<a href="/app/create">
					<DropdownMenu.Item class="cursor-pointer gap-2 p-2">
						<div class="flex size-6 items-center justify-center rounded-md border bg-background">
							<Plus class="size-4" />
						</div>
						<div class="font-medium text-muted-foreground">Projekt hinzufügen</div>
					</DropdownMenu.Item>
				</a>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
