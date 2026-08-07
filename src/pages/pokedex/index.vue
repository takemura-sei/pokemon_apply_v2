<!-- 図鑑一覧ページ。取得と配線に徹し、表示は PokedexFilter / PokedexList / Pagination に委ねる。 -->
<script setup lang="ts">
import PokedexFilter from '~/components/pokedex/PokedexFilter.vue'
import PokedexList from '~/components/pokedex/PokedexList.vue'
import Pagination from '~/components/ui/Pagination.vue'
import { usePokedex } from '~/composables/use-pokedex'
import { usePokedexFilter } from '~/composables/use-pokedex-filter'
import { usePokedexPagination } from '~/composables/use-pokedex-pagination'

const { list, loading, error, count, load } = usePokedex()

// SSR 時に取得し、初期 HTML に反映する。
await load()

const { keyword, selectedTypes, availableTypes, filtered } = usePokedexFilter(list)
const { page, totalPages, paged, setPage } = usePokedexPagination(filtered)
</script>

<template>
  <section>
    <h1 class="text-xl font-bold">
      図鑑 <span class="text-gray-400">({{ count }})</span>
    </h1>

    <p v-if="loading" class="py-16 text-center text-gray-500">
      読み込み中...
    </p>
    <p v-else-if="error" class="py-16 text-center text-red-500">
      {{ error }}
    </p>
    <template v-else>
      <PokedexFilter
        v-model:keyword="keyword"
        v-model:selected-types="selectedTypes"
        :available-types="availableTypes"
        class="mt-4"
      />
      <PokedexList :pokemons="paged" class="mt-4" />
      <Pagination
        :page="page"
        :total-pages="totalPages"
        class="mt-6"
        @update:page="setPage"
      />
    </template>
  </section>
</template>
