# pokemon_apply_v2

ポケモンアプリ。図鑑や簡単なゲーム機能を提供します。

## 技術スタック

Nuxt 4 / Vue 3 / TypeScript / Pinia / TailwindCSS v4 / Supabase / Vitest / ESLint

## セットアップ

```bash
npm install
cp .env.example .env   # Supabase の接続情報を設定
npm run dev
```

`http://localhost:3000` で開きます。環境変数の詳細は [.claude/docs/setup.md](.claude/docs/setup.md) を参照してください。

## コマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー起動 |
| `npm run test` | テスト実行（1回） |
| `npm run test:watch` | テスト実行（ウォッチモード） |
| `npm run lint` | リント |
| `npm run lint:fix` | リント（自動修正） |
| `npm run typecheck` | 型チェック |
| `npm run build` | 本番ビルド |
| `npm run preview` | 本番ビルドのローカル確認 |

## ディレクトリ構造

`src/`（クライアント）、`server/`（Nitro API）、`shared/`（両者で共有する型・定数）の3層構成です。

詳細は [.claude/docs/architecture.md](.claude/docs/architecture.md) を参照してください。

## 開発フロー

issue 駆動 + 1セッション1タスク + TDD で進めます。詳細は [.claude/docs/development.md](.claude/docs/development.md) を参照してください。
