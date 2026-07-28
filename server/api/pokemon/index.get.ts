import { toPokemon } from '#shared/utils/pokemon'
import type { Pokemon } from '#shared/types/pokemon'

/**
 * GET /api/pokemon — ポケモン一覧を図鑑番号順で返す。
 * DB 行は `toPokemon` で UI 向けドメイン型に正規化してから返す。
 */
export default defineEventHandler(async (): Promise<Pokemon[]> => {
  const supabase = useServerSupabase()

  const { data, error } = await supabase
    .from('Pokemon')
    .select('*')
    .order('id')

  if (error) {
    throw createError({
      statusCode: 502,
      statusMessage: 'ポケモン一覧の取得に失敗しました。',
    })
  }

  return (data ?? []).map(toPokemon)
})
