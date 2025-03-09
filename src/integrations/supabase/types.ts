export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      devices: {
        Row: {
          cpus: number | null
          created_at: string | null
          device_id: string
          device_name: string
          id: string
          is_mobile: boolean | null
          last_seen: string | null
          memory: number | null
          os_release: string | null
          os_type: string | null
          platform: string
          status: string | null
          user_id: string
        }
        Insert: {
          cpus?: number | null
          created_at?: string | null
          device_id: string
          device_name: string
          id?: string
          is_mobile?: boolean | null
          last_seen?: string | null
          memory?: number | null
          os_release?: string | null
          os_type?: string | null
          platform: string
          status?: string | null
          user_id: string
        }
        Update: {
          cpus?: number | null
          created_at?: string | null
          device_id?: string
          device_name?: string
          id?: string
          is_mobile?: boolean | null
          last_seen?: string | null
          memory?: number | null
          os_release?: string | null
          os_type?: string | null
          platform?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      downloads: {
        Row: {
          downloaded_at: string | null
          id: string
          platform: string
          user_id: string | null
          version: string
        }
        Insert: {
          downloaded_at?: string | null
          id?: string
          platform: string
          user_id?: string | null
          version: string
        }
        Update: {
          downloaded_at?: string | null
          id?: string
          platform?: string
          user_id?: string | null
          version?: string
        }
        Relationships: []
      }
      github_repos: {
        Row: {
          created_at: string
          description: string | null
          forks: number
          full_name: string
          has_gitstore_file: boolean
          html_url: string
          id: string
          language: string | null
          license_key: string | null
          license_name: string | null
          metadata: Json | null
          name: string
          owner_avatar_url: string | null
          owner_login: string
          repo_id: string
          stars: number
          status: string
          topics: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          forks?: number
          full_name: string
          has_gitstore_file?: boolean
          html_url: string
          id?: string
          language?: string | null
          license_key?: string | null
          license_name?: string | null
          metadata?: Json | null
          name: string
          owner_avatar_url?: string | null
          owner_login: string
          repo_id: string
          stars?: number
          status?: string
          topics?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          forks?: number
          full_name?: string
          has_gitstore_file?: boolean
          html_url?: string
          id?: string
          language?: string | null
          license_key?: string | null
          license_name?: string | null
          metadata?: Json | null
          name?: string
          owner_avatar_url?: string | null
          owner_login?: string
          repo_id?: string
          stars?: number
          status?: string
          topics?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          codename: string
          created_at: string
          id: string
          notification_preferences: Json | null
          skill_level: string | null
          theme: string | null
          two_factor_enabled: boolean | null
          two_factor_secret: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          codename: string
          created_at?: string
          id: string
          notification_preferences?: Json | null
          skill_level?: string | null
          theme?: string | null
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          codename?: string
          created_at?: string
          id?: string
          notification_preferences?: Json | null
          skill_level?: string | null
          theme?: string | null
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
        }
        Relationships: []
      }
      security_logs: {
        Row: {
          created_at: string | null
          description: string | null
          event_type: string
          id: string
          ip_address: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_type: string
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_type?: string
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      vulnerabilities: {
        Row: {
          description: string | null
          detected_at: string | null
          id: string
          name: string
          severity: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          description?: string | null
          detected_at?: string | null
          id?: string
          name: string
          severity: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          description?: string | null
          detected_at?: string | null
          id?: string
          name?: string
          severity?: string
          status?: string
          updated_at?: string | null
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
