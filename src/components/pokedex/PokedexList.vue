<script setup lang="ts">
import PokemonCard from '~/components/pokedex/PokemonCard.vue'
import type { Pokemon } from '#shared/types/pokemon'

defineProps<{ pokemons: Pokemon[] }>()
</script>

<template>
  <div>
    <p v-if="pokemons.length === 0" class="py-16 text-center text-gray-500">
      ポケモンがいません。
    </p>
    <ul
      v-else
      class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
    >
      <li v-for="p in pokemons" :key="p.id">
        <PokemonCard :pokemon="p" />
      </li>
    </ul>
  </div>
</template>
