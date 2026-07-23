# 開発フロー

## issue駆動開発

1. GitHub issue を作成（1 issue = 1 機能/修正）
2. スコープは 2〜3 時間以内
3. ブランチ作成: `feature/<issue-number>-<title>`

## 1セッション1タスク

- 1つのセッション = 1つの issue のみ
- 完了時は PR を作成・レビュー・マージ

### 例外: 基盤整備は束ねてよい

**機能実装を伴わない chore は、1セッションで複数 issue をまとめて処理してよい。**

| 種類 | 例 | 束ねてよいか |
|---|---|---|
| 機能実装 | 図鑑一覧、ゲームのスコア保存 | ✗ 1セッション1件 |
| 基盤整備（chore） | 依存追加、リント・型チェック・テスト環境、設定変更、ドキュメント | ✓ 束ねてよい |

機能実装を1件ずつに絞るのは、コンテキストが膨らんでレビューの密度が落ちるのを防ぐため。基盤整備は互いに依存していることが多く（例: リント環境を入れてから型チェック環境を入れる）、分割するほうがかえって手戻りになる。

判断に迷う issue（機能実装を含む chore など）は、着手前にオーナーに確認する。

**この判断をルールより優先しない。** 依頼内容がこのルールと衝突する場合は、黙って従わず衝突を指摘して確認を取ること。

## TDD（テスト駆動開発）

ロジック実装時：
1. テストを先に書く
2. 実装
3. リファクタリング

### テストの書き方

- テストは `tests/` 配下に `*.spec.ts` で作成し、`src/` の構造をミラーリングする
  - `src/utils/damage.ts` → `tests/utils/damage.spec.ts`
  - `src/composables/use-pokedex.ts` → `tests/composables/use-pokedex.spec.ts`
  - `src/components/pokedex/PokemonCard.vue` → `tests/components/pokedex/PokemonCard.spec.ts`（`mountSuspended` を使用）
  - 配置ルールの詳細は [architecture.md](architecture.md) を参照
- 共通セットアップは `tests/setup.ts` に追記
- 実行コマンド
  - `npm run test` — 全テストを1回実行（コミット前に必ず実行）
  - `npm run test:watch` — ウォッチモードで実行（TDD 中はこちら）

## リント

`@nuxt/eslint` を使用する。ルールは `eslint.config.mjs` で `withNuxt()` を通して定義し、Nuxt が生成する設定（`.nuxt/eslint.config.mjs`）をベースにする。

- 実行コマンド
  - `npm run lint` — 全ファイルをチェック（コミット前に必ず実行）
  - `npm run lint:fix` — 自動修正できるものを修正
- 対象は `src/` `tests/` と設定ファイル群。`.nuxt/` `.output/` などの生成物は自動で除外される
- ルールを追加・変更する場合は `eslint.config.mjs` の `withNuxt()` の引数に書く

```js
export default withNuxt(
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
)
```

## 型チェック

`vue-tsc` を使用する（`nuxi typecheck` が内部で呼ぶ）。

- 実行コマンド
  - `npm run typecheck` — 型チェック（コミット前に必ず実行）
- 対象は `src/` `server/` `shared/` `tests/` と `nuxt.config.ts`
- `tests/` は Nuxt が生成する `tsconfig.app.json` の include に入らないため、`nuxt.config.ts` の `typescript.tsConfig.include` で明示的に追加している。テストコードも型チェックの対象に含める方針

### runtimeConfig の型は実行時の値を保証しない

`runtimeConfig` の値は Nuxt が `string` に広げて型定義を生成する。`process.env.X` から読んでいて実際は `undefined` になりうる場合でも、型の上では `string` になり型チェックを通過する。

環境変数の欠落は型ではなく実行時のバリデーションで弾くこと。

## コーディング規約

| 対象 | 規則 | 例 |
|---|---|---|
| ファイル名 | kebab-case | `user-profile.vue` |
| 関数/変数 | camelCase | `getUserData()` |
| クラス/コンポーネント | PascalCase | `UserProfile` |
| 定数 | SCREAMING_SNAKE_CASE | `MAX_USERS` |

プロジェクト固有のルールがあれば、ここに追記してください。
