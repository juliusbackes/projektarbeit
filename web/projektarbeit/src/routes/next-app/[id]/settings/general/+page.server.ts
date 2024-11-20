import type { Actions } from "./$types";
import { updateProject } from "$lib/db";

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
    }
}