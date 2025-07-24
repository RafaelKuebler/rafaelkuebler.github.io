const { DateTime } = require("luxon");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const readingTime = require("eleventy-plugin-reading-time");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: {
      name: "post",
      limit: 10,
    },
    metadata: {
      language: "en",
      title: "Rafa's blog",
      subtitle: "Rafael's reflections on life and other things.",
      base: "https://rafaelkuebler.github.io/",
      author: {
        name: "Rafael Kübler da Silva",
        email: "rafael_kuebler@yahoo.es",
      },
    },
  });

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("media");
  eleventyConfig.addPassthroughCopy("favicon*");
  eleventyConfig.addPassthroughCopy("robots.txt");

  eleventyConfig.addFilter("slugify", (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  });

  eleventyConfig.addFilter("date", (dateObj, format = "yyyy-MM-dd") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Configure markdown-it
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });

  // Add custom image rendering with caption support
  markdownLibrary.renderer.rules.image = function (tokens, idx) {
    const token = tokens[idx];
    const src = token.attrGet("src");
    const alt = token.content;
    const title = token.attrGet("title");

    let html = '<div class="image-container">';
    html += `<img src="${src}" alt="${alt}" />`;
    if (title) {
      html += `<div class="image-caption">${title}</div>`;
    }
    html += "</div>";

    return html;
  };

  // Add div around tables
  markdownLibrary.renderer.rules.table_open = () =>
    '<div class="table-wrapper">\n<table>\n';
  markdownLibrary.renderer.rules.table_close = () => "</table>\n</div>";

  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
