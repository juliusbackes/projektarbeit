import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit'

export const actions = {
    signup: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const first_name = formData.get('first_name') as string;
        const last_name = formData.get('last_name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const re_password = formData.get('re_password') as string;

        if (password !== re_password) {
            throw redirect(303, '/auth/error');
        };
    
        const { error } = await supabase.auth.signUp({
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
        
        if (error) {
          console.error(error)
          redirect(303, '/auth/error')
        } else {
          redirect(303, '/app')
        }
    },
} satisfies Actions;
