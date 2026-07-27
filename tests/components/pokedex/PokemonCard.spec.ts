import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PokemonCard from '~/components/pokedex/PokemonCard.vue'
import type { Pokemon } from '#shared/types/pokemon'

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

describe('PokemonCard', () => {
  it('図鑑番号・日本語名・画像を表示する', async () => {
    const wrapper = await mountSuspended(PokemonCard, {
      props: { pokemon: makePokemon() },
    })

    expect(wrapper.text()).toContain('ピカチュウ')
    expect(wrapper.text()).toContain('025')

    const img = wrapper.get('img')
    expect(img.attributes('src')).toBe('https://example.com/25.png')
    expect(img.attributes('alt')).toContain('ピカチュウ')
  })

  it('nameJa が空なら英語名にフォールバックする', async () => {
    const wrapper = await mountSuspended(PokemonCard, {
      props: { pokemon: makePokemon({ nameJa: '' }) },
    })

    expect(wrapper.text()).toContain('pikachu')
  })
})
