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
}
