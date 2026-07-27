<!-- アプリ共通レイアウト。ヘッダー（アプリ名＋ナビ）と本文スロット。 -->
<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <header class="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <nav class="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <NuxtLink to="/" class="text-lg font-bold">
          ポケモンアプリ
        </NuxtLink>
        <NuxtLink to="/pokedex" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          図鑑
        </NuxtLink>
      </nav>
    </header>
    <main class="mx-auto max-w-6xl px-4 py-6">
      <slot />
    </main>
  </div>
</template>
