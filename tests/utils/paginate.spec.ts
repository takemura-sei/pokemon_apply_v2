import { describe, it, expect } from 'vitest'
import { paginate, totalPages } from '~/utils/paginate'

describe('paginate', () => {
  const list = [1, 2, 3, 4, 5, 6, 7]

  it('先頭ページを perPage 件で切り出す', () => {
    expect(paginate(list, 1, 3)).toEqual([1, 2, 3])
  })

  it('中間ページを切り出す', () => {
    expect(paginate(list, 2, 3)).toEqual([4, 5, 6])
  })

  it('端数ページは残りの件数だけ返す', () => {
    expect(paginate(list, 3, 3)).toEqual([7])
  })

  it('ちょうど割り切れる件数でも最終ページを正しく返す', () => {
    expect(paginate([1, 2, 3, 4, 5, 6], 2, 3)).toEqual([4, 5, 6])
  })

  it('空リストなら空配列を返す', () => {
    expect(paginate([], 1, 3)).toEqual([])
  })

  it('範囲外に大きい page は最終ページにクランプする', () => {
    expect(paginate(list, 100, 3)).toEqual([7])
  })

  it('0 以下の page は 1 ページ目にクランプする', () => {
    expect(paginate(list, 0, 3)).toEqual([1, 2, 3])
    expect(paginate(list, -5, 3)).toEqual([1, 2, 3])
  })

  it('perPage が list 件数以上なら1ページに収まる', () => {
    expect(paginate(list, 1, 100)).toEqual(list)
  })
})

describe('totalPages', () => {
  it('割り切れる件数は count / perPage', () => {
    expect(totalPages(6, 3)).toBe(2)
  })

  it('端数があれば切り上げる', () => {
    expect(totalPages(7, 3)).toBe(3)
  })

  it('件数が0でも最低1ページを返す', () => {
    expect(totalPages(0, 3)).toBe(1)
  })
})
