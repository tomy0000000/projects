module.exports = function (eleventyConfig) {
  // Watch CSS files for changes
  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/css/**/*.css",
  });

  // Current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
