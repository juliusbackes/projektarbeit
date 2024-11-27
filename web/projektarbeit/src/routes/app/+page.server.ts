import type { PageServerLoad } from "./$types";
import { getProjects } from "$lib/db";

export const load: PageServerLoad = async ({ locals }) => {
    const { data, error } = await getProjects(`${locals.user?.id}`, locals.supabase);
    
    if (error) {
        console.error(error, "Keine Projekte gefunden");
        return { projects: [] };
    }

    return { projects: data };
}