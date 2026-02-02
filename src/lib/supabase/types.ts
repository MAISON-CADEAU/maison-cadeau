export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          provider: string | null
          marketing_agreed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          provider?: string | null
          marketing_agreed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          provider?: string | null
          marketing_agreed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      gifts: {
        Row: {
          id: string
          title: string
          brand: string
          description: string | null
          price: number
          image_url: string
          category: string
          purchase_url: string | null
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          brand: string
          description?: string | null
          price: number
          image_url: string
          category: string
          purchase_url?: string | null
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          brand?: string
          description?: string | null
          price?: number
          image_url?: string
          category?: string
          purchase_url?: string | null
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      scraps: {
        Row: {
          id: string
          user_id: string
          gift_id: string
          collection_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          gift_id: string
          collection_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          gift_id?: string
          collection_id?: string | null
          created_at?: string
        }
      }
      collections: {
        Row: {
          id: string
          user_id: string
          name: string
          cover_image: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          cover_image?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          cover_image?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      ai_recommendations: {
        Row: {
          id: string
          user_id: string
          age_range: string
          gender: string
          style: string
          budget: string
          results: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          age_range: string
          gender: string
          style: string
          budget: string
          results: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          age_range?: string
          gender?: string
          style?: string
          budget?: string
          results?: Json
          created_at?: string
        }
      }
      fortunes: {
        Row: {
          id: string
          user_id: string
          type: string
          message: string
          sub_message: string | null
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          message: string
          sub_message?: string | null
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          message?: string
          sub_message?: string | null
          date?: string
          created_at?: string
        }
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
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
