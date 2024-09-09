<script lang="ts">
import type { PageData } from './$types';
import { fade } from 'svelte/transition';
import { AlertDialog } from 'bits-ui';

let { data }: { data: PageData } = $props();

</script>


<section class="p-8">

    {#if data.status === 403}
        <div class="w-full h-screen flex flex-col gap-3 items-center justify-center">
            <h1 class="text-2xl md:text-5xl text-emerald-700 font-semibold">Du bist nicht der Besitzer dieses Projekts</h1>
            <a href="/app" class="border-2 border-gray-200 rounded">Zurück zu meinen Projekten</a>
        </div>
    {:else}
        <div class="flex items-center justify-between px-3">
            <div class="flex items-center justify-center gap-3">
                <a href="/app" class="size-10 border-2 border-gray-200 rounded flex items-center justify-center text-emerald-700 hover:scale-110 transition-all duration-300">
                    {@render homeIcon()}
                </a>
                <h1 class="font-semibold text-2xl md:text-5xl text-emerald-700" >{data?.project?.name}</h1>
            </div>
            <p class="mx-auto text-gray-500 text-lg">{data?.project?.description}</p>
            <AlertDialog.Root>
                <AlertDialog.Trigger
                  class="text-sm font-medium hover:scale-110 text-emerald-700 border-2 border-gray-200 rounded-xl py-1 px-3 flex items-center gap-1 hover:border-emerald-700 transition-all duration-700"
                >
                {@render settingsIcon()}
                Einstellungen
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
        <hr class="my-6 w-full bg-emerald-700">
    {/if}


</section>


{#snippet homeIcon()}
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>  
{/snippet}

{#snippet settingsIcon()}
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>  
{/snippet}