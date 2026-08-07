import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Pagination from '~/components/ui/Pagination.vue'

describe('Pagination', () => {
  it('総ページ数分のページ番号ボタンを表示する', async () => {
    const wrapper = await mountSuspended(Pagination, {
      props: { page: 1, totalPages: 3 },
    })

    const labels = wrapper.findAll('[aria-current], button:not([aria-current])')
    // 前へ・1・2・3・次へ の 5 ボタン
    expect(wrapper.findAll('button')).toHaveLength(5)
    expect(labels.map(b => b.text())).toContain('2')
  })

  it('現在ページのボタンに aria-current="page" が付く', async () => {
    const wrapper = await mountSuspended(Pagination, {
      props: { page: 2, totalPages: 3 },
    })

    const current = wrapper.find('[aria-current="page"]')
    expect(current.text()).toBe('2')
  })

  it('先頭ページでは「前へ」が disabled', async () => {
    const wrapper = await mountSuspended(Pagination, {
      props: { page: 1, totalPages: 3 },
    })

    const prev = wrapper.findAll('button')[0]!
    expect(prev.text()).toBe('前へ')
    expect(prev.attributes('disabled')).toBeDefined()
  })

  it('最終ページでは「次へ」が disabled', async () => {
    const wrapper = await mountSuspended(Pagination, {
      props: { page: 3, totalPages: 3 },
    })

    const next = wrapper.findAll('button').at(-1)!
    expect(next.text()).toBe('次へ')
    expect(next.attributes('disabled')).toBeDefined()
  })

  it('ページ番号クリックで update:page を emit する', async () => {
    const wrapper = await mountSuspended(Pagination, {
      props: { page: 1, totalPages: 3 },
    })

    const buttons = wrapper.findAll('button')
    const page3 = buttons.find(b => b.text() === '3')!
    await page3.trigger('click')

    expect(wrapper.emitted('update:page')?.at(-1)).toEqual([3])
  })

  it('「次へ」クリックで page+1 を emit する', async () => {
    const wrapper = await mountSuspended(Pagination, {
      props: { page: 1, totalPages: 3 },
    })

    await wrapper.findAll('button').at(-1)!.trigger('click')

    expect(wrapper.emitted('update:page')?.at(-1)).toEqual([2])
  })

  it('「前へ」クリックで page-1 を emit する', async () => {
    const wrapper = await mountSuspended(Pagination, {
      props: { page: 2, totalPages: 3 },
    })

    await wrapper.findAll('button')[0]!.trigger('click')

    expect(wrapper.emitted('update:page')?.at(-1)).toEqual([1])
  })

  it('totalPages が1以下なら何も表示しない', async () => {
    const wrapper = await mountSuspended(Pagination, {
      props: { page: 1, totalPages: 1 },
    })

    expect(wrapper.findAll('button')).toHaveLength(0)
  })
})
