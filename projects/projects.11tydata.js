export default {
    tags: ["project"],
    eleventyComputed: {
        title: data => data.title || data.page.filePathStem.split('/').pop(),
        layout: "project.njk"
    }
};
