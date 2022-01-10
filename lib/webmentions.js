const outdent = require('outdent')
const { default: axios } = require('axios')
const {
  formatDate,
  formatISO,
  namify,
  pluralize
} = require('./utils')

module.exports = async function(urlPath) {
  try {
    const res = await axios(`https://webmention.io/api/mentions.jf2?target=https://www.josephrex.me${urlPath}&per-page=20&page=0`)
    const all = res.data.children
    const likes = all.filter(mention => mention['wm-property'] === 'like-of')
    const replies = all.filter(mention => ['mention-of', 'in-reply-to'].includes(mention['wm-property']))

    // shows content if less than 400 characters
    return outdent`
    <div style="--font_sz:2.8rem;--font_wt:600;--opacity:.6;--txt_al:center;--mb:1rem;">Responses</div>
    <div style="--font_sz:1.4rem;--txt_al:center;--opacity:.8;--mb:1rem;">
      <p>You may respond to this post by referencing it on your blog, twitter, or any website</p>
    </div>
    ${likes.length ? outdent`
      <div style="--font_sz:1.4rem;--txt_al:center;">
        <a href="${likes[0].url}" style="--cl:var(--link-color);" class="anchor-lines">${pluralize('twitter like', likes.length, true)}</a>
      </div>
    ` : ''}
    ${all.length ? outdent`
    <div style="--mt:2rem;--d:grid;--gap:2rem;" class="with-anchor-lines" data-replies>
      ${replies.map(mention => outdent`
        <div style="--d:grid;--gap:1rem;--bg:rgb(100 100 100/.06);--p:2rem;--roundness:.5rem;--word_break:break-all">
          <div style="--d:flex;--justify_content:space-between;--opacity:.6;">
            <div>
            ${mention.author.name && `<strong>${namify(mention.author.name)}</strong>`}
            </div>
            <time style="--font_sz:1.4rem;" datetime="${formatISO(new Date(mention.published))}">${formatDate(new Date(mention.published))}</time>
          </div>
          ${mention.content?.text.length < 400 ? `<div>${mention.content.html}</div>` : ''}
          <div style="--font_sz:1.4rem;">
          <em style="--opacity:.6;--font_st:normal">origin:</em> <a href="${mention.rels?.canonical || mention.url}">${mention.rels?.canonical || mention.url}</a>
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}
    <style>
    [data-replies] img { display: block; }
    [data-replies] a { color: var(--link-color); }
    </style>
    `
  } catch (error) {
    console.error(error)
    return '<div style="--txt_al:center;--opacity:.6;">Unable to connect web mentions</div>'
  }
}
