import { fetchPokemonList } from '~/services/pokemon'
import type { Pokemon } from '#shared/types/pokemon'

/**
 * 図鑑の状態。一覧を一度取得したらキャッシュし、詳細ページなどからも再取得せず使い回す。
 * SSR 時に取得した state は Nuxt(Pinia) がクライアントへ引き継ぐ。
 */
export const usePokedexStore = defineStore('pokedex', () => {
  const list = ref<Pokemon[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /** 一覧を取得する。取得済み・取得中なら何もしない（多重取得の防止）。 */
  async function load(): Promise<void> {
    if (list.value.length > 0 || loading.value) {
      return
    }

    loading.value = true
    error.value = null
    try {
      list.value = await fetchPokemonList()
    }
    catch (e) {
      error.value = e instanceof Error ? e.message : 'ポケモン一覧の取得に失敗しました。'
    }
    finally {
      loading.value = false
    }
  }

  return { list, loading, error, load }
})
