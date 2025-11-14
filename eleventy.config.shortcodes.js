// ショートコード設定を分離したファイル
import Image from "@11ty/eleventy-img";

export default function(eleventyConfig) {
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
}
