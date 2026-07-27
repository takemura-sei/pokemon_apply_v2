// Supabase の DB スキーマから MCP `generate_typescript_types` で生成した型。
// 共有 DB のため他プロジェクトのテーブル（words / match_results / profiles）も含むが、
// 本アプリが使うのは Pokemon のみ。スキーマ変更時は再生成する（.claude/docs/architecture.md 参照）。
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
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      match_results: {
        Row: {
          created_at: string
          damage_dealt: number
          duration_ms: number
          hp_left: number
          id: string
          match_uid: string
          max_combo: number
          miss_count: number
          opponent_id: string | null
          player_id: string
          result: string
          room_code: string
          words_typed: number
        }
        Insert: {
          created_at?: string
          damage_dealt: number
          duration_ms: number
          hp_left: number
          id?: string
          match_uid: string
          max_combo: number
          miss_count: number
          opponent_id?: string | null
          player_id: string
          result: string
          room_code: string
          words_typed: number
        }
        Update: {
          created_at?: string
          damage_dealt?: number
          duration_ms?: number
          hp_left?: number
          id?: string
          match_uid?: string
          max_combo?: number
          miss_count?: number
          opponent_id?: string | null
          player_id?: string
          result?: string
          room_code?: string
          words_typed?: number
        }
        Relationships: [
          {
            foreignKeyName: 'match_results_opponent_id_fkey'
            columns: ['opponent_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'match_results_player_id_fkey'
            columns: ['player_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      Pokemon: {
        Row: {
          createdAt: string
          height: number
          id: number
          imageUrl: string
          name: string
          nameJa: string
          types: Json
          weight: number
        }
        Insert: {
          createdAt?: string
          height: number
          id: number
          imageUrl: string
          name: string
          nameJa?: string
          types: Json
          weight: number
        }
        Update: {
          createdAt?: string
          height?: number
          id?: number
          imageUrl?: string
          name?: string
          nameJa?: string
          types?: Json
          weight?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string
          id: string
        }
        Insert: {
          created_at?: string
          display_name?: string
          id: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
        }
        Relationships: []
      }
      words: {
        Row: {
          difficulty: number
          display: string
          id: number
          is_active: boolean
          reading: string
        }
        Insert: {
          difficulty?: number
          display: string
          id?: never
          is_active?: boolean
          reading: string
        }
        Update: {
          difficulty?: number
          display?: string
          id?: never
          is_active?: boolean
          reading?: string
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
