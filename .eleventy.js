const rollup = require("rollup");
const { loadConfigFile } = require("rollup/loadConfigFile");
const path = require("path");

const error = async (message) => {
  console.error("\x1b[31m%s\x1b[0m", message);
};
const success = async (message) => {
  console.log("\x1b[32m%s\x1b[0m", message);
};

module.exports = function (eleventyConfig) {
  // Static files
  eleventyConfig.addPassthroughCopy({ "src/seo/**": "/" });
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/scss");

  // Shortcode
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Ignore files
  eleventyConfig.watchIgnores.add("src/projects/_*.njk");

  // Collections
  eleventyConfig.addCollection("projects", function (collection) {
    return collection.getFilteredByGlob("src/projects/*.njk");
  });

  // Filters
  eleventyConfig.addFilter("sortByOrder", (values) => {
    let vals = [...values];
    return vals.sort((a, b) =>
      Math.sign((a.data.order || 99) - (b.data.order || 99))
    );
  });

  // Trigger Rollup after Eleventy build
  eleventyConfig.on("eleventy.after", async () => {
    try {
      await loadConfigFile(path.resolve(__dirname, "rollup.config.mjs"), {
        format: "es",
      }).then(async ({ options, warnings }) => {
        if (warnings.count > 0) {
          error(`[rollup] ${warnings.count} warnings`);
          warnings.flush();
        }

        for (const optionsObj of options) {
          const bundle = await rollup.rollup(optionsObj);
          await Promise.all(optionsObj.output.map(bundle.write));
        }
        success("[rollup] Compiled successfully");
      });
    } catch (err) {
      error(`[rollup] ${err.stack}`);
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
