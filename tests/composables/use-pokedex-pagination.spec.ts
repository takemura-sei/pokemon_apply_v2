import { describe, it, expect } from 'vitest'
import { ref, nextTick } from 'vue'
import { usePokedexPagination } from '~/composables/use-pokedex-pagination'

describe('usePokedexPagination', () => {
  it('初期状態は1ページ目で totalPages を算出する', () => {
    const list = [1, 2, 3, 4, 5]
    const { page, totalPages, paged } = usePokedexPagination(list, 2)

    expect(page.value).toBe(1)
    expect(totalPages.value).toBe(3)
    expect(paged.value).toEqual([1, 2])
  })

  it('空リストなら1ページ・0件', () => {
    const { totalPages, paged } = usePokedexPagination([], 2)

    expect(totalPages.value).toBe(1)
    expect(paged.value).toEqual([])
  })

  it('setPage で指定ページの内容に切り替わる', () => {
    const list = [1, 2, 3, 4, 5]
    const { page, paged, setPage } = usePokedexPagination(list, 2)

    setPage(2)

    expect(page.value).toBe(2)
    expect(paged.value).toEqual([3, 4])
  })

  it('setPage は範囲外を有効範囲にクランプする', () => {
    const list = [1, 2, 3, 4, 5]
    const { page, setPage, totalPages } = usePokedexPagination(list, 2)

    setPage(100)
    expect(page.value).toBe(totalPages.value)

    setPage(0)
    expect(page.value).toBe(1)
  })

  it('list（フィルタ結果）が変わったら1ページ目に戻る', async () => {
    const source = ref([1, 2, 3, 4, 5])
    const { page, setPage } = usePokedexPagination(source, 2)

    setPage(3)
    expect(page.value).toBe(3)

    source.value = [10, 20]
    await nextTick()

    expect(page.value).toBe(1)
  })
})
