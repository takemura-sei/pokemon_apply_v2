# ディレクトリ構造

## 全体像

```
pokemon_apply_v2/
├── src/                          # Nuxt 4 の srcDir（クライアント側）
│   ├── app.vue
│   ├── assets/
│   │   └── css/main.css          # Tailwind エントリ
│   ├── components/
│   │   ├── ui/                   # 汎用パーツ（BaseButton, BaseCard, BaseModal）
│   │   ├── pokedex/              # 図鑑機能のコンポーネント（ページの実処理はここに書く）
│   │   └── game/                 # ゲーム機能のコンポーネント（ページの実処理はここに書く）
│   ├── composables/
│   │   ├── use-supabase.ts       # $supabase のラッパー
│   │   ├── use-pokedex.ts
│   │   └── use-game.ts
│   ├── stores/                   # Pinia ストア
│   │   ├── pokedex.ts
│   │   └── game.ts
│   ├── services/                 # API 呼び出し用関数（fetch のラッパー）
│   │   ├── pokemon.ts
│   │   └── game.ts
│   ├── layouts/
│   │   └── default.vue
│   ├── pages/                    # データの受け渡しに徹する（ロジックは書かない）
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
├── tests/                        # src/ の対応ディレクトリごとにミラーリング
│   ├── app.spec.ts               # src/app.vue に対応
│   ├── components/               # src/components に対応（@nuxt/test-utils）
│   ├── composables/              # src/composables に対応
│   ├── stores/                   # src/stores に対応
│   ├── services/                 # src/services に対応
│   ├── utils/                    # src/utils に対応
│   ├── sample.spec.ts            # vitest 動作確認用
│   └── setup.ts
│
├── public/
├── nuxt.config.ts
└── vitest.config.ts
```

## 設計方針

### srcDir は `src/`

Nuxt 4 のデフォルトは `app/` だが、明示的に `srcDir: 'src/'`（[nuxt.config.ts](../../nuxt.config.ts)）を指定して `src/` に変更している。`~` エイリアスは変わらず `src/` を指す。

### pages は薄く、実処理は components に書く

`pages/` はルーティングとデータの受け渡し（props 経由でコンポーネントに流す、composable / store から取得した値を渡す）に徹し、ロジックは一切書かない。実際の表示・状態操作・イベントハンドリングはすべて `components/pokedex/` `components/game/` 配下のコンポーネントに実装する。

- テストしやすくする（ページごと `@nuxt/test-utils` でマウントせず、コンポーネント単体でテストできる）
- ルーティング変更とロジック変更の影響範囲を分離する

### stores/ で Pinia によるグローバル状態管理

`@pinia/nuxt` を導入し、`stores/` にストアを置く。ページ間・コンポーネント間で共有する状態（図鑑のお気に入り、ゲームのスコアなど）はここに集約し、コンポーネントローカルな状態は composable や `ref` で十分な場合は無理に store 化しない。

### services/ で API 呼び出しを一元化

`services/` に `$fetch` / `useFetch` をラップした関数を置き、`server/api/` へのリクエストをここに集約する。コンポーネントや store から直接 `$fetch` を呼ばず、`services/pokemon.ts` のような関数経由でアクセスすることで、エンドポイントや型の変更時の影響範囲を1箇所にまとめる。

### レイヤー優先 + 機能サブディレクトリ

`components/pokedex/` のように、Nuxt の規約ディレクトリを第一階層とし、その下を機能で分ける。

`features/pokedex/{components,composables}` のような機能優先構成も候補だが、Nuxt の自動 import が走査するのは `components/` `composables/` 配下なので、規約に乗るほうが摩擦が少ない。

**機能が 5 つ以上に増えたら Nuxt Layers への移行を検討する。**

### shared/ で app と server の型を共有

Nuxt 4 の `shared/` は `app/` と `server/` の両方から自動 import される。API のレスポンス型など、両側で使う定義はここに置く。

### テストは tests/ に集約し、src/ の構造をミラーリング

コンポーネント隣接（`*.spec.ts` を並べる）ではなく `tests/` に分離する。Nuxt の自動 import 走査対象にテストファイルが混ざるのを避けるため。

`tests/` 配下は `src/composables/` → `tests/composables/` のように、対応する `src/` のディレクトリと同じ名前・同じ階層で作る。テスト対象がどこにあるか探しやすくするため。

TDD 方針（[development.md](development.md)）に沿って、テスト対象のロジックは `src/utils/` `src/composables/` に純粋関数として切り出す。

### Prisma を DB スキーマの単一の正とする

Prisma と Supabase を併用するが、役割を分ける。

| ツール | 役割 |
|---|---|
| Prisma | スキーマ定義・マイグレーション（`prisma/migrations/`） |
| Supabase | 認証・Storage・クライアント SDK |

`supabase/migrations/` は **作らない**。両方に置くとスキーマの正が 2 箇所になるため。

## 命名規則

ファイル名・変数名などの規約は [development.md](development.md) を参照。
