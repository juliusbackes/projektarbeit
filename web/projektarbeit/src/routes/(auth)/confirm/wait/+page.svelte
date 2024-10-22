<script lang="ts">
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
</script>

<div class="min-h-screen flex items-center justify-center">
	<Card class="w-[350px]">
		<CardHeader>
			<CardTitle class="text-2xl">Bitte bestätige deine E-Mail</CardTitle>
			<CardDescription>Bitte überprüfe dein E-Mail-Postfach um die Registrierung abzuschließen</CardDescription>
		</CardHeader>
		<CardContent>
			<p class="text-sm text-gray-600">Wir haben eine Bestätigungs-E-Mail an deine registrierte E-Mail-Adresse gesendet. Klicke den Link in der E-Mail um dein Konto zu aktivieren.</p>
		</CardContent>
		<CardFooter class="flex justify-center">
			<Button class="bg-emerald-700 hover:bg-emerald-600 focus:bg-gray-600 text-white">E-Mail erneut senden</Button>
		</CardFooter>
	</Card>
    <div
    class="absolute -z-10 inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
></div>
</div>