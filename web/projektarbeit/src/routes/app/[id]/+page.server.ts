import type { PageServerLoad } from './$types'

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
    }

    console.log(data)

    return { project: data ?? [] };
};