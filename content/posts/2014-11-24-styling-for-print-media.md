---
author: Joseph Rex
comments: true
date: 2014-11-24T00:00:00Z
title: Styling for print media
permalink: /styling-for-print-media/
tags:
  - css
  - frontend
---

The @media is mostly known these days for its use with responsive design in a conditional structure. However, it has been for a very long time. It has been used to separate visual CSS from paged CSS. The different media consists screen, print, projector, audio (formerly aural).
<!--more-->

I needed to do a print design in one of my recent projects and I knew I could just make a stylesheet link with a media="print". I've also been privy that I can use  @media print{} to wrap it but that wasn't all it took. I never really knew there was more to it but I took the search to see how it's been done by the leaders of the industry. Not too long after, I stumbled upon the following alistapart article by Eric Meyer from 2002.

<a href="http://alistapart.com/article/goingtoprint" target="_blank">http://alistapart.com/article/goingtoprint</a>

The article really pointed out a lot of things I had thought I will have to implement while designing my print stylesheet. Fortunately, I happen to be <a title="Sass and Compass: My Best Friends" href="http://josephrex.me/sass-and-compass-my-best-friends/" target="_blank">using the awesome compass</a>.

From the beginning of my styles. I already had the following print.sass file predefined for me

```scss
/* Print Styles */
@media print
  *
    background: transparent !important
    color: #000 !important
    box-shadow: none !important
    text-shadow: none !important
  a
    text-decoration: underline
    &:visited
      text-decoration: underline
    &[href]:after
      content: " (" attr(href) ")"
  abbr[title]:after
    content: " (" attr(title) ")"
  /* Don't show links for images, or javascript/internal links */
  .ir a:after
    content: ""
  a
    &[href^="javascript:"]:after, &[href^="#"]:after
      content: ""
  pre, blockquote
    border: 1px solid #999
    page-break-inside: avoid
  thead
    display: table-header-group
  tr
    page-break-inside: avoid
  img
    page-break-inside: avoid
    max-width: 100% !important
  @page
    margin: 0.5cm

  p, h2, h3
    orphans: 3
    widows: 3
  h2, h3
    page-break-after: avoid
```

If you checked out the [Eric Mayer's][1] link on alistapart above, you'd find out most of what he explained here.

prefixing links with a parentheses containing their link reference seems like a really good way to show on the printed versions where that link references to.

They also avoided page breaks inside certain elements. This really set the pace for me to go on and add my other print styles.

### Debugging

At a point I had to inspect element and know where a padding was coming from. Meanwhile, all I had was my chrome print preview. Not too long after, I discovered the emulation feature in my chromium.

Once the CSS media is checked, and the print is selected from the combo box, the web page renders the print version. Sometimes it's still not exactly as the chrome print preview but it's really close. This helps for major debugs when trying to remove style rules made by the all media stylesheet.

[1]:https://twitter.com/meyerweb
