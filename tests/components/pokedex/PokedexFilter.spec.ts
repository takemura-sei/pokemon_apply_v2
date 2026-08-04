import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PokedexFilter from '~/components/pokedex/PokedexFilter.vue'

describe('PokedexFilter', () => {
  it('タイプを日本語ラベルでチップ表示する', async () => {
    const wrapper = await mountSuspended(PokedexFilter, {
      props: { availableTypes: ['electric', 'grass'], keyword: '', selectedTypes: [] },
    })

    const labels = wrapper.findAll('button').map(b => b.text())
    expect(labels).toEqual(['でんき', 'くさ'])
  })

  it('検索欄の入力で update:keyword を emit する', async () => {
    const wrapper = await mountSuspended(PokedexFilter, {
      props: { availableTypes: [], keyword: '', selectedTypes: [] },
    })

    await wrapper.find('input').setValue('ピカ')
    expect(wrapper.emitted('update:keyword')?.at(-1)).toEqual(['ピカ'])
  })

  it('未選択チップのクリックで選択を追加した配列を emit する', async () => {
    const wrapper = await mountSuspended(PokedexFilter, {
      props: { availableTypes: ['electric', 'grass'], keyword: '', selectedTypes: ['grass'] },
    })

    await wrapper.findAll('button')[0]!.trigger('click')
    expect(wrapper.emitted('update:selectedTypes')?.at(-1)).toEqual([['grass', 'electric']])
  })

  it('選択済みチップのクリックで選択を外した配列を emit する', async () => {
    const wrapper = await mountSuspended(PokedexFilter, {
      props: { availableTypes: ['electric', 'grass'], keyword: '', selectedTypes: ['electric', 'grass'] },
    })

    await wrapper.findAll('button')[0]!.trigger('click')
    expect(wrapper.emitted('update:selectedTypes')?.at(-1)).toEqual([['grass']])
  })
})
