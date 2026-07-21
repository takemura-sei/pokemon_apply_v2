# トラブルシューティング

## インストールエラー

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 環境変数エラー

- `.env.local` が正しく設定されているか確認
- `VITE_` や `NUXT_PUBLIC_` など、フレームワーク固有のプレフィックスを確認

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

## その他

プロジェクト固有のトラブルシューティングをここに追記してください。
