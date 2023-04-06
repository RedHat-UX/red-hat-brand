const pluginWebC = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebC, {
		components: "website/_includes/components/*.webc",
	});


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