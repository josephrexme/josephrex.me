const { default: axios } = require('axios')
const markdownIt = require('markdown-it')
const outdent = require('outdent')
const { formatDate, formatISO, pluralize } = require('./utils')

const getTweet = async id => {
  // Skip Twitter API call if no token is provided
  if (!process.env.TWITTER_TOKEN) {
    return {}
  }
  
  try {
    const res = await axios({
      url: `https://api.twitter.com/2/tweets/${id}?tweet.fields=attachments,author_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source,text,withheld,public_metrics&expansions=author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id,entities.mentions.username,attachments.poll_ids&user.fields=created_at,profile_image_url,verified&media.fields=duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width&poll.fields=`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${process.env.TWITTER_TOKEN}`
      }
    })
    return res.data
  } catch (error) {
    console.error(error)
    return {}
  }
}

/**
 * 
 * @param {string} text
 * @param {array} urls
 * @returns {string}
 */
const formatURLs = (text, urls) => {
  return urls.reduce((acc, link) => {
    // remove image and video urls in favor of media display
    if (/(video|photo)\/\d+/.test(link.expanded_url)) return acc.replace(link.url, '')
    // expand other URLs
    return acc.replace(link.url, link.expanded_url)
  }, text)
}

const twitterize = (text) => {
  const linkMentions = text.replace(/@(\S+)/g,'[@$1](https://twitter.com/$1)')
  const linkHashTags = linkMentions.replace(/#(\S+)/g, '[#$1](https://twitter.com/hashtag/$1?src=josephrex.me)')
  return linkHashTags
}

module.exports = async function(id) {
  const tweet = await getTweet(id)

  if(!tweet.data || tweet.errors?.length || !tweet.includes?.users?.length) {
    return outdent`
    <div style="--mx:auto;--my:2rem;--p:2rem;--w:min(400px, 80%);--bg:rgb(100 100 100/.06);--roundness:.5rem;">
      <p>${tweet.errors?.[0]?.detail || 'Unable to retrieve this tweet'}</p>
      <p><a href="/.netlify/functions/mail" rel="nofollow">Inform the author about the broken tweet</a></p>
    </div>
    `
  }

  const { data, includes } = tweet
  const author = includes.users[0]
  const media = includes.media
  const urls = data.entities?.urls || []

  return outdent`
  <div style="--mx:auto;--my:2rem;--p:2rem;--w:min(400px, 80%);--bg:rgb(100 100 100/.06);--roundness:.5rem;">
  <div style="--d:flex;--justify_content:space-between;">
    <div style="--d:flex;--gap:1rem;">
      <div>
      <img src="${author.profile_image_url}" class="no-zoom" width="48" height="48" alt="" style="--roundness:50%;">
      </div>
      <div>
        <strong>${author.name}</strong>
        <div style="--font_sz:1.4rem;--opacity:.7">@${author.username}</div>
      </div>
    </div>
  </div>
  <div style="--py:1.5rem;--word_break:break-word;">
  ${markdownIt({ linkify: true }).render(formatURLs(twitterize(data.text), urls))}
  ${media ? `<div style="--d:${media.length > 1 ? 'grid':'block'};--grid_template_cols:repeat(auto-fill,minmax(180px, 1fr));--gap:.5rem;--pt:1rem;">`+media.map((image, index) => outdent`
    <img src="${image.preview_image_url || image.url}" width="100%" class="no-zoom" style="--d:block;--roundness:.5rem;--object_fit:cover;--object_position:top;--aspect_ratio:3/2;${index % 2 === 0 && index === media.length - 1 ? '--grid_col_end: span 2':''}" alt="" />
  `).join('')+'</div>': ''}
  </div>
  <time datetime="${formatISO(new Date(data.created_at))}" style="--d:block;--pb:1rem;--font_sz:1.4rem;--opacity:.7;">${formatDate(new Date(data.created_at), 'DATETIME_MED')}</time>
  <div style="--d:flex;--justify_content:space-between;--border_t: solid thin var(--link-color);--pt:1rem;--font_sz:1.4rem;">
    <a rel="noreferrer" target="_blank" href="https://twitter.com/${author.username}/status/${id}">Read on twitter</a>
    <div style="--py:.4rem">
      <div>${pluralize('like', data.public_metrics.like_count, true)}, ${pluralize('retweet', data.public_metrics.retweet_count, true)}</div>
    </div>
  </div>
  </div>
  `
}
