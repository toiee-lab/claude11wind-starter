import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import Image from "@11ty/eleventy-img";
import pluginTOC from "eleventy-plugin-toc";
import htmlnano from 'htmlnano';
import pluginSitemap from "@quasibit/eleventy-plugin-sitemap";
import pluginRss from "@11ty/eleventy-plugin-rss";

import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import cssnano from "cssnano";

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import fs from 'fs';

export default function(eleventyConfig) {
  // PostCSS processor for Tailwind CSS v4
  const processor = postcss([
    tailwindcss({
      // Tailwind CSS v4 の自動検出を補完するためのcontent設定
      content: ['./src/**/*.{njk,html,md,js}']
    }),
    cssnano({ preset: 'default' }),
  ]);

  //compile tailwind before eleventy processes the files
  eleventyConfig.on('eleventy.before', async () => {
    const tailwindInputPath = path.resolve('./src/assets/css/tailwind.css');

    const tailwindOutputPath = './_site/assets/css/main.css';

    const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');

    const outputDir = path.dirname(tailwindOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  // Add plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h2', 'h3'],
    wrapper: 'div',
    wrapperClass: 'toc',
    ul: true,
    flat: false
  });
  
  // Sitemap plugin
  eleventyConfig.addPlugin(pluginSitemap, {
    sitemap: {
      hostname: "https://example.com"
    }
  });
  
  // RSS plugin
  eleventyConfig.addPlugin(pluginRss);

  // Copy static files (excluding CSS which is processed by PostCSS)
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  
  // Watch additional files
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  // Image shortcode for optimization
  eleventyConfig.addAsyncShortcode("image", async function(src, alt, sizes = "100vw", loading = "lazy") {
    if(alt === undefined) {
      throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    let metadata = await Image(src, {
      widths: [300, 600, 900, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "_site/assets/images/optimized",
      urlPath: "/assets/images/optimized/",
    });

    let imageAttributes = {
      alt,
      sizes,
      loading,
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

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

  // HTML minification (production only)
  if (process.env.NODE_ENV === "production") {
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
      // HTMLファイルのみ処理
      if (outputPath && outputPath.endsWith(".html")) {
        return htmlnano
          .process(content, {
            // htmlnanoのオプション設定
            removeEmptyAttributes: false,  // 空の属性を削除しない
            collapseWhitespace: 'conservative',  // 保守的な空白の折りたたみ
            removeComments: true,  // コメントを削除
            minifyCss: true,  // CSS も圧縮
            minifyJs: true,   // JavaScript も圧縮
          })
          .then(result => result.html)
          .catch(err => {
            console.error("HTMLミニファイエラー:", err);
            return content;  // エラー時は元のコンテンツを返す
          });
      }
      return content;
    });
  }

  // BrowserSync config for development
  eleventyConfig.setBrowserSyncConfig({
    ui: false,
    ghostMode: false,
    files: [
      '_site/assets/css/**/*.css',
      '_site/assets/js/**/*.js'
    ],
    callbacks: {
      ready: function(err, browserSync) {
        try {
          if (existsSync('_site/404.html')) {
            const content_404 = readFileSync('_site/404.html');
            browserSync.addMiddleware("*", (req, res) => {
              // Provides the 404 content without redirect.
              res.write(content_404);
              res.end();
            });
          } else {
            console.warn('404.html not found, using default 404 handling');
          }
        } catch (error) {
          console.warn('Error setting up 404 handling:', error.message);
        }
      }
    }
  });

  // Collections for different content types
  eleventyConfig.addCollection("pages", function(collection) {
    return collection.getFilteredByGlob("src/pages/*.md");
  });

  // Create sitemap data
  eleventyConfig.addCollection("sitemap", function(collection) {
    return collection.getAll()
      .filter(item => item.outputPath && item.outputPath.endsWith('.html'))
      .filter(item => !item.data.excludeFromSitemap);
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}