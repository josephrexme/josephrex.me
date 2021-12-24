---
author: Joseph Rex
date: 2021-12-23T18:30:24-05:00
title: Hide mailto email links with Netlify functions
permalink: /hide-mailto-links-with-netlify-functions/
tags:
  - netlify
  - email
---
The web is plagued with crawlers in search of anything in the form of an email address.
They scrape personal websites, public repositories on github, and anywhere indexable.
While there are easier ways to display an email address while hiding it from crawlers,
it is not as easy to have a mailto link without the destination email in it within
the markup.
<!--more-->

My common strategy to keep my email address shown in page but hidden from crawlers is
with the help of CSS.

```css
.email::after{
  content: attr(data-name) "@" attr(data-provider)
}
```

This will be applied to some HTML like:

```html
<p class="email" data-name="your-name" data-provider="gmail.com"></p>
```

You can see this in action at https://resume.josephrex.me.

Unfortunately, this trick wouldn't work with mailto links in the form:

```html
<a href="mailto:your-name@gmail.com">Send mail</a>
```

This is where netlify functions comes in. Pretty much any server could help here
but netlify makes it easier especially when you already have your website hosted
with them.

If you are just getting started with Functions, [use netlify's guide](https://www.netlify.com/products/functions/)
to learn its basics.

I use functions already for my opengraph image on this website and other little things. See some examples:

https://josephrex.me/.netlify/functions/opengraph?text=sample-text

https://josephrex.me/.netlify/functions/opengraph?layout=list

The following function creates an endpoint that lets you redirect to a proper mailto
link while letting you use a link that does not include your email address.

```js
exports.handler = async function() {
  // hiding email from bots in repo
  const names = { first: 'your', last: 'name' }
  const provider = 'gmail.com'
  const constructedEmail = `${Object.values(names).join('-')}@${provider}`
  return {
    statusCode: 301,
    headers: {
      'Cache-control': 'public, max-age=0, must-revalidate',
      'location': `mailto:${constructedEmail}`
    },
  }
}
```

I use this in my HTML as:

```html
<a href="mailto:/.netlify/functions/mail">Send mail</a>
```

To make the function allow more dynamic destination emails, you can pass fragments of the email as query
parameters e.g:

```html
<a href="mailto:/.netlify/functions/mail?first=your&last=name">Send mail</a>
```

This will require updating the function code according to read its values from the query parameters.

Drop your thoughts and comments with links below.
