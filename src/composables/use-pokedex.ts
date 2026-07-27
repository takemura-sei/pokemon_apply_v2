import { storeToRefs } from 'pinia'
import { usePokedexStore } from '~/stores/pokedex'

/**
 * 図鑑データへの唯一の入口。
 * コンポーネントは store を直接触らず、この composable 経由で一覧・状態・取得アクションを使う。
 */
export function usePokedex() {
  const store = usePokedexStore()
  const { list, loading, error } = storeToRefs(store)

  return {
    list,
    loading,
    error,
    load: store.load,
  }
}
