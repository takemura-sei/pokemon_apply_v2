# セットアップ

## 初期セットアップ

```bash
npm install
```

## 環境変数設定

`.env.example` をコピーして `.env` を作成し、値を埋める。

```bash
cp .env.example .env
```

| 変数 | 用途 |
|---|---|
| `NUXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクトの URL |
| `NUXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase の anon キー（クライアントに露出する前提のキー） |

値は Supabase ダッシュボードの Project Settings > API から取得する。

Nuxt が既定で読むのは `.env` であって `.env.local` ではない。`NUXT_PUBLIC_` プレフィックスの付いた変数が `runtimeConfig.public`（[nuxt.config.ts](../../nuxt.config.ts)）にマッピングされる。

## 起動

```bash
npm run dev
```

`http://localhost:3000` で開く。

## DB

DB スキーマは Supabase 側で管理する（Prisma は使わない）。方針は [architecture.md](architecture.md) を参照。
