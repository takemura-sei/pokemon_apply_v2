import type { Database } from '#shared/types/database'

/** Supabase の `Pokemon` テーブルの行型（DB 都合の camelCase・types は Json）。 */
export type PokemonRow = Database['public']['Tables']['Pokemon']['Row']

/**
 * UI が扱うポケモンのドメイン型。
 * DB 都合（createdAt、Json 型の types）を取り除き、UI に漏らさない。
 * DB 行からの変換は `#shared/utils/pokemon` の `toPokemon` で行う。
 */
export interface Pokemon {
  /** 図鑑番号 */
  id: number
  /** 英語名（例: pikachu） */
  name: string
  /** 日本語名（例: ピカチュウ）。空文字がありうる */
  nameJa: string
  /** タイプ（例: ['electric']） */
  types: string[]
  /** 公式アートワークの画像 URL */
  imageUrl: string
  /** 高さ（デシメートル） */
  height: number
  /** 重さ（ヘクトグラム） */
  weight: number
}
