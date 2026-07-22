# pokemon_apply_v2

ポケモンアプリ。図鑑や簡単なゲーム機能を提供します。

## 技術スタック

Nuxt 4, Vue 3, TypeScript, Vitest, Supabase, Prisma, TailwindCSS

## クイックスタート

```bash
npm install
npm run dev
```

詳細は [setup.md](.claude/docs/setup.md)

## ディレクトリ構造

`app/`（クライアント）、`server/`（Nitro API）、`shared/`（両者で共有する型・定数）の3層。
コンポーネントとロジックは Nuxt の規約ディレクトリを第一階層とし、その下を機能（`pokedex` / `game`）で分ける。

詳細は [architecture.md](.claude/docs/architecture.md)

## 開発フロー

**issue駆動 + 1セッション1タスク + TDD**

- GitHub issue を作成 → ブランチ作成 → テスト駆動で実装 → PR → マージ
- 1 issue は 2〜3 時間以内に完了できるスコープ
- 詳細は [development.md](.claude/docs/development.md)

## ビルド・テスト・検証

```bash
npm run test      # テスト実行
npm run lint      # リント
npm run typecheck # 型チェック
npm run build     # 本番ビルド
npm run dev       # 開発サーバー
```

トラブル時は [troubleshooting.md](.claude/docs/troubleshooting.md)
