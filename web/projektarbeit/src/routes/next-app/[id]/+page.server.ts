import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {

    const { data, error } = await locals.supabase
        .from("projects")
        .select("*")
        .eq("id", params.id)
        .eq("user_id", locals?.user?.id ?? "")
        .single();
    
    if (error) {
        throw error;
    }

    return {
        project: data
    }
}