const outdent = require('outdent')

module.exports = function(id, title) {
  return outdent`
  <figure>
  <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${id}?controls=0" title="${title || 'Youtube video player'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
  </iframe>
  </figure>
  `
}
