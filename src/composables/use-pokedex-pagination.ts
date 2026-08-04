import { computed, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'
import { paginate, totalPages as calcTotalPages } from '~/utils/paginate'

/** 図鑑一覧のデフォルトの1ページあたり件数。 */
const DEFAULT_PER_PAGE = 24

/**
 * 一覧のページネーション状態と、現在ページの切り出し結果を束ねる薄い composable。
 *
 * `list` には絞り込み後の一覧（`usePokedexFilter` の `filtered` など）を渡す。
 * 中身が変わったら（検索・絞り込み条件の変更や、そもそもの取得結果の変更）
 * 1ページ目に戻す。
 *
 * 判定ロジックは純粋関数 `~/utils/paginate` に委ね、ここはリアクティブ配線に徹する。
 */
export function usePokedexPagination<T>(
  list: MaybeRefOrGetter<T[]>,
  perPage: number = DEFAULT_PER_PAGE,
) {
  const page = ref(1)

  const totalPages = computed(() => calcTotalPages(toValue(list).length, perPage))
  const paged = computed(() => paginate(toValue(list), page.value, perPage))

  // 絞り込み結果（list の中身）が変わったら1ページ目に戻す。
  watch(() => toValue(list), () => {
    page.value = 1
  })

  /** ページを移動する。範囲外の値は有効範囲（1〜totalPages）にクランプする。 */
  function setPage(next: number): void {
    page.value = Math.min(Math.max(Math.trunc(next), 1), totalPages.value)
  }

  return {
    page,
    totalPages,
    paged,
    setPage,
  }
}
