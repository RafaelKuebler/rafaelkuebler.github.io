const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("media");
    eleventyConfig.addPassthroughCopy("favicon.ico");
    eleventyConfig.addPassthroughCopy("favicon-16x16.png");
    eleventyConfig.addPassthroughCopy("favicon-32x32.png");

    eleventyConfig.addFilter("formatDate", (date) => {
        return DateTime.fromJSDate(date).toFormat("yyyy-MM-dd");
    });

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
        linkify: true
    });

    // Add custom image rendering with caption support
    markdownLibrary.renderer.rules.image = function(tokens, idx) {
        const token = tokens[idx];
        const src = token.attrGet('src');
        const alt = token.content;
        const title = token.attrGet('title');
        
        let html = '<div class="image-container">';
        html += `<img src="${src}" alt="${alt}" />`;
        if (title) {
            html += `<div class="image-caption">${title}</div>`;
        }
        html += '</div>';
        
        return html;
    };

    // Add div around tables
    markdownLibrary.renderer.rules.table_open = () => '<div class="table-wrapper">\n<table>\n';
    markdownLibrary.renderer.rules.table_close = () => '</table>\n</div>';

    eleventyConfig.setLibrary("md", markdownLibrary);

    return {
        dir: {
            input: ".",
            output: "_site",
            includes: "_includes",
            data: "_data"
        }
    };
};