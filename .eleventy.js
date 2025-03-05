const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
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
			}
		}
	});

    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("media");

    eleventyConfig.addFilter("formatDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toISODate();
    });

    let markdownOptions = {
        html: true,
        breaks: true,
        linkify: true
    };
    let markdownLib = new markdownIt(markdownOptions);

    //Add div around tables
    markdownLib.renderer.rules.table_open = () => '<div class="table-wrapper">\n<table>\n',
    markdownLib.renderer.rules.table_close = () => '</table>\n</div>',

    eleventyConfig.setLibrary("md", markdownLib);
};