const pluginWebC = require("@11ty/eleventy-plugin-webc");
const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebC, {
		components: "website/_includes/components/*.webc",
	});
  eleventyConfig.addPlugin(bundlerPlugin);

	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	eleventyConfig.addPassthroughCopy({ public: "." });

  eleventyConfig.setServerOptions({
		module: "@11ty/eleventy-server-browsersync",

    // Default Browsersync options shown:
    port: 8080,
    open: false,
    notify: false,
    ui: false,
    ghostMode: false,
  });

	return {
		dir: {
			input: "website",
		},
		markdownTemplateEngine: "njk"
	};
};