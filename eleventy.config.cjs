const fs = require("fs");
const pluginWebC = require("@11ty/eleventy-plugin-webc");
const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");

const NOT_FOUND_PATH = "_site/404.html";

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
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          if (!fs.existsSync(NOT_FOUND_PATH)) {
            throw new Error(`Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`);
          }

          const content_404 = fs.readFileSync(NOT_FOUND_PATH);
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

	return {
		dir: {
			input: "website",
		},
		markdownTemplateEngine: "njk"
	};
};