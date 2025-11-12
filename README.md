# Claude11Wind Starter

Eleventy + Tailwind CSS v4 Starter Kit powered by Claude Code

Claude Code を使って、モダンで、シンプルで、最近っぽいデザインを持ったマルチページ構成のWebサイトを構築できるスターターキットです。 [Eleventy (11ty)](https://www.11ty.dev/)（イレブンティーと読む）と [Tailwind CSS v4.1](https://tailwindcss.com/) を組み合わせたパッケージです。

また、Unsplash から自動で画像をリンク切れをおこなさず取得するためのスクリプトと、それを使うサブエージェントも設定された状態です。ダウンロードして、すぐに使い始めることができます。

**Cloudflare Pages 特化です。**

---

## 📚 目次

- [特徴](#-特徴)
- [このプロジェクトで使う技術について](#-このプロジェクトで使う技術について)
- [始める前に必要なもの](#-始める前に必要なもの)
- [セットアップ手順](#-セットアップ手順所要時間約10分)
- [プロジェクト構造](#-プロジェクト構造)
- [コマンド一覧](#-コマンド一覧)
- [CLAUDE.md について](#-claudemd-について)
- [基本的な使い方](#-基本的な使い方)
- [よくあるタスク](#-よくあるタスク)
- [デプロイ方法](#-デプロイ方法)
- [トラブルシューティング](#-トラブルシューティング)
- [Claude Code プロンプト例集](#-claude-code-プロンプト例集)

---

## ✨ 特徴

- **🧠 Claude Code Optimized**: 非エンジニア向けに最適化されたAI開発体験
- **⚡ Fast & Modern**: Eleventy v3.1+ と Tailwind CSS v4.1+ で構築
- **📱 Responsive**: モバイルファーストのレスポンシブデザイン
- **🎨 Beautiful UI**: 日本語タイポグラフィとプロフェッショナルなカラーパレットを事前設定
- **🔧 Ready to Use**: 最小限のセットアップで最大限の生産性
- **🎯 SEO Optimized**: メタタグ、OpenGraph、構造化データ、サイトマップを完備
- **♿ Accessible**: WCAGに準拠した適切なセマンティックHTML
- **📊 Performance**: 画像最適化、CSS/HTMLミニファイ、遅延読み込み
- **🔄 Live Reload**: 開発中のホットリロード機能

---

## 🎓 このプロジェクトで使う技術について

非エンジニアの方向けに、このプロジェクトで使う技術を簡単に説明します。

### Eleventy (11ty) とは？
**静的サイトジェネレーター**と呼ばれるツールです。簡単に言うと、テンプレート（型）を使ってHTMLファイルを自動生成してくれるツールです。手作業で何ページもHTMLを書く必要がなく、1つのテンプレートを編集するだけで全ページに反映されます。

- 公式サイト: https://www.11ty.dev/
- **メリット**: 高速、シンプル、学習コストが低い

### Tailwind CSS とは？
**CSSフレームワーク**です。デザインを簡単に作れるツールキットのようなものです。`class="text-blue-500"`のようにクラス名を書くだけで、スタイルが適用されます。

- 公式サイト: https://tailwindcss.com/
- **メリット**: デザインが早い、一貫性のあるデザインになる、カスタマイズしやすい

### Nunjucks とは？
**テンプレートエンジン**です。HTMLの中に `{{ }}` や `{% %}` を使って、変数や繰り返し処理を書けるようにするツールです。

- 例: `{{ site.title }}` でサイト名を表示

### Claude Code とは？
**AI開発アシスタント**です。自然言語（日本語）で指示を出すだけで、コードを書いたり、ファイルを編集したりしてくれます。

- 公式サイト: https://claude.ai/

### Cloudflare Pages とは？
**ホスティングサービス**です。作ったWebサイトを無料で公開できるサービスです。GitHubと連携して、コードをプッシュするだけで自動的にデプロイされます。

- 公式サイト: https://pages.cloudflare.com/
- **メリット**: 無料、高速、簡単、自動デプロイ

---

## 🛠️ 始める前に必要なもの

以下のツールとアカウントが必要です。まだ準備していない場合は、リンク先でインストール・登録してください。

### 1. Node.js (無料)
JavaScriptを実行するための環境です。このプロジェクトを動かすために必須です。

- **必要バージョン**: Node.js 22以上
- **インストール方法**: https://nodejs.org/ から最新版（LTS推奨）をダウンロード
- **確認方法**: ターミナルで `node --version` を実行して、バージョンが表示されればOK

### 2. npm
Node.jsのパッケージ管理ツールです。Node.jsをインストールすると自動的に付いてきます。

- **確認方法**: ターミナルで `npm --version` を実行

### 3. Git (無料)
バージョン管理システムです。コードの変更履歴を管理したり、GitHubにアップロードするために使います。

- **インストール方法**: https://git-scm.com/ からダウンロード
- **確認方法**: ターミナルで `git --version` を実行

### 4. GitHubアカウント (無料)
コードを保存・共有するためのサービスです。Cloudflare Pagesとの連携にも使います。

- **登録方法**: https://github.com/ でアカウント作成

### 5. Cloudflareアカウント (無料)
Webサイトを公開するためのホスティングサービスです。

- **登録方法**: https://dash.cloudflare.com/sign-up でアカウント作成

### 6. Visual Studio Code (無料、推奨)
コードエディタです。Claude Codeと連携して使います。

- **ダウンロード**: https://code.visualstudio.com/

### 7. Claude Code (有料)
AI開発アシスタントです。このプロジェクトは Claude Code での使用を前提としています。

- **公式サイト**: https://claude.ai/
- **インストール方法**: VS Codeの拡張機能から「Claude Code」を検索してインストール

### 8. Unsplash 開発者アカウント (無料、オプション)
無料で高品質な画像を使うためのサービスです。

- **登録方法**:
  1. https://unsplash.com/developers にアクセス
  2. "Register as a developer" でアカウント登録
  3. "New Application" で新しいアプリケーションを作成
  4. Access Key をコピーしてメモ（後で使います）

**注意**: Unsplash APIキーがなくてもプロジェクトは動作します。画像検索機能のみが使えなくなります。

---

## 🚀 セットアップ手順（所要時間: 約10分）

### ステップ1: プロジェクトをダウンロード

ターミナル（またはVS Codeのターミナル）で以下のコマンドを実行します。

```bash
git clone https://github.com/toiee-lab/eleventy-tailwind-wich-claude-code-starter.git
mv eleventy-tailwind-wich-claude-code-starter <your-project-name>
cd <your-project-name>
rm -rf .git
```

**何をしているか？**
- `git clone`: GitHubからプロジェクトをダウンロード
- `mv`: フォルダ名を変更（`<your-project-name>` は好きな名前に変えてください）
- `cd`: フォルダの中に移動
- `rm -rf .git`: 元のGit履歴を削除（新しくGitを初期化するため）

### ステップ2: 必要なパッケージをインストール

```bash
npm install
```

**何をしているか？**
- `npm install`: プロジェクトに必要なライブラリ（Eleventy、Tailwind CSS等）をインストール
- **所要時間**: 環境によって1〜3分程度

**成功の確認**: `node_modules` フォルダが作成され、エラーが表示されなければOKです。

### ステップ3: Unsplash APIキーの設定（オプション）

画像検索機能を使いたい場合のみ実行してください。

```bash
cp .env.local.example .env.local
```

次に、`.env.local` ファイルをエディタで開いて、以下の部分を編集します。

```
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

↓

```
UNSPLASH_ACCESS_KEY=（あなたのUnsplash Access Key）
```

**保存して閉じます。**

### ステップ4: Gitの初期化（推奨）

変更履歴を管理するために、Gitを初期化します。

```bash
git init
git add .
git commit -m "初期セットアップ"
```

### ステップ5: 動作確認

開発サーバーを起動して、ブラウザで確認します。

```bash
npm run serve
```

**成功の確認**:
- ターミナルに `[Browsersync] Access URLs:` と表示される
- ブラウザで `http://localhost:8080` （ポート番号は表示を確認）を開く
- サンプルページが表示されればOK！

**サーバーの停止方法**: ターミナルで `Ctrl + C` を押す

---

## 📁 プロジェクト構造

プロジェクトのディレクトリ構成を理解しましょう。**太字**のファイル/フォルダは、編集する可能性が高いものです。

```
eleventy-tailwind-starter/
├── **src/**                      # ソースファイル（あなたが編集する場所）
│   ├── **_data/**                # サイト全体のデータ
│   │   ├── **metadata.json**     # サイトのメタ情報
│   │   ├── **navigation.json**   # ナビゲーションメニュー
│   │   └── **site.json**         # サイト設定（タイトル、URLなど）
│   ├── _includes/              # テンプレート・レイアウト
│   │   ├── layouts/
│   │   │   └── base.njk        # ベーステンプレート（基本は触らない）
│   │   └── components/         # 再利用可能なコンポーネント
│   │       ├── header.njk      # ヘッダー
│   │       └── footer.njk      # フッター
│   ├── **assets/**               # 静的アセット
│   │   ├── **css/**
│   │   │   └── **tailwind.css**  # Tailwindのカスタム設定、カスタムCSS
│   │   ├── js/
│   │   │   └── main.js         # JavaScript
│   │   └── **images/**           # 画像ファイル（ここに画像を追加）
│   ├── **index.njk**             # トップページ
│   ├── **features.njk**          # 機能ページ
│   ├── **howto.njk**             # 使い方ページ
│   ├── **contact.njk**           # お問い合わせページ
│   ├── 404.njk                 # 404エラーページ
│   ├── feed.njk                # RSSフィード
│   ├── sitemap.njk             # サイトマップ
│   ├── robots.txt              # クローラー設定
│   ├── favicon.ico             # ファビコン
│   └── _redirects              # リダイレクト設定
│
├── _site/                      # ビルド出力（自動生成、触らない）
│
├── dev-tools/                  # 開発用ツール
│   └── unsplash-search.js      # Unsplash画像検索スクリプト
│
├── **project-docs/**             # プロジェクトドキュメント（あなたのメモ用）
│   └── cloudflare-pages-deployment.md  # デプロイ手順
│
├── eleventy.config.js          # 11ty設定ファイル（基本は触らない）
├── package.json                # Node.js依存関係
├── package-lock.json           # 依存関係のロックファイル（触らない）
├── .gitignore                  # Git除外設定
├── **.env.local**                # 環境変数（APIキー等、Git管理外）
├── .env.local.example          # 環境変数のサンプル
├── **CLAUDE.md**                 # AI用指示書（重要！）
└── **README.md**                 # このファイル
```

### 編集してよいファイル・フォルダ

- **src/** 配下のすべてのファイル（特に `.njk` ファイル）
- **src/_data/** 配下のJSONファイル
- **src/assets/css/tailwind.css**
- **src/assets/images/** に画像を追加
- **CLAUDE.md**（プロジェクトの方針を変更する際）
- **project-docs/** にメモや資料を追加

### 触らないファイル・フォルダ

- **_site/** （ビルド時に自動生成される）
- **node_modules/** （パッケージのインストール先）
- **package-lock.json**
- **eleventy.config.js**（高度な設定変更が必要な場合のみ）

---

## 📝 コマンド一覧

プロジェクトで使うコマンドと、それぞれの用途を説明します。

| コマンド | 説明 | いつ使う？ |
|---------|------|----------|
| `npm install` | 依存関係をインストール | 初回セットアップ時、または `package.json` を更新した後 |
| `npm run serve` | 開発サーバーを起動 | 編集中にリアルタイムでプレビュー確認したいとき |
| `npm start` | `npm run serve` と同じ | お好みで |
| `npm run build` | 本番用にビルド | デプロイ前に実行（最適化されたファイルが `_site/` に生成される） |
| `npm run build:dev` | 開発用にビルド | ローカルで `_site/` の内容を確認したいとき（最適化なし） |
| `npm run clean` | `_site/` フォルダを削除 | ビルドをクリーンな状態からやり直したいとき |
| `npm run reset` | クリーン後に再インストール | 依存関係に問題が起きたとき |
| `npm run search` | Unsplash画像を検索 | コマンドラインから画像を検索したいとき（例: `npm run search "coffee shop"`） |

### よく使うコマンドの組み合わせ

**開発時の基本フロー**
```bash
npm run serve  # サーバー起動
# ブラウザで確認しながら編集
# Ctrl+C でサーバー停止
```

**デプロイ前の確認**
```bash
npm run build  # 本番用ビルド
# エラーが出ないか確認
```

**トラブル時**
```bash
npm run reset  # 依存関係をリセット
npm run build  # 再ビルド
```

---

## 📖 CLAUDE.md について

**CLAUDE.md** は、Claude AI への指示書です。このファイルがこのプロジェクトの「説明書」であり、Claudeはこのファイルを読んで、プロジェクトの方針、制約、ベストプラクティスを理解します。

### CLAUDE.md の役割

- **プロジェクトの方針を伝える**: デザイン哲学、技術仕様、ディレクトリ構成など
- **制約を設定する**: 「テンプレート変数を固定値に置き換えない」などのルール
- **ベストプラクティスを共有**: Tailwind CSS の使い方、画像最適化の方法など

### いつ編集すべきか

- **プロジェクトの方針が変わったとき**
  - 例: ブログ機能を追加する → 記事作成の指示をCLAUDE.mdに追加
  - 例: デザイン方針を変更 → デザインガイドラインをCLAUDE.mdに追記

- **繰り返し発生する問題を防ぎたいとき**
  - 例: Claudeが毎回同じミスをする → ルールをCLAUDE.mdに明記

### 編集例

```markdown
# CLAUDE.md

## ブログ記事の作成ルール

- 記事は `src/posts/` ディレクトリに保存
- ファイル名は `YYYY-MM-DD-title.md` 形式
- Front Matterに `title`, `date`, `tags` を必須で含める
```

**重要**: CLAUDE.mdを編集したら、Claudeに「CLAUDE.mdを読み直してください」と指示すると反映されます。

---

## 🎯 基本的な使い方

Claude Code を使った基本的な開発フローを説明します。

### 1. Claude Code を起動

1. VS Codeでプロジェクトフォルダを開く
2. Claude Codeを起動（拡張機能から）
3. プロジェクトを認識させる

### 2. Plan Mode を活用（推奨）

複雑な作業をする前に、**Plan Mode** を使うと失敗が減ります。

- **起動方法**: `Shift + Tab` で切り替えて「Plan Mode」を選択
- **メリット**: Claudeが実行前に計画を立て、確認を求めてくれる

### 3. 依頼のコツ

Claude Code に依頼するときのコツをまとめます。

#### ✅ 良い依頼の例

```
トップページのヒーローセクションを編集してください。

## 変更内容
- 背景画像を「コーヒーショップ」のイメージに変更
- タイトルを「最高のコーヒー体験」に変更
- 説明文を「厳選された豆から淹れる一杯」に変更

## 注意点
- 現在のレイアウトは維持してください
- カラーパレットは変更しないでください
```

**ポイント**:
- 具体的に何をしたいか明記
- 変更してほしい箇所を箇条書き
- 変更してほしくない箇所も伝える

#### ❌ 良くない依頼の例

```
トップページをかっこよくして
```

**問題点**:
- 「かっこよく」が抽象的
- どこをどう変えたいのか不明

### 4. 全体像と目的を伝える

Claudeは「なぜそれをするのか」を理解すると、より良い提案をしてくれます。

```
このWebサイトは、地域のカフェを紹介するサイトです。
温かみのある、親しみやすいデザインにしたいと考えています。

その方針で、トップページのヒーローセクションを作成してください。
```

### 5. 小さくコミット

作業を進める中で、こまめにGitコミットしましょう。

```bash
git add .
git commit -m "ヒーローセクションの画像を変更"
```

**メリット**:
- 失敗したら前の状態に戻せる
- 変更履歴が残る

### 6. Claudeをリセット

長時間使っていると、Claudeの文脈が混乱することがあります。定期的に `/exit` でリセットしましょう。

---

## 🛠️ よくあるタスク

日常的によく行うタスクの手順をまとめます。

### タスク1: 新しいページを追加する

**Claude Codeへの依頼例**:

```
新しいページ「サービス紹介」を追加してください。

## ページ情報
- URL: /services/
- タイトル: 私たちのサービス
- 内容: 以下のサービスを紹介
  1. コーヒー豆の販売
  2. バリスタ講座
  3. イベントスペース貸出

## デザイン
- トップページと同じデザインテイストで
- セクションごとにアイコンとテキストで構成

## 注意点
- ナビゲーションメニューにも追加してください
```

### タスク2: ナビゲーションメニューを編集する

**手動で編集する場合**:

`src/_data/navigation.json` を開いて編集します。

```json
[
  {
    "text": "ホーム",
    "url": "/",
    "icon": "home"
  },
  {
    "text": "サービス",  // 追加
    "url": "/services/",
    "icon": "briefcase"
  }
]
```

**Claude Codeに依頼する場合**:

```
ナビゲーションメニューに「サービス」ページへのリンクを追加してください。
アイコンは "briefcase" を使ってください。
```

### タスク3: カラーパレットを変更する

**Claude Codeへの依頼例**:

```
サイト全体のカラーパレットを変更してください。

## 新しいカラー
- プライマリカラー: #2C3E50（ダークブルー）
- セカンダリカラー: #E74C3C（レッド）
- アクセントカラー: #F39C12（オレンジ）

tailwind.css を編集して、これらの色を設定してください。
```

### タスク4: ロゴと画像を差し替える

**画像ファイルの配置**:

1. 画像ファイルを `src/assets/images/` に追加
2. Claude Codeに依頼

**Claude Codeへの依頼例**:

```
ヘッダーのロゴ画像を変更してください。

## 変更内容
- 画像パス: /assets/images/my-logo.png
- 高さ: 32px（Retinaディスプレイ対応のため、画像は64pxで作成済み）

src/_includes/components/header.njk を編集してください。
```

### タスク5: Unsplash から画像を取得

**Claude Codeへの依頼例**:

```
トップページのヒーローセクションの背景画像を、Unsplashから「コーヒーショップ」で検索して設定してください。

画像は横長で、明るめのものを選んでください。
```

Claudeが自動的にUnsplash APIを使って画像を検索し、適用してくれます。

### タスク6: お問い合わせフォームをカスタマイズ

**Claude Codeへの依頼例**:

```
お問い合わせフォームに以下のフィールドを追加してください。

## 追加するフィールド
- 電話番号（任意）
- 希望日時（日付ピッカー）

バリデーションも適切に設定してください。
```

---

## 🚀 デプロイ方法

作成したWebサイトをCloudflare Pagesで公開する手順です。

### ステップ1: GitHubにリポジトリを作成してプッシュ

1. https://github.com/new でリポジトリ作成
2. ローカルのコードをプッシュ

```bash
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
```

### ステップ2: Cloudflare Pagesにアクセス

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. 左サイドバーから **Workers & Pages** を選択
3. **Create application** ボタンをクリック
4. **Pages** タブを選択
5. **Connect to Git** をクリック

### ステップ3: GitHubリポジトリを接続

1. **GitHub** を選択
2. 必要に応じてCloudflareにGitHubアクセスを許可
3. デプロイしたいリポジトリを選択
4. **Begin setup** をクリック

### ステップ4: ビルド設定を構成

以下の設定を入力します：

| 設定項目 | 値 |
|---------|-----|
| **Project name** | 任意のプロジェクト名（例: my-eleventy-site） |
| **Production branch** | `main` または `master` |
| **Framework preset** | `None` または `Eleventy` |
| **Build command** | `npm run build` |
| **Build output directory** | `_site` |

### ステップ5: 環境変数を設定（オプション）

Unsplash APIを使用している場合：

1. **Environment variables (advanced)** セクションを展開
2. **Add variable** をクリック
3. 以下を追加：
   - **Variable name**: `UNSPLASH_ACCESS_KEY`
   - **Value**: あなたのUnsplash Access Key

### ステップ6: デプロイを開始

1. **Save and Deploy** ボタンをクリック
2. ビルドプロセスが開始されます（通常1〜3分）
3. デプロイが完了すると、`https://your-project.pages.dev` のようなURLが発行されます

### デプロイ前の確認事項

以下のファイルを本番環境用に変更してください。

#### src/_data/site.json

```json
{
  "title": "あなたのサイト名",
  "description": "あなたのサイトの説明",
  "url": "https://your-project.pages.dev",  // ← ここを変更
  "author": "あなたの名前",
  ...
}
```

#### eleventy.config.js

```javascript
eleventyConfig.addPlugin(pluginSitemap, {
  sitemap: {
    hostname: "https://your-project.pages.dev"  // ← ここを変更
  }
});
```

**変更後、再度GitHubにプッシュすると自動的に再デプロイされます。**

### デプロイ後の設定

#### カスタムドメインの設定（オプション）

1. Cloudflare Pagesのプロジェクトページで **Custom domains** タブを選択
2. **Set up a custom domain** をクリック
3. ドメイン名を入力し、指示に従ってDNS設定を行う
4. カスタムドメインを設定したら、`site.json` と `eleventy.config.js` のURLを更新してプッシュ

#### 自動デプロイについて

Cloudflare Pagesは、GitHubリポジトリへのプッシュを検知して自動的にデプロイします：

- **Production branch** (`main`/`master`)へのプッシュ → 本番環境にデプロイ
- **その他のブランチ** → プレビュー環境にデプロイ（`https://branch-name.your-project.pages.dev`）

#### ビルドログの確認

1. Cloudflare Pagesのプロジェクトページ
2. **Deployments** タブを選択
3. 任意のデプロイをクリックしてログを確認

### デプロイ時のトラブルシューティング

#### ビルドが失敗する場合

**Node.jsバージョンの指定**

`package.json` に以下を追加：

```json
{
  "engines": {
    "node": ">=22.0.0"
  }
}
```

または、Cloudflare Pagesの環境変数に以下を追加：
- **Variable name**: `NODE_VERSION`
- **Value**: `22`

#### 環境変数が反映されない場合

1. 環境変数を追加/変更した後は、手動で再デプロイが必要
2. **Deployments** タブから **Retry deployment** をクリック

#### デプロイ後に画像が表示されない場合

- `src/assets/images/` 配下のファイルが正しくコミットされているか確認
- `eleventy.config.js` の `addPassthroughCopy` 設定を確認

### 便利なTips

#### プレビュー環境の活用

ブランチを作成して変更をプッシュすると、本番環境に影響を与えずにプレビュー環境で確認できます：

```bash
git checkout -b feature/new-design
# 変更を加える
git add .
git commit -m "新しいデザインを追加"
git push origin feature/new-design
```

プレビューURL: `https://feature-new-design.your-project.pages.dev`

確認後、問題なければmainブランチにマージしてデプロイします。

### 参考リンク

- [Cloudflare Pages ドキュメント](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages デプロイ設定](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Eleventy 公式ドキュメント](https://www.11ty.dev/)

---

## 🆘 トラブルシューティング

よくあるエラーと解決方法をまとめます。

### エラー1: `npm install` が失敗する

**症状**:
```
npm ERR! code ENOENT
npm ERR! syscall open
```

**原因**: Node.jsのバージョンが古い、または`package.json`が壊れている

**解決策**:
1. Node.jsのバージョンを確認: `node --version`（22以上必要）
2. Node.jsを最新版に更新: https://nodejs.org/
3. `package-lock.json` を削除して再実行:
   ```bash
   rm package-lock.json
   npm install
   ```

### エラー2: `npm run serve` が起動しない

**症状**:
```
Error: listen EADDRINUSE: address already in use :::8080
```

**原因**: ポート8080が既に使われている

**解決策**:

**方法1: 既存のプロセスを停止**
```bash
lsof -i :8080  # ポート8080を使っているプロセスを確認
kill <プロセスID>  # 表示されたプロセスIDで停止
```

**方法2: 別のポートを使う**
Eleventyが自動的に別のポート（8081、8082...）を使ってくれます。ターミナルの表示を確認してください。

### エラー3: CSSが反映されない

**症状**: スタイルが適用されず、デザインが崩れている

**原因**: Tailwind CSSのビルドが失敗している、またはキャッシュの問題

**解決策**:
1. サーバーを停止（Ctrl+C）
2. クリーンビルド:
   ```bash
   npm run clean
   npm run build:dev
   npm run serve
   ```
3. ブラウザのキャッシュをクリア（Ctrl+Shift+R または Cmd+Shift+R）

### エラー4: 画像が表示されない

**症状**: 画像のパスが正しいのに表示されない

**原因**: 画像ファイルが `src/assets/images/` にない、またはパスが間違っている

**解決策**:
1. 画像ファイルが `src/assets/images/` に存在するか確認
2. パスが `/assets/images/your-image.png` になっているか確認（先頭の `/` が重要）
3. ビルドし直す:
   ```bash
   npm run build:dev
   ```

### エラー5: Unsplash APIが動作しない

**症状**: 画像検索ができない、またはエラーが出る

**原因**: APIキーが設定されていない、または無効

**解決策**:
1. `.env.local` ファイルが存在するか確認
2. APIキーが正しく設定されているか確認
3. Unsplashのダッシュボードでアプリケーションが有効か確認
4. APIキーを再生成して設定し直す

### エラー6: ビルドエラー（Nunjucksテンプレート）

**症状**:
```
Template render error: expected variable end
```

**原因**: Nunjucksの構文エラー（`{{` や `}}` の閉じ忘れなど）

**解決策**:
1. エラーメッセージに表示されているファイル名と行数を確認
2. 該当箇所のNunjucks構文を確認
3. `{{` と `}}` が正しくペアになっているか確認
4. Claude Codeに「〇〇.njk の構文エラーを修正してください」と依頼

### エラー7: デプロイ後にローカルと見た目が違う

**症状**: Cloudflare Pagesにデプロイしたら、ローカルと見た目が違う

**原因**: 環境変数が設定されていない、またはパスの問題

**解決策**:
1. Cloudflare Pagesの環境変数を確認
2. `site.json` の `url` が本番URLに設定されているか確認
3. Cloudflare Pagesで再デプロイ

### エラー8: Gitコミットできない

**症状**: `git commit` が失敗する

**原因**: Gitの初期設定が済んでいない

**解決策**:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git commit -m "commit message"
```

### それでも解決しない場合

1. `npm run reset` で依存関係をリセット
2. プロジェクトを再度クローン
3. Claude Codeに詳しいエラーメッセージを貼り付けて相談
4. GitHubのIssuesで質問: https://github.com/toiee-lab/claude11wind-starter/issues

---

## 💡 Claude Code プロンプト例集

実際によく使うプロンプトをまとめます。コピー＆ペーストして使ってください。

### 初回セットアップ: トップページ作成

```
Webサイトを、今から作り始めます。まずは、テンプレートを作りたいです。以下を参考にテンプレートの編集と、トップページを作成してください。

## Webサイトについて

- プロジェクト名: （あなたのプロジェクト名）
- 概要: （Webサイトの概要）
- デザイン: シンプル、クリーン、控えめ、モダン
- 対象者: （ターゲット）

カラーや、コンテンツは、Claudeさん、あなたが考えてください。

## Webサイトの構成（予定）

- トップページ
- （その他のページ）

## あなたの今回のタスクについて

**まずは、トップページをデザインしてください。** デザインを確認し、良いと判断した後、その他のページを作成します。

トップページをデザインする中で、以下を編集することができます。

- tailwind.css
- src/_includes （ナビ、フッター、全体）

ナビについては、以下の通りです。

- Webサイトのロゴ部分は、ふさわしいアイコンを選び、テキストで構成
- ナビやフッターは、仮のリンクを設定する

トップページの内容について

- ヒーローセクションから始まる「セクション構成」を考えてください
- 既存の index.njk のセクション構成とは関係なく、今回のプロジェクトにふさわしいセクションと順番を考えてください

---

では、早速「デザインを決めるためにトップページの作成、およびテンプレート編集、ナビ編集」を開始してください。
最初は、私の依頼内容を深く理解し、どのような順番で実行するかの計画を深く考え、それから実装を開始してください。
```

### ナビの文字色を修正

```
初期状態のナビの文字色が白色なので、見えづらいです。黒系の色にしてください。
現状は、http://localhost:8080/ で確認してください。
```

### 404ページの作成

```
トップページをベースに、404ページを再作成してください。

## デザイン
- トップページと同じヘッダー・フッター
- メインコンテンツは「ページが見つかりません」というメッセージ
- トップページに戻るボタンを設置
```

### ブログ機能の追加

```
ブログ機能を追加したいです。プランモードで、ステップごとに確認しながら進めてください。

## やりたいこと
1. ブログ記事を管理できる仕組みを作る（サンプルで3記事ぐらい）
2. ブログ一覧ページを作成
3. 記事詳細ページを作成
4. ナビゲーションに「ブログ」を追加

## デザイン
- トップページと統一感のあるデザイン
- 記事一覧はカード形式で表示
- タグやカテゴリで絞り込めるようにする
```

### カラーパレットの変更

```
サイト全体のカラーパレットを変更してください。

## 新しいカラー
- プライマリカラー: #3B82F6（ブルー）
- セカンダリカラー: #10B981（グリーン）
- アクセントカラー: #F59E0B（アンバー）
- テキストカラー: #1F2937（ダークグレー）
- 背景カラー: #F9FAFB（ライトグレー）

tailwind.css を編集して、これらの色をカスタムカラーとして設定してください。
既存のページにも適用されるように、適切に設定してください。
```

### セクションの追加

```
トップページに「お客様の声」セクションを追加してください。

## 配置
- 「サービス紹介」セクションの後

## 内容
- 3つのお客様の声をカード形式で表示
- 各カードには、顔写真（Unsplashから）、名前、役職、コメントを含める
- レスポンシブで、モバイルでは縦に並ぶようにする

## デザイン
- 既存のデザインと統一感を持たせる
- カードには軽い影を付ける
```

### フォームのカスタマイズ

```
お問い合わせフォームを以下のようにカスタマイズしてください。

## 追加するフィールド
- 電話番号（任意）
- お問い合わせ内容のカテゴリ（ドロップダウン: サービスについて、料金について、その他）
- 添付ファイル（任意）

## バリデーション
- メールアドレスの形式チェック
- 電話番号の形式チェック（ハイフンあり・なし両方OK）
- 必須フィールドの入力チェック

## デザイン
- 既存のデザインと統一
- エラーメッセージは赤色で表示
```

### OGP画像の設定

```
OGP（Open Graph Protocol）画像を設定したいです。

## やりたいこと
1. デフォルトのOGP画像を作成（1200x630px）
2. 各ページでOGP画像を設定できるようにする
3. site.json に OGP画像のパスを設定

## 画像
- Unsplashから「modern web design」で検索して、適切な画像を選んでください
- テキストオーバーレイで「Claude11Wind Starter」を表示
```

### レスポンシブの調整

```
モバイル表示を確認したところ、以下の問題がありました。修正してください。

## 問題点
1. ヒーローセクションのタイトルが大きすぎて、モバイルで折り返しがおかしい
2. ナビゲーションメニューがモバイルで横に並んで見づらい
3. お問い合わせフォームのボタンが小さい

## 修正内容
1. タイトルのフォントサイズをモバイルで小さくする
2. ナビゲーションをハンバーガーメニューに変更
3. ボタンのサイズを `w-full` にする（モバイルのみ）

現状は、http://localhost:8080/ で確認してください。
```

### アニメーションの追加

```
トップページにスクロールアニメーションを追加してください。

## やりたいこと
- 各セクションが画面に入ったときにフェードインする
- 控えめなアニメーション（過度な演出は避ける）

## 使うライブラリ
- AOS（Animate On Scroll）
- または、Animate.css + Intersection Observer API

## 注意点
- ベストプラクティスに従って実装
- パフォーマンスに影響を与えないようにする
```

---

## 🙏 サポート・フィードバック

### 質問・バグ報告

- GitHubのIssues: https://github.com/toiee-lab/claude11wind-starter/issues

### コントリビューション

プルリクエストを歓迎します！改善提案やバグ修正があれば、ぜひご協力ください。

---

## 📄 ライセンス

MIT License

---

**Happy Coding with Claude! 🚀**
