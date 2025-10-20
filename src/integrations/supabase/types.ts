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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alert_responses: {
        Row: {
          alert_id: string
          completed_at: string | null
          created_at: string | null
          distance_km: number | null
          gps_verified: boolean | null
          id: string
          responder_id: string
          response_time_seconds: number | null
          reward_earned: number | null
          suspicious_activity: boolean | null
          user_rating: number | null
        }
        Insert: {
          alert_id: string
          completed_at?: string | null
          created_at?: string | null
          distance_km?: number | null
          gps_verified?: boolean | null
          id?: string
          responder_id: string
          response_time_seconds?: number | null
          reward_earned?: number | null
          suspicious_activity?: boolean | null
          user_rating?: number | null
        }
        Update: {
          alert_id?: string
          completed_at?: string | null
          created_at?: string | null
          distance_km?: number | null
          gps_verified?: boolean | null
          id?: string
          responder_id?: string
          response_time_seconds?: number | null
          reward_earned?: number | null
          suspicious_activity?: boolean | null
          user_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "alert_responses_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "sos_alerts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alert_responses_responder_id_fkey"
            columns: ["responder_id"]
            isOneToOne: false
            referencedRelation: "responders"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence: {
        Row: {
          alert_id: string
          created_at: string | null
          duration_seconds: number | null
          file_size_bytes: number | null
          file_type: string
          id: string
          is_encrypted: boolean | null
          shared_with_police: boolean | null
          storage_path: string
          user_id: string
        }
        Insert: {
          alert_id: string
          created_at?: string | null
          duration_seconds?: number | null
          file_size_bytes?: number | null
          file_type: string
          id?: string
          is_encrypted?: boolean | null
          shared_with_police?: boolean | null
          storage_path: string
          user_id: string
        }
        Update: {
          alert_id?: string
          created_at?: string | null
          duration_seconds?: number | null
          file_size_bytes?: number | null
          file_type?: string
          id?: string
          is_encrypted?: boolean | null
          shared_with_police?: boolean | null
          storage_path?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "sos_alerts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
          voice_keyword: string | null
        }
        Insert: {
          created_at?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
          voice_keyword?: string | null
        }
        Update: {
          created_at?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
          voice_keyword?: string | null
        }
        Relationships: []
      }
      responders: {
        Row: {
          aadhaar_number: string | null
          account_status: string | null
          created_at: string | null
          full_name: string
          id: string
          is_available: boolean | null
          kyc_verified: boolean | null
          latitude: number | null
          longitude: number | null
          phone: string
          police_verified: boolean | null
          rating: number | null
          responder_type: string
          reward_points: number | null
          total_responses: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          aadhaar_number?: string | null
          account_status?: string | null
          created_at?: string | null
          full_name: string
          id?: string
          is_available?: boolean | null
          kyc_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          phone: string
          police_verified?: boolean | null
          rating?: number | null
          responder_type: string
          reward_points?: number | null
          total_responses?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          aadhaar_number?: string | null
          account_status?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          is_available?: boolean | null
          kyc_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          phone?: string
          police_verified?: boolean | null
          rating?: number | null
          responder_type?: string
          reward_points?: number | null
          total_responses?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      safe_places: {
        Row: {
          address: string
          created_at: string | null
          emergency_contact: string | null
          has_cctv: boolean | null
          has_security: boolean | null
          id: string
          is_open_24_7: boolean | null
          is_verified: boolean | null
          latitude: number
          longitude: number
          name: string
          operating_hours: string | null
          place_type: string
          safety_rating: string
          updated_at: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          emergency_contact?: string | null
          has_cctv?: boolean | null
          has_security?: boolean | null
          id?: string
          is_open_24_7?: boolean | null
          is_verified?: boolean | null
          latitude: number
          longitude: number
          name: string
          operating_hours?: string | null
          place_type: string
          safety_rating?: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          emergency_contact?: string | null
          has_cctv?: boolean | null
          has_security?: boolean | null
          id?: string
          is_open_24_7?: boolean | null
          is_verified?: boolean | null
          latitude?: number
          longitude?: number
          name?: string
          operating_hours?: string | null
          place_type?: string
          safety_rating?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sos_alerts: {
        Row: {
          cancelled_at: string | null
          created_at: string | null
          id: string
          is_recording: boolean | null
          latitude: number | null
          location_accuracy: number | null
          longitude: number | null
          police_notified: boolean | null
          recording_url: string | null
          resolved_at: string | null
          responders_notified: number | null
          status: string
          tap_count: number | null
          trigger_type: string
          user_id: string
        }
        Insert: {
          cancelled_at?: string | null
          created_at?: string | null
          id?: string
          is_recording?: boolean | null
          latitude?: number | null
          location_accuracy?: number | null
          longitude?: number | null
          police_notified?: boolean | null
          recording_url?: string | null
          resolved_at?: string | null
          responders_notified?: number | null
          status?: string
          tap_count?: number | null
          trigger_type: string
          user_id: string
        }
        Update: {
          cancelled_at?: string | null
          created_at?: string | null
          id?: string
          is_recording?: boolean | null
          latitude?: number | null
          location_accuracy?: number | null
          longitude?: number | null
          police_notified?: boolean | null
          recording_url?: string | null
          resolved_at?: string | null
          responders_notified?: number | null
          status?: string
          tap_count?: number | null
          trigger_type?: string
          user_id?: string
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
