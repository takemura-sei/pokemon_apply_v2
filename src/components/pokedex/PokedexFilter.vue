<!-- 図鑑一覧の検索ボックスとタイプ絞り込みチップ。状態は v-model で親（composable）が持つ。 -->
<script setup lang="ts">
import { typeLabel } from '#shared/constants/pokemon-types'

const props = defineProps<{
  /** 一覧に実在するタイプ slug（正準順）。 */
  availableTypes: string[]
  /** 検索語（v-model:keyword）。 */
  keyword: string
  /** 選択中のタイプ slug（v-model:selectedTypes）。 */
  selectedTypes: string[]
}>()

const emit = defineEmits<{
  'update:keyword': [value: string]
  'update:selectedTypes': [value: string[]]
}>()

// タイプチップの選択をトグルして新しい配列を emit する（元配列は変更しない）。
function toggleType(slug: string): void {
  const next = props.selectedTypes.includes(slug)
    ? props.selectedTypes.filter(t => t !== slug)
    : [...props.selectedTypes, slug]
  emit('update:selectedTypes', next)
}
</script>

<template>
  <div class="space-y-3">
    <input
      :value="keyword"
      type="search"
      placeholder="名前（日本語/英語）や図鑑番号で検索"
      class="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      @input="emit('update:keyword', ($event.target as HTMLInputElement).value)"
    >

    <ul v-if="availableTypes.length > 0" class="flex flex-wrap gap-2">
      <li v-for="slug in availableTypes" :key="slug">
        <button
          type="button"
          :aria-pressed="selectedTypes.includes(slug)"
          class="rounded-full border px-3 py-1 text-xs transition-colors"
          :class="selectedTypes.includes(slug)
            ? 'border-blue-500 bg-blue-500 text-white'
            : 'border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'"
          @click="toggleType(slug)"
        >
          {{ typeLabel(slug) }}
        </button>
      </li>
    </ul>
  </div>
</template>
