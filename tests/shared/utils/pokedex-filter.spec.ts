import { describe, it, expect } from 'vitest'
import { filterPokemons, availableTypes } from '#shared/utils/pokedex-filter'
import type { Pokemon } from '#shared/types/pokemon'

// 図鑑一覧のクライアント側フィルタ（keyword / types）の純粋関数テスト。
function makePokemon(overrides: Partial<Pokemon> = {}): Pokemon {
  return {
    id: 25,
    name: 'pikachu',
    nameJa: 'ピカチュウ',
    types: ['electric'],
    imageUrl: 'https://example.com/25.png',
    height: 4,
    weight: 60,
    ...overrides,
  }
}

// 代表的な数匹を用意（id・名前・タイプに差をつける）。
const bulbasaur = makePokemon({ id: 1, name: 'bulbasaur', nameJa: 'フシギダネ', types: ['grass', 'poison'] })
const charizard = makePokemon({ id: 6, name: 'Charizard', nameJa: 'リザードン', types: ['fire', 'flying'] })
const pikachu = makePokemon({ id: 25, name: 'pikachu', nameJa: 'ピカチュウ', types: ['electric'] })
const raichu = makePokemon({ id: 26, name: 'raichu', nameJa: 'ライチュウ', types: ['electric'] })
const gyarados = makePokemon({ id: 130, name: 'gyarados', nameJa: 'ギャラドス', types: ['water', 'flying'] })
const list = [bulbasaur, charizard, pikachu, raichu, gyarados]

describe('filterPokemons', () => {
  it('空条件（keyword=""・types=[]）なら全件通過する', () => {
    expect(filterPokemons(list, { keyword: '', types: [] })).toEqual(list)
  })

  it('前後の空白のみの keyword は無視して全件通過する', () => {
    expect(filterPokemons(list, { keyword: '   ', types: [] })).toEqual(list)
  })

  it('keyword: 日本語名の部分一致で絞り込む', () => {
    const result = filterPokemons(list, { keyword: 'チュウ', types: [] })
    expect(result).toEqual([pikachu, raichu])
  })

  it('keyword: 英名は大文字小文字を無視して部分一致する', () => {
    const result = filterPokemons(list, { keyword: 'CHAR', types: [] })
    expect(result).toEqual([charizard])
  })

  it('keyword: 図鑑番号は前方一致で絞り込む', () => {
    // "2" は 25(ピカチュウ)・26(ライチュウ) にヒットするが 130 の途中の "2" ではヒットしない。
    const result = filterPokemons(list, { keyword: '2', types: [] })
    expect(result).toEqual([pikachu, raichu])
  })

  it('types: 単一タイプで絞り込む', () => {
    const result = filterPokemons(list, { keyword: '', types: ['electric'] })
    expect(result).toEqual([pikachu, raichu])
  })

  it('types: 複数タイプは OR（いずれかを持つ個体）で絞り込む', () => {
    const result = filterPokemons(list, { keyword: '', types: ['grass', 'flying'] })
    expect(result).toEqual([bulbasaur, charizard, gyarados])
  })

  it('keyword と types は AND で結合する', () => {
    // flying を持つ中で名前に "リザ" を含むのは charizard のみ。
    const result = filterPokemons(list, { keyword: 'リザ', types: ['flying'] })
    expect(result).toEqual([charizard])
  })

  it('どれにもマッチしない場合は 0 件を返す', () => {
    expect(filterPokemons(list, { keyword: 'ミュウ', types: [] })).toEqual([])
    expect(filterPokemons(list, { keyword: '', types: ['dragon'] })).toEqual([])
  })
})

describe('availableTypes', () => {
  it('list から重複を除いたタイプを正準順（定義順）で返す', () => {
    // 定義順: fire → water → electric → grass → poison → flying
    const result = availableTypes(list)
    expect(result).toEqual(['fire', 'water', 'electric', 'grass', 'poison', 'flying'])
  })

  it('空リストなら空配列を返す', () => {
    expect(availableTypes([])).toEqual([])
  })
})
