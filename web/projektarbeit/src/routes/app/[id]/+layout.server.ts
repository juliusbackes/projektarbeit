import type { LayoutServerLoad } from './$types';
import { Command } from 'lucide-svelte';

export const load: LayoutServerLoad = async ({ locals: { supabase, user }, params }) => {

    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user?.id ?? "");

    if (error) {
        console.error(error);
        return {
            status: 400,
        };
    }

    const { data: currentProject, error: currentProjectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", params.id)
        .eq("user_id", user?.id ?? "")
        .single();
    
    if (currentProjectError) {
        console.error(currentProjectError);
        return {
            status: 400,
        };
    }

    const sidebarData = {
        links: {
            general: [
                {
                    title: "Allgemein",
                }
            ],
        },
        projects,
        currentProject,
        routeId: params.id,
        navMain: [
            {
                title: "Dashboard",
                url: "/app",
                isActive: true,
                items: [
                    {
                        title: "Overview",
                        url: "/app/overview",
                    },
                    {
                        title: "Analytics",
                        url: "/app/analytics",
                    }
                ]
            }
        ],
    };
    return { sidebarData };
}; 