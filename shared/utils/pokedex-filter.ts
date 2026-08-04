import type { Pokemon } from '#shared/types/pokemon'
import { POKEMON_TYPE_ORDER } from '#shared/constants/pokemon-types'

/** 図鑑一覧のクライアント側フィルタ条件。 */
export interface PokedexFilterCriteria {
  /** 検索語。日本語名・英名（大文字小文字無視）の部分一致、図鑑番号の前方一致に使う。空なら無視。 */
  keyword: string
  /** 選択タイプ slug。いずれかを持つ個体を通す（OR）。空配列なら無視。 */
  types: string[]
}

/** 1 匹が検索語にマッチするか。日本語名/英名の部分一致、または図鑑番号の前方一致。 */
function matchesKeyword(pokemon: Pokemon, keyword: string): boolean {
  const q = keyword.toLowerCase()
  return (
    pokemon.nameJa.includes(keyword)
    || pokemon.name.toLowerCase().includes(q)
    || String(pokemon.id).startsWith(keyword)
  )
}

/**
 * 図鑑一覧を検索語・タイプで絞り込む純粋関数。
 * keyword と types は AND で結合し、両方指定時は両条件を満たす個体だけを返す。
 */
export function filterPokemons(list: Pokemon[], criteria: PokedexFilterCriteria): Pokemon[] {
  const keyword = criteria.keyword.trim()
  const types = criteria.types

  return list.filter((pokemon) => {
    if (keyword && !matchesKeyword(pokemon, keyword)) {
      return false
    }
    if (types.length > 0 && !types.some(t => pokemon.types.includes(t))) {
      return false
    }
    return true
  })
}

/**
 * 一覧に実在するタイプを重複なく抽出し、正準順（`POKEMON_TYPE_ORDER` の定義順）で返す。
 * 未定義のタイプ（想定外データ）は末尾に回す。
 */
export function availableTypes(list: Pokemon[]): string[] {
  const present = new Set<string>()
  for (const pokemon of list) {
    for (const t of pokemon.types) {
      present.add(t)
    }
  }

  const ordered = POKEMON_TYPE_ORDER.filter(t => present.has(t)) as string[]
  const extras = [...present].filter(t => !POKEMON_TYPE_ORDER.includes(t as never))
  return [...ordered, ...extras]
}
