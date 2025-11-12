# Claude11Wind Starter

Eleventy + Tailwind CSS v4 Starter Kit powered by Claude Code

Claude Code を使って、モダンで、シンプルで、最近っぽいデザインを持ったマルチページ構成のWebサイトを構築できるスターターキットです。 [Eleventy (11ty)](https://www.11ty.dev/)（イレブンティーと読む）と [Tailwind CSS v4.1](https://tailwindcss.com/) を組み合わせたパッケージです。

また、Unsplash から自動で画像をリンク切れをおこなさず取得するためのスクリプトと、それを使うサブエージェントも設定された状態です。ダウンロードして、すぐに使い始めることができます。

Cloudflare Pages 特化です。

## ✨ Features

- **🧠 Claude Code Optimized**: Build for No, Enginner
- **⚡ Fast & Modern**: Built with Eleventy v3.1+ and Tailwind CSS v4.1+
- **📱 Responsive**: Mobile-first design with responsive breakpoints
- **🎨 Beautiful UI**: Pre-configured with Japanese typography and professional color palette
- **🔧 Ready to Use**: Minimal setup, maximum productivity
- **🎯 SEO Optimized**: Meta tags, OpenGraph, structured data, and sitemap
- **♿ Accessible**: WCAG compliant with proper semantic HTML
- **📊 Performance**: Optimized images, minified CSS/HTML, lazy loading
- **🔄 Live Reload**: Hot reloading during development

## 🚀 始め方

### 準備するもの

- Node.js 22以上
- npm
- Claude Code
- Githubアカウント
- Cloudflareアカウント
- Visual Studio Code
- Unsplash 開発者登録して、アプリキーを取得

### Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/toiee-lab/eleventy-tailwind-wich-claude-code-starter.git
   mv eleventy-tailwind-starter <your-project-name>
   cd <your-project-name>
   rm -rf .git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run serve
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Set Unsplash API Key**
   ```bash
   cp .env.local.example .env.local
   ```
   編集してください

## 📁 作成のコツ

### 全体的なコツ

- 常に、 **plan mode (Shift+Tabで切り替えて選ぶ) を使って、何をしようとしているか確認しながら進めると良いです
- 依頼するときは、「口うるさく伝える。ちょっと、ウザがられるぐらい念押しする意識」にすると良いです
- 常に「目的」と「全体像」を示しながら依頼するとよく働いてくれます
- Gitを初期化して、小さくコミットしながら進み、適宜、変更を破棄しながら進めます
- 時々、 `/exit` して、Claudeをリセットしましょう
- プロジェクトの進行に合わせて、 CLAUDE.md を編集しましょう


### (1) 準備

- Webサイトの目的、コンセプト
- Webサイトで情報提供するものの情報
- 与えたい印象など
- メインカラー、セカンドカラー、アクセントカラー

事前に決定した上で、的確に依頼をしていく。Claude.ai で、Projectを作って、どのようさサイトづくりをするか、事前に決めておくと良いです。

### (2) 初めての依頼

```markdown
Webサイトを、今から作り始めます。まずは、テンプレートを作りたいです。以下を参考にテンプレートの編集と、トップページを作成してください。

## Webサイトについて

- プロジェクト名: Claude11Wind Starter
- 概要: 11ty と Tailwind CSS と Claude Code を使ってマルチページサイトを構築するためのスターターパック
- デザイン: シンプル、クリーン、控えめ、モダン
- 対象者: 非エンジニア、非デザイナー

カラーや、コンテンツは、Claudeさん、あなたが考えてください。

## Webサイトの構成（予定）

- トップページ
- Featureページ
- Aboutページ
- お問い合わせページ

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

出来上がったら、以下のコマンドでローカルサーバーを起動してチェック。

```bash
npm run serve
```

まだ、Claudeの性能が追いつかない（あるいは、指示が細かくない。細かくしすぎると、消費トークンが大きくなるので・・・）多くの場合、ナビのカラーリングが不完全なことが多いです。状況を確認して、以下のように指示してください。

```
初期状態のナビの文字色が白色なので、見えづらいです。黒系の色にしてください。
```

**※ 細かくコミットして、現状を保存しながら作業をしてくださいね！**

### (3) トップページを作り込む

ロゴの設定をするなどして、トップページでデザインすることで、全体のデザインの作り込みをします。以下のようなプロンプトを参考に！

- ロゴについて: 高さ32px を設定すると良いです。画像は、64pxで作成し、半分のサイズで表示することで、iPhone、Macなどの高解像度ディスプレイでぼやけないようにできます（あるいは、svgを使う）
- XXXX が、XXXXX となっています。修正してください。現状は、 http://localhost:8081/ (今見ているURLを渡す) で確認してください
- 「・・・・セクションの・・・・を・・・・のように修正してください」という形で、指示すると伝わりやすいです

### (4) 404ページを作る

トップページができたら、404ページの作成を依頼します。

```markdown
トップページをベースに、404ページを再作成してください
```

### ヒント : 起動したサーバーを停止する

**Claudeが起動したサーバー（バックグランド実行されている）を停止する**

```bash
lsof -i :8082 # Port番号はその時よって違う。 8080 から 8085 ぐらいまで順に探すと良い
kill <プロセスID> # 上記のコマンドで得られた情報で停止
```

### ヒント : ブログを作る

プランモードを使い、ステップ・バイ・ステップで作成していくと良いです。

1. 「ブログを運用できる準備をしてください」（サンプルで３記事ぐらい入る）
2. ブログのトップページ（一覧ページの作り込み）
3. 記事ページの作り込み
4. 記事作成の指示を CLAUDE.md に追加する

