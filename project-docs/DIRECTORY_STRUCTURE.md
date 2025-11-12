# ディレクトリ構造詳細ガイド

このドキュメントは、プロジェクトの完全なディレクトリ構造と、各ディレクトリの役割を詳細に説明します。

## 完全なディレクトリ構造

```
eleventy-project/
├── src/                          # ソースファイル（11tyが処理）
│   ├── _data/                   # グローバルデータ
│   │   ├── metadata.json       # サイトメタ情報
│   │   ├── navigation.json     # ナビゲーションメニュー
│   │   ├── site.json           # サイト基本設定
│   │   ├── team.json           # チームメンバー（個別ページ不要）
│   │   ├── testimonials.json   # 顧客の声（個別ページ不要）
│   │   └── faq.json            # FAQ（個別ページ不要）
│   │
│   ├── _includes/              # テンプレート
│   │   ├── layouts/            # レイアウト
│   │   │   ├── base.njk       # ベースレイアウト
│   │   │   ├── blog-post.njk  # ブログ記事レイアウト
│   │   │   ├── news-post.njk  # お知らせレイアウト
│   │   │   └── portfolio-item.njk  # 実績レイアウト
│   │   └── components/         # 再利用コンポーネント
│   │       ├── header.njk
│   │       ├── footer.njk
│   │       ├── team-card.njk
│   │       └── testimonial-card.njk
│   │
│   ├── assets/                 # 静的アセット
│   │   ├── css/
│   │   │   └── tailwind.css   # Tailwindスタイル
│   │   ├── js/
│   │   │   └── main.js        # メインJavaScript
│   │   └── images/
│   │       ├── team/          # チーム写真
│   │       ├── blog/          # ブログ画像
│   │       ├── portfolio/     # 実績画像
│   │       └── og-images/     # OGP画像
│   │
│   ├── blog/                   # ブログ（個別ページあり）
│   │   ├── blog.json          # ディレクトリデータ（共通設定）
│   │   ├── 2025-01-15-first-post.md
│   │   ├── 2025-01-20-second-post.md
│   │   └── index.njk          # ブログ一覧ページ
│   │
│   ├── news/                   # お知らせ（個別ページあり）
│   │   ├── news.json          # ディレクトリデータ
│   │   ├── 2025-01-10-announcement.md
│   │   └── index.njk          # お知らせ一覧ページ
│   │
│   ├── portfolio/              # 実績（個別ページあり）
│   │   ├── portfolio.json     # ディレクトリデータ
│   │   ├── project-a.md
│   │   ├── project-b.md
│   │   └── index.njk          # 実績一覧ページ
│   │
│   ├── index.njk              # トップページ
│   ├── about.njk              # Aboutページ
│   ├── team.njk               # チームページ（_data/team.jsonを使用）
│   ├── contact.njk            # お問い合わせページ
│   ├── 404.njk                # 404エラーページ
│   ├── feed.njk               # RSSフィード
│   ├── sitemap.njk            # サイトマップ
│   └── robots.txt             # クローラー設定
│
├── _site/                      # ビルド出力（自動生成、Git管理外）
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css       # コンパイル済みCSS
│   │   ├── js/
│   │   │   └── main.js
│   │   └── images/
│   │       ├── optimized/     # 最適化された画像
│   │       └── ...
│   ├── blog/
│   │   ├── index.html
│   │   ├── first-post/
│   │   │   └── index.html
│   │   └── second-post/
│   │       └── index.html
│   ├── index.html
│   ├── about/
│   │   └── index.html
│   └── ...
│
├── dev-tools/                  # 開発用ツール
│   └── unsplash-search.js     # Unsplash画像検索スクリプト
│
├── project-docs/               # プロジェクトドキュメント（ユーザーのメモ用）
│   ├── COLLECTION_DETAILED_GUIDE.md  # Collections完全ガイド
│   ├── GLOBAL_DATA_GUIDE.md          # Global Data完全ガイド
│   ├── DIRECTORY_STRUCTURE.md        # このファイル
│   └── examples/                      # 実装例
│       ├── NEWS_FEATURE.md
│       ├── TEAM_PAGE.md
│       ├── TESTIMONIALS.md
│       └── PORTFOLIO.md
│
├── eleventy.config.js          # 11ty設定ファイル
├── package.json                # Node.js依存関係
├── package-lock.json           # 依存関係のロックファイル
├── .gitignore                  # Git除外設定
├── .env.local.example          # 環境変数のサンプル
├── CLAUDE.md                   # AI用指示書
└── README.md                   # プロジェクト説明
```

## 各ディレクトリの詳細

### src/ - ソースファイル

11tyが処理するすべてのファイルを格納。

| ディレクトリ | 役割 | 編集 | 備考 |
|------------|------|-----|------|
| **src/** | ソースファイル | ✓ | 11tyが処理するすべてのファイル |
| **src/_data/** | グローバルデータ | ✓ | サイト全体で使うデータ |
| **src/_includes/** | テンプレート | ✓ | レイアウトとコンポーネント |
| **src/assets/** | 静的アセット | ✓ | CSS、JS、画像 |
| **src/blog/** | ブログコンテンツ | ✓ | Markdownファイルで記事作成 |
| **src/news/** | お知らせ | ✓ | Markdownファイルでお知らせ作成 |
| **src/portfolio/** | 実績 | ✓ | Markdownファイルで実績作成 |

### src/_data/ - グローバルデータ

サイト全体で使用するデータファイルを配置。

**用途**:
- サイト設定（`site.json`）
- ナビゲーションメニュー（`navigation.json`）
- チームメンバー（`team.json`）
- 顧客の声（`testimonials.json`）
- FAQ（`faq.json`）

**ファイル形式**:
- JSON形式（`.json`）
- JavaScript形式（`.js`）- 動的データの場合

**詳細**: [Global Data完全ガイド](GLOBAL_DATA_GUIDE.md)

### src/_includes/ - テンプレート

#### layouts/ - レイアウトテンプレート

ページ全体の構造を定義するレイアウトファイル。

- `base.njk`: すべてのページの基本レイアウト（HTML骨格、ヘッダー、フッター）
- `blog-post.njk`: ブログ記事用レイアウト
- `news-post.njk`: お知らせ用レイアウト
- `portfolio-item.njk`: 実績紹介用レイアウト

#### components/ - 再利用可能なコンポーネント

複数ページで使い回す小さなパーツ。

- `header.njk`: ヘッダーコンポーネント
- `footer.njk`: フッターコンポーネント
- `team-card.njk`: チームメンバーカード
- `testimonial-card.njk`: 顧客の声カード

### src/assets/ - 静的アセット

#### css/ - スタイルシート

- `tailwind.css`: Tailwind CSS v4の設定とカスタムスタイル

#### js/ - JavaScript

- `main.js`: サイト全体で使用するJavaScript

#### images/ - 画像

- `team/`: チームメンバーの写真
- `blog/`: ブログ記事の画像
- `portfolio/`: 実績紹介の画像
- `og-images/`: OGP画像（SNSシェア用）

### src/blog/ - ブログコンテンツ（Collections）

ブログ機能を実装するディレクトリ。

**構成**:
- `blog.json`: ディレクトリデータファイル（共通設定）
- `YYYY-MM-DD-slug.md`: 個別の記事ファイル
- `index.njk`: ブログ一覧ページ

**詳細**: [Collections完全ガイド](COLLECTION_DETAILED_GUIDE.md)

### src/news/ - お知らせ（Collections）

お知らせ機能を実装するディレクトリ。

**構成**:
- `news.json`: ディレクトリデータファイル（共通設定）
- `YYYY-MM-DD-slug.md`: 個別のお知らせファイル
- `index.njk`: お知らせ一覧ページ

**詳細**: [実装例: お知らせ機能](examples/NEWS_FEATURE.md)

### src/portfolio/ - 実績紹介（Collections）

実績・ポートフォリオを実装するディレクトリ。

**構成**:
- `portfolio.json`: ディレクトリデータファイル（共通設定）
- `project-name.md`: 個別の実績ファイル
- `index.njk`: 実績一覧ページ

**詳細**: [実装例: ポートフォリオ](examples/PORTFOLIO.md)

### 固定ページ（src/ 直下）

- `index.njk`: トップページ
- `about.njk`: Aboutページ
- `team.njk`: チームページ（`_data/team.json`を使用）
- `contact.njk`: お問い合わせページ
- `404.njk`: 404エラーページ
- `feed.njk`: RSSフィード
- `sitemap.njk`: サイトマップ
- `robots.txt`: クローラー設定

### _site/ - ビルド出力

11tyが自動生成する静的サイト。**このディレクトリは編集しない**。

**内容**:
- コンパイル済みHTML
- 最適化されたCSS
- 最適化された画像
- すべての静的アセット

**デプロイ**: このディレクトリをCloudflare Pagesにデプロイする。

### dev-tools/ - 開発用ツール

開発支援スクリプトを格納。

- `unsplash-search.js`: Unsplash画像検索スクリプト

### project-docs/ - プロジェクトドキュメント

ユーザーが自由に使えるメモ・資料スペース。

**システムが提供するドキュメント**:
- `COLLECTION_DETAILED_GUIDE.md`: Collections完全ガイド
- `GLOBAL_DATA_GUIDE.md`: Global Data完全ガイド
- `DIRECTORY_STRUCTURE.md`: このファイル
- `examples/`: 実装例集

**ユーザーが追加できるもの**:
- コンテンツ原稿
- デザインカンプ
- プロジェクト企画書
- メモ

## コンテンツタイプ別の使い分け

### 1. 個別ページが必要なコンテンツ → 専用ディレクトリ + Collections

- **ブログ記事** → `src/blog/`
- **お知らせ** → `src/news/`
- **実績紹介** → `src/portfolio/`
- **製品・サービス** → `src/products/`
- **イベント情報** → `src/events/`

**構成例**:
```
src/blog/
├── blog.json              # 共通設定
├── 2025-01-15-post.md     # 記事ファイル
└── index.njk              # 一覧ページ
```

### 2. 一覧表示のみのコンテンツ → `_data/` + Global Data

- **チームメンバー** → `_data/team.json`
- **顧客の声** → `_data/testimonials.json`
- **FAQ** → `_data/faq.json`
- **実績数値** → `_data/stats.json`
- **パートナー企業** → `_data/partners.json`

**データファイル例**:
```json
[
  {
    "name": "山田太郎",
    "role": "代表取締役",
    "image": "/assets/images/team/yamada.jpg"
  }
]
```

### 3. 固定ページ → `src/` 直下

- **トップページ** → `index.njk`
- **Aboutページ** → `about.njk`
- **お問い合わせ** → `contact.njk`
- **プライバシーポリシー** → `privacy.njk`

## ディレクトリデータファイル（Directory Data Files）

各コレクションディレクトリに配置する共通設定ファイル。

**src/blog/blog.json**:
```json
{
  "layout": "layouts/blog-post.njk",
  "tags": "blog",
  "permalink": "/blog/{{ page.fileSlug }}/",
  "eleventyComputed": {
    "ogImage": "/assets/images/og-images/{{ page.fileSlug }}.jpg"
  }
}
```

このファイルにより、`blog/` ディレクトリ内のすべてのMarkdownファイルに共通設定が適用されます。

## プロジェクトの拡張パターン

### パターン1: ブログ機能を追加

```
src/blog/
├── blog.json
├── 2025-01-15-first-post.md
└── index.njk
```

### パターン2: お知らせ機能を追加

```
src/news/
├── news.json
├── 2025-01-10-announcement.md
└── index.njk
```

### パターン3: チームメンバーを追加

```
src/_data/team.json  # データファイルのみ
src/team.njk         # 表示ページ
```

### パターン4: 顧客の声を追加

```
src/_data/testimonials.json  # データファイル
src/_includes/components/testimonial-card.njk  # コンポーネント
# トップページや専用ページで表示
```

## ファイル命名規則

### Markdownファイル（Collections）

**ブログ・お知らせ**:
- 形式: `YYYY-MM-DD-slug.md`
- 例: `2025-01-15-first-post.md`

**実績・ポートフォリオ**:
- 形式: `project-name.md`
- 例: `acme-website-redesign.md`

### データファイル（Global Data）

- 形式: `name.json` または `name.js`
- 例: `team.json`, `site.json`, `stats.js`

### テンプレートファイル

- レイアウト: `layouts/name.njk`
- コンポーネント: `components/name.njk`

## 関連ドキュメント

- [Collections完全ガイド](COLLECTION_DETAILED_GUIDE.md)
- [Global Data完全ガイド](GLOBAL_DATA_GUIDE.md)
- [実装例: お知らせ機能](examples/NEWS_FEATURE.md)
- [実装例: チームページ](examples/TEAM_PAGE.md)
- [実装例: 顧客の声](examples/TESTIMONIALS.md)
- [実装例: ポートフォリオ](examples/PORTFOLIO.md)
