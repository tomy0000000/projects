module.exports = function (eleventyConfig) {
  // Watch CSS files for changes
  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/css/**/*.css",
  });

  // Static files
  eleventyConfig.addPassthroughCopy({ "src/seo/**": "/" });
  eleventyConfig.addPassthroughCopy("src/js");

  // Shortcode
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
