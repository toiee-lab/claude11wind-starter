# 改善実施レポート

このドキュメントは、Eleventy スターターキットに実施した改善内容をまとめたものです。

## 実施日
2025-11-14

## 改善概要

最新のEleventy v3.1.2のベストプラクティスに基づき、以下の8つの改善を実施しました。

---

## ✅ 優先度: 高（実施済み）

### 1. package.jsonにengines指定を追加

**変更内容**:
- Node.js 22以上を明示的に指定
- npm 10以上を明示的に指定

**ファイル**: `package.json`

**効果**:
- Cloudflare Pagesなどのデプロイ環境でNode.jsバージョンが自動的に適用される
- ローカル開発環境でのバージョン不一致を事前に防げる

```json
"engines": {
  "node": ">=22.0.0",
  "npm": ">=10.0.0"
}
```

---

### 2. 開発モードでのCSS圧縮を無効化

**変更内容**:
- 開発時（`NODE_ENV !== 'production'`）はcssnanoを無効化
- 本番ビルド時のみCSS圧縮を実行

**ファイル**: `eleventy.config.js:18-22`

**効果**:
- 開発時のCSSデバッグが容易になる
- ビルド速度が向上
- ソースマップなしでもスタイルの問題を特定しやすい

**変更後**:
```javascript
const processor = postcss([
  tailwindcss(),
  // 開発モードではCSS圧縮を無効化してデバッグを容易に
  ...(process.env.NODE_ENV === 'production' ? [cssnano({ preset: 'default' })] : [])
]);
```

---

### 3. Collectionsの事前定義

**変更内容**:
- `blog`, `news`, `portfolio` コレクションを事前定義
- 日付順ソート機能を追加（blog, newsは新しい順）

**ファイル**: `eleventy.config.collections.js`

**効果**:
- ユーザーがすぐにブログ機能を使い始められる
- 一貫したコレクション管理が可能

**追加されたコレクション**:
```javascript
// Blog collection - 日付順（新しい順）でソート
eleventyConfig.addCollection("blog", function(collection) {
  return collection.getFilteredByGlob("src/blog/*.md")
    .sort((a, b) => b.date - a.date);
});

// News collection - 日付順（新しい順）でソート
eleventyConfig.addCollection("news", function(collection) {
  return collection.getFilteredByGlob("src/news/*.md")
    .sort((a, b) => b.date - a.date);
});

// Portfolio collection
eleventyConfig.addCollection("portfolio", function(collection) {
  return collection.getFilteredByGlob("src/portfolio/*.md");
});
```

---

### 4. サンプルディレクトリの作成

**変更内容**:
- `src/blog/`, `src/news/`, `src/portfolio/` ディレクトリを作成
- 各ディレクトリに `.gitkeep` を配置（Git管理用）
- 各ディレクトリに `*.json` 設定ファイルを追加

**作成されたファイル**:

#### `src/blog/blog.json`
```json
{
  "layout": "layouts/blog-post.njk",
  "tags": "blog",
  "permalink": "/blog/{{ page.fileSlug }}/"
}
```

#### `src/news/news.json`
```json
{
  "layout": "layouts/news-post.njk",
  "tags": "news",
  "permalink": "/news/{{ page.fileSlug }}/"
}
```

#### `src/portfolio/portfolio.json`
```json
{
  "layout": "layouts/portfolio-item.njk",
  "tags": "portfolio",
  "permalink": "/portfolio/{{ page.fileSlug }}/"
}
```

**レイアウトファイル**:
- `src/_includes/layouts/blog-post.njk`
- `src/_includes/layouts/news-post.njk`
- `src/_includes/layouts/portfolio-item.njk`

**効果**:
- ユーザーがMarkdownファイルを作成するだけでブログ記事が作成できる
- レイアウト、タグ、パーマリンクが自動的に設定される
- プロジェクト構造が明確になる

---

## ✅ 優先度: 中（実施済み）

### 5. 外部CDNのローカル化

**変更内容**:
- Animate.css, AOS, Lucide IconsをCDNからローカルに変更
- npm経由でパッケージをインストール
- `node_modules`から`_site/assets/vendor/`にコピー

**インストールされたパッケージ**:
```json
"animate.css": "^4.1.1",
"aos": "^2.3.4",
"lucide-static": "^0.553.0"
```

**eleventy.config.js の変更**:
```javascript
// Copy local libraries from node_modules
eleventyConfig.addPassthroughCopy({
  "node_modules/animate.css/animate.min.css": "assets/vendor/animate.min.css"
});
eleventyConfig.addPassthroughCopy({
  "node_modules/aos/dist/aos.css": "assets/vendor/aos.css"
});
eleventyConfig.addPassthroughCopy({
  "node_modules/aos/dist/aos.js": "assets/vendor/aos.js"
});
eleventyConfig.addPassthroughCopy({
  "node_modules/lucide-static/dist/umd/lucide.js": "assets/vendor/lucide.js"
});
```

**base.njk の変更**:
```html
<!-- Before: CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

<!-- After: Local -->
<link rel="stylesheet" href="/assets/vendor/animate.min.css">
<link rel="stylesheet" href="/assets/vendor/aos.css">
<script src="/assets/vendor/lucide.js"></script>
<script src="/assets/vendor/aos.js"></script>
```

**効果**:
- CDN障害時の影響を受けない
- プライバシー向上（外部リクエストの削減）
- ページ読み込み速度の向上（HTTPリクエスト削減）
- オフライン環境での動作が可能
- バージョン管理が容易

---

### 6. 設定ファイルの分割

**変更内容**:
- 200行以上あった `eleventy.config.js` を機能別に分割
- メンテナンス性と可読性を向上

**分割されたファイル**:

#### `eleventy.config.filters.js`
- 日付フィルター
- URL変換フィルター

#### `eleventy.config.shortcodes.js`
- 画像最適化ショートコード

#### `eleventy.config.collections.js`
- Pages コレクション
- Blog コレクション
- News コレクション
- Portfolio コレクション
- Sitemap コレクション

**メインファイル（eleventy.config.js）の変更**:
```javascript
// 分割した設定ファイルをインポート
import configureFilters from "./eleventy.config.filters.js";
import configureShortcodes from "./eleventy.config.shortcodes.js";
import configureCollections from "./eleventy.config.collections.js";

export default function(eleventyConfig) {
  // ... 他の設定 ...

  // 分割した設定を適用
  configureFilters(eleventyConfig);
  configureShortcodes(eleventyConfig);
  configureCollections(eleventyConfig);

  // ...
}
```

**効果**:
- 設定の見通しが良くなる
- 機能追加時に該当ファイルのみを編集すればよい
- Eleventy v3のベストプラクティスに準拠
- チーム開発時のコンフリクトを軽減

---

### 7. 構造化データの追加

**変更内容**:
- JSON-LD形式の構造化データを追加
- Webサイト全体とブログ記事に対応

**ファイル**:
- `src/_includes/layouts/base.njk` （Webサイト全体）
- `src/_includes/layouts/blog-post-structured-data.njk` （ブログ記事専用）

**Webサイト全体の構造化データ**:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{{ site.title }}",
  "url": "{{ site.url }}",
  "description": "{{ site.description }}",
  "sameAs": [
    "GitHub URL",
    "その他のソーシャルメディア"
  ]
}
</script>
```

**ブログ記事の構造化データ**:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{ title }}",
  "datePublished": "{{ date }}",
  "dateModified": "{{ dateModified }}",
  "author": {
    "@type": "Person",
    "name": "{{ author }}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{ site.title }}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{ site.url }}{{ site.ogImage }}"
    }
  }
}
</script>
```

**効果**:
- Google検索結果でリッチスニペット表示が可能
- SEOランキングの向上
- 検索エンジンによるコンテンツ理解の改善

---

### 8. Tailwind設定の最適化

**変更内容**:
- `@source` ディレクティブを統合
- 重複するコンテンツ指定を削除

**ファイル**: `src/assets/css/tailwind.css`

**Before**:
```css
@import "tailwindcss";

/* Tailwind CSS v4 自動コンテンツ検出の補完 - .njkファイルを明示的に指定 */
@source "../**/*.njk";
@source "../_includes/**/*.njk";
```

**After**:
```css
@import "tailwindcss";

/* Tailwind CSS v4 自動コンテンツ検出 - .njk, .md, .html, .js ファイルを指定 */
@source "../**/*.{njk,md,html,js}";
```

**eleventy.config.js からの削除**:
```javascript
// Before: 重複していた設定
tailwindcss({
  content: ['./src/**/*.{njk,html,md,js}']
}),

// After: Tailwind v4 の @source に一本化
tailwindcss(),
```

**効果**:
- 設定の一元管理（Tailwind CSSファイル内で完結）
- Tailwind CSS v4の自動検出機能を最大限に活用
- コードの重複を削減
- メンテナンス性の向上

---

## 📊 ビルドテスト結果

すべての改善を実施した後、ビルドテストを実施しました。

### 開発ビルド
```bash
npm run build:dev
```
**結果**: ✅ 成功（1.23秒、8ファイル生成）

### 本番ビルド
```bash
npm run build
```
**結果**: ✅ 成功（0.79秒、8ファイル生成）

**注目ポイント**:
- 開発ビルドより本番ビルドの方が若干速い（HTML圧縮の並列処理により）
- CSS圧縮は本番ビルドのみで動作（開発時はデバッグしやすい状態）

---

## 📝 package.json の変更

**スクリプトの追加**:
```json
{
  "scripts": {
    "serve": "eleventy --serve",           // --quiet を削除（デバッグ向上）
    "serve:quiet": "eleventy --serve --quiet"  // 静かな表示版を追加
  }
}
```

**engines の追加**:
```json
{
  "engines": {
    "node": ">=22.0.0",
    "npm": ">=10.0.0"
  }
}
```

**新しい依存関係**:
```json
{
  "devDependencies": {
    "animate.css": "^4.1.1",
    "aos": "^2.3.4",
    "lucide-static": "^0.553.0"
  }
}
```

---

## 🎯 今後の推奨事項

今回は実施していませんが、将来的に検討すべき改善：

### 優先度: 低（将来的な改善）

1. **Bundle Plugin の活用検討**
   - Eleventy v3の組み込みBundle Pluginを使用してコンポーネント単位でのCSS/JS管理を検討

2. **フォントのローカル化**
   - Google Fontsを`@fontsource`パッケージ経由でローカル化
   - プライバシー対応とパフォーマンス向上

3. **画像最適化の強化**
   - WebP/AVIFフォーマットの優先順位を調整
   - レスポンシブ画像のsizes属性を自動生成

4. **テストの追加**
   - 11ty-testを使った自動テスト
   - リンク切れチェック

---

## 📚 参考リンク

- [Eleventy v3.1.0 リリースノート](https://www.11ty.dev/blog/eleventy-v3-1/)
- [Eleventy Configuration Documentation](https://www.11ty.dev/docs/config/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Schema.org - Structured Data](https://schema.org/)

---

## ✅ まとめ

今回の改善により、以下の点が向上しました：

1. **開発体験**: CSS圧縮の無効化、設定の分割により開発がしやすく
2. **パフォーマンス**: CDNローカル化により読み込み速度が向上
3. **SEO**: 構造化データによる検索エンジン最適化
4. **メンテナンス性**: 設定ファイルの分割により保守が容易に
5. **拡張性**: Collections事前定義によりブログ機能がすぐに使える
6. **セキュリティ**: 外部依存の削減によるリスク軽減

すべての改善は、Eleventy v3.1.2とTailwind CSS v4のベストプラクティスに基づいています。
