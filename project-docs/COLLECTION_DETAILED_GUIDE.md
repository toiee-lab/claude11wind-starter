# Collections（コレクション）完全ガイド

このドキュメントは、Eleventy の Collections 機能の詳細な実装ガイドです。

## 目次

- [Collectionsとは](#collectionsとは)
- [基本的な実装（4ステップ）](#基本的な実装4ステップ)
- [Front Matter のベストプラクティス](#front-matter-のベストプラクティス)
- [ファイル命名規則](#ファイル命名規則)
- [カテゴリとタグの設計](#カテゴリとタグの設計)
- [トップページでの最新表示](#トップページでの最新表示)
- [前後の記事リンク](#前後の記事リンク)
- [カスタムコレクション](#カスタムコレクション高度)

## Collectionsとは

### 定義

コレクションは、関連するコンテンツをグループ化して管理・表示する仕組みです。WordPressの「投稿」や「カスタム投稿タイプ」に相当します。

### 用途

- **ブログ記事**: 各記事が個別ページを持ち、一覧ページやカテゴリページが必要
- **お知らせ**: 個別ページを持ち、トップページに最新のお知らせを表示
- **実績紹介**: 各実績が詳細ページを持ち、ポートフォリオ一覧を表示
- **ドキュメント**: 製品マニュアルなど、階層的なコンテンツ

## 基本的な実装（4ステップ）

### ステップ1: ディレクトリとディレクトリデータファイルを作成

```
src/blog/
├── blog.json              # ディレクトリデータファイル（共通設定）
├── 2025-01-15-post.md     # 記事ファイル
└── index.njk              # 一覧ページ
```

**blog.json**（ディレクトリデータファイル）:
```json
{
  "layout": "layouts/blog-post.njk",
  "tags": "blog",
  "permalink": "/blog/{{ page.fileSlug }}/"
}
```

### ステップ2: レイアウトテンプレートを作成

`src/_includes/layouts/blog-post.njk`:
```njk
---
layout: layouts/base.njk
---

<article class="prose max-w-4xl mx-auto py-12">
  <header class="mb-8">
    <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
    <time datetime="{{ date | date }}" class="text-gray-600">
      {{ date | date }}
    </time>
  </header>

  <div class="content">
    {{ content | safe }}
  </div>
</article>
```

### ステップ3: Markdownファイルで記事を作成

`src/blog/2025-01-15-first-post.md`:
```markdown
---
title: 初めてのブログ記事
date: 2025-01-15
description: 記事の説明文（SEO用）
image: /assets/images/blog/first-post.jpg
category: technology
tags:
  - blog
  - web
---

記事の本文をここに書きます。

## 見出し2

段落のテキスト...
```

### ステップ4: 一覧ページを作成

`src/blog/index.njk`:
```njk
---
layout: layouts/base.njk
title: ブログ
pagination:
  data: collections.blog
  size: 10
  alias: posts
  reverse: true
---

<div class="max-w-4xl mx-auto py-12">
  <h1 class="text-4xl font-bold mb-8">{{ title }}</h1>

  <div class="space-y-8">
    {% for post in posts %}
      <article class="border-b pb-8">
        <h2 class="text-2xl font-bold mb-2">
          <a href="{{ post.url }}" class="hover:text-blue-600">
            {{ post.data.title }}
          </a>
        </h2>
        <time class="text-gray-600">{{ post.date | date }}</time>
        <p class="mt-4">{{ post.data.description }}</p>
        <a href="{{ post.url }}" class="text-blue-600 hover:underline">
          続きを読む →
        </a>
      </article>
    {% endfor %}
  </div>

  {# ページネーション #}
  {% if pagination.href.previous or pagination.href.next %}
    <nav class="flex justify-between mt-12">
      {% if pagination.href.previous %}
        <a href="{{ pagination.href.previous }}" class="btn">← 前のページ</a>
      {% endif %}
      {% if pagination.href.next %}
        <a href="{{ pagination.href.next }}" class="btn">次のページ →</a>
      {% endif %}
    </nav>
  {% endif %}
</div>
```

## Front Matter のベストプラクティス

### 必須フィールド

```yaml
---
title: 記事タイトル         # 必須
date: 2025-01-15          # 必須（ソートに使用）
---
```

### 推奨フィールド

```yaml
---
title: 記事タイトル
date: 2025-01-15
description: 記事の説明文（SEO用） # 推奨
image: /assets/images/blog/post.jpg    # OGP画像
category: technology                   # カテゴリ
tags:                                  # 複数タグ
  - blog
  - web
  - design
author: 山田太郎                        # 著者名
featured: false                        # 特集記事フラグ
draft: false                           # 下書きフラグ
---
```

## ファイル命名規則

### ブログ記事

- **形式**: `YYYY-MM-DD-slug.md`
- **例**: `2025-01-15-first-post.md`
- **理由**: 日付順にソートしやすく、URLも読みやすい

### お知らせ

- **形式**: `YYYY-MM-DD-slug.md`
- **例**: `2025-01-10-new-service-launch.md`

### 実績・ポートフォリオ

- **形式**: `project-name.md` または `client-name-project.md`
- **例**: `acme-website-redesign.md`
- **理由**: プロジェクト名で識別しやすい

## カテゴリとタグの設計

### カテゴリ（1記事1カテゴリ）

```yaml
category: technology  # technology, business, design, lifestyle など
```

**使用例**:
- `technology`: 技術系記事
- `business`: ビジネス系記事
- `case-study`: 事例紹介
- `announcement`: お知らせ

### タグ（1記事複数タグ）

```yaml
tags:
  - blog          # コレクション識別用（必須）
  - javascript    # トピック
  - tutorial      # 記事タイプ
```

**ベストプラクティス**:
- 最初のタグはコレクション識別用（`blog`, `news`, `portfolio`）
- 2つ目以降はトピックやキーワード
- タグは英語の小文字 + ハイフンで統一

## トップページでの最新表示

### パターン1: 最新3件を表示

```njk
{# index.njk #}
<section id="news">
  <h2>お知らせ</h2>
  {% set latestNews = collections.news | reverse | limit(3) %}
  {% for item in latestNews %}
    <article>
      <time>{{ item.date | date }}</time>
      <h3><a href="{{ item.url }}">{{ item.data.title }}</a></h3>
      <p>{{ item.data.description }}</p>
    </article>
  {% endfor %}
  <a href="/news/">すべてのお知らせを見る →</a>
</section>
```

### パターン2: 特集記事を表示

```njk
<section id="featured">
  <h2>注目記事</h2>
  {% set featuredPosts = collections.blog | reverse |
     filter(item => item.data.featured === true) | limit(3) %}
  {% for post in featuredPosts %}
    {# 記事カード #}
  {% endfor %}
</section>
```

## 前後の記事リンク

```njk
{# layouts/blog-post.njk #}
<nav class="post-navigation">
  {%- set previousPost = collections.blog | getPreviousCollectionItem(page) %}
  {%- set nextPost = collections.blog | getNextCollectionItem(page) %}

  {% if previousPost %}
    <a href="{{ previousPost.url }}" class="prev">
      ← {{ previousPost.data.title }}
    </a>
  {% endif %}

  {% if nextPost %}
    <a href="{{ nextPost.url }}" class="next">
      {{ nextPost.data.title }} →
    </a>
  {% endif %}
</nav>
```

## カスタムコレクション（高度）

特定の条件でフィルタリングしたコレクションを作成する場合は `eleventy.config.js` で定義:

```javascript
// eleventy.config.js
export default function(eleventyConfig) {
  // 特集記事のコレクション
  eleventyConfig.addCollection("featuredPosts", function(collection) {
    return collection.getFilteredByGlob("src/blog/*.md")
      .filter(item => item.data.featured === true)
      .sort((a, b) => b.date - a.date);
  });

  // カテゴリ別コレクション
  eleventyConfig.addCollection("techPosts", function(collection) {
    return collection.getFilteredByTag("blog")
      .filter(item => item.data.category === "technology");
  });
}
```

## Collections vs Global Data の使い分け

| 基準 | Collections | Global Data |
|-----|------------|-------------|
| **個別ページが必要** | ✓ 適している | × 不適 |
| **一覧表示のみ** | △ 可能だが過剰 | ✓ 適している |
| **ページネーション** | ✓ 適している | × 不可 |
| **タグ・カテゴリ分類** | ✓ 適している | × 不可 |
| **前後の記事リンク** | ✓ 適している | × 不可 |
| **サイト設定データ** | × 不適 | ✓ 適している |
| **ナビゲーション** | × 不適 | ✓ 適している |

### 判断基準

**Collectionsを使うべき場合**:
- ✓ ブログ記事のように、各項目が個別ページを持つ
- ✓ 一覧ページ、詳細ページ、カテゴリ別表示などが必要
- ✓ ページネーション（ページ分割）が必要
- ✓ タグやカテゴリで分類したい
- ✓ 「前の記事」「次の記事」リンクが必要

**Global Dataを使うべき場合**:
- ✓ チームメンバーや顧客の声など、個別ページは不要で一覧表示のみ
- ✓ サイト全体で使う設定情報（サイト名、連絡先など）
- ✓ ナビゲーションメニューの項目
- ✓ 実績数値など、シンプルなデータ

**実例**:
- ブログ記事 → **Collections**（詳細ページが必要）
- お知らせ → **Collections**（詳細ページが必要）
- 実績紹介 → **Collections**（詳細ページが必要）
- チームメンバー → **Global Data**（一覧表示のみ）
- 顧客の声 → **Global Data**（一覧表示のみ）
- FAQ → **Global Data**（一覧表示のみ）

## 関連ドキュメント

- [Global Data 完全ガイド](GLOBAL_DATA_GUIDE.md)
- [ディレクトリ構造](DIRECTORY_STRUCTURE.md)
- [実装例: お知らせ機能](examples/NEWS_FEATURE.md)
- [実装例: ブログ機能](../CLAUDE.md#実装例1-ブログ機能)
- [実装例: ポートフォリオ](examples/PORTFOLIO.md)
