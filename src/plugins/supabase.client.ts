import { createClient } from '@supabase/supabase-js'
import { resolveSupabaseConfig } from '~/utils/supabase-config'

// 注意: このプラグインが provide する $supabase（= useSupabase()）は、現状アプリ本体からは
// 未使用（参照はテストのみ）。図鑑のデータ取得は server/api 経由の層構造にしたため。
// ブラウザから直接 Supabase を触る機能（認証 / Realtime / お気に入りの即時反映など）が
// 出た時点で配線する前提で意図的に温存している。詳細と初回利用先の決定は issue #22。
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { url, anonKey } = resolveSupabaseConfig(config.public)

  const supabase = createClient(url, anonKey)

  return {
    provide: {
      supabase,
    },
  }
})
