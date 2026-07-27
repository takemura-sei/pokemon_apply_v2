import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '#shared/types/database'

let client: SupabaseClient<Database> | undefined

/**
 * サーバー側の Supabase クライアントを返す（`Database` 型付き）。
 *
 * 現状は公開マスタ（Pokemon）の読み取りしか行わないため anon キーで生成する。
 * RLS が効いた状態で読むので、クライアント側の `$supabase` と権限は同じ。
 *
 * 将来 RLS を迂回する特権書き込み（例: 管理用の一括更新）が必要になったら、
 * ここに service role キーを使う別クライアント（例: `useServerSupabaseAdmin`）を
 * 追加する。service role キーは `NUXT_` 系の非公開 runtimeConfig に置き、
 * 絶対に public に載せない（.claude/docs/architecture.md 参照）。
 */
export function useServerSupabase(): SupabaseClient<Database> {
  if (client) {
    return client
  }

  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl
  const anonKey = config.public.supabaseAnonKey

  if (!url || !anonKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase の接続情報（URL / anon キー）が未設定です。',
    })
  }

  client = createClient<Database>(url, anonKey)
  return client
}
