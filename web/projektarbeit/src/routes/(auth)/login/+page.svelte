<script lang="ts">
    import type { ActionData } from './$types';
    import * as Card from '$lib/components/ui/card';
    import { Label } from '$lib/components/ui/label';
    import { Input } from '$lib/components/ui/input';
    import { Button } from '$lib/components/ui/button';
    import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';

    let { form }: { form: ActionData } = $props();

</script>

<main class="h-screen w-screen flex items-center justify-center ">
    
    <Card.Root class="w-full max-w-sm">
        <Card.Header>
          <Card.Title class="text-2xl">Anmeldung</Card.Title>
          <Card.Description>Willkommen zurück!</Card.Description>
        </Card.Header>
        <Card.Content class="grid gap-4">
            {#if form}
                <Alert variant="destructive" class="w-full flex flex-col justify-center items-center">
                    <AlertTitle>Fehler</AlertTitle>
                    <AlertDescription>{form?.message}</AlertDescription>
                </Alert>
            {/if}
            <form action="?/login" method="POST" class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input name="email" type="email" placeholder="max.mustermann@beispiel.com" required />
                </div>
                <div class="grid gap-2">
                    <div class="flex justify-between items-center text-sm">
                        <Label for="password">Passwort</Label>
                        <a href="/reset" class="text-blue-500 hover:underline">Passwort vergessen?</a>
                    </div>
                    <Input name="password" type="password" placeholder="••••••••" required />
                </div>
                <Button class="w-full bg-emerald-700 hover:bg-emerald-600 focus:bg-gray-600 text-white  " type="submit">Anmelden</Button>
            </form>
            <div class="flex items-center my-3">
                <hr class="w-full  mx-3">
                <p class="text-gray-400">oder</p>
                <hr class="w-full  mx-3">
            </div>
            <form action="?/login&provider=google" method="POST">
                <Button  class="w-full bg-[#4285F4] hover:bg-[#4285F4]/90 text-white" type="submit">
                    {@render GoogleIcon()}
                    Mit Google anmelden
                </Button>
            </form>
        </Card.Content>
        <Card.Footer class="flex justify-center">
            <p class="text-sm text-muted-foreground">Noch kein Konto? <a href="/register" class="text-blue-500 hover:underline">Registrieren</a></p>
        </Card.Footer>
    </Card.Root>


</main>

<div
  class="absolute -z-10 inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
></div>

{#snippet GoogleIcon()}
    <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
{/snippet}