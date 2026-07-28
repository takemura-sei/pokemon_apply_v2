import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabase クライアントを取得する。
 *
 * コンポーネントや store から `useNuxtApp().$supabase` を直接触らず、
 * このラッパー経由でアクセスする。
 */
export function useSupabase(): SupabaseClient {
  const { $supabase } = useNuxtApp()

  if (!$supabase) {
    throw new Error(
      'Supabase クライアントが見つかりません。'
      + 'src/plugins/supabase.client.ts が読み込まれているか確認してください。',
    )
  }

  return $supabase as SupabaseClient
}
