const fs = require('fs')
const { DateTime } = require("luxon")

const formatDate = dateObj => {
  return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL)
}
const formatISO = dateObj => DateTime.fromJSDate(dateObj).toISO()

module.exports = config => {
  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!--more-->"
  })
  /* PassThrough */
  config.addPassthroughCopy({ 'static': '.' })

  /* Filters */
  config.addFilter('absURL', value => `https://josephrex.me${value}`)
  config.addFilter("formatDate", formatDate)
  config.addFilter("formatISO", formatISO)
  config.addFilter('lower', value => value.toLowerCase())

  /* Shortcodes */
  config.addShortcode("year", () => `${new Date().getFullYear()}`)
  // Derived modified and created from https://github.com/11ty/eleventy/issues/869#issuecomment-768119046
  config.addShortcode("modified_at", function ({ formatted = true }) {
    const time = this.page?.inputPath ? fs.statSync(this.page.inputPath).mtime : undefined;
    return formatted ? formatDate(time) : formatISO(time)
  })
  config.addShortcode("created_at", function ({ formatted = true }) {
    const time = this.page?.inputPath ? fs.statSync(this.page.inputPath).birthtime : undefined;
    return formatted ? formatDate(time) : formatISO(time)
  })

  /* Layout Aliases */
  config.addLayoutAlias("base", "layouts/base.html")
  config.addLayoutAlias("list", "layouts/list.html")
  config.addLayoutAlias("post", "layouts/post.html")

  /* Collections */
  config.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/posts/*.md").reverse()
  })
  config.addCollection("cases", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/cases/*.md")
  })

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

