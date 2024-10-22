import type { Provider } from '@supabase/supabase-js';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit'
import { dev } from '$app/environment';
import { BASE_URL } from '$lib/utils';

export const actions = {
    login: async ({ request, locals: { supabase }, url }) => {
        const provider = url.searchParams.get('provider') as Provider;


        if (provider) {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${dev ? 'http://localhost:5173' : BASE_URL}/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                }
            });
            
            if (error) {
                console.error(error)
                return {
                    status: 400,
                    message: 'Ungültiger Provider',
                };
            };

            throw redirect(303, data.url);
        };

        const formData = await request.formData()
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
    
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (error) {
            console.error(error)

            if (error.status === 400) {
                return {
                    status: 400,
                    message: 'Ungültige E-Mail oder Passwort',
                };
            };

            return {
                status: 500,
                message: 'Unbekannter Fehler',
            };
        } else {
          redirect(303, '/app')
        }
    },
} satisfies Actions;
