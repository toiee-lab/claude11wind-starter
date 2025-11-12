# 実装例: お知らせ機能（トップページ表示付き）

この実装例では、お知らせ機能を完全に実装する方法を説明します。

## 完成イメージ

- お知らせの個別ページ（例: `/news/new-service-launch/`）
- お知らせ一覧ページ（`/news/`）
- トップページに最新3件のお知らせを表示

## 実装手順

### ステップ1: ディレクトリ作成

```
src/news/
├── news.json                    # ディレクトリデータファイル（共通設定）
├── 2025-01-10-service-launch.md # お知らせファイル
└── index.njk                    # お知らせ一覧ページ
```

### ステップ2: news.json（共通設定）

`src/news/news.json`:
```json
{
  "layout": "layouts/news-post.njk",
  "tags": "news",
  "permalink": "/news/{{ page.fileSlug }}/"
}
```

**説明**:
- `layout`: すべてのお知らせで使用するレイアウト
- `tags`: コレクション識別用タグ（`news`）
- `permalink`: URL構造を定義

### ステップ3: レイアウト作成

`src/_includes/layouts/news-post.njk`:
```njk
---
layout: layouts/base.njk
---

<article class="news-article max-w-3xl mx-auto py-12 px-4">
  <header class="mb-8">
    <time class="text-sm text-gray-600" datetime="{{ date | date }}">
      {{ date | date }}
    </time>
    <h1 class="text-3xl font-bold mt-2">{{ title }}</h1>
  </header>

  <div class="content prose prose-lg">
    {{ content | safe }}
  </div>

  <footer class="mt-12 pt-8 border-t">
    <a href="/news/" class="text-blue-600 hover:underline">
      ← お知らせ一覧に戻る
    </a>
  </footer>
</article>
```

### ステップ4: お知らせ作成

`src/news/2025-01-10-service-launch.md`:
```markdown
---
title: 新サービスをリリースしました
date: 2025-01-10
description: お客様の声を反映した新サービスを本日リリースしました。
category: product
---

お客様の声を反映した新サービスを本日リリースしました。

## 主な機能

- **機能A**: 〇〇が可能になります
- **機能B**: △△を実現します
- **機能C**: □□をサポートします

## リリーススケジュール

- 2025年1月10日: ベータ版リリース
- 2025年2月1日: 正式版リリース

詳細は[こちら](/services/)をご覧ください。
```

`src/news/2025-01-08-maintenance.md`:
```markdown
---
title: システムメンテナンスのお知らせ
date: 2025-01-08
description: 2025年1月15日にシステムメンテナンスを実施します。
category: maintenance
---

下記日時にシステムメンテナンスを実施します。

## メンテナンス日時

- **日時**: 2025年1月15日（水）23:00 - 翌 1:00
- **影響範囲**: すべてのサービスが一時停止します

ご不便をおかけしますが、何卒ご理解いただきますようお願いいたします。
```

### ステップ5: お知らせ一覧ページ

`src/news/index.njk`:
```njk
---
layout: layouts/base.njk
title: お知らせ
description: 最新のお知らせ一覧
pagination:
  data: collections.news
  size: 10
  alias: newsItems
  reverse: true
---

<div class="max-w-4xl mx-auto py-12 px-4">
  <header class="mb-12">
    <h1 class="text-4xl font-bold text-center">{{ title }}</h1>
    <p class="text-center text-gray-600 mt-4">{{ description }}</p>
  </header>

  <div class="space-y-6">
    {% for item in newsItems %}
      <article class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
        <time class="text-sm text-gray-600" datetime="{{ item.date | date }}">
          {{ item.date | date }}
        </time>

        <h2 class="text-2xl font-bold mt-2 mb-3">
          <a href="{{ item.url }}" class="hover:text-blue-600 transition">
            {{ item.data.title }}
          </a>
        </h2>

        {% if item.data.description %}
          <p class="text-gray-700 mb-4">{{ item.data.description }}</p>
        {% endif %}

        <a href="{{ item.url }}" class="inline-block text-blue-600 hover:underline">
          詳細を見る →
        </a>
      </article>
    {% endfor %}
  </div>

  {# ページネーション #}
  {% if pagination.href.previous or pagination.href.next %}
    <nav class="flex justify-between items-center mt-12 pt-8 border-t">
      {% if pagination.href.previous %}
        <a href="{{ pagination.href.previous }}"
           class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          ← 前のページ
        </a>
      {% else %}
        <div></div>
      {% endif %}

      <span class="text-gray-600">
        ページ {{ pagination.pageNumber + 1 }} / {{ pagination.pages.length }}
      </span>

      {% if pagination.href.next %}
        <a href="{{ pagination.href.next }}"
           class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          次のページ →
        </a>
      {% else %}
        <div></div>
      {% endif %}
    </nav>
  {% endif %}
</div>
```

### ステップ6: トップページに最新3件を表示

`src/index.njk`（トップページの一部）:
```njk
<section id="news" class="py-16 bg-gray-50">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">お知らせ</h2>

    {% set latestNews = collections.news | reverse | limit(3) %}
    <div class="space-y-6">
      {% for item in latestNews %}
        <article class="bg-white p-6 rounded-lg shadow">
          <time class="text-sm text-gray-600" datetime="{{ item.date | date }}">
            {{ item.date | date }}
          </time>

          <h3 class="text-xl font-bold mt-2">
            <a href="{{ item.url }}" class="hover:text-blue-600">
              {{ item.data.title }}
            </a>
          </h3>

          {% if item.data.description %}
            <p class="mt-2 text-gray-700">{{ item.data.description }}</p>
          {% endif %}
        </article>
      {% endfor %}
    </div>

    <div class="text-center mt-8">
      <a href="/news/"
         class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        すべてのお知らせを見る →
      </a>
    </div>
  </div>
</section>
```

## カスタマイズ例

### カテゴリ別に表示

お知らせをカテゴリ別に分けて表示する場合:

```njk
{# 製品関連のお知らせのみ表示 #}
{% set productNews = collections.news | reverse |
   filter(item => item.data.category === "product") | limit(3) %}

<section id="product-news">
  <h2>製品関連のお知らせ</h2>
  {% for item in productNews %}
    {# 表示コード #}
  {% endfor %}
</section>

{# メンテナンス情報のみ表示 #}
{% set maintenanceNews = collections.news | reverse |
   filter(item => item.data.category === "maintenance") | limit(3) %}

<section id="maintenance-news">
  <h2>メンテナンス情報</h2>
  {% for item in maintenanceNews %}
    {# 表示コード #}
  {% endfor %}
</section>
```

### 重要なお知らせを目立たせる

Front Matterに`important: true`を追加:

```markdown
---
title: 【重要】サービス終了のお知らせ
date: 2025-01-05
important: true
---
```

テンプレートで条件分岐:

```njk
{% for item in latestNews %}
  <article class="{% if item.data.important %}bg-red-50 border-l-4 border-red-500{% else %}bg-white{% endif %} p-6 rounded-lg shadow">
    {% if item.data.important %}
      <span class="inline-block px-3 py-1 bg-red-600 text-white text-sm rounded-full mb-2">
        重要
      </span>
    {% endif %}

    <time>{{ item.date | date }}</time>
    <h3>{{ item.data.title }}</h3>
  </article>
{% endfor %}
```

## カテゴリ別のスタイリング

カテゴリに応じてバッジの色を変える:

```njk
{% macro categoryBadge(category) %}
  {% if category === "product" %}
    <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">製品</span>
  {% elif category === "maintenance" %}
    <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">メンテナンス</span>
  {% elif category === "event" %}
    <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">イベント</span>
  {% else %}
    <span class="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">お知らせ</span>
  {% endif %}
{% endmacro %}

{# 使用例 #}
{% for item in latestNews %}
  <article>
    {{ categoryBadge(item.data.category) }}
    <h3>{{ item.data.title }}</h3>
  </article>
{% endfor %}
```

## ビルドとプレビュー

```bash
# 開発サーバーで確認
npm run serve

# ブラウザで確認
# - トップページ: http://localhost:8080/
# - お知らせ一覧: http://localhost:8080/news/
# - 個別お知らせ: http://localhost:8080/news/service-launch/
```

## 関連ドキュメント

- [Collections完全ガイド](../COLLECTION_DETAILED_GUIDE.md)
- [ディレクトリ構造](../DIRECTORY_STRUCTURE.md)
- [実装例: ブログ機能](../../CLAUDE.md#実装例1-ブログ機能)
