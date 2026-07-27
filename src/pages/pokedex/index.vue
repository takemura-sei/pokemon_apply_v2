<!-- 図鑑一覧ページ。データの受け渡しに徹し、表示は PokedexList に委ねる。 -->
<script setup lang="ts">
import PokedexList from '~/components/pokedex/PokedexList.vue'
import { usePokedex } from '~/composables/use-pokedex'

const { list, loading, error, load } = usePokedex()

// SSR 時に取得し、初期 HTML に反映する。
await load()
</script>

<template>
  <section>
    <h1 class="text-xl font-bold">
      図鑑
    </h1>

    <p v-if="loading" class="py-16 text-center text-gray-500">
      読み込み中...
    </p>
    <p v-else-if="error" class="py-16 text-center text-red-500">
      {{ error }}
    </p>
    <PokedexList v-else :pokemons="list" class="mt-4" />
  </section>
</template>
