# Global Data（グローバルデータ）完全ガイド

このドキュメントは、Eleventy の Global Data 機能の詳細な実装ガイドです。

## 目次

- [Global Dataとは](#global-dataとは)
- [基本的な実装](#基本的な実装)
- [JSONデータファイル](#jsonデータファイル)
- [JavaScriptデータファイル](#javascriptデータファイル動的データ)
- [使用例](#使用例)
- [Collections vs Global Data](#collections-vs-global-data)

## Global Dataとは

### 定義

`_data/` ディレクトリに配置されたJSONまたはJavaScriptファイルで、すべてのテンプレートからアクセスできるデータです。

### 用途

- **サイト設定**: サイト名、連絡先、SNSリンクなど
- **ナビゲーションメニュー**: ヘッダー・フッターのメニュー項目
- **チームメンバー**: 個別ページ不要で一覧表示のみ
- **顧客の声**: トップページに表示する推薦文
- **FAQ**: よくある質問と回答
- **実績数値**: 「導入企業数」「プロジェクト数」など

## 基本的な実装

### ステップ1: データファイルを作成

`src/_data/team.json`:
```json
[
  {
    "name": "山田太郎",
    "role": "代表取締役",
    "bio": "20年以上のWeb業界経験を持つエキスパート。",
    "image": "/assets/images/team/yamada.jpg",
    "social": {
      "twitter": "https://twitter.com/yamada",
      "linkedin": "https://linkedin.com/in/yamada"
    }
  },
  {
    "name": "佐藤花子",
    "role": "CTO",
    "bio": "フルスタックエンジニアとして10年以上の経験。",
    "image": "/assets/images/team/sato.jpg",
    "social": {
      "github": "https://github.com/sato"
    }
  }
]
```

### ステップ2: テンプレートで使用

`src/team.njk`:
```njk
---
layout: layouts/base.njk
title: チーム紹介
---

<section id="team" class="py-16">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold text-center mb-12">{{ title }}</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {% for member in team %}
        <div class="team-card bg-white rounded-lg shadow-lg p-6">
          <img src="{{ member.image }}" alt="{{ member.name }}"
               class="w-32 h-32 rounded-full mx-auto mb-4"
               loading="lazy" decoding="async">
          <h3 class="text-xl font-bold text-center">{{ member.name }}</h3>
          <p class="text-gray-600 text-center mb-4">{{ member.role }}</p>
          <p class="text-sm">{{ member.bio }}</p>

          {% if member.social %}
            <div class="flex justify-center gap-4 mt-4">
              {% if member.social.twitter %}
                <a href="{{ member.social.twitter }}" class="text-blue-500">Twitter</a>
              {% endif %}
              {% if member.social.github %}
                <a href="{{ member.social.github }}" class="text-gray-800">GitHub</a>
              {% endif %}
              {% if member.social.linkedin %}
                <a href="{{ member.social.linkedin }}" class="text-blue-700">LinkedIn</a>
              {% endif %}
            </div>
          {% endif %}
        </div>
      {% endfor %}
    </div>
  </div>
</section>
```

## JSONデータファイル

### サイト設定の例

`src/_data/site.json`:
```json
{
  "name": "株式会社Example",
  "url": "https://example.com",
  "description": "革新的なWebソリューションを提供します",
  "email": "info@example.com",
  "phone": "03-1234-5678",
  "address": "東京都渋谷区〇〇1-2-3",
  "social": {
    "twitter": "https://twitter.com/example",
    "facebook": "https://facebook.com/example",
    "linkedin": "https://linkedin.com/company/example"
  }
}
```

テンプレートで使用:
```njk
<footer>
  <p>{{ site.name }}</p>
  <p>{{ site.email }}</p>
  <a href="{{ site.social.twitter }}">Twitter</a>
</footer>
```

### ナビゲーションメニューの例

`src/_data/navigation.json`:
```json
{
  "main": [
    {
      "text": "ホーム",
      "url": "/"
    },
    {
      "text": "About",
      "url": "/about/"
    },
    {
      "text": "サービス",
      "url": "/services/"
    },
    {
      "text": "ブログ",
      "url": "/blog/"
    },
    {
      "text": "お問い合わせ",
      "url": "/contact/"
    }
  ],
  "footer": [
    {
      "text": "プライバシーポリシー",
      "url": "/privacy/"
    },
    {
      "text": "利用規約",
      "url": "/terms/"
    }
  ]
}
```

テンプレートで使用:
```njk
<nav>
  {% for item in navigation.main %}
    <a href="{{ item.url }}">{{ item.text }}</a>
  {% endfor %}
</nav>
```

### FAQの例

`src/_data/faq.json`:
```json
[
  {
    "question": "サービスの料金はいくらですか？",
    "answer": "基本プランは月額10,000円から。詳細はお問い合わせください。"
  },
  {
    "question": "無料トライアルはありますか？",
    "answer": "はい、14日間の無料トライアルをご利用いただけます。"
  },
  {
    "question": "契約期間はありますか？",
    "answer": "最低契約期間は3ヶ月です。それ以降は月単位で更新されます。"
  }
]
```

テンプレートで使用:
```njk
<section id="faq">
  <h2>よくある質問</h2>
  {% for item in faq %}
    <div class="faq-item">
      <h3>{{ item.question }}</h3>
      <p>{{ item.answer }}</p>
    </div>
  {% endfor %}
</section>
```

## JavaScriptデータファイル（動的データ）

APIからデータを取得する場合や、動的に計算する場合:

### 実績数値の例

`src/_data/stats.js`:
```javascript
export default async function() {
  // APIからデータ取得（例）
  // const response = await fetch('https://api.example.com/stats');
  // const data = await response.json();
  // return data;

  // または静的データを返す
  return {
    projects: 150,
    clients: 50,
    years: 10,
    teamMembers: 15,
    satisfaction: 98
  };
}
```

テンプレートで使用:
```njk
<section id="stats" class="py-16 bg-blue-600 text-white">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div>
        <div class="text-5xl font-bold">{{ stats.projects }}</div>
        <div class="text-xl mt-2">プロジェクト</div>
      </div>
      <div>
        <div class="text-5xl font-bold">{{ stats.clients }}</div>
        <div class="text-xl mt-2">導入企業</div>
      </div>
      <div>
        <div class="text-5xl font-bold">{{ stats.years }}</div>
        <div class="text-xl mt-2">年の実績</div>
      </div>
      <div>
        <div class="text-5xl font-bold">{{ stats.satisfaction }}%</div>
        <div class="text-xl mt-2">顧客満足度</div>
      </div>
    </div>
  </div>
</section>
```

### 現在時刻の例

`src/_data/buildInfo.js`:
```javascript
export default function() {
  return {
    timestamp: new Date().toISOString(),
    year: new Date().getFullYear(),
    env: process.env.NODE_ENV || 'development'
  };
}
```

テンプレートで使用:
```njk
<footer>
  <p>&copy; {{ buildInfo.year }} {{ site.name }}</p>
  <p class="text-xs text-gray-500">Last updated: {{ buildInfo.timestamp }}</p>
</footer>
```

## 使用例

### 顧客の声データ

`src/_data/testimonials.json`:
```json
[
  {
    "company": "株式会社Example",
    "person": "田中一郎",
    "role": "代表取締役",
    "content": "素晴らしいサービスで、売上が30%向上しました。",
    "image": "/assets/images/testimonials/tanaka.jpg",
    "rating": 5,
    "date": "2024-12-01"
  },
  {
    "company": "サンプル商事株式会社",
    "person": "鈴木花子",
    "role": "マーケティング部長",
    "content": "導入から3ヶ月で成果が出ました。",
    "image": "/assets/images/testimonials/suzuki.jpg",
    "rating": 5,
    "date": "2024-11-15"
  }
]
```

### パートナー企業データ

`src/_data/partners.json`:
```json
[
  {
    "name": "パートナー企業A",
    "logo": "/assets/images/partners/partner-a.png",
    "url": "https://partner-a.com"
  },
  {
    "name": "パートナー企業B",
    "logo": "/assets/images/partners/partner-b.png",
    "url": "https://partner-b.com"
  }
]
```

テンプレートで使用:
```njk
<section id="partners">
  <h2>パートナー企業</h2>
  <div class="flex flex-wrap gap-8 justify-center">
    {% for partner in partners %}
      <a href="{{ partner.url }}" target="_blank" rel="noopener">
        <img src="{{ partner.logo }}" alt="{{ partner.name }}"
             class="h-16 grayscale hover:grayscale-0 transition"
             loading="lazy" decoding="async">
      </a>
    {% endfor %}
  </div>
</section>
```

## Collections vs Global Data

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

## データファイルの命名規則

### ファイル名がデータ名になる

- `team.json` → テンプレートで `{{ team }}` として利用
- `site.json` → テンプレートで `{{ site }}` として利用
- `navigation.json` → テンプレートで `{{ navigation }}` として利用

### ネストされたデータ構造

```json
{
  "company": {
    "name": "株式会社Example",
    "founded": 2010
  },
  "contact": {
    "email": "info@example.com",
    "phone": "03-1234-5678"
  }
}
```

テンプレートで使用:
```njk
{{ site.company.name }}
{{ site.contact.email }}
```

## 関連ドキュメント

- [Collections 完全ガイド](COLLECTION_DETAILED_GUIDE.md)
- [実装例: チームページ](examples/TEAM_PAGE.md)
- [実装例: 顧客の声](examples/TESTIMONIALS.md)
- [ディレクトリ構造](DIRECTORY_STRUCTURE.md)
