const pluginWebC = require("@11ty/eleventy-plugin-webc");
const fs = require("fs");
const path = require("path");
const importmaps = fs.readFileSync(path.join('./importmap.json'), 'utf8');

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebC, {
		components: "website/_includes/components/*.webc",
	});

  eleventyConfig.addGlobalData("importmap", importmaps);

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
