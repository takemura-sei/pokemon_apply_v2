# ディレクトリ構造

## 全体像

```
pokemon_apply_v2/
├── app/                          # Nuxt 4 の srcDir（クライアント側）
│   ├── app.vue
│   ├── assets/
│   │   └── css/main.css          # Tailwind エントリ
│   ├── components/
│   │   ├── ui/                   # 汎用パーツ（BaseButton, BaseCard, BaseModal）
│   │   ├── pokedex/              # 図鑑機能のコンポーネント
│   │   └── game/                 # ゲーム機能のコンポーネント
│   ├── composables/
│   │   ├── use-supabase.ts       # $supabase のラッパー
│   │   ├── use-pokedex.ts
│   │   └── use-game.ts
│   ├── layouts/
│   │   └── default.vue
│   ├── pages/
│   │   ├── index.vue
│   │   ├── pokedex/
│   │   │   ├── index.vue         # /pokedex 一覧
│   │   │   └── [id].vue          # /pokedex/25 詳細
│   │   └── game/
│   │       └── index.vue
│   ├── middleware/               # auth.ts など
│   ├── plugins/
│   │   └── supabase.client.ts
│   └── utils/                    # 純粋関数（型計算、ダメージ計算など）
│
├── server/                       # Nitro（サーバー側）
│   ├── api/
│   │   ├── pokemon/
│   │   │   ├── index.get.ts
│   │   │   └── [id].get.ts
│   │   └── game/
│   │       └── score.post.ts
│   └── utils/
│       └── prisma.ts             # PrismaClient シングルトン
│
├── shared/                       # app / server 両方から自動 import（Nuxt 4 機能）
│   ├── types/
│   │   ├── pokemon.ts
│   │   └── game.ts
│   └── utils/                    # 両側で使う定数・変換関数
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── tests/
│   ├── unit/                     # utils / composables
│   ├── components/               # @nuxt/test-utils
│   └── setup.ts
│
├── public/
├── nuxt.config.ts
└── vitest.config.ts
```

## 設計方針

### レイヤー優先 + 機能サブディレクトリ

`components/pokedex/` のように、Nuxt の規約ディレクトリを第一階層とし、その下を機能で分ける。

`features/pokedex/{components,composables}` のような機能優先構成も候補だが、Nuxt の自動 import が走査するのは `components/` `composables/` 配下なので、規約に乗るほうが摩擦が少ない。

**機能が 5 つ以上に増えたら Nuxt Layers への移行を検討する。**

### shared/ で app と server の型を共有

Nuxt 4 の `shared/` は `app/` と `server/` の両方から自動 import される。API のレスポンス型など、両側で使う定義はここに置く。

### テストは tests/ に集約

コンポーネント隣接（`*.spec.ts` を並べる）ではなく分離する。Nuxt の自動 import 走査対象にテストファイルが混ざるのを避けるため。

TDD 方針（[development.md](development.md)）に沿って、テスト対象のロジックは `app/utils/` `app/composables/` に純粋関数として切り出す。

### Prisma を DB スキーマの単一の正とする

Prisma と Supabase を併用するが、役割を分ける。

| ツール | 役割 |
|---|---|
| Prisma | スキーマ定義・マイグレーション（`prisma/migrations/`） |
| Supabase | 認証・Storage・クライアント SDK |

`supabase/migrations/` は **作らない**。両方に置くとスキーマの正が 2 箇所になるため。

## 命名規則

ファイル名・変数名などの規約は [development.md](development.md) を参照。
