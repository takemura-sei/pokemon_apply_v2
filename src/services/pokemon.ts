import type { Pokemon } from '#shared/types/pokemon'

/**
 * ポケモン一覧を取得する。
 *
 * コンポーネントや store から直接 `$fetch` を呼ばず、この関数経由でアクセスする。
 * エンドポイントやレスポンス型が変わったときの影響をここに閉じ込める。
 */
export function fetchPokemonList(): Promise<Pokemon[]> {
  return $fetch<Pokemon[]>('/api/pokemon')
}
