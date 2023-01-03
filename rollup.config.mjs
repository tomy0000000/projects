import postcss from "rollup-plugin-postcss";
import purgecss from "@fullhuman/postcss-purgecss";
import terser from "@rollup/plugin-terser";
import bundleInject from "rollup-plugin-bundle-inject";
import del from "rollup-plugin-delete";

const production = process.env.NODE_ENV === "production";

export default {
  input: "_site/js/main.js",
  output: {
    dir: "_site",
    entryFileNames: "js/[name].bundle.js",
    format: "iife",
    name: "main",
  },
  plugins: [
    // Compile SCSS to CSS
    // Minify CSS
    // Purge unused CSS
    postcss({
      plugins: [
        purgecss({
          content: ["_site/main/index.html", "_site/js/main.bundle.js"],
        }),
      ],
      extract: "css/main.bundle.css",
      minimize: production,
    }),
    // Minify JS
    production && terser(),
    // Inject CSS and JS into HTML, then minify HTML
    bundleInject({
      target: "_site/main/index.html",
      rename: "index.html",
      minify: production,
    }),
    // Delete source JS and CSS files
    production &&
      del({
        targets: ["_site/js", "_site/scss", "_site/css"],
        hook: "buildEnd",
      }),
  ],
};
