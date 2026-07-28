<script setup lang="ts">
import BaseCard from '~/components/ui/BaseCard.vue'
import type { Pokemon } from '#shared/types/pokemon'

const props = defineProps<{ pokemon: Pokemon }>()

// 日本語名が空なら英語名にフォールバックする。
const displayName = computed(() => props.pokemon.nameJa || props.pokemon.name)
// 図鑑番号を3桁ゼロ埋め（例: 25 → 025）。
const paddedId = computed(() => String(props.pokemon.id).padStart(3, '0'))
</script>

<template>
  <BaseCard>
    <div class="flex flex-col items-center p-4">
      <span class="self-start font-mono text-xs text-gray-400">No.{{ paddedId }}</span>
      <img
        :src="pokemon.imageUrl"
        :alt="displayName"
        loading="lazy"
        width="120"
        height="120"
        class="h-28 w-28 object-contain"
      >
      <p class="mt-2 font-semibold text-gray-800 dark:text-gray-100">{{ displayName }}</p>
      <ul class="mt-1 flex flex-wrap justify-center gap-1">
        <li
          v-for="t in pokemon.types"
          :key="t"
          class="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
        >
          {{ t }}
        </li>
      </ul>
    </div>
  </BaseCard>
</template>
