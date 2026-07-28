import { fetchPokemonList } from '~/services/pokemon'
import type { Pokemon } from '#shared/types/pokemon'

interface PokedexState {
  list: Pokemon[]
  loading: boolean
  error: string | null
}

/**
 * 図鑑の状態。一覧を一度取得したらキャッシュし、詳細ページなどからも再取得せず使い回す。
 * SSR 時に取得した state は Nuxt(Pinia) がクライアントへ引き継ぐ。
 */
export const usePokedexStore = defineStore('pokedex', {
  state: (): PokedexState => ({
    list: [],
    loading: false,
    error: null,
  }),

  getters: {
    /** 取得済みのポケモン件数。 */
    count: state => state.list.length,
  },

  actions: {
    /** 一覧を取得する。取得済み・取得中なら何もしない（多重取得の防止）。 */
    async load(): Promise<void> {
      if (this.list.length > 0 || this.loading) {
        return
      }

      this.loading = true
      this.error = null
      try {
        this.list = await fetchPokemonList()
      }
      catch (e) {
        this.error = e instanceof Error ? e.message : 'ポケモン一覧の取得に失敗しました。'
      }
      finally {
        this.loading = false
      }
    },
  },
})
