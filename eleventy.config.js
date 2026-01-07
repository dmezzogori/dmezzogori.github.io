module.exports = function (eleventyConfig) {
  // Passthrough copy for assets
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("CNAME");

  // Passthrough copy for i18n JSON files (for async loading)
  eleventyConfig.addPassthroughCopy({
    "src/_data/i18n/*.json": "assets/i18n",
  });

  // Load i18n translations as global data
  eleventyConfig.addGlobalData("i18n", () => {
    const en = require("./src/_data/i18n/en.json");
    const it = require("./src/_data/i18n/it.json");
    return { en, it };
  });

  // Watch CSS for changes
  eleventyConfig.addWatchTarget("src/assets/css/");

  // Date filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  // Year filter for copyright
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Blog collection
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/posts/*.md").reverse();
  });

  // Navigation filters for blog posts
  eleventyConfig.addFilter("getPreviousCollectionItem", (collection, page) => {
    const index = collection.findIndex((item) => item.url === page.url);
    return index > 0 ? collection[index - 1] : null;
  });

  eleventyConfig.addFilter("getNextCollectionItem", (collection, page) => {
    const index = collection.findIndex((item) => item.url === page.url);
    return index < collection.length - 1 ? collection[index + 1] : null;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
