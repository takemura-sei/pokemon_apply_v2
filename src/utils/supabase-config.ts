/**
 * runtimeConfig から Supabase の接続情報を取り出して検証する。
 *
 * runtimeConfig の型は Nuxt が `string` に広げて生成するため、実行時に
 * `undefined` でも型チェックでは検出できない。ここで実行時に弾く。
 */

interface SupabaseRuntimeConfig {
  supabaseUrl?: string
  supabaseAnonKey?: string
}

export interface SupabaseConfig {
  url: string
  anonKey: string
}

const ENV_KEYS = {
  supabaseUrl: 'NUXT_PUBLIC_SUPABASE_URL',
  supabaseAnonKey: 'NUXT_PUBLIC_SUPABASE_ANON_KEY',
} as const

function isBlank(value: string | undefined): boolean {
  return value === undefined || value.trim() === ''
}

export function resolveSupabaseConfig(config: SupabaseRuntimeConfig): SupabaseConfig {
  const missing = (Object.keys(ENV_KEYS) as (keyof typeof ENV_KEYS)[])
    .filter(key => isBlank(config[key]))
    .map(key => ENV_KEYS[key])

  if (missing.length > 0) {
    throw new Error(
      `Supabase の環境変数が設定されていません: ${missing.join(', ')}\n`
      + '.env.example をコピーして .env を作成し、値を設定してください（cp .env.example .env）。',
    )
  }

  return {
    url: config.supabaseUrl!,
    anonKey: config.supabaseAnonKey!,
  }
}
