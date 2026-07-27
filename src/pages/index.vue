<!-- トップページ。各機能への導線に徹する。 -->
<template>
  <section class="py-8">
    <h1 class="text-2xl font-bold">
      ポケモンアプリ
    </h1>
    <p class="mt-2 text-gray-600 dark:text-gray-300">
      図鑑や簡単なゲーム機能を提供します。
    </p>
    <div class="mt-6">
      <NuxtLink
        to="/pokedex"
        class="inline-block rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
      >
        図鑑を見る
      </NuxtLink>
    </div>
  </section>
</template>
