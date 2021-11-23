const fs = require('fs')
const { DateTime } = require("luxon")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const pluginRss = require("@11ty/eleventy-plugin-rss")
const markdownIt = require("markdown-it")
const markdownItAnchor = require("markdown-it-anchor")
const { default: axios } = require('axios')
const CleanCSS = require("clean-css")
const { minify } = require("terser")

const formatDate = dateObj => {
  return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL)
}
const formatISO = dateObj => DateTime.fromJSDate(dateObj).toISO()
const pluralize = (word, count, inclusive) => {
  const final = count === 1 ? word : `${word}s`
  if(!inclusive) return final
  return `${count} ${final}`
}
const markdownOptions = { html: true, linkify: true }
const markdownLib = markdownIt(markdownOptions)
.use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.linkInsideHeader({
    class: "heading-anchor",
    ariaHidden: true
  }),
  level: [1, 2, 3],
  slugify: (s) =>
    s
      .trim()
      .toLowerCase()
      .replace(/[\s+~\/]/g, "-")
      .replace(/[().`,%·'"!?¿:@*]/g, ""),
})
.use(require('markdown-it-footnote'))

module.exports = config => {
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
  config.addFilter('absURL', value => `https://josephrex.me${value}`)
  config.addFilter("formatDate", formatDate)
  config.addFilter("formatISO", formatISO)
  config.addFilter('readingTime', value => {
    const withoutTags = value.replace(/(<([^>]+)>)/gi, '')
    const speed = 250
    const count = withoutTags.match(/[\u0400-\u04FF]+|\S+(?=\s)/g)?.length || 0
    const total = Math.ceil(count / speed)
    return pluralize('minute', total, true)
  })
  config.addFilter('markdownify', value => {
    return markdownIt({ html: true }).render(value)
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
    return formatted ? formatDate(time) : formatISO(time)
  })
  config.addShortcode("created_at", function ({ formatted = true }) {
    const time = this.page?.inputPath ? fs.statSync(this.page.inputPath).birthtime : undefined
    return formatted ? formatDate(time) : formatISO(time)
  })
  config.addAsyncShortcode("webmentions", async (urlPath) => {
    try {
      const res = await axios(`https://webmention.io/api/mentions.jf2?target=https://www.josephrex.me${urlPath}&wm-property=like-of`)
      const likes = res.data.children.length
      return pluralize('twitter like', likes, true)
    } catch (error) {
      console.log({ error })
      return 'Could not get likes'
    }
  })

  /* Layout Aliases */
  config.addLayoutAlias("base", "layouts/base.html")
  config.addLayoutAlias("list", "layouts/list.html")
  config.addLayoutAlias("post", "layouts/post.html")
  config.addLayoutAlias("case", "layouts/case.html")

  /* Collections */
  config.addCollection("posts", collectionApi => {
    return collectionApi.getFilteredByGlob("content/posts/*.md").reverse()
  })
  config.addCollection("cases", collectionApi => {
    return collectionApi.getFilteredByGlob("content/cases/*.md")
  })
  // all tags ordered from highest usage to lowest
  config.addCollection('tags', collectionApi => {
    const lengthOf = tag => collectionApi.getFilteredByTag(tag).length
    const tags = collectionApi
      .getAll()
      .reduce((tags, item) => tags.concat(item.data.tags), [])
      .filter(Boolean)
      .filter(tag => !['posts', 'cases'].includes(tag))
      .sort((a, b) => lengthOf(b) - lengthOf(a))
    return Array.from(new Set(tags))
  })

  /* Libraries */
  config.setLibrary("md", markdownLib)

  /* TODO */
  // Track issue on passthroughCopy (css,js) transforms: https://github.com/11ty/eleventy/issues/344

  return {
    templateFormats: ['md', 'html', 'njk'],
    htmlTemplateEngine: 'njk',
    dir: {
      data: '../config',
      includes: 'partials',
      input: 'content',
      output: 'public'
    }
  }
}

