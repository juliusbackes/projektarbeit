import type { Provider } from '@supabase/supabase-js';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit'
import { dev } from '$app/environment';
import { BASE_URL } from '$lib/utils';

export const actions = {
    signup: async ({ request, locals: { supabase }, url }) => {
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

        const formData = await request.formData();
        const first_name = formData.get('first_name') as string;
        const last_name = formData.get('last_name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const re_password = formData.get('re_password') as string;


        if (password !== re_password) return {
            status: 400,
            message: 'Passwörter stimmen nicht überein',
        };
    
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    display_name: first_name,
                }
            }
        });

        if (error?.status === 422) return {
            status: 422,
            message: 'Diese E-Mail-Adresse ist bereits registriert',    
        }

        if (data?.user?.confirmed_at) redirect(303, '/app');

        redirect(303, '/confirm/wait');
        
        if (error) {
            return error;
        } else {
          redirect(303, '/app')
        }
    },
} satisfies Actions;
