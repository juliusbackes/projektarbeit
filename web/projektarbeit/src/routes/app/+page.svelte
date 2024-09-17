<script lang="ts">
    import { fade } from 'svelte/transition';
    import { AlertDialog } from 'bits-ui';
    import type { PageData } from './$types';

    type ProjectItem = any;
 
    let { data }: { data: PageData } = $props();

    let createProjectDialog = $state();
</script>



    {#if data?.projects?.length === 0}
        <div class="w-full h-screen flex flex-col gap-3 items-center justify-center">
            <h1 class="text-2xl md:text-5xl text-emerald-700 font-semibold">Du hast noch keine Projekte erstellt</h1>
            <AlertDialog.Root bind:this={createProjectDialog}>
              <AlertDialog.Trigger
                class="text-sm font-medium hover:scale-110 text-emerald-700 border-2 border-gray-200 rounded-xl py-1 px-3 flex items-center gap-1 hover:border-emerald-700 transition-all duration-700"
              >
              {@render plusIcon()}
              Projekt erstellen
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay
                  transition={fade}
                  transitionConfig={{ duration: 150 }}
                  class="fixed inset-0 z-50 backdrop-blur transition-all duration-900 bg-black/50"
                />
                <AlertDialog.Content
                  class="border-2 border-gray-200 fixed left-[50%] top-[50%] z-50 grid w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl bg-white p-7 outline-none sm:max-w-lg md:w-full"
                >
              <section class="p-3">
                  <h1 class="text-2xl font-semibold tracking-tight text-emerald-700">Projekt erstellen</h1>
                  <form action="?/createProject" method="POST">
                      <input type="text" name="name" placeholder="Projektname" class="w-full p-2 mt-4 border-2 border-gray-200 rounded-lg " required aria-required="true"/>
                      <input type="text" name="description" placeholder="Projektbeschreibung (Optional)" class="w-full p-2 mt-4 border-2 border-gray-200 rounded-lg ring-0" />
                      <div class="mt-3 flex w-full items-center justify-between gap-3">
                          <AlertDialog.Cancel class="border-2 py-[7px] font-medium scale-95 px-[11px] rounded-xl border-emerald-700 text-emerald-700 w-full hover:scale-105 transition-all duration-300">
                              Abbrechen
                          </AlertDialog.Cancel>
                          <button type="submit" class="py-2 font-medium px-3 rounded-xl text-white w-full bg-emerald-700 hover:scale-110 transition-all duration-300">Weiter</button>
                      </div>
                  </form>
              </section>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
        </div>
    {:else}

    <div class="flex items-center justify-between px-3">
        <h1 class="font-semibold text-2xl md:text-5xl" >Meine Projekte</h1>
        <AlertDialog.Root bind:this={createProjectDialog}>
            <AlertDialog.Trigger
              class="font-medium text-emerald-700 border-2 border-gray-200 rounded-xl py-1 px-3 flex items-center gap-1 hover:border-emerald-700 transition-all duration-700 bg-white"
            >
            {@render plusIcon()}
            Projekt erstellen
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay
                transition={fade}
                transitionConfig={{ duration: 150 }}
                class="fixed inset-0 z-50 backdrop-blur transition-all duration-900 bg-black/50"
              />
              <AlertDialog.Content
                class="border-2 border-gray-200 fixed left-[50%] top-[50%] z-50 grid w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl bg-white p-7 outline-none sm:max-w-lg md:w-full"
              >
            <section class="p-3">
                <h1 class="text-2xl font-semibold tracking-tight text-emerald-700">Projekt erstellen</h1>
                <form action="?/createProject" method="POST">
                    <input type="text" name="name" placeholder="Projektname" class="w-full p-2 mt-4 border-2 border-gray-200 rounded-lg " required aria-required="true"/>
                    <input type="text" name="description" placeholder="Projektbeschreibung (Optional)" class="w-full p-2 mt-4 border-2 border-gray-200 rounded-lg ring-0" />
                    <div class="mt-3 flex w-full items-center justify-between gap-3">
                        <AlertDialog.Cancel class="border-2 py-[7px] font-medium scale-95 px-[11px] rounded-xl border-emerald-700 text-emerald-700 w-full hover:scale-105 transition-all duration-300">
                            Abbrechen
                        </AlertDialog.Cancel>
                        <button type="submit" class="py-2 font-medium px-3 rounded-xl text-white w-full bg-emerald-700 hover:scale-110 transition-all duration-300">Weiter</button>
                    </div>
                </form>
            </section>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
    </div>
  
    <div class="flex justify-center mt-6">
      <div class="flex flex-wrap gap-6">
          {#each data.projects ?? [] as item}
              {@render projectItem(item)}
          {/each}
      </div>
    </div>
    {/if} 

{#snippet projectItem(item: ProjectItem)}
    <a class="p-4 bg-white rounded-xl md:h-40 w-full md:w-96 border-2 border-emerald-700/50 flex flex-col justify-between gap-2 shadow-xl hover:bg-emerald-700/10 transition-all duration-300 cursor-pointer hover:scale-110"  href={`/app/${item.id}`}>
        <div>
            <h2 class="font-semibold text-xl md:text-2xl">{item.name}</h2>
            <p class="text-gray-500">{item.description}</p>
        </div>
    </a>
{/snippet}

{#snippet plusIcon()}
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>  
{/snippet}