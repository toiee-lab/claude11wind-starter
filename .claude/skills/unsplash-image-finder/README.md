# Unsplash Image Finder Skill

Unsplash APIを使用してWebページ用の高品質な画像を検索するSkillです。

## セットアップ

### 1. Unsplash APIキーを取得

1. https://unsplash.com/developers にアクセス
2. "Register as a developer" でアカウント登録
3. "New Application" で新しいアプリケーションを作成
4. Access Key をコピー

### 2. 環境変数を設定

プロジェクトルートに `.env.local` ファイルを作成：

```bash
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

### 3. 依存パッケージをインストール

```bash
npm install unsplash-js dotenv
```

## 使用方法

### Claude Code内で使用

`/unsplash-image-finder` コマンドで呼び出すか、画像が必要な場面でClaudeが自動的に使用します。

### 直接実行

```bash
# 単一キーワード検索
node .claude/skills/unsplash-image-finder/scripts/unsplash-search.js "coffee shop"

# 複数キーワード検索
node .claude/skills/unsplash-image-finder/scripts/unsplash-search.js "technology,innovation,startup"
```

## レート制限

| モード | 制限 |
|--------|------|
| Demo | 50リクエスト/時間 |
| Production | 5000リクエスト/時間 |

## 他のプロジェクトで使用する

このSkillを他のプロジェクトでも使用するには：

### 方法1: グローバルSkillとして配置

```bash
# ディレクトリをコピー
cp -r .claude/skills/unsplash-image-finder ~/.claude/skills/

# 各プロジェクトで依存パッケージをインストール
npm install unsplash-js dotenv

# 各プロジェクトで.env.localを設定
```

### 方法2: プロジェクトごとにコピー

```bash
# 新しいプロジェクトにSkillをコピー
cp -r .claude/skills/unsplash-image-finder /path/to/new-project/.claude/skills/
```

## ファイル構成

```
unsplash-image-finder/
├── SKILL.md              # Skill定義と指示
├── README.md             # このファイル
└── scripts/
    └── unsplash-search.js  # 検索スクリプト
```
