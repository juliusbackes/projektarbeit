<script lang="ts">
    import type { ActionData } from './$types';

    let { form }: { form: ActionData } = $props();
</script>


<main class="h-screen w-screen flex items-center justify-center ">
   
    <div class="w-full mx-3 lg:w-1/3 bg-gray-200 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border-2 border-gray-200 shadow-lg">
        <div class="p-6 md:p-10 flex flex-col">
            <h1 class="font-bold text-4xl text-gray-500">Herzlich Willkommen!</h1>
            <form action="?/signup" method="POST"  class="">
                <input type="text" name="first_name" placeholder="Vorname" class="w-full p-2 mt-4 border-2 border-gray-200 rounded-lg" />
                <input type="text" name="last_name" placeholder="Nachname" class="w-full p-2 mt-4 border-2 border-gray-200 rounded-lg" />
                <input type="email" name="email" placeholder="Email" class="w-full p-2 mt-4 border-2 border-gray-200 rounded-lg" />
                <input type="password" name="password" placeholder="Passwort" class="w-full p-2 mt-4 border-2 border-gray-200 rounded-lg" />
                <input type="password" name="re_password" placeholder="Wied. Passwort" class="w-full p-2 mt-4 border-2 border-gray-200 rounded-lg" />
                <input type="submit" value="Registrieren"  class="w-full p-2 mt-4 border-2 border-gray-200 rounded-lg bg-emerald-700 text-white hover:bg-emerald-600 focus:bg-gray-600" />
            </form> 
            <div class="flex items-center my-6">
                <hr class="w-full  mx-3">
                <p class="text-gray-400">oder</p>
                <hr class="w-full  mx-3">
            </div>
            <div class="w-full h-full">
                <button type="button" class="text-white bg-black flex rounded-lg justify-center items-center hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium w-full py-2">
                    <svg class="mr-2 -ml-1 w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                    Mit Apple registrieren
                </button>
                <button type="button" class="mt-3 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 flex rounded-lg justify-center items-center  focus:ring-4 focus:ring-gray-300 font-medium w-full py-2">
                    <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                    Mit Google registrieren
                    </button>
            </div>
            <hr class="my-6 w-full">
            <div class="">
                <p>Bereits ein Konto? <a href="/login" class="text-blue-500 hover:underline">Anmelden</a></p>
            </div>
        </div>
    </div>
</main>

<div
  class="absolute -z-10 inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
></div>
