import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase, user }, params }) => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .single();
    
    if (data?.user_id !== user?.id) {
        return {
            status: 403,
        };
    }
    
    if (error) {
        console.error(error);
        return {
            status: 400,
        };
    };

    return { project: data ?? [] };
};

export const actions: Actions = {
    upload: async ({ request, locals, params }) => {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        const { data, error } = await locals.supabase
            .storage
            .from('projects')
            .upload(`${params.id}/${file}`, file);

        if (error) {
            console.error(error);
            return {
                status: 400,
            };
        };

        const { data: updateData, error: updateError } = await locals.supabase.from('projects').update({
            file_added: true,
        })

        if (updateError) {
            console.error(updateError);
            return {
                status: 400,
            };
        };

        return { file: data, project: updateData };
    },

    updateProject: async ({ request, locals, params }) => {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;

        const { data, error } = await locals.supabase
            .from('projects')
            .update({
                name: name,
                description: description,
            })
            .eq('id', params?.id)
            .select('*')
            .single();

        if (error) {
            console.error(error);
            return {
                status: 400,
            };
        }

        return { project: data ?? [] };
    },
    deleteProject: async ({ request, locals, params }) => {
        const testName = (await request.formData()).get('name') as string;
        const { data: project } = await locals.supabase.from('projects').select('*').eq('id', params?.id).single();

        if (project?.name !== testName) {
            return {
                status: 400,
            };
        };

        const { data, error } = await locals.supabase
            .from('projects')
            .delete()
            .eq('id', params?.id)

        // if (error) {
        //     console.error(error);
        //     return {
        //         status: 400,
        //     };
        // }

        throw redirect(303, '/app');
    },
} satisfies Actions;