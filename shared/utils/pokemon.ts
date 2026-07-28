import type { Pokemon, PokemonRow } from '#shared/types/pokemon'

/**
 * Supabase の `Pokemon` 行を UI 向けドメイン型に正規化する純粋関数。
 *
 * - `types`（Json）は文字列配列に整える。配列でなければ空配列にフォールバック
 * - `createdAt` など DB 都合のカラムは落とす
 */
export function toPokemon(row: PokemonRow): Pokemon {
  return {
    id: row.id,
    name: row.name,
    nameJa: row.nameJa,
    types: Array.isArray(row.types) ? row.types.map(String) : [],
    imageUrl: row.imageUrl,
    height: row.height,
    weight: row.weight,
  }
}
