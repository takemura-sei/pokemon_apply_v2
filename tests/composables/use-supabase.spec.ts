import { describe, it, expect } from 'vitest'
import { useSupabase } from '~/composables/use-supabase'

// useNuxtApp をモックすると @nuxt/test-utils 自身の初期化まで壊れるため、
// 実際の Nuxt 環境でプラグインが provide したクライアントを検証する。
describe('useSupabase', () => {
  it('Supabase クライアントを返す', () => {
    const supabase = useSupabase()

    expect(supabase).toBeDefined()
    expect(typeof supabase.from).toBe('function')
    expect(typeof supabase.auth).toBe('object')
  })

  it('同じインスタンスを返す（呼ぶたびに生成しない）', () => {
    expect(useSupabase()).toBe(useSupabase())
  })
})
