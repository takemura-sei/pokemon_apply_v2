/**
 * ポケモンのタイプ slug → 日本語ラベルの対応表。
 *
 * 配色テーマはスコープ外（ラベルのみ）。
 * このオブジェクトの **定義順** をタイプ一覧の正準順として扱う（`availableTypes` のソートで利用）。
 */
export const POKEMON_TYPE_LABELS = {
  normal: 'ノーマル',
  fire: 'ほのお',
  water: 'みず',
  electric: 'でんき',
  grass: 'くさ',
  ice: 'こおり',
  fighting: 'かくとう',
  poison: 'どく',
  ground: 'じめん',
  flying: 'ひこう',
  psychic: 'エスパー',
  bug: 'むし',
  rock: 'いわ',
  ghost: 'ゴースト',
  dragon: 'ドラゴン',
  dark: 'あく',
  steel: 'はがね',
  fairy: 'フェアリー',
} as const

export type PokemonTypeSlug = keyof typeof POKEMON_TYPE_LABELS

/** 正準なタイプ表示順（`POKEMON_TYPE_LABELS` の定義順）。 */
export const POKEMON_TYPE_ORDER = Object.keys(POKEMON_TYPE_LABELS) as PokemonTypeSlug[]

/**
 * タイプ slug を日本語ラベルに変換する。
 * 未定義の slug（想定外のデータ）はそのまま返し、表示が壊れないようにする。
 */
export function typeLabel(slug: string): string {
  return POKEMON_TYPE_LABELS[slug as PokemonTypeSlug] ?? slug
}
