import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
    
    const { error } = await locals.supabase.auth.signOut();

    if (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }

    throw redirect(303, '/login');
};