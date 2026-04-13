import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { DateTime } from "luxon";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import readingTime from "eleventy-plugin-reading-time";

export default async function (eleventyConfig) {
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
  }).use(markdownItAnchor);

  // Add custom link rendering - external links open in new tab
  const defaultLinkOpenRenderer = markdownLibrary.renderer.rules.link_open ||
    function(tokens, idx, options, _env, self) {
      return self.renderToken(tokens, idx, options);
    };

  markdownLibrary.renderer.rules.link_open = function (tokens, idx, options, _env, self) {
    const token = tokens[idx];
    const href = token.attrGet("href");

    // External link: doesn't start with / or #
    if (href && !href.startsWith("/") && !href.startsWith("#")) {
      token.attrSet("target", "_blank");
      token.attrSet("rel", "noopener noreferrer");
      token.attrSet("class", "external-link");
    }

    return defaultLinkOpenRenderer(tokens, idx, options, _env, self);
  };

  // Add custom image rendering with caption support
  markdownLibrary.renderer.rules.image = function (tokens, idx) {
    const token = tokens[idx];
    const src = token.attrGet("src");
    const alt = token.content;
    const title = token.attrGet("title");

    let html = '<div class="image-container">';
    html += `<a href="${src}" target="_blank" rel="noopener" class="image-link">`;
    html += `<img src="${src}" alt="${alt}" />`;
    html += '</a>';
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

  // add 'gallery' shortcode with clickable images
  eleventyConfig.addShortcode("gallery", function(images) {
    return `<details class="gallery">
        <summary>View gallery (${images.length} images)</summary>
        <div class="gallery-grid">${images.map(src => `<a href="${src}" target="_blank" rel="noopener"><img src="${src}" loading="lazy" alt=""></a>`).join("")}</div>
      </details>
    `;
  });

  eleventyConfig.addCollection("project", function(collectionApi) {
    return collectionApi.getFilteredByTag("project");
  });

  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
}
