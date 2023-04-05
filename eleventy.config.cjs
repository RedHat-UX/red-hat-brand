const pluginWebC = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebC, {
		components: "website/_includes/components/*.webc",
	});

	eleventyConfig.addWatchTarget("website/_includes/components/*.webc");

	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	eleventyConfig.addPassthroughCopy({ public: "." });

  eleventyConfig.addCollection("foundations", function(collectionApi) {
    return collectionApi.getFilteredByTags("foundations");
  });

	eleventyConfig.addCollection("logos", function(collectionApi) {
    return collectionApi.getFilteredByTags("logos");
  });

	eleventyConfig.addCollection("visual-system", function(collectionApi) {
    return collectionApi.getFilteredByTags("visual-system");
  });

	eleventyConfig.addCollection("expression", function(collectionApi) {
    return collectionApi.getFilteredByTags("expression");
  });

	return {
		dir: {
			input: "website",
		},
		markdownTemplateEngine: "njk"
	};
};