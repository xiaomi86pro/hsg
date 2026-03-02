export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      exam_passages: {
        Row: {
          audio_url_snapshot: string | null
          content_snapshot: string
          created_at: string | null
          exam_id: number
          id: number
          original_passage_id: number | null
          passage_order: number
          passage_type_snapshot: string
          title_snapshot: string | null
        }
        Insert: {
          audio_url_snapshot?: string | null
          content_snapshot: string
          created_at?: string | null
          exam_id: number
          id?: number
          original_passage_id?: number | null
          passage_order: number
          passage_type_snapshot: string
          title_snapshot?: string | null
        }
        Update: {
          audio_url_snapshot?: string | null
          content_snapshot?: string
          created_at?: string | null
          exam_id?: number
          id?: number
          original_passage_id?: number | null
          passage_order?: number
          passage_type_snapshot?: string
          title_snapshot?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exam_passages_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: true
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_question_options: {
        Row: {
          exam_question_id: number
          id: number
          is_correct_snapshot: boolean
          option_label_snapshot: string
          option_order: number
          option_text_snapshot: string
        }
        Insert: {
          exam_question_id: number
          id?: number
          is_correct_snapshot: boolean
          option_label_snapshot: string
          option_order: number
          option_text_snapshot: string
        }
        Update: {
          exam_question_id?: number
          id?: number
          is_correct_snapshot?: boolean
          option_label_snapshot?: string
          option_order?: number
          option_text_snapshot?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_question_options_exam_question_id_fkey"
            columns: ["exam_question_id"]
            isOneToOne: false
            referencedRelation: "exam_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_questions: {
        Row: {
          answer_key_snapshot: string | null
          created_at: string | null
          difficulty_snapshot: number | null
          exam_id: number
          exam_passage_id: number | null
          explanation_snapshot: string | null
          id: number
          original_question_id: number | null
          question_id: number
          question_order: number
          question_text_snapshot: string | null
          question_type_snapshot: number | null
        }
        Insert: {
          answer_key_snapshot?: string | null
          created_at?: string | null
          difficulty_snapshot?: number | null
          exam_id: number
          exam_passage_id?: number | null
          explanation_snapshot?: string | null
          id?: never
          original_question_id?: number | null
          question_id: number
          question_order: number
          question_text_snapshot?: string | null
          question_type_snapshot?: number | null
        }
        Update: {
          answer_key_snapshot?: string | null
          created_at?: string | null
          difficulty_snapshot?: number | null
          exam_id?: number
          exam_passage_id?: number | null
          explanation_snapshot?: string | null
          id?: never
          original_question_id?: number | null
          question_id?: number
          question_order?: number
          question_text_snapshot?: string | null
          question_type_snapshot?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "exam_questions_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_questions_exam_passage_id_fkey"
            columns: ["exam_passage_id"]
            isOneToOne: false
            referencedRelation: "exam_passages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_questions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_template_items: {
        Row: {
          avoid_recent_exams: number | null
          category_id: number
          difficulty_max: number | null
          difficulty_min: number | null
          id: number
          passage_count: number | null
          passage_group_id: number | null
          passage_type: string | null
          question_count: number
          question_type_id: number
          template_section_id: number
        }
        Insert: {
          avoid_recent_exams?: number | null
          category_id: number
          difficulty_max?: number | null
          difficulty_min?: number | null
          id?: never
          passage_count?: number | null
          passage_group_id?: number | null
          passage_type?: string | null
          question_count: number
          question_type_id: number
          template_section_id: number
        }
        Update: {
          avoid_recent_exams?: number | null
          category_id?: number
          difficulty_max?: number | null
          difficulty_min?: number | null
          id?: never
          passage_count?: number | null
          passage_group_id?: number | null
          passage_type?: string | null
          question_count?: number
          question_type_id?: number
          template_section_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "exam_template_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "question_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_template_items_question_type_id_fkey"
            columns: ["question_type_id"]
            isOneToOne: false
            referencedRelation: "question_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_template_items_template_section_id_fkey"
            columns: ["template_section_id"]
            isOneToOne: false
            referencedRelation: "exam_template_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_template_sections: {
        Row: {
          exam_template_id: number
          id: number
          section_id: number
          section_order: number
        }
        Insert: {
          exam_template_id: number
          id?: never
          section_id: number
          section_order: number
        }
        Update: {
          exam_template_id?: number
          id?: never
          section_id?: number
          section_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "exam_template_sections_exam_template_id_fkey"
            columns: ["exam_template_id"]
            isOneToOne: false
            referencedRelation: "exam_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_template_sections_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_templates: {
        Row: {
          created_at: string | null
          grade_level: number
          id: number
          is_active: boolean
          name: string
        }
        Insert: {
          created_at?: string | null
          grade_level: number
          id?: never
          is_active?: boolean
          name: string
        }
        Update: {
          created_at?: string | null
          grade_level?: number
          id?: never
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      exams: {
        Row: {
          created_at: string | null
          exam_template_id: number
          exp_earned: number | null
          grade_level: number
          id: number
          score: number | null
          submitted_at: string | null
          total_questions: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          exam_template_id: number
          exp_earned?: number | null
          grade_level: number
          id?: never
          score?: number | null
          submitted_at?: string | null
          total_questions: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          exam_template_id?: number
          exp_earned?: number | null
          grade_level?: number
          id?: never
          score?: number | null
          submitted_at?: string | null
          total_questions?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exams_exam_template_id_fkey"
            columns: ["exam_template_id"]
            isOneToOne: false
            referencedRelation: "exam_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      options: {
        Row: {
          id: number
          is_correct: boolean
          option_label: string
          option_text: string
          question_id: number
        }
        Insert: {
          id?: number
          is_correct?: boolean
          option_label: string
          option_text: string
          question_id: number
        }
        Update: {
          id?: number
          is_correct?: boolean
          option_label?: string
          option_text?: string
          question_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      passage_types: {
        Row: {
          code: string | null
          id: number
          name: string | null
        }
        Insert: {
          code?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          code?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      passages: {
        Row: {
          audio_url: string | null
          content: string
          created_at: string | null
          grade_level: number
          id: number
          passage_type: string
          title: string | null
        }
        Insert: {
          audio_url?: string | null
          content: string
          created_at?: string | null
          grade_level: number
          id?: number
          passage_type: string
          title?: string | null
        }
        Update: {
          audio_url?: string | null
          content?: string
          created_at?: string | null
          grade_level?: number
          id?: number
          passage_type?: string
          title?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          exp: number
          id: string
          level: number
          name: string
          role: string
          total_score: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          exp?: number
          id: string
          level?: number
          name: string
          role?: string
          total_score?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          exp?: number
          id?: string
          level?: number
          name?: string
          role?: string
          total_score?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      question_categories: {
        Row: {
          code: string
          default_question_type_code: string | null
          display_order: number | null
          id: number
          name: string
          section_id: number
        }
        Insert: {
          code: string
          default_question_type_code?: string | null
          display_order?: number | null
          id?: never
          name: string
          section_id: number
        }
        Update: {
          code?: string
          default_question_type_code?: string | null
          display_order?: number | null
          id?: never
          name?: string
          section_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "question_categories_default_type_fkey"
            columns: ["default_question_type_code"]
            isOneToOne: false
            referencedRelation: "question_types"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "question_categories_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      question_tags: {
        Row: {
          question_id: number
          tag_id: number
        }
        Insert: {
          question_id: number
          tag_id: number
        }
        Update: {
          question_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "question_tags_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      question_text_answers: {
        Row: {
          accepted_answer: string
          id: number
          question_id: number
        }
        Insert: {
          accepted_answer: string
          id?: number
          question_id: number
        }
        Update: {
          accepted_answer?: string
          id?: number
          question_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "question_text_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      question_types: {
        Row: {
          code: string
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          answer_key: string | null
          blank_index: number | null
          category_id: number
          created_at: string | null
          difficulty: number
          explanation: string | null
          grade_level: number
          id: number
          is_active: boolean
          order_in_category: number | null
          passage_id: number | null
          question_text: string
          question_type_id: number
          updated_at: string | null
        }
        Insert: {
          answer_key?: string | null
          blank_index?: number | null
          category_id: number
          created_at?: string | null
          difficulty: number
          explanation?: string | null
          grade_level: number
          id?: number
          is_active?: boolean
          order_in_category?: number | null
          passage_id?: number | null
          question_text: string
          question_type_id: number
          updated_at?: string | null
        }
        Update: {
          answer_key?: string | null
          blank_index?: number | null
          category_id?: number
          created_at?: string | null
          difficulty?: number
          explanation?: string | null
          grade_level?: number
          id?: number
          is_active?: boolean
          order_in_category?: number | null
          passage_id?: number | null
          question_text?: string
          question_type_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "question_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_passage_id_fkey"
            columns: ["passage_id"]
            isOneToOne: false
            referencedRelation: "passages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_question_type_id_fkey"
            columns: ["question_type_id"]
            isOneToOne: false
            referencedRelation: "question_types"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          code: string
          id: number
          name: string
        }
        Insert: {
          code: string
          id?: never
          name: string
        }
        Update: {
          code?: string
          id?: never
          name?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      user_answers: {
        Row: {
          answer_text: string | null
          answered_at: string
          exam_id: number
          exam_question_id: number
          id: number
          is_correct: boolean | null
          selected_option_label: string | null
        }
        Insert: {
          answer_text?: string | null
          answered_at?: string
          exam_id: number
          exam_question_id: number
          id?: number
          is_correct?: boolean | null
          selected_option_label?: string | null
        }
        Update: {
          answer_text?: string | null
          answered_at?: string
          exam_id?: number
          exam_question_id?: number
          id?: number
          is_correct?: boolean | null
          selected_option_label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_answers_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_exam_question_id_fkey"
            columns: ["exam_question_id"]
            isOneToOne: false
            referencedRelation: "exam_questions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_essay_question: {
        Args: {
          p_answer_key: string
          p_blank_index?: number
          p_category_id: number
          p_difficulty: number
          p_explanation?: string
          p_grade_level: number
          p_passage_id?: number
          p_question_text: string
        }
        Returns: Json
      }
      create_mcq_question:
        | {
            Args: {
              p_category_id: number
              p_content: string
              p_difficulty: number
              p_explanation: string
              p_grade_level: number
              p_options: Json
              p_question_type_id: number
            }
            Returns: number
          }
        | {
            Args: {
              p_difficulty: number
              p_explanation: string
              p_grade_level: number
              p_options: Json
              p_question_text: string
              p_question_type_id: number
            }
            Returns: Json
          }
      create_multiple_choice_question: {
        Args: {
          p_blank_index?: number
          p_category_id: number
          p_difficulty: number
          p_explanation?: string
          p_grade_level: number
          p_options: Json
          p_passage_id?: number
          p_question_text: string
        }
        Returns: Json
      }
      create_passage: {
        Args: {
          p_audio_url?: string
          p_content: string
          p_grade_level: number
          p_passage_type: string
          p_title: string
        }
        Returns: Json
      }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      generate_exam: {
        Args: {
          p_exam_template_id: number
          p_grade_level: number
          p_structure: Json
        }
        Returns: Json
      }
      get_exam_detail: { Args: { p_exam_id: number }; Returns: Json }
      get_my_active_exam: { Args: never; Returns: Json }
      get_my_role: { Args: never; Returns: string }
      import_passage_with_questions_bulk: {
        Args: { p_passage: Json; p_questions: Json }
        Returns: Json
      }
      import_questions_bulk: {
        Args: { p_grade_level: number; p_questions: Json }
        Returns: Json
      }
      is_admin: { Args: never; Returns: boolean }
      list_user_exams: {
        Args: never
        Returns: {
          created_at: string
          exam_id: number
          exam_template_id: number
          score: number
          submitted_at: string
          user_id: string
        }[]
      }
      review_exam_by_id: {
        Args: { p_exam_id: number }
        Returns: {
          correct_answer: string
          is_correct: boolean
          question_content: string
          question_id: number
          user_answer: string
        }[]
      }
      review_my_exam: { Args: { p_exam_id: number }; Returns: Json }
      save_answer: {
        Args: {
          p_answer_text?: string
          p_exam_id: number
          p_exam_question_id: number
          p_selected_option_label?: string
        }
        Returns: Json
      }
      submit_exam:
        | { Args: { p_exam_id: number }; Returns: Json }
        | { Args: { p_answers: Json; p_exam_id: number }; Returns: Json }
      update_mcq_question:
        | {
            Args: {
              p_category_id: number
              p_content: string
              p_difficulty: number
              p_explanation: string
              p_grade_level: number
              p_question_id: number
              p_question_type_id: number
            }
            Returns: undefined
          }
        | {
            Args: {
              p_difficulty: number
              p_explanation: string
              p_grade_level: number
              p_options: Json
              p_question_id: number
              p_question_text: string
              p_question_type_id: number
            }
            Returns: Json
          }
      validate_import_passage_with_questions: {
        Args: { p_passage: Json; p_questions: Json }
        Returns: Json
      }
      validate_import_questions: {
        Args: { p_grade_level: number; p_questions: Json }
        Returns: Json
      }
    }
    Enums: {
      user_role: "admin" | "teacher" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "teacher", "student"],
    },
  },
} as const
