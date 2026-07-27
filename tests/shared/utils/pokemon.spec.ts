import { describe, it, expect } from 'vitest'
import { toPokemon } from '#shared/utils/pokemon'
import type { PokemonRow } from '#shared/types/pokemon'

// DB 行（camelCase・types は Json）を UI 向けドメイン型へ正規化する純粋関数のテスト。
function makeRow(overrides: Partial<PokemonRow> = {}): PokemonRow {
  return {
    id: 25,
    name: 'pikachu',
    nameJa: 'ピカチュウ',
    types: ['electric'],
    imageUrl: 'https://example.com/25.png',
    height: 4,
    weight: 60,
    createdAt: '2026-01-01T00:00:00Z',
    ...overrides,
  }
}

describe('toPokemon', () => {
  it('DB 行のフィールドをドメイン型に写像する', () => {
    const p = toPokemon(makeRow())

    expect(p).toEqual({
      id: 25,
      name: 'pikachu',
      nameJa: 'ピカチュウ',
      types: ['electric'],
      imageUrl: 'https://example.com/25.png',
      height: 4,
      weight: 60,
    })
  })

  it('createdAt など DB 都合のカラムは含めない', () => {
    const p = toPokemon(makeRow())
    expect('createdAt' in p).toBe(false)
  })

  it('types(Json) を string[] に正規化する', () => {
    const p = toPokemon(makeRow({ types: ['grass', 'poison'] }))
    expect(p.types).toEqual(['grass', 'poison'])
  })

  it('types が配列でない場合は空配列にフォールバックする', () => {
    const p = toPokemon(makeRow({ types: null as unknown as PokemonRow['types'] }))
    expect(p.types).toEqual([])
  })
})
