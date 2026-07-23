# 開発フロー

## issue駆動開発

1. GitHub issue を作成（1 issue = 1 機能/修正）
2. スコープは 2〜3 時間以内
3. ブランチ作成: `feature/<issue-number>-<title>`

## 1セッション1タスク

- 1つのセッション = 1つの issue のみ
- 完了時は PR を作成・レビュー・マージ

## TDD（テスト駆動開発）

ロジック実装時：
1. テストを先に書く
2. 実装
3. リファクタリング

### テストの書き方

- テストは `tests/` 配下に `*.spec.ts` で作成
  - `tests/unit/` — utils / composables などのユニットテスト
  - `tests/components/` — コンポーネントテスト（`mountSuspended` を使用）
- 共通セットアップは `tests/setup.ts` に追記
- 実行コマンド
  - `npm run test` — 全テストを1回実行（コミット前に必ず実行）
  - `npm run test:watch` — ウォッチモードで実行（TDD 中はこちら）

## コーディング規約

| 対象 | 規則 | 例 |
|---|---|---|
| ファイル名 | kebab-case | `user-profile.vue` |
| 関数/変数 | camelCase | `getUserData()` |
| クラス/コンポーネント | PascalCase | `UserProfile` |
| 定数 | SCREAMING_SNAKE_CASE | `MAX_USERS` |

プロジェクト固有のルールがあれば、ここに追記してください。
