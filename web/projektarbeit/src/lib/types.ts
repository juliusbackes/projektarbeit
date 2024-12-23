import { Graph } from "./graph";

export type TODO = any;

export type Toast = {
  id: string;
  type: string;
  message: string;
};

/** HOLIDAY TYPES */

export type Holiday = {
  comment?: {
    language: string;
    text: string;
  }[];
  endDate: Date;
  id: string;
  name: {
    language: string;
    text: string;
  }[];
  nationwide: boolean;
  quality?: "Mandatory" | "Optional";
  startDate: Date;
  subdivisions?: {
    code: string;
    shortName: string;
  }[];
  type: "Public" | "Bank" | "National" | "Regional" | "Local" | "School" | "BackToSchool" | "EndOfLessons";
}

export type ExamDataItem = {
  name: string;
  is2xHJ: boolean;
  studentCount: number;
  adjancencyList: Set<string>;
  studentList?: string[];
  possibleExamDates: number[];
};

export type ExamData = ExamDataItem[];



/** SUPABASE TYPES */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      exams: {
        Row: {
          adjacencyList: string[] | null
          created_at: string
          grade: number | null
          id: number
          is2xHJ: boolean | null
          name: string | null
          possibleExamDates: number[] | null
          projectId: number | null
          studentCount: number | null
          studentList: string[] | null
        }
        Insert: {
          adjacencyList?: string[] | null
          created_at?: string
          grade?: number | null
          id?: number
          is2xHJ?: boolean | null
          name?: string | null
          possibleExamDates?: number[] | null
          projectId?: number | null
          studentCount?: number | null
          studentList?: string[] | null
        }
        Update: {
          adjacencyList?: string[] | null
          created_at?: string
          grade?: number | null
          id?: number
          is2xHJ?: boolean | null
          name?: string | null
          possibleExamDates?: number[] | null
          projectId?: number | null
          studentCount?: number | null
          studentList?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "exams_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          exam_end_date: string | null
          exam_start_date: string | null
          graph: Json | null
          has_created_plan: boolean | null
          has_defined_exam_period: boolean | null
          has_selected_course_days_and_lks: boolean | null
          has_uploaded_course_list: boolean | null
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          exam_end_date?: string | null
          exam_start_date?: string | null
          graph?: Json | null
          has_created_plan?: boolean | null
          has_defined_exam_period?: boolean | null
          has_selected_course_days_and_lks?: boolean | null
          has_uploaded_course_list?: boolean | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          exam_end_date?: string | null
          exam_start_date?: string | null
          graph?: Json | null
          has_created_plan?: boolean | null
          has_defined_exam_period?: boolean | null
          has_selected_course_days_and_lks?: boolean | null
          has_uploaded_course_list?: boolean | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
