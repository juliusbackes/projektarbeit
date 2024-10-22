<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Alert, AlertDescription, AlertTitle } from "$lib/components/ui/alert";
    import * as Card from "$lib/components/ui/card";
	import { CircleAlert, ArrowLeft } from "lucide-svelte";
    import { BASE_URL } from "$lib/utils";
    import { dev } from "$app/environment";
    import { spBrowserClient } from "$lib";

	let email = $state("");
	let isSubmitting = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		isSubmitting = true;
        console.log(email)

        const { error } = await spBrowserClient.auth.resetPasswordForEmail(email, {
            redirectTo: `${dev ? 'http://localhost:5173' : BASE_URL}/callback`
        });

        console.log(error)
	}
</script>
<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <Card.Root class="w-full max-w-sm">
        <Card.Content>
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold">Passwort zurücksetzen</h2>
                <p class="mt-2 text-center text-sm text-gray-600">Gebe deine E-Mail Adresse ein und wir senden dir einen Link um dein Passwort zurückzusetzen.</p>
            </div>
            <form class="mt-8 space-y-6" onsubmit={e => handleSubmit(e)}>
                <div>
                    <Label for="email" class="sr-only">Email-Adresse</Label>
                    <Input id="email" type="email" placeholder="max.mustermann@beispiel.com" required bind:value={email}/>
                </div>
                <div>
                    <Button type="submit" class="w-full bg-emerald-700 hover:bg-emerald-600 focus:bg-gray-600 text-white" disabled={isSubmitting}>
                        {isSubmitting ? "Gesendet..." : "Link senden"}
                    </Button>
                </div>
            </form>
            <div class="text-sm text-center mt-4">
                <a href="/login" class="text-blue-500 hover:underline inline-flex items-center">
                    <ArrowLeft class="h-4 w-4 mr-2" /> Zurück zur Anmeldung
                </a>
            </div>
        </Card.Content>
    </Card.Root>
</div>



<div
  class="absolute -z-10 inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
></div>