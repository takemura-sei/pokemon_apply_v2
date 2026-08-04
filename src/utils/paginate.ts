/**
 * 配列をページ単位に切り出す純粋関数。図鑑一覧のクライアント側ページネーションに使う。
 *
 * `page` は 1 始まり。範囲外の値は有効範囲（1〜totalPages）にクランプするため、
 * 呼び出し側でフィルタ変更などにより一覧件数が減っても壊れない。
 */
export function paginate<T>(list: T[], page: number, perPage: number): T[] {
  if (list.length === 0 || perPage <= 0) {
    return []
  }

  const clampedPage = Math.min(Math.max(Math.trunc(page), 1), totalPages(list.length, perPage))
  const start = (clampedPage - 1) * perPage
  return list.slice(start, start + perPage)
}

/**
 * 件数から総ページ数を求める。件数が 0 でも最低 1 ページを返す（0 ページだと
 * ページャの表示・クランプ計算が破綻するため）。
 */
export function totalPages(count: number, perPage: number): number {
  if (perPage <= 0) {
    return 1
  }
  return Math.max(1, Math.ceil(count / perPage))
}
