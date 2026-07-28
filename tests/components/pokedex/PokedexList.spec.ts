import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PokedexList from '~/components/pokedex/PokedexList.vue'
import PokemonCard from '~/components/pokedex/PokemonCard.vue'
import type { Pokemon } from '#shared/types/pokemon'

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

describe('PokedexList', () => {
  it('渡した件数ぶんのカードを描画する', async () => {
    const pokemons = [makePokemon(1), makePokemon(2), makePokemon(3)]
    const wrapper = await mountSuspended(PokedexList, {
      props: { pokemons },
    })

    expect(wrapper.findAllComponents(PokemonCard)).toHaveLength(3)
  })

  it('空配列なら空表示のメッセージを出す', async () => {
    const wrapper = await mountSuspended(PokedexList, {
      props: { pokemons: [] },
    })

    expect(wrapper.findAllComponents(PokemonCard)).toHaveLength(0)
    expect(wrapper.text()).toContain('ポケモンがいません')
  })
})
