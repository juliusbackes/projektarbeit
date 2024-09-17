import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit'

export const actions = {
    login: async ({ request, locals: { supabase } }) => {
        
        const formData = await request.formData()
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
    
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (error) {
            console.error(error)

            if (error.status === 400) {
                return {
                    status: 400,
                    message: 'Ungültiger Benutzername oder Passwort',
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
