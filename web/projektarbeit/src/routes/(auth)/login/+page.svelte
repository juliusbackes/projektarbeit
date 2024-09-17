<script lang="ts">
    import type { ActionData } from './$types';

    let { form }: { form: ActionData } = $props();

</script>

<main class="h-screen w-screen flex items-center justify-center ">
   
    <div class="w-full mx-3 lg:w-1/3 bg-gray-200 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border-2 border-gray-200 shadow-lg">
        <div class="p-6 md:p-10 flex flex-col">
            <div class="">
                <h1 class="font-bold text-4xl text-gray-500">Willkommen zurück!</h1>
                {#if form}
                    <p class="text-red-500 bg-red-200 p-2 rounded-lg mt-3 flex justify-center border-2 border-red-700">{form.message}</p>
                {/if}
                <form action="?/login" method="POST"  class="">
                    <input type="email" name="email" placeholder="Email" class="w-full p-2 mt-4 border-2 border-gray-200 rounded-lg" required aria-required="true" />
                    <input type="password" name="password" placeholder="Passwort" class="w-full p-2 mt-4 border-2 border-gray-200 rounded-lg" required aria-required="true" />
                    <input type="submit" value="Anmelden"  class="w-full p-2 mt-4 border-2 border-gray-200 rounded-lg bg-emerald-700 text-white hover:bg-emerald-600 focus:bg-gray-600" />
                </form>
                <div class="flex items-center my-6">
                    <hr class="w-full  mx-3">
                    <p class="text-gray-400">oder</p>
                    <hr class="w-full  mx-3">
                </div>
                <div class="w-full h-full">
                    <form method="POST">
                        <button formaction="?/login&provider=google" type="submit" class="mt-3 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 flex rounded-lg justify-center items-center  focus:ring-4 focus:ring-gray-300 font-medium w-full py-2">
                            <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                            Mit Google anmelden
                        </button>
                    </form>
                </div>
                <hr class="my-6 w-full">
                <div class="">
                    <p>Noch kein Konto? <a href="/register" class="text-blue-500 hover:underline">Registrieren</a></p>
                    <p>Passwort vergessen? <a href="/reset" class="text-blue-500 hover:underline">Passwort zurücksetzen</a></p>
                </div>
            </div>
        </div>
    </div>
</main>

<div
  class="absolute -z-10 inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
></div>
