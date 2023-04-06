const pluginWebC = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebC, {
		components: "website/_includes/components/*.webc",
	});

	eleventyConfig.addWatchTarget("website/_includes/components/*.webc");

	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	eleventyConfig.addPassthroughCopy({ public: "." });

	return {
		dir: {
			input: "website",
		},
		markdownTemplateEngine: "njk"
	};
};