<!-- 汎用カード。今後の表示パーツの土台。中身は slot で受ける。 -->
<template>
  <div
    class="rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
  >
    <slot />
  </div>
</template>
