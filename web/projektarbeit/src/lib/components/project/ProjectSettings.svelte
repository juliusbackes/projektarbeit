<script lang="ts">
	import { fade } from 'svelte/transition';
	import { AlertDialog, Popover } from 'bits-ui';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let { data }: { data: any } = $props();
</script>

			<AlertDialog.Root>
				<AlertDialog.Trigger class="ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input hover:bg-accent border h-10 w-10 text-emerald-700 hover:text-emerald-900 transition-all duration-300 bg-transparent">
					{@render SettingsIcon()}
				</AlertDialog.Trigger>
				<AlertDialog.Portal>
					<AlertDialog.Overlay
						transition={fade}
						transitionConfig={{ duration: 150 }}
						class="duration-900 fixed inset-0 z-50 bg-black/50 backdrop-blur transition-all"
					/>
					<AlertDialog.Content
						class="fixed left-[50%] top-[50%] z-50 grid md:w-full translate-x-[-50%] w-[90%] translate-y-[-50%] gap-4 rounded-xl border-2 border-gray-200 bg-white p-7 outline-none sm:max-w-lg max-w-none"
					>
						<section class="p-3">
							<div class="flex justify-between items-center">
								<h1 class="text-3xl font-semibold text-emerald-700">Einstellungen</h1>
								<AlertDialog.Cancel>
									{@render CloseIcon()}
								</AlertDialog.Cancel>
							</div>
							<hr class="my-6 w-full" />
							<form action="?/updateProject" method="POST" class="flex flex-col gap-3">
								<div class="grid gap-4 py-4">
									<div class="grid grid-cols-4 items-center gap-4">
									  <Label for="name" class="text-right">Name</Label>
									  <Input 
									  id="name" 
									  name="name"
									  value={data?.project?.name}
									  placeholder="Projektname"
									  required
									  aria-required="true"
									  class="col-span-3 focus-visible:ring-emerald-700" 
									  />
									</div>
									<div class="grid grid-cols-4 items-center gap-4">
									  <Label for="description" class="text-right">Beschreibung</Label>
									  <Input 
									  id="description" 
									  name="description"
									  value={data?.project?.description}
									  placeholder="Projektbeschreibung"
									  required
									  aria-required="true"
									  class="col-span-3 focus-visible:ring-emerald-700" 
									  />
									</div>
								</div>
								<Button class="bg-emerald-700 hover:bg-emerald-900 transition-all duration-300 w-full" type="submit">Speichern</Button>
							</form>
							<hr class="my-6 w-full" />
                            <Popover.Root>
                                <Popover.Trigger class="w-full">
									<Button variant="destructive" class="w-full">Projekt löschen</Button>
                                </Popover.Trigger>
                                <Popover.Content  class="z-30 w-full max-w-[500px] rounded-lg border border-gray-200 bg-white p-4 shadow-lg mt-12">
                                    <form action="?/deleteProject" method="POST">
                                        <p>Schreibe <span class="font-semibold">"{data?.project?.name}"</span>, um das Projekt zu löschen.</p>
										<Input type="text" name="name" required aria-required="true" class="focus-visible:ring-emerald-700 my-3" />
										<Button variant="destructive" class="w-full" type="submit">Projekt löschen</Button>
                                    </form>
                                    <Popover.Close />
                                    <Popover.Arrow />
                                </Popover.Content>
                            </Popover.Root>

						</section>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog.Root>

{#snippet SettingsIcon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="size-6"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
		/>
		<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
	</svg>
{/snippet}



{#snippet CloseIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
		<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
	</svg>  
{/snippet}