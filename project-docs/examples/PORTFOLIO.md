# 実装例: 実績紹介（Collections + 画像ギャラリー）

この実装例では、実績・ポートフォリオ機能をCollectionsで実装する方法を説明します。

## 完成イメージ

- 実績の個別詳細ページ（例: `/portfolio/acme-website/`）
- 実績一覧ページ（`/portfolio/`）
- 画像ギャラリー機能
- カテゴリ別フィルタリング

## なぜCollectionsを使うのか？

実績紹介は通常、**各プロジェクトの詳細ページが必要**です。

- ✓ 各実績が個別URLを持つ
- ✓ 詳細な説明、複数の画像、技術スタック、成果などを表示
- ✓ 一覧ページとカテゴリ分類が必要

→ **Collections（`src/portfolio/`）が最適**

## 実装手順

### ステップ1: ディレクトリ作成

```
src/portfolio/
├── portfolio.json              # ディレクトリデータファイル（共通設定）
├── acme-website.md             # 実績ファイル
├── sample-app.md               # 実績ファイル
└── index.njk                   # 実績一覧ページ
```

### ステップ2: portfolio.json（共通設定）

`src/portfolio/portfolio.json`:
```json
{
  "layout": "layouts/portfolio-item.njk",
  "tags": "portfolio",
  "permalink": "/portfolio/{{ page.fileSlug }}/"
}
```

### ステップ3: レイアウト作成

`src/_includes/layouts/portfolio-item.njk`:
```njk
---
layout: layouts/base.njk
---

<article class="portfolio-item max-w-5xl mx-auto py-12 px-4">
  {# ヘッダー #}
  <header class="mb-12">
    {# カテゴリバッジ #}
    {% if category %}
      <span class="inline-block px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4">
        {{ category }}
      </span>
    {% endif %}

    <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>

    {# プロジェクト情報 #}
    <div class="flex flex-wrap gap-6 text-gray-600">
      {% if client %}
        <div>
          <span class="font-semibold">クライアント:</span> {{ client }}
        </div>
      {% endif %}
      {% if date %}
        <div>
          <span class="font-semibold">完了日:</span> {{ date | date }}
        </div>
      {% endif %}
    </div>
  </header>

  {# サムネイル画像 #}
  {% if thumbnail %}
    <div class="mb-12">
      <img src="{{ thumbnail }}" alt="{{ title }}"
           class="w-full rounded-lg shadow-lg"
           loading="lazy" decoding="async">
    </div>
  {% endif %}

  {# サービス一覧 #}
  {% if services %}
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4">提供サービス</h3>
      <div class="flex flex-wrap gap-2">
        {% for service in services %}
          <span class="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm">
            {{ service }}
          </span>
        {% endfor %}
      </div>
    </div>
  {% endif %}

  {# 本文 #}
  <div class="prose prose-lg max-w-none mb-12">
    {{ content | safe }}
  </div>

  {# 画像ギャラリー #}
  {% if images %}
    <div class="mb-12">
      <h3 class="text-2xl font-bold mb-6">プロジェクト画像</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {% for image in images %}
          <a href="{{ image }}" target="_blank" class="block hover:opacity-90 transition">
            <img src="{{ image }}" alt="{{ title }} - 画像 {{ loop.index }}"
                 class="w-full rounded-lg shadow"
                 loading="lazy" decoding="async">
          </a>
        {% endfor %}
      </div>
    </div>
  {% endif %}

  {# 技術スタック（オプション） #}
  {% if technologies %}
    <div class="mb-12 p-6 bg-gray-50 rounded-lg">
      <h3 class="text-xl font-bold mb-4">使用技術</h3>
      <div class="flex flex-wrap gap-3">
        {% for tech in technologies %}
          <span class="px-3 py-1 bg-white border border-gray-300 rounded text-sm">
            {{ tech }}
          </span>
        {% endfor %}
      </div>
    </div>
  {% endif %}

  {# フッター: 一覧に戻る #}
  <footer class="mt-12 pt-8 border-t">
    <a href="/portfolio/" class="text-blue-600 hover:underline">
      ← 実績一覧に戻る
    </a>
  </footer>
</article>
```

### ステップ4: 実績ファイル作成

`src/portfolio/acme-website.md`:
```markdown
---
title: ACME社コーポレートサイト制作
client: ACME株式会社
date: 2024-12-01
category: web-design
services:
  - Webデザイン
  - フロントエンド開発
  - CMS構築
thumbnail: /assets/images/portfolio/acme-thumb.jpg
images:
  - /assets/images/portfolio/acme-01.jpg
  - /assets/images/portfolio/acme-02.jpg
  - /assets/images/portfolio/acme-03.jpg
  - /assets/images/portfolio/acme-04.jpg
technologies:
  - Eleventy
  - Tailwind CSS
  - Cloudflare Pages
  - JavaScript
featured: true
---

ACME株式会社様のコーポレートサイトを制作しました。

## プロジェクト概要

既存サイトの全面リニューアルを実施。モダンなデザインと高速なパフォーマンスを実現しました。

- **期間**: 3ヶ月
- **チーム**: デザイナー2名、エンジニア3名、PM1名
- **予算**: 500万円

## 課題

- 既存サイトのページ表示速度が遅い（平均5秒）
- レスポンシブ対応が不十分
- コンテンツ更新に時間がかかる
- SEO対策が不十分

## 解決策

1. **静的サイトジェネレーター（Eleventy）の採用**
   - ページ表示速度を大幅に改善
   - ビルド時に最適化されたHTMLを生成

2. **Tailwind CSSによるモダンなデザイン**
   - 完全レスポンシブ対応
   - 統一感のあるデザインシステム

3. **Cloudflare Pagesでのホスティング**
   - グローバルCDNによる高速配信
   - 自動デプロイで更新が簡単

## 成果

- ✅ ページ表示速度が **50%向上**（5秒 → 2.5秒）
- ✅ お問い合わせ数が **2倍に増加**
- ✅ モバイルからのアクセスが **30%増加**
- ✅ コンテンツ更新時間が **80%削減**

## クライアントの声

> 「新しいサイトは表示が速く、お客様からの反応も非常に良いです。特にモバイルでの見やすさが改善されたことで、問い合わせが増えました。」
>
> — ACME株式会社 マーケティング部長

## 技術的なポイント

- **パフォーマンス最適化**: 画像の遅延読み込み、CSSの最小化
- **SEO対策**: メタタグ最適化、構造化データの実装
- **アクセシビリティ**: WCAG 2.1 AA準拠
```

`src/portfolio/sample-app.md`:
```markdown
---
title: サンプルモバイルアプリ開発
client: サンプル株式会社
date: 2024-10-15
category: app-development
services:
  - UI/UXデザイン
  - モバイルアプリ開発
  - API開発
thumbnail: /assets/images/portfolio/sample-app-thumb.jpg
images:
  - /assets/images/portfolio/sample-app-01.jpg
  - /assets/images/portfolio/sample-app-02.jpg
technologies:
  - React Native
  - Node.js
  - MongoDB
  - AWS
featured: false
---

サンプル株式会社様向けのモバイルアプリを開発しました。

## プロジェクト概要

顧客管理と営業支援を統合したモバイルアプリの開発。

- **期間**: 6ヶ月
- **チーム**: デザイナー1名、エンジニア4名、PM1名

## 主な機能

- 顧客情報管理
- 営業活動記録
- データ分析ダッシュボード
- プッシュ通知

## 成果

- iOS/Android両プラットフォームで同時リリース
- 営業効率が35%向上
- ユーザー満足度95%
```

### ステップ5: 実績一覧ページ

`src/portfolio/index.njk`:
```njk
---
layout: layouts/base.njk
title: 実績紹介
description: これまで手がけたプロジェクトをご紹介します
---

<div class="max-w-6xl mx-auto py-12 px-4">
  {# ヘッダー #}
  <header class="text-center mb-12">
    <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
    <p class="text-gray-600 text-lg">{{ description }}</p>
  </header>

  {# 注目の実績（featured） #}
  {% set featuredItems = collections.portfolio | reverse |
     filter(item => item.data.featured === true) %}

  {% if featuredItems.length > 0 %}
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-8">注目のプロジェクト</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {% for item in featuredItems %}
          <article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <a href="{{ item.url }}" class="block">
              <img src="{{ item.data.thumbnail }}" alt="{{ item.data.title }}"
                   class="w-full h-64 object-cover"
                   loading="lazy" decoding="async">
            </a>
            <div class="p-6">
              {# カテゴリ #}
              {% if item.data.category %}
                <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
                  {{ item.data.category }}
                </span>
              {% endif %}

              <h3 class="text-xl font-bold mb-2">
                <a href="{{ item.url }}" class="hover:text-blue-600 transition">
                  {{ item.data.title }}
                </a>
              </h3>

              <p class="text-sm text-gray-600 mb-4">{{ item.data.client }}</p>

              {# サービス一覧 #}
              {% if item.data.services %}
                <div class="flex flex-wrap gap-2 mb-4">
                  {% for service in item.data.services | limit(3) %}
                    <span class="px-3 py-1 bg-gray-100 text-xs rounded-full">
                      {{ service }}
                    </span>
                  {% endfor %}
                </div>
              {% endif %}

              <a href="{{ item.url }}"
                 class="inline-block text-blue-600 hover:underline">
                詳細を見る →
              </a>
            </div>
          </article>
        {% endfor %}
      </div>
    </section>
  {% endif %}

  {# すべての実績 #}
  <section>
    <h2 class="text-2xl font-bold mb-8">すべての実績</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {% for item in collections.portfolio | reverse %}
        <article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
          <a href="{{ item.url }}" class="block">
            <img src="{{ item.data.thumbnail }}" alt="{{ item.data.title }}"
                 class="w-full h-48 object-cover"
                 loading="lazy" decoding="async">
          </a>
          <div class="p-6">
            {# カテゴリ #}
            {% if item.data.category %}
              <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
                {{ item.data.category }}
              </span>
            {% endif %}

            <h3 class="text-xl font-bold mb-2">
              <a href="{{ item.url }}" class="hover:text-blue-600 transition">
                {{ item.data.title }}
              </a>
            </h3>

            <p class="text-sm text-gray-600 mb-4">{{ item.data.client }}</p>

            {# サービス一覧 #}
            {% if item.data.services %}
              <div class="flex flex-wrap gap-2">
                {% for service in item.data.services | limit(2) %}
                  <span class="px-3 py-1 bg-gray-100 text-xs rounded-full">
                    {{ service }}
                  </span>
                {% endfor %}
              </div>
            {% endif %}
          </div>
        </article>
      {% endfor %}
    </div>
  </section>
</div>
```

## カスタマイズ例

### カテゴリ別フィルタリング

```njk
<section class="mb-12">
  <div class="flex justify-center gap-4">
    <button class="filter-btn active px-6 py-2 bg-blue-600 text-white rounded-lg"
            data-category="all">
      すべて
    </button>
    <button class="filter-btn px-6 py-2 bg-gray-200 rounded-lg"
            data-category="web-design">
      Webデザイン
    </button>
    <button class="filter-btn px-6 py-2 bg-gray-200 rounded-lg"
            data-category="app-development">
      アプリ開発
    </button>
    <button class="filter-btn px-6 py-2 bg-gray-200 rounded-lg"
            data-category="branding">
      ブランディング
    </button>
  </div>
</section>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  {% for item in collections.portfolio | reverse %}
    <article class="portfolio-item" data-category="{{ item.data.category }}">
      {# カード内容 #}
    </article>
  {% endfor %}
</div>

<script>
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;

    // ボタンのアクティブ状態
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active', 'bg-blue-600', 'text-white');
      b.classList.add('bg-gray-200');
    });
    btn.classList.add('active', 'bg-blue-600', 'text-white');
    btn.classList.remove('bg-gray-200');

    // アイテムの表示/非表示
    document.querySelectorAll('.portfolio-item').forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
</script>
```

### トップページに表示

```njk
<section id="portfolio-preview" class="py-16">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">実績紹介</h2>

    {% set recentPortfolio = collections.portfolio | reverse | limit(3) %}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {% for item in recentPortfolio %}
        <article class="bg-white rounded-lg shadow-lg overflow-hidden">
          <a href="{{ item.url }}">
            <img src="{{ item.data.thumbnail }}" alt="{{ item.data.title }}"
                 class="w-full h-48 object-cover">
          </a>
          <div class="p-6">
            <h3 class="font-bold">{{ item.data.title }}</h3>
            <p class="text-sm text-gray-600">{{ item.data.client }}</p>
          </div>
        </article>
      {% endfor %}
    </div>

    <div class="text-center mt-8">
      <a href="/portfolio/" class="btn">すべての実績を見る →</a>
    </div>
  </div>
</section>
```

## 画像の準備

```
src/assets/images/portfolio/
├── acme-thumb.jpg          # サムネイル
├── acme-01.jpg             # 詳細画像1
├── acme-02.jpg             # 詳細画像2
├── acme-03.jpg             # 詳細画像3
├── sample-app-thumb.jpg
├── sample-app-01.jpg
└── sample-app-02.jpg
```

**推奨サイズ**:
- サムネイル: 1200x800px
- 詳細画像: 1600x1200px

## ビルドとプレビュー

```bash
# 開発サーバーで確認
npm run serve

# ブラウザで確認
# 実績一覧: http://localhost:8080/portfolio/
# 個別ページ: http://localhost:8080/portfolio/acme-website/
```

## 関連ドキュメント

- [Collections完全ガイド](../COLLECTION_DETAILED_GUIDE.md)
- [ディレクトリ構造](../DIRECTORY_STRUCTURE.md)
- [実装例: ブログ機能](../../CLAUDE.md#実装例1-ブログ機能)
- [実装例: お知らせ機能](NEWS_FEATURE.md)
