const fs = require('fs')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const markdownIt = require('markdown-it')
const { default: axios } = require('axios')
const CleanCSS = require('clean-css')
const { minify } = require('terser')
const htmlmin = require('html-minifier')
const stripMarkdown = require('remove-markdown')
const lib = require('./lib')

const siteConfig = require('./config/site.config')

const markdownLib = markdownIt({ html: true, linkify: true })
.use(require('markdown-it-anchor'), {
  level: [1, 2, 3],
  slugify: (s) =>
    s
      .trim()
      .toLowerCase()
      .replace(/[\s+~\/]/g, "-")
      .replace(/[().`,%·'"!?¿:@*]/g, ""),
})
.use(require('markdown-it-footnote'))

module.exports = function(config) {
  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!--more-->"
  })
  /* PassThrough */
  config.addPassthroughCopy({ 'static': '.' })

  /* Plugins */
  config.addPlugin(syntaxHighlight)
  config.addPlugin(pluginRss)

  /* Filters */
  config.addFilter('absURL', value => `${siteConfig.url}${value}`)
  config.addFilter("formatDate", lib.formatDate)
  config.addFilter("formatISO", lib.formatISO)
  config.addFilter('readingTime', value => {
    const withoutTags = value.replace(/(<([^>]+)>)/gi, '')
    const speed = 250
    const count = withoutTags.match(/[\u0400-\u04FF]+|\S+(?=\s)/g)?.length || 0
    const total = Math.ceil(count / speed)
    return lib.pluralize('minute', total, true)
  })
  config.addFilter('markdownify', value => {
    return markdownIt({ html: true })
      // Change image shortcode in excerpts to HTML
      .render(value?.replace(/\{%[\w\s]+"(.*?)".+({.*}?).+%\}/, lib.image('$1')) || '')
  })
  config.addFilter('plaintext', value => {
    return stripMarkdown(value)
  })
  config.addFilter('cssmin', code => {
    return new CleanCSS({}).minify(code).styles
  })
  config.addNunjucksAsyncFilter('jsmin', async (code, callback) => {
    try {
      const minified = await minify(code)
      callback(null, minified.code)
    } catch (error) {
      callback(null, code)
    }
  })

  /* Shortcodes */
  config.addShortcode("year", () => `${new Date().getFullYear()}`)
  // Derived modified and created from https://github.com/11ty/eleventy/issues/869#issuecomment-768119046
  config.addShortcode("modified_at", function ({ formatted = true }) {
    const time = this.page?.inputPath ? fs.statSync(this.page.inputPath).mtime : undefined
    return formatted ? lib.formatDate(time) : lib.formatISO(time)
  })
  config.addShortcode("created_at", function ({ formatted = true }) {
    const time = this.page?.inputPath ? fs.statSync(this.page.inputPath).birthtime : undefined
    return formatted ? lib.formatDate(time) : lib.formatISO(time)
  })
  config.addAsyncShortcode("webmentions", async (urlPath) => {
    try {
      const res = await axios(`https://webmention.io/api/mentions.jf2?target=https://www.josephrex.me${urlPath}&wm-property=like-of`)
      const likes = res.data.children.length
      return lib.pluralize('twitter like', likes, true)
    } catch (error) {
      console.log({ error })
      return 'Could not get likes'
    }
  })
  config.addShortcode("image", (url, { alt, ...attrs}) => {
    return lib.image(url, { alt, ...attrs })
  })

  /* Layout Aliases */
  config.addLayoutAlias("base", "layouts/base.html")
  config.addLayoutAlias("list", "layouts/list.html")
  config.addLayoutAlias("post", "layouts/post.html")
  config.addLayoutAlias("page", "layouts/page.html")

  /* Collections */
  config.addCollection("posts", collectionApi => {
    return collectionApi.getFilteredByGlob("content/posts/*.md").reverse()
  })
  config.addCollection("cases", collectionApi => {
    return collectionApi.getFilteredByGlob("content/cases/*.md").reverse()
  })
  config.addCollection("experiments", collectionApi => {
    return collectionApi.getFilteredByGlob("content/experiments/*.md").reverse()
  })
  // all tags ordered from highest usage to lowest
  config.addCollection('tags', collectionApi => {
    const lengthOf = tag => collectionApi.getFilteredByTag(tag).length
    const tags = collectionApi
      .getAll()
      .reduce((tags, item) => tags.concat(item.data.tags), [])
      .filter(Boolean)
      .filter(tag => !['posts', 'cases', 'experiments'].includes(tag))
      .sort((a, b) => lengthOf(b) - lengthOf(a))
    return Array.from(new Set(tags))
  })

  /* Libraries */
  config.setLibrary("md", markdownLib)

  /* Transforms */
  config.addTransform('htmlmin', function (content, outputPath) {
    if(outputPath?.endsWith(".html")) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
    }

    return content
  })

  /* TODO */
  // Track issue on passthroughCopy (css,js) transforms: https://github.com/11ty/eleventy/issues/344

  return {
    templateFormats: ['md', 'html', 'njk'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: "njk",
    dir: {
      data: '../config',
      includes: 'partials',
      input: 'content',
      output: 'public'
    }
  }
}

