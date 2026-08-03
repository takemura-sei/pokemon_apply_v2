import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabase クライアント（クライアント側）を取得する。
 *
 * コンポーネントや store から `useNuxtApp().$supabase` を直接触らず、
 * このラッパー経由でアクセスする。
 *
 * 現状アプリ本体からは未使用（データ取得は server/api 経由）。ブラウザ直結が要る機能が
 * 出た時点で使う前提で温存している。方針の経緯と初回利用先は issue #22 を参照。
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
