<!-- 汎用ページャ。前/次＋番号付き。総ページ数が1以下なら何も表示しない。 -->
<script setup lang="ts">
const props = defineProps<{
  /** 現在ページ（1始まり）。 */
  page: number
  /** 総ページ数。 */
  totalPages: number
}>()

const emit = defineEmits<{
  'update:page': [value: number]
}>()

function go(page: number): void {
  if (page < 1 || page > props.totalPages || page === props.page) {
    return
  }
  emit('update:page', page)
}
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="flex flex-wrap items-center justify-center gap-1"
    aria-label="ページネーション"
  >
    <button
      type="button"
      class="rounded border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
      :disabled="page <= 1"
      @click="go(page - 1)"
    >
      前へ
    </button>

    <button
      v-for="n in totalPages"
      :key="n"
      type="button"
      class="min-w-8 rounded border px-2 py-1 text-sm transition-colors"
      :class="n === page
        ? 'border-blue-500 bg-blue-500 text-white'
        : 'border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'"
      :aria-current="n === page ? 'page' : undefined"
      @click="go(n)"
    >
      {{ n }}
    </button>

    <button
      type="button"
      class="rounded border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
      :disabled="page >= totalPages"
      @click="go(page + 1)"
    >
      次へ
    </button>
  </nav>
</template>
