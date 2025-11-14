import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginTOC from "eleventy-plugin-toc";
import htmlnano from 'htmlnano';
import pluginSitemap from "@quasibit/eleventy-plugin-sitemap";
import pluginRss from "@11ty/eleventy-plugin-rss";

import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import cssnano from "cssnano";

import { readFileSync, existsSync } from "fs";
import path from "path";
import fs from 'fs';

// 分割した設定ファイルをインポート
import configureFilters from "./eleventy.config.filters.js";
import configureShortcodes from "./eleventy.config.shortcodes.js";
import configureCollections from "./eleventy.config.collections.js";

export default function(eleventyConfig) {
  // PostCSS processor for Tailwind CSS v4
  const processor = postcss([
    tailwindcss(),
    // 開発モードではCSS圧縮を無効化してデバッグを容易に
    ...(process.env.NODE_ENV === 'production' ? [cssnano({ preset: 'default' })] : [])
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
  // Note: Update hostname to your Cloudflare Pages domain (e.g., https://your-project.pages.dev)
  eleventyConfig.addPlugin(pluginSitemap, {
    sitemap: {
      hostname: "https://your-project.pages.dev"
    }
  });
  
  // RSS plugin
  eleventyConfig.addPlugin(pluginRss);

  // Copy static files (excluding CSS which is processed by PostCSS)
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/_redirects");

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
  
  // Watch additional files
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  // 分割した設定を適用
  configureFilters(eleventyConfig);
  configureShortcodes(eleventyConfig);
  configureCollections(eleventyConfig);

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