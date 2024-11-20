import { redirect } from "@sveltejs/kit";

export function GET({ params }) {
    throw redirect(302, `/next-app/${params.id}/settings/general`);
};