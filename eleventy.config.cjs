const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginWebc = require("@11ty/eleventy-plugin-webc");

const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc, {
		// Glob to find no-import global components
		// (The default changed from `false` in Eleventy WebC v0.7.0)
		components: "website/_includes/components/**/*.webc",
	});
  eleventyConfig.amendLibrary('md', md => md
    .use(markdownItAnchor)
    .use(markdownItAttrs));

  eleventyConfig.addPassthroughCopy('website/assets/**/*');

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  return {
    templateFormats: ['html', 'md', 'njk', '11ty.cjs', 'webc'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: './website',
    },
  };
};