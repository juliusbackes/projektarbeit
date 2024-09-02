import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit'

export const actions = {
    login: async ({ request, locals: { supabase } }) => {
        
        const formData = await request.formData()
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        console.log(email, password)
    
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (error) {
            console.error(error)
            return {
                status: 400,
            }
        } else {
          redirect(303, '/private')
        }
    },
} satisfies Actions;
