# 自作 Skill 一覧

`~/.claude/skills/` に配置している自作スキル（全プロジェクト共通で利用可能）のまとめ。
Claude Code のセッション中に `/<skill-name>` で呼び出すか、説明にある状況で自動的に起動する。

## 一覧

| スキル | 一言でいうと | 呼び出しタイミング | ユーザー確認が必要な操作 | 付属テンプレート |
|---|---|---|---|---|
| [project-bootstrap](#project-bootstrap) | 新規プロジェクトをゼロから立ち上げる | 「新しいアプリを作りたい」「リポジトリを立ち上げて」 | リポジトリ作成 / push | `CLAUDE.md`, `settings.json`, `agents/code-reviewer.md` |
| [claude-setup](#claude-setup) | 既存プロジェクトに Claude Code 設定一式を追加 | 「Claude の設定を作って」 | 既存ファイルの上書き | `CLAUDE.md`, `settings.json`, `docs/*.md` |
| [github-connect](#github-connect) | ローカル repo を GitHub に接続して初回 push | 「GitHub に上げて」 | リポジトリ作成 / push | なし |
| [suggest-commit](#suggest-commit) | ステージ済み差分からコミットメッセージを提案 | `/commit` 「コミット名を考えて」 | コミット実行 | なし |

## 使い分け

```
新規プロジェクト？
├─ Yes → project-bootstrap（リポジトリ作成〜初期 issue まで全部やる）
└─ No  → 既に GitHub 上にある？
         ├─ No  → github-connect（接続 + 初回 push）
         └─ Yes → Claude 設定だけ欲しい → claude-setup

日々の開発中 → suggest-commit
```

`project-bootstrap` は `claude-setup` と `github-connect` の役割を内包している。
新規立ち上げなら `project-bootstrap` 一本で足り、あとの2つは「途中から入る」ケース用。

---

## project-bootstrap

新規プロジェクトを **「issue駆動 + 1セッション1タスク + TDD」** のワークフローに乗った状態で立ち上げる。
ゴールは、スキル完了直後に「issue #1 を新しいセッションで開始できる」状態を作ること。

**手順**

1. ヒアリング（プロジェクト名 / 概要 / 技術スタック / 公開設定）
2. `gh repo create`（**要確認**）
3. 初期構成セットアップ（`npx nuxi init` 等 + `test` / `lint` / `typecheck` script の確認）
4. `CLAUDE.md` 生成（テンプレートのプレースホルダーを置換）
5. `.claude/settings.json` 配置（パーミッション）
6. `.claude/agents/code-reviewer.md` 配置（レビュー用サブエージェント）
7. 初期 issue を 3〜7 個作成（1 issue = 2〜3時間、完了条件つき）
8. 初回コミット & push（**要確認**）
9. 完了報告

**やらないこと**

- issue #1 の実装（立ち上げと実装はセッションを分ける）
- テンプレートの開発フロー・deny/ask ルールを無断で削ること

## claude-setup

プロジェクトルートで実行し、Claude Code 用の設定を一括作成する。
`project-bootstrap` のステップ4〜5だけを切り出したもので、**既存プロジェクトに後から入れる**用途。

**生成物**

| ファイル | 内容 |
|---|---|
| `CLAUDE.md` | プロジェクト名・技術スタック・クイックスタート・コマンド一覧 |
| `.claude/settings.json` | パッケージマネージャに応じた allow / ask / deny ルール |
| `.claude/docs/setup.md` | 初期セットアップ・環境変数 |
| `.claude/docs/development.md` | 開発フローとコーディング規約 |
| `.claude/docs/troubleshooting.md` | よくある問題と対処 |

あわせて `.gitignore` に `.env` 系と `.claude/settings.local.json` があるか確認・追記する。

## github-connect

ローカルの git リポジトリを GitHub に接続し、初回 push まで通す。

**前提**: `gh` 認証済み / `git init` 済み / GitHub 側にリポジトリが未作成

**手順**: 前提確認 → ヒアリング（リポジトリ名・説明・公開設定）→ `gh repo create --source=.`（**要確認**）→ `git remote -v` 確認 → `chore: initial commit` → `git push -u origin main`（**要確認**）

`.env` や `node_modules` が commit 対象に紛れていないかを push 前にチェックする。

## suggest-commit

`git diff --staged` と `git status` を読み、Conventional Commits 形式のメッセージ候補を 1〜3 個提案する。
最後に「どれでコミットするか」を確認してから実行。

形式は `<type>: <概要（日本語OK）>`。

| type | 用途 |
|---|---|
| feat | 新機能の追加 |
| fix | バグ修正 |
| chore | ビルド・設定・ツール系の変更 |
| refactor | 動作を変えないコードの整理 |
| docs | ドキュメントのみの変更 |
| style | フォーマット・スタイルのみの変更 |
| test | テストの追加・修正 |
| ci | CI/CD の変更 |

---

## 設計上の共通ルール

自作スキルはいずれも以下の方針で書かれている。

- **破壊的・外向きの操作は必ずユーザー確認を挟む** — リポジトリ作成、push、既存ファイルの上書き
- **会話に既出の情報は聞き直さない** — ヒアリングは不足分のみ
- **完了時に「次のアクション」を明示する** — スキル単体で完結させず、次のセッションに繋ぐ

## 配置場所

```
~/.claude/skills/
├── claude-setup/
│   ├── SKILL.md
│   └── assets/          # CLAUDE.md / settings.json / docs テンプレート
├── github-connect/
│   └── SKILL.md
├── project-bootstrap/
│   ├── SKILL.md
│   └── assets/          # CLAUDE.md / settings.json / code-reviewer.md
└── suggest-commit/
    └── SKILL.md
```

ユーザーレベル（`~/.claude/skills/`）に置いているため全プロジェクトで有効。
プロジェクト固有のスキルが必要な場合は `.claude/skills/` に置く（本プロジェクトでは Supabase 公式スキルをシンボリックリンクで参照している）。
