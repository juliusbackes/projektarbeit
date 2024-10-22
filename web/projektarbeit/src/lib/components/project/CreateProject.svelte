<script lang="ts">
    import { AlertDialog } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import { fade } from 'svelte/transition';
    import { Label } from '$lib/components/ui/label';
    import { Input } from '$lib/components/ui/input';
    import { Button } from '$lib/components/ui/button';

    let { children }: { children: Snippet } = $props();

</script>

<AlertDialog.Root>
    <AlertDialog.Trigger>
        {@render children()}
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
        <AlertDialog.Overlay
        transition={fade}
        transitionConfig={{ duration: 150 }}
        class="fixed inset-0 z-50 backdrop-blur transition-all duration-900 bg-black/50"
        />
        <AlertDialog.Content
        class="fixed left-[50%] top-[50%] z-50 grid md:w-full translate-x-[-50%] w-[90%] translate-y-[-50%] gap-4 rounded-xl border-2 border-gray-200 bg-white p-7 outline-none sm:max-w-lg max-w-none"
        >
            <section class="p-3">
                <div class="flex justify-between items-center">
                    <h1 class="text-2xl font-semibold text-emerald-700">Projekt erstellen</h1>
                    <AlertDialog.Cancel>
                        {@render CloseIcon()}
                    </AlertDialog.Cancel>
                </div>
                <hr class="my-6 w-full" />
                <form action="?/createProject" method="POST" class="flex flex-col gap-3">
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="name" class="text-right">Name</Label>
                        <Input 
                        id="name" 
                        name="name"
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
                        placeholder="Projektbeschreibung (Optional)"
                        class="col-span-3 focus-visible:ring-emerald-700" 
                        />
                    </div>
                    <Button type="submit" class="w-full mt-3 bg-emerald-700 hover:bg-emerald-900 transition-all duration-300 text-white">Weiter</Button>
                </form>
            </section>
        </AlertDialog.Content>
    </AlertDialog.Portal>
</AlertDialog.Root>


{#snippet CloseIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
		<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
	</svg>  
{/snippet}