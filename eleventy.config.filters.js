// フィルター設定を分離したファイル

export default function(eleventyConfig) {
  // Date filters
  eleventyConfig.addFilter("date", function(date, format) {
    const d = date === "now" ? new Date() : new Date(date);
    if (format === "%Y") {
      return d.getFullYear();
    }
    // Add more date formats as needed
    return d.toLocaleDateString('ja-JP');
  });

  // URL filter for absolute URLs
  eleventyConfig.addFilter("absoluteUrl", function(url, base) {
    try {
      return new URL(url, base).toString();
    } catch(e) {
      console.log(`Trying to convert ${url} to be an absolute url with base ${base} and failed.`);
      return url;
    }
  });

  // 日本語対応の文字数制限フィルター
  // 使用例: {{ text | truncate(50) }}
  eleventyConfig.addFilter("truncate", function(text, length = 100, suffix = "...") {
    if (!text) return "";
    const str = String(text);
    if (str.length <= length) return str;
    return str.substring(0, length).trim() + suffix;
  });

  // 日本語対応の読書時間計算フィルター
  // 日本語は1分あたり約500文字、英語は1分あたり約200単語で計算
  // 使用例: {{ content | readingTime }} → "3分"
  eleventyConfig.addFilter("readingTime", function(content) {
    if (!content) return "1分";

    // HTMLタグを除去
    const text = content.replace(/<[^>]*>/g, '');

    // 日本語文字数をカウント（漢字、ひらがな、カタカナ）
    const japaneseChars = (text.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) || []).length;
    // 英単語数をカウント
    const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;

    // 日本語: 500文字/分、英語: 200単語/分 で計算
    const minutes = Math.ceil((japaneseChars / 500) + (englishWords / 200));

    return `${Math.max(1, minutes)}分`;
  });

  // 配列の先頭N件を取得するフィルター
  // 使用例: {{ collections.blog | limit(5) }}
  eleventyConfig.addFilter("limit", function(array, limit) {
    if (!Array.isArray(array)) return [];
    return array.slice(0, limit);
  });
}
