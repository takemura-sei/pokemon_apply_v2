# 新しいページ/機能を追加する手順

図鑑（`/pokedex`）を参照実装として、**どの層に何を置くか**をまとめる。ゲームなど新機能を足すときはこの順でファイルを作る。各層の設計意図は [architecture.md](architecture.md) を参照。

## レイヤーと責務（データが流れる順）

```
Supabase
  ↑ 読み書き
server/utils/supabase.ts        … サーバー側クライアント（型付き）
  ↑
server/api/<feature>/*.get.ts   … エンドポイント。DB 行を shared のドメイン型に整形して返す
  ↑ HTTP
src/services/<feature>.ts       … $fetch ラッパー。エンドポイント/型の変更をここに閉じる
  ↑
src/stores/<feature>.ts         … Pinia。共有・キャッシュしたい状態だけ（不要なら省く）
  ↑
src/composables/use-<feature>.ts… コンポーネントが使う唯一の入口
  ↑
src/components/<feature>/*.vue  … 表示・状態操作の本体（ロジックはここ）
  ↑ props
src/pages/<feature>/*.vue       … 薄い。取得して components に渡すだけ
```

型は `shared/types/` に置き、app と server の両方から `#shared/types/...` で参照する。

## チェックリスト（例: ゲーム機能を足す）

1. **型** — `shared/types/game.ts` にドメイン型を定義。DB 由来の型が要るなら
   MCP `generate_typescript_types` で `shared/types/database.ts` を再生成し、そこから導く
2. **変換** — DB 行 → ドメイン型のマッパーが要るなら `shared/utils/game.ts` に純粋関数で置く
   （参照: [shared/utils/pokemon.ts](../../shared/utils/pokemon.ts)）
3. **server API** — `server/api/game/*.ts`。`useServerSupabase()` で読み、整形して返す
   （参照: [server/api/pokemon/index.get.ts](../../server/api/pokemon/index.get.ts)）
4. **service** — `src/services/game.ts` に `$fetch` ラッパー
   （参照: [src/services/pokemon.ts](../../src/services/pokemon.ts)）
5. **store**（必要なら）— `src/stores/game.ts`。ページ間で共有 or キャッシュしたい状態のみ
   （参照: [src/stores/pokedex.ts](../../src/stores/pokedex.ts)）
6. **composable** — `src/composables/use-game.ts`。store + service を束ねた入口
   （参照: [src/composables/use-pokedex.ts](../../src/composables/use-pokedex.ts)）
7. **components** — `src/components/game/*.vue`。汎用パーツは `src/components/ui/` に
8. **page** — `src/pages/game/index.vue`。取得して components に渡すだけ
9. **nav** — 必要なら [src/layouts/default.vue](../../src/layouts/default.vue) に導線を追加

## テスト（TDD）

- ロジックは純粋関数に切り出し `tests/` にミラー配置して先にテストを書く
  - 例: `shared/utils/pokemon.ts` → `tests/shared/utils/pokemon.spec.ts`
- コンポーネントは `mountSuspended` でマウントして検証
  - 例: `tests/components/pokedex/PokemonCard.spec.ts`
- 配置ルールの詳細は [development.md](development.md) / [architecture.md](architecture.md)

## 迷ったら

- **store を作るべきか**：ページローカルな状態なら composable の `ref` で十分。ページ間共有やキャッシュが要るときだけ store 化する
- **server API を挟むべきか**：本アプリは SSR とレイヤー分離のため、DB 読み取りも原則 server/api 経由（クライアント直読みはしない）
