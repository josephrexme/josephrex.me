const outdent = require('outdent')

module.exports = function(id, title) {
  return outdent`
  <iframe height="450" style="width: 100%;--my:1.5rem;" scrolling="no" title="${title}" src="https://codepen.io/josephrexme/embed/preview/${id}?default-tab=result&theme-id=39976" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  </iframe>
  `
}
