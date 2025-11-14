// Collections設定を分離したファイル

export default function(eleventyConfig) {
  // Collections for different content types
  eleventyConfig.addCollection("pages", function(collection) {
    return collection.getFilteredByGlob("src/pages/*.md");
  });

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

  // Create sitemap data
  eleventyConfig.addCollection("sitemap", function(collection) {
    return collection.getAll()
      .filter(item => item.outputPath && item.outputPath.endsWith('.html'))
      .filter(item => !item.data.excludeFromSitemap);
  });
}
