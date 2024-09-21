<script lang="ts">
	import { fade } from 'svelte/transition';
	import { AlertDialog, Popover } from 'bits-ui';

	let { data }: { data: any } = $props();
</script>

<div class="flex justify-between">
			<a
					href="/app"
					class="flex bg-white size-10 items-center justify-center rounded border-2 border-gray-200 text-emerald-700 transition-all duration-300 hover:border-emerald-700"
				>
					{@render homeIcon()}
			</a>
			<AlertDialog.Root>
				<AlertDialog.Trigger
					class="flex bg-white items-center gap-1 rounded-lg border-2 border-gray-200 px-3 py-1 text-sm font-medium text-emerald-700 transition-all duration-700 hover:border-emerald-700"
				>
					{@render settingsIcon()}
					Einstellungen
				</AlertDialog.Trigger>
				<AlertDialog.Portal>
					<AlertDialog.Overlay
						transition={fade}
						transitionConfig={{ duration: 150 }}
						class="duration-900 fixed inset-0 z-50 bg-black/50 backdrop-blur transition-all"
					/>
					<AlertDialog.Content
						class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border-2 border-gray-200 bg-white p-7 outline-none sm:max-w-lg md:w-full"
					>
						<section class="p-3">
							<h1 class="text-2xl font-semibold tracking-tight text-emerald-700">Einstellungen</h1>
							<form action="?/updateProject" method="POST">
								<input
									type="text"
									name="name"
									placeholder="Projektname"
									class="mt-4 w-full rounded-lg border border-gray-200 p-2"
									required
									aria-required="true"
									value={data?.project?.name}
								/>
								<input
									type="text"
									name="description"
									placeholder="Projektbeschreibung (Optional)"
									class="mt-4 w-full rounded-lg border-2 border-gray-200 p-2 ring-0"
									value={data?.project?.description}
								/>
								<div class="mt-3 flex w-full items-center justify-between gap-3">
									<AlertDialog.Cancel
										class="w-full scale-95 rounded-xl border-2 border-emerald-700 px-[11px] py-[7px] font-medium text-emerald-700 transition-all duration-300 hover:scale-105"
									>
										Abbrechen
									</AlertDialog.Cancel>
									<button
										onclick={() => console.log('delete')}
										class="w-full rounded-xl bg-emerald-700 px-3 py-2 font-medium text-white transition-all duration-300 hover:scale-110"
										>Speichern</button
									>
								</div>
							</form>
                            <Popover.Root>
                                <Popover.Trigger class="mt-12 w-full rounded-xl bg-red-700 py-2 text-white transition-all duration-300 hover:scale-110">
                                    Projekt löschen
                                </Popover.Trigger>
                                <Popover.Content  class="z-30 w-full max-w-[500px] rounded-lg border border-gray-200 bg-white p-4 shadow-lg mt-12">
                                    <form action="?/deleteProject" method="POST">
                                        <p>Schreibe <span class="font-semibold">"{data?.project?.name}"</span>, um das Projekt zu löschen.</p>
                                        <input type="text" name="name"  class="w-full rounded-lg border-2 border-gray-200 p-2 mt-3" required aria-required="true"  />
                                        <button
                                            class="mt-3 w-full rounded-xl bg-red-700 px-3 py-2 font-medium text-white transition-all duration-300 hover:scale-110"
                                            >Löschen</button
                                        >
                                    </form>
                                    <Popover.Close />
                                    <Popover.Arrow />
                                </Popover.Content>
                            </Popover.Root>

						</section>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		</div>
	<hr class="my-6 w-full text-emerald-700" />

{#snippet homeIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
		<path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
		<path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
	</svg>  
{/snippet}

{#snippet settingsIcon()}
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

