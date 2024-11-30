import { redirect, type Actions } from '@sveltejs/kit';
import { createProject } from '$lib/db';

export const actions: Actions = {
	async createProject(event) {
		const data = await event.request.formData();
        const name = data.get('name') as string;
        const description = data.get('description') as string;
        const user_id = event.locals.user?.id as string;
        const supabase = event.locals.supabase;

        const { data: projectData, error: projectError } = await createProject({ name, description, user_id }, supabase);

        console.log(projectData, name, description, user_id);

		if (projectError) {
			return {
				status: 500,
				body: { error: projectError.message }
			}
		}

        throw redirect(302, `/app/${projectData?.id}`);
	}
};