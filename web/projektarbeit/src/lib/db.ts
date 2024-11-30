import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "$lib/types";

export const getProject = async (id: string, supabase: SupabaseClient) => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
    return { data, error };
};

export const getProjects = async (userId: string, supabase: SupabaseClient) => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId);
    return { data, error };
};

export const getProjectFields = async (id: string, fields: string[], supabase: SupabaseClient) => {
    const { data, error } = await supabase
        .from('projects')
        .select(fields.join(','))
        .eq('id', id)
        .single();
    return { data, error };
};

export const createProject = async (projectData: {
    name: string;
    description?: string;
    user_id: string;
}, supabase: SupabaseClient) => {
    const { data, error } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single();
    return { data, error };
};

export const updateProject = async (id: string, updates: Database['public']['Tables']['projects']['Update'], supabase: SupabaseClient) => {
    const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    return { data, error };
};

export const deleteProject = async (id: string, supabase: SupabaseClient) => {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
    return { error };
};

export const createExam = async (
    projectId: string,
    exam: { name: string, studentList: string[] },
    supabase: SupabaseClient
) => {
    const { data, error } = await supabase
        .from('exams')
        .insert({
            projectId,
            name: exam.name,
            studentList: exam.studentList,
        })
        .select()
        .single();
    return { data, error };
};

export const deleteAllExams = async (projectId: string, supabase: SupabaseClient) => {
    const { error } = await supabase
        .from('exams')
        .delete()
        .eq('projectId', projectId);
    return { error };
};


export const updateExam = async (id: string, updates: Database['public']['Tables']['exams']['Update'], supabase: SupabaseClient) => {
    const { data, error } = await supabase
        .from('exams')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    return { data, error };
};

export const getExams = async (projectId: string, supabase: SupabaseClient): Promise<{ data: Database['public']['Tables']['exams']['Row'][], error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from('exams')
        .select('*')
        .eq('projectId', projectId);
    return { data: data || [], error };
};