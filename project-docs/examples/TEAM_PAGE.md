# 実装例: チームメンバー紹介（Global Data）

この実装例では、Global Dataを使用してチームメンバーページを実装する方法を説明します。

## 完成イメージ

- チームメンバー紹介ページ（`/team/`）
- グリッドレイアウトで各メンバーを表示
- SNSリンク、メールアドレスなどを表示
- **個別ページは不要**（一覧表示のみ）

## なぜGlobal Dataを使うのか？

チームメンバーは通常、**個別の詳細ページは不要**で、**一覧表示のみ**で十分です。

- ✓ 各メンバーの個別URLは不要
- ✓ 情報がシンプル（名前、役職、写真、SNS）
- ✓ 一覧ページにすべての情報を表示

→ **Global Data（`_data/team.json`）が最適**

## 実装手順

### ステップ1: データファイル作成

`src/_data/team.json`:
```json
[
  {
    "name": "山田太郎",
    "role": "代表取締役",
    "bio": "20年以上のWeb業界経験を持つエキスパート。クライアントのビジネス成長にコミット。",
    "image": "/assets/images/team/yamada.jpg",
    "email": "yamada@example.com",
    "social": {
      "twitter": "https://twitter.com/yamada",
      "linkedin": "https://linkedin.com/in/yamada"
    }
  },
  {
    "name": "佐藤花子",
    "role": "CTO",
    "bio": "フルスタックエンジニアとして10年以上の経験。最新技術の導入をリード。",
    "image": "/assets/images/team/sato.jpg",
    "email": "sato@example.com",
    "social": {
      "github": "https://github.com/sato",
      "linkedin": "https://linkedin.com/in/sato"
    }
  },
  {
    "name": "鈴木健一",
    "role": "デザインディレクター",
    "bio": "UI/UXデザインのスペシャリスト。ユーザー中心のデザインを追求。",
    "image": "/assets/images/team/suzuki.jpg",
    "email": "suzuki@example.com",
    "social": {
      "twitter": "https://twitter.com/suzuki",
      "dribbble": "https://dribbble.com/suzuki"
    }
  },
  {
    "name": "田中美咲",
    "role": "マーケティングマネージャー",
    "bio": "データドリブンなマーケティング戦略を展開。成果にコミット。",
    "image": "/assets/images/team/tanaka.jpg",
    "email": "tanaka@example.com",
    "social": {
      "linkedin": "https://linkedin.com/in/tanaka"
    }
  }
]
```

### ステップ2: コンポーネント作成

`src/_includes/components/team-card.njk`:
```njk
<div class="team-card bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
  <img src="{{ member.image }}" alt="{{ member.name }}"
       class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
       loading="lazy" decoding="async">

  <h3 class="text-xl font-bold">{{ member.name }}</h3>
  <p class="text-gray-600 mb-4">{{ member.role }}</p>
  <p class="text-sm text-gray-700 mb-4 leading-relaxed">{{ member.bio }}</p>

  {# Email #}
  {% if member.email %}
    <div class="mb-4">
      <a href="mailto:{{ member.email }}"
         class="text-blue-600 hover:underline text-sm">
        {{ member.email }}
      </a>
    </div>
  {% endif %}

  {# Social Links #}
  {% if member.social %}
    <div class="flex justify-center gap-4">
      {% if member.social.twitter %}
        <a href="{{ member.social.twitter }}"
           class="text-blue-500 hover:text-blue-700 transition"
           target="_blank" rel="noopener noreferrer"
           aria-label="Twitter">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
      {% endif %}

      {% if member.social.github %}
        <a href="{{ member.social.github }}"
           class="text-gray-800 hover:text-gray-900 transition"
           target="_blank" rel="noopener noreferrer"
           aria-label="GitHub">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      {% endif %}

      {% if member.social.linkedin %}
        <a href="{{ member.social.linkedin }}"
           class="text-blue-700 hover:text-blue-800 transition"
           target="_blank" rel="noopener noreferrer"
           aria-label="LinkedIn">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      {% endif %}

      {% if member.social.dribbble %}
        <a href="{{ member.social.dribbble }}"
           class="text-pink-500 hover:text-pink-600 transition"
           target="_blank" rel="noopener noreferrer"
           aria-label="Dribbble">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
          </svg>
        </a>
      {% endif %}
    </div>
  {% endif %}
</div>
```

### ステップ3: チームページ作成

`src/team.njk`:
```njk
---
layout: layouts/base.njk
title: チーム紹介
description: 私たちのチームメンバーを紹介します
---

<section id="team" class="py-16">
  <div class="max-w-6xl mx-auto px-4">
    {# ヘッダー #}
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
      <p class="text-gray-600 text-lg">{{ description }}</p>
    </header>

    {# チームメンバー一覧 #}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {% for member in team %}
        {% include "components/team-card.njk" %}
      {% endfor %}
    </div>

    {# 採用情報へのリンク（オプション） #}
    <div class="text-center mt-16 pt-12 border-t">
      <h2 class="text-2xl font-bold mb-4">一緒に働きませんか？</h2>
      <p class="text-gray-600 mb-6">
        私たちは常に優秀な人材を探しています。
      </p>
      <a href="/careers/"
         class="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        採用情報を見る
      </a>
    </div>
  </div>
</section>
```

## カスタマイズ例

### 役職別にグループ化

```njk
<section id="team" class="py-16">
  <div class="max-w-6xl mx-auto px-4">
    <h1 class="text-4xl font-bold text-center mb-12">{{ title }}</h1>

    {# 経営陣 #}
    <div class="mb-16">
      <h2 class="text-2xl font-bold mb-8 text-center">経営陣</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {% for member in team %}
          {% if member.role === "代表取締役" or member.role === "CTO" %}
            {% include "components/team-card.njk" %}
          {% endif %}
        {% endfor %}
      </div>
    </div>

    {# デザイン・マーケティング #}
    <div>
      <h2 class="text-2xl font-bold mb-8 text-center">デザイン・マーケティング</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {% for member in team %}
          {% if member.role !== "代表取締役" and member.role !== "CTO" %}
            {% include "components/team-card.njk" %}
          {% endif %}
        {% endfor %}
      </div>
    </div>
  </div>
</section>
```

### トップページに表示

`src/index.njk`（トップページの一部）:
```njk
<section id="team-preview" class="py-16">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">チーム紹介</h2>

    {# 最初の3人だけ表示 #}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {% for member in team | limit(3) %}
        {% include "components/team-card.njk" %}
      {% endfor %}
    </div>

    <div class="text-center mt-8">
      <a href="/team/"
         class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        すべてのメンバーを見る →
      </a>
    </div>
  </div>
</section>
```

### シンプル版（名前と役職のみ）

シンプルなリストレイアウトの場合:

```njk
<section id="team" class="py-16">
  <div class="max-w-4xl mx-auto px-4">
    <h1 class="text-4xl font-bold text-center mb-12">{{ title }}</h1>

    <div class="space-y-6">
      {% for member in team %}
        <div class="flex items-center gap-6 bg-white p-6 rounded-lg shadow">
          <img src="{{ member.image }}" alt="{{ member.name }}"
               class="w-24 h-24 rounded-full object-cover"
               loading="lazy" decoding="async">

          <div class="flex-1">
            <h3 class="text-xl font-bold">{{ member.name }}</h3>
            <p class="text-gray-600">{{ member.role }}</p>
            <p class="text-sm text-gray-700 mt-2">{{ member.bio }}</p>
          </div>

          {% if member.email %}
            <a href="mailto:{{ member.email }}"
               class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              お問い合わせ
            </a>
          {% endif %}
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
    "name": "山田太郎",
    "role": "代表取締役",
    "department": "経営",
    "bio": "20年以上のWeb業界経験を持つエキスパート。",
    "image": "/assets/images/team/yamada.jpg",
    "email": "yamada@example.com",
    "phone": "03-1234-5678",
    "skills": ["経営戦略", "新規事業開発", "M&A"],
    "languages": ["日本語", "英語"],
    "joined": "2010-01-01",
    "social": {
      "twitter": "https://twitter.com/yamada",
      "linkedin": "https://linkedin.com/in/yamada",
      "facebook": "https://facebook.com/yamada"
    }
  }
]
```

## 画像の準備

チームメンバーの写真を`src/assets/images/team/`に配置:

```
src/assets/images/team/
├── yamada.jpg
├── sato.jpg
├── suzuki.jpg
└── tanaka.jpg
```

**推奨サイズ**: 正方形（例: 400x400px）

## ビルドとプレビュー

```bash
# 開発サーバーで確認
npm run serve

# ブラウザで確認
# チームページ: http://localhost:8080/team/
```

## Collections vs Global Data の判断

### このケースでGlobal Dataを選んだ理由

| 要件 | Global Data | Collections |
|------|-------------|-------------|
| 個別ページは不要 | ✓ 適している | × 過剰 |
| 一覧表示のみで十分 | ✓ 適している | △ 可能だが複雑 |
| データ構造がシンプル | ✓ 適している | △ 可能 |
| 管理が簡単 | ✓ JSONファイル1つ | × 複数ファイル必要 |

### もしCollectionsを使う場合

各メンバーに詳細な経歴ページが必要な場合は、Collectionsの方が適切:

```
src/team/
├── team.json
├── yamada-taro.md      # 詳細な経歴ページ
├── sato-hanako.md      # 詳細な経歴ページ
└── index.njk           # 一覧ページ
```

## 関連ドキュメント

- [Global Data完全ガイド](../GLOBAL_DATA_GUIDE.md)
- [Collections完全ガイド](../COLLECTION_DETAILED_GUIDE.md)
- [ディレクトリ構造](../DIRECTORY_STRUCTURE.md)
