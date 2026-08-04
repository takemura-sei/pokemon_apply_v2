import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue'
import { filterPokemons, availableTypes } from '#shared/utils/pokedex-filter'
import type { Pokemon } from '#shared/types/pokemon'

/**
 * 図鑑一覧の検索語・選択タイプの状態と、絞り込み結果を束ねる薄い composable。
 *
 * データ（list）は `usePokedex()` から受け取るだけで、store（キャッシュ）には触らない。
 * 判定ロジックは純粋関数 `#shared/utils/pokedex-filter` に委ね、ここはリアクティブ配線に徹する。
 */
export function usePokedexFilter(list: MaybeRefOrGetter<Pokemon[]>) {
  const keyword = ref('')
  const selectedTypes = ref<string[]>([])

  /** 一覧に実在するタイプ（正準順）。チップ表示に使う。 */
  const types = computed(() => availableTypes(toValue(list)))

  /** 検索語・選択タイプで絞り込んだ結果。 */
  const filtered = computed(() =>
    filterPokemons(toValue(list), {
      keyword: keyword.value,
      types: selectedTypes.value,
    }),
  )

  return {
    keyword,
    selectedTypes,
    availableTypes: types,
    filtered,
  }
}
