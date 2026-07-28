import { describe, it, expect } from 'vitest'
import { resolveSupabaseConfig } from '~/utils/supabase-config'

describe('resolveSupabaseConfig', () => {
  const valid = {
    supabaseUrl: 'https://example.supabase.co',
    supabaseAnonKey: 'anon-key',
  }

  it('揃っていれば url と anonKey を返す', () => {
    expect(resolveSupabaseConfig(valid)).toEqual({
      url: 'https://example.supabase.co',
      anonKey: 'anon-key',
    })
  })

  it('URL が未設定なら環境変数名を含むエラーを投げる', () => {
    expect(() => resolveSupabaseConfig({ ...valid, supabaseUrl: undefined }))
      .toThrowError(/NUXT_PUBLIC_SUPABASE_URL/)
  })

  it('anon キーが未設定なら環境変数名を含むエラーを投げる', () => {
    expect(() => resolveSupabaseConfig({ ...valid, supabaseAnonKey: undefined }))
      .toThrowError(/NUXT_PUBLIC_SUPABASE_ANON_KEY/)
  })

  it('両方未設定なら両方の環境変数名を挙げる', () => {
    let message = ''
    try {
      resolveSupabaseConfig({ supabaseUrl: undefined, supabaseAnonKey: undefined })
    }
    catch (error) {
      message = (error as Error).message
    }

    expect(message).toContain('NUXT_PUBLIC_SUPABASE_URL')
    expect(message).toContain('NUXT_PUBLIC_SUPABASE_ANON_KEY')
  })

  it('空文字は未設定として扱う', () => {
    expect(() => resolveSupabaseConfig({ ...valid, supabaseUrl: '' }))
      .toThrowError(/NUXT_PUBLIC_SUPABASE_URL/)
  })

  it('前後の空白のみの値も未設定として扱う', () => {
    expect(() => resolveSupabaseConfig({ ...valid, supabaseAnonKey: '   ' }))
      .toThrowError(/NUXT_PUBLIC_SUPABASE_ANON_KEY/)
  })

  it('エラーメッセージで .env の作成方法を案内する', () => {
    expect(() => resolveSupabaseConfig({ ...valid, supabaseUrl: undefined }))
      .toThrowError(/\.env\.example/)
  })
})
