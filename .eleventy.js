module.exports = config => {
  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!--more-->"
  })
  // PassThrough
  config.addPassthroughCopy({ 'static': '.' })
  // Filters
  config.addFilter('uppercase', value => value.toUpperCase())
  // Shortcodes
  config.addShortcode("year", () => `${new Date().getFullYear()}`)
  // Collections
  config.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/posts/*.md").reverse();
  })
  config.addCollection("cases", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/cases/*.md");
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

