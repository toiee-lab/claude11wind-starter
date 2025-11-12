# 実装例: 顧客の声（Global Data + トップページ表示）

この実装例では、顧客の声（お客様の声・推薦文）をGlobal Dataで実装し、トップページに表示する方法を説明します。

## 完成イメージ

- トップページに顧客の声を6件表示
- グリッドレイアウトで見やすく配置
- 星評価、会社名、役職を表示
- **個別ページは不要**

## なぜGlobal Dataを使うのか？

顧客の声は通常、**個別の詳細ページは不要**で、**一覧表示のみ**で十分です。

- ✓ 各推薦文の個別URLは不要
- ✓ 情報がシンプル（会社名、担当者名、推薦文、評価）
- ✓ トップページや専用ページに一覧表示

→ **Global Data（`_data/testimonials.json`）が最適**

## 実装手順

### ステップ1: データファイル作成

`src/_data/testimonials.json`:
```json
[
  {
    "company": "株式会社Example",
    "person": "田中一郎",
    "role": "代表取締役",
    "content": "素晴らしいサービスで、売上が30%向上しました。チームの対応も迅速で満足しています。特にサポート体制が充実していて、安心して利用できています。",
    "image": "/assets/images/testimonials/tanaka.jpg",
    "rating": 5,
    "date": "2024-12-01",
    "industry": "製造業"
  },
  {
    "company": "サンプル商事株式会社",
    "person": "鈴木花子",
    "role": "マーケティング部長",
    "content": "導入から3ヶ月で成果が出ました。特にサポート体制が充実していて安心です。データ分析機能も使いやすく、日々の業務に欠かせません。",
    "image": "/assets/images/testimonials/suzuki.jpg",
    "rating": 5,
    "date": "2024-11-15",
    "industry": "小売業"
  },
  {
    "company": "テスト株式会社",
    "person": "山田太郎",
    "role": "CEO",
    "content": "コストパフォーマンスに優れています。運用も簡単で、社内での評判も上々です。導入前は不安もありましたが、サポートが手厚く安心でした。",
    "image": "/assets/images/testimonials/yamada.jpg",
    "rating": 4,
    "date": "2024-10-20",
    "industry": "IT業界"
  },
  {
    "company": "デモ企業",
    "person": "佐藤健太",
    "role": "システム管理者",
    "content": "技術サポートが迅速で助かっています。問題が起きてもすぐに対応してくれるので、業務が止まりません。",
    "image": "/assets/images/testimonials/sato.jpg",
    "rating": 5,
    "date": "2024-09-10",
    "industry": "金融業"
  },
  {
    "company": "サンプルコーポレーション",
    "person": "伊藤美咲",
    "role": "営業部長",
    "content": "営業効率が大幅に改善しました。使いやすいUIと豊富な機能で、チーム全員が満足しています。",
    "image": "/assets/images/testimonials/ito.jpg",
    "rating": 5,
    "date": "2024-08-25",
    "industry": "サービス業"
  },
  {
    "company": "テストインダストリー",
    "person": "高橋誠",
    "role": "プロジェクトマネージャー",
    "content": "プロジェクト管理が楽になりました。複数のプロジェクトを同時進行しても、進捗が把握しやすいです。",
    "image": "/assets/images/testimonials/takahashi.jpg",
    "rating": 4,
    "date": "2024-07-30",
    "industry": "建設業"
  }
]
```

### ステップ2: コンポーネント作成

`src/_includes/components/testimonial-card.njk`:
```njk
<div class="testimonial-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
  {# 星評価 #}
  <div class="rating mb-4 text-yellow-500 text-2xl" aria-label="評価: {{ testimonial.rating }}つ星">
    {% for i in range(0, testimonial.rating) %}★{% endfor %}
    {% for i in range(testimonial.rating, 5) %}☆{% endfor %}
  </div>

  {# 推薦文 #}
  <blockquote class="text-gray-700 italic mb-6 leading-relaxed">
    "{{ testimonial.content }}"
  </blockquote>

  {# 担当者情報 #}
  <div class="flex items-center gap-4 pt-4 border-t">
    <img src="{{ testimonial.image }}" alt="{{ testimonial.person }}"
         class="w-16 h-16 rounded-full object-cover"
         loading="lazy" decoding="async">

    <div>
      <p class="font-bold text-gray-900">{{ testimonial.person }}</p>
      <p class="text-sm text-gray-600">
        {{ testimonial.company }}<br>
        {{ testimonial.role }}
      </p>
    </div>
  </div>

  {# 業界（オプション） #}
  {% if testimonial.industry %}
    <div class="mt-4">
      <span class="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
        {{ testimonial.industry }}
      </span>
    </div>
  {% endif %}
</div>
```

### ステップ3: トップページで表示

`src/index.njk`（トップページの一部）:
```njk
<section id="testimonials" class="py-16 bg-gray-50">
  <div class="max-w-6xl mx-auto px-4">
    {# ヘッダー #}
    <header class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-4">顧客の声</h2>
      <p class="text-gray-600">
        お客様からいただいた声をご紹介します
      </p>
    </header>

    {# 顧客の声グリッド #}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {% for testimonial in testimonials | limit(6) %}
        {% include "components/testimonial-card.njk" %}
      {% endfor %}
    </div>

    {# すべての声を見るリンク（オプション） #}
    <div class="text-center mt-12">
      <a href="/testimonials/"
         class="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        すべての声を見る →
      </a>
    </div>
  </div>
</section>
```

### ステップ4: 専用ページ作成（オプション）

`src/testimonials.njk`:
```njk
---
layout: layouts/base.njk
title: 顧客の声
description: お客様からいただいた推薦文をご紹介します
---

<section id="testimonials-page" class="py-16">
  <div class="max-w-6xl mx-auto px-4">
    {# ヘッダー #}
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
      <p class="text-gray-600 text-lg">{{ description }}</p>
    </header>

    {# 統計情報（オプション） #}
    <div class="grid grid-cols-3 gap-8 mb-16 text-center">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="text-4xl font-bold text-blue-600">{{ testimonials | length }}</div>
        <div class="text-gray-600 mt-2">お客様の声</div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="text-4xl font-bold text-blue-600">4.8</div>
        <div class="text-gray-600 mt-2">平均評価</div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="text-4xl font-bold text-blue-600">98%</div>
        <div class="text-gray-600 mt-2">満足度</div>
      </div>
    </div>

    {# すべての顧客の声 #}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {% for testimonial in testimonials %}
        {% include "components/testimonial-card.njk" %}
      {% endfor %}
    </div>
  </div>
</section>
```

## カスタマイズ例

### 評価の高い順に表示

```njk
{% set topTestimonials = testimonials | sort(attribute='rating', reverse=true) | limit(6) %}
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {% for testimonial in topTestimonials %}
    {% include "components/testimonial-card.njk" %}
  {% endfor %}
</div>
```

### 業界別に表示

```njk
<section id="testimonials">
  <h2>顧客の声</h2>

  {# 製造業の声 #}
  <div class="mb-12">
    <h3 class="text-2xl font-bold mb-6">製造業</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {% for testimonial in testimonials %}
        {% if testimonial.industry === "製造業" %}
          {% include "components/testimonial-card.njk" %}
        {% endif %}
      {% endfor %}
    </div>
  </div>

  {# IT業界の声 #}
  <div>
    <h3 class="text-2xl font-bold mb-6">IT業界</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {% for testimonial in testimonials %}
        {% if testimonial.industry === "IT業界" %}
          {% include "components/testimonial-card.njk" %}
        {% endif %}
      {% endfor %}
    </div>
  </div>
</section>
```

### カルーセル形式で表示

JavaScript を使ったカルーセル（スライダー）形式:

```njk
<section id="testimonials-carousel" class="py-16 bg-blue-600 text-white">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold mb-12">顧客の声</h2>

    <div class="testimonial-slider">
      {% for testimonial in testimonials | limit(3) %}
        <div class="testimonial-slide {% if loop.index === 1 %}active{% endif %}">
          <div class="rating mb-6 text-yellow-300 text-3xl">
            {% for i in range(0, testimonial.rating) %}★{% endfor %}
          </div>

          <blockquote class="text-xl italic mb-8">
            "{{ testimonial.content }}"
          </blockquote>

          <div>
            <p class="font-bold text-lg">{{ testimonial.person }}</p>
            <p class="text-blue-200">
              {{ testimonial.company }} - {{ testimonial.role }}
            </p>
          </div>
        </div>
      {% endfor %}
    </div>

    {# スライダーコントロール #}
    <div class="flex justify-center gap-4 mt-8">
      <button class="slider-prev px-4 py-2 bg-white text-blue-600 rounded-lg">
        ← 前へ
      </button>
      <button class="slider-next px-4 py-2 bg-white text-blue-600 rounded-lg">
        次へ →
      </button>
    </div>
  </div>
</section>
```

### シンプル版（テキストのみ）

画像なしのシンプルなレイアウト:

```njk
<section id="testimonials-simple" class="py-16">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">顧客の声</h2>

    <div class="space-y-8">
      {% for testimonial in testimonials | limit(6) %}
        <div class="bg-gray-50 p-8 rounded-lg">
          <blockquote class="text-lg italic text-gray-700 mb-4">
            "{{ testimonial.content }}"
          </blockquote>

          <div class="flex justify-between items-center">
            <div>
              <p class="font-bold">{{ testimonial.person }}</p>
              <p class="text-sm text-gray-600">
                {{ testimonial.company }} - {{ testimonial.role }}
              </p>
            </div>

            <div class="text-yellow-500 text-xl">
              {% for i in range(0, testimonial.rating) %}★{% endfor %}
            </div>
          </div>
        </div>
      {% endfor %}
    </div>
  </div>
</section>
```

## データ構造のバリエーション

### より詳細な情報を追加

```json
[
  {
    "company": "株式会社Example",
    "person": "田中一郎",
    "role": "代表取締役",
    "content": "素晴らしいサービスで、売上が30%向上しました。",
    "image": "/assets/images/testimonials/tanaka.jpg",
    "rating": 5,
    "date": "2024-12-01",
    "industry": "製造業",
    "companySize": "従業員100名",
    "usageType": "営業支援",
    "results": {
      "salesIncrease": "30%",
      "timeReduction": "40%",
      "satisfaction": "98%"
    },
    "video": "https://youtube.com/watch?v=xxxxx" // ビデオ推薦文URL
  }
]
```

## 画像の準備

顧客の写真を`src/assets/images/testimonials/`に配置:

```
src/assets/images/testimonials/
├── tanaka.jpg
├── suzuki.jpg
├── yamada.jpg
├── sato.jpg
├── ito.jpg
└── takahashi.jpg
```

**推奨サイズ**: 正方形（例: 200x200px）

## フィルター機能の追加

業界別、評価別にフィルタリングできる機能:

```njk
<section id="testimonials-filtered" class="py-16">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">顧客の声</h2>

    {# フィルターボタン #}
    <div class="flex justify-center gap-4 mb-12">
      <button class="filter-btn active px-6 py-2 bg-blue-600 text-white rounded-lg"
              data-filter="all">
        すべて
      </button>
      <button class="filter-btn px-6 py-2 bg-gray-200 rounded-lg"
              data-filter="製造業">
        製造業
      </button>
      <button class="filter-btn px-6 py-2 bg-gray-200 rounded-lg"
              data-filter="IT業界">
        IT業界
      </button>
      <button class="filter-btn px-6 py-2 bg-gray-200 rounded-lg"
              data-filter="小売業">
        小売業
      </button>
    </div>

    {# 顧客の声グリッド #}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {% for testimonial in testimonials %}
        <div class="testimonial-item" data-industry="{{ testimonial.industry }}">
          {% include "components/testimonial-card.njk" %}
        </div>
      {% endfor %}
    </div>
  </div>
</section>

<script>
// シンプルなフィルター機能
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // ボタンのアクティブ状態を変更
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active', 'bg-blue-600', 'text-white');
      b.classList.add('bg-gray-200');
    });
    btn.classList.add('active', 'bg-blue-600', 'text-white');
    btn.classList.remove('bg-gray-200');

    // アイテムの表示/非表示
    document.querySelectorAll('.testimonial-item').forEach(item => {
      if (filter === 'all' || item.dataset.industry === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
</script>
```

## ビルドとプレビュー

```bash
# 開発サーバーで確認
npm run serve

# ブラウザで確認
# トップページ: http://localhost:8080/
# 専用ページ: http://localhost:8080/testimonials/
```

## 関連ドキュメント

- [Global Data完全ガイド](../GLOBAL_DATA_GUIDE.md)
- [実装例: チームページ](TEAM_PAGE.md)
- [ディレクトリ構造](../DIRECTORY_STRUCTURE.md)
