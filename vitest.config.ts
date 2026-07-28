import { defineVitestConfig } from '@nuxt/test-utils/config'

// テストが開発者の .env に依存しないよう、Supabase の接続情報を固定値で与える。
// 実際の通信は行わず、クライアントの生成が成功することだけを担保する。
process.env.NUXT_PUBLIC_SUPABASE_URL ||= 'https://test.supabase.co'
process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY ||= 'test-anon-key'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom',
      },
    },
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.spec.ts'],
  },
})
