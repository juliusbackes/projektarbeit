import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types'
export type Project = {
    id: string;
    name: string;
    description: string;
    user_id: string;
}



export const load: PageServerLoad = async ({ locals: { user, supabase } }) => {

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user?.id ?? "")

    if (error) {
        console.error(error);
        return {
            status: 400,
        };
    }

    
    return { projects: data ?? [] };
};

export const actions = {
    createProject: async ({ request, locals }) => {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;

        const { data, error } = await locals.supabase
            .from('projects')
            .insert({
                name: name,
                description: description,
                user_id: locals.user?.id,
            })
            .select()
            .single();

        if (error) {
            console.error(error);
            return {
                status: 400,
            };
        }

        console.log('Project created successfully');

        throw redirect(303, `/app/${data?.id}`)
    },
} satisfies Actions;
