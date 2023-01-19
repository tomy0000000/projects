module.exports = {
  layout: "project",
  eleventyComputed: {
    order: (data) => parseInt(data.page.fileSlug.split("-")[0]),
    permalink: function (data) {
      return `projects/${this.slugify(
        data.title ? data.title : data.page.fileSlug
      )}/`;
    },
  },
};
