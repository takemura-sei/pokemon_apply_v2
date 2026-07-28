import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePokedexStore } from '~/stores/pokedex'
import { fetchPokemonList } from '~/services/pokemon'
import type { Pokemon } from '#shared/types/pokemon'

// service をモックし、store のロジック（state / getter / action）だけを検証する。
vi.mock('~/services/pokemon', () => ({
  fetchPokemonList: vi.fn(),
}))

const mockFetch = vi.mocked(fetchPokemonList)

function makePokemon(id: number): Pokemon {
  return {
    id,
    name: `pokemon-${id}`,
    nameJa: `ポケモン${id}`,
    types: ['normal'],
    imageUrl: `https://example.com/${id}.png`,
    height: 1,
    weight: 1,
  }
}

describe('usePokedexStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockFetch.mockReset()
  })

  it('初期 state と count getter', () => {
    const store = usePokedexStore()

    expect(store.list).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.count).toBe(0)
  })

  it('load() 成功で list と count が反映される', async () => {
    mockFetch.mockResolvedValue([makePokemon(1), makePokemon(2)])
    const store = usePokedexStore()

    await store.load()

    expect(store.list).toHaveLength(2)
    expect(store.count).toBe(2)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('取得済みなら再取得しない（load を2回呼んでも fetch は1回）', async () => {
    mockFetch.mockResolvedValue([makePokemon(1)])
    const store = usePokedexStore()

    await store.load()
    await store.load()

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it('取得に失敗したら error にメッセージが入り loading が戻る', async () => {
    mockFetch.mockRejectedValue(new Error('ネットワークエラー'))
    const store = usePokedexStore()

    await store.load()

    expect(store.error).toBe('ネットワークエラー')
    expect(store.loading).toBe(false)
    expect(store.list).toEqual([])
  })
})
