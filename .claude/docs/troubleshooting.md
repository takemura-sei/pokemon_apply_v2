# トラブルシューティング

## インストールエラー

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 環境変数エラー

- `.env` が存在するか確認（`cp .env.example .env`）。Nuxt が既定で読むのは `.env` で、`.env.local` ではない
- クライアントから参照する変数には `NUXT_PUBLIC_` プレフィックスが必要
- `.env` を編集したら dev サーバーを再起動する（起動時にしか読まれない）

## テストが実行できない

```bash
npm run test
```

エラーメッセージをよく読んで、依存関係を確認。

## 型チェックエラー

```bash
npm run typecheck
```

出力されたエラーを修正。

## リントエラー

```bash
npm run lint:fix   # 自動修正できるものを直す
```

残ったものは手で修正する。ルール自体を変えたい場合は `eslint.config.mjs` の `withNuxt()` の引数に書く。

## Tailwind のクラスが効かない

- `src/assets/css/main.css` が `nuxt.config.ts` の `css` に登録されているか確認
- v4 では `tailwind.config.js` は使わない。テーマ拡張は `main.css` の `@theme` ブロックに書く
- クラス名を文字列結合で組み立てていると検出されない（`text-${color}-500` のような書き方は避け、クラス名は完全な形で書く）

## その他

プロジェクト固有のトラブルシューティングをここに追記してください。
