import type { Actions } from "./$types";
import { deleteProject, updateProject } from "$lib/db";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
    updateProject: async ({ request, locals, params }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const description = formData.get('description');

        if (!name || !description) {
            return {
                status: 400,
                body: { error: 'Invalid form data' }
            }
        }

        const { data, error } = await updateProject(params.id, {
            name: name as string,
            description: description as string
        }, locals.supabase);

        if (error) {
            return {
                status: 500,
                body: { error: error.message }
            }
        }

        console.log(data);
        return {
            status: 200,
            body: { success: true }
        }
    },
    deleteProject: async ({ request, locals, params }) => {
        const formData = await request.formData();
        const { error } = await deleteProject(params.id, locals.supabase);

        if (error) {
            return {
                status: 500,
                body: { error: error.message }
            }
        }

        throw redirect(302, '/app');
    }
}