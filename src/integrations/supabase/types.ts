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
      blog_posts: {
        Row: {
          category: string
          content: Json
          created_at: string
          date: string
          excerpt: string
          id: string
          meta_description: string
          read_time: string
          related_products: Json
          seo_title: string
          slug: string
          title: string
        }
        Insert: {
          category?: string
          content?: Json
          created_at?: string
          date?: string
          excerpt: string
          id?: string
          meta_description: string
          read_time?: string
          related_products?: Json
          seo_title: string
          slug: string
          title: string
        }
        Update: {
          category?: string
          content?: Json
          created_at?: string
          date?: string
          excerpt?: string
          id?: string
          meta_description?: string
          read_time?: string
          related_products?: Json
          seo_title?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      preorder_requests: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          photo_url: string | null
          status: string
          watch_description: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          photo_url?: string | null
          status?: string
          watch_description: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          photo_url?: string | null
          status?: string
          watch_description?: string
        }
        Relationships: []
      }
      product_inventory: {
        Row: {
          id: number
          product_id: number
          sold_out: boolean
          updated_at: string
        }
        Insert: {
          id?: number
          product_id: number
          sold_out?: boolean
          updated_at?: string
        }
        Update: {
          id?: number
          product_id?: number
          sold_out?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      visitor_events: {
        Row: {
          created_at: string
          device_type: string | null
          event_type: string
          id: string
          metadata: Json | null
          page: string | null
          product_id: number | null
          referrer: string | null
          scroll_depth: number | null
          session_id: string
          time_on_page: number | null
        }
        Insert: {
          created_at?: string
          device_type?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          page?: string | null
          product_id?: number | null
          referrer?: string | null
          scroll_depth?: number | null
          session_id: string
          time_on_page?: number | null
        }
        Update: {
          created_at?: string
          device_type?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          page?: string | null
          product_id?: number | null
          referrer?: string | null
          scroll_depth?: number | null
          session_id?: string
          time_on_page?: number | null
        }
        Relationships: []
      }
      weekly_reports: {
        Row: {
          avg_scroll_depth: number | null
          avg_time_on_page: number | null
          checkout_starts: number | null
          conversion_funnel: Json | null
          created_at: string
          device_breakdown: Json | null
          high_intent_behaviors: Json | null
          id: string
          product_interest: Json | null
          product_views: number | null
          raw_summary: string | null
          recommendations: Json | null
          top_exit_reasons: Json | null
          total_visitors: number | null
          traffic_sources: Json | null
          unique_sessions: number | null
          week_end: string
          week_start: string
        }
        Insert: {
          avg_scroll_depth?: number | null
          avg_time_on_page?: number | null
          checkout_starts?: number | null
          conversion_funnel?: Json | null
          created_at?: string
          device_breakdown?: Json | null
          high_intent_behaviors?: Json | null
          id?: string
          product_interest?: Json | null
          product_views?: number | null
          raw_summary?: string | null
          recommendations?: Json | null
          top_exit_reasons?: Json | null
          total_visitors?: number | null
          traffic_sources?: Json | null
          unique_sessions?: number | null
          week_end: string
          week_start: string
        }
        Update: {
          avg_scroll_depth?: number | null
          avg_time_on_page?: number | null
          checkout_starts?: number | null
          conversion_funnel?: Json | null
          created_at?: string
          device_breakdown?: Json | null
          high_intent_behaviors?: Json | null
          id?: string
          product_interest?: Json | null
          product_views?: number | null
          raw_summary?: string | null
          recommendations?: Json | null
          top_exit_reasons?: Json | null
          total_visitors?: number | null
          traffic_sources?: Json | null
          unique_sessions?: number | null
          week_end?: string
          week_start?: string
        }
        Relationships: []
      }
      welcome_discounts: {
        Row: {
          code: string
          created_at: string
          discount_percent: number
          expires_at: string
          id: string
          used: boolean
          used_at: string | null
          visitor_id: string | null
        }
        Insert: {
          code: string
          created_at?: string
          discount_percent?: number
          expires_at: string
          id?: string
          used?: boolean
          used_at?: string | null
          visitor_id?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          discount_percent?: number
          expires_at?: string
          id?: string
          used?: boolean
          used_at?: string | null
          visitor_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
