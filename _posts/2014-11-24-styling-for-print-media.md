---
title: Styling for print media
author: Joseph Rex
layout: post
permalink: /styling-for-print-media/
wsw-settings:
  - 'a:42:{s:13:"keyword_value";s:12:"@media print";s:15:"is_meta_keyword";s:1:"1";s:17:"meta_keyword_type";s:4:"tags";s:13:"is_meta_title";s:0:"";s:10:"meta_title";s:0:"";s:19:"is_meta_description";s:0:"";s:16:"meta_description";s:0:"";s:17:"is_over_sentences";s:0:"";s:20:"first_over_sentences";s:0:"";s:19:"last_over_sentences";s:0:"";s:16:"is_rich_snippets";s:0:"";s:18:"show_rich_snippets";s:0:"";s:12:"rating_value";s:1:"0";s:13:"review_author";s:0:"";s:14:"review_summary";s:0:"";s:18:"review_description";s:0:"";s:10:"event_name";s:0:"";s:10:"event_date";s:0:"";s:9:"event_url";s:0:"";s:19:"event_location_name";s:0:"";s:21:"event_location_street";s:0:"";s:23:"event_location_locality";s:0:"";s:21:"event_location_region";s:0:"";s:12:"people_fname";s:0:"";s:12:"people_lname";s:0:"";s:15:"people_locality";s:0:"";s:13:"people_region";s:0:"";s:12:"people_title";s:0:"";s:14:"people_homeurl";s:0:"";s:15:"people_photourl";s:0:"";s:12:"product_name";s:0:"";s:16:"product_imageurl";s:0:"";s:19:"product_description";s:0:"";s:14:"product_offers";s:0:"";s:18:"is_social_facebook";s:0:"";s:25:"social_facebook_publisher";s:0:"";s:22:"social_facebook_author";s:0:"";s:21:"social_facebook_title";s:0:"";s:27:"social_facebook_description";s:0:"";s:17:"is_social_twitter";s:0:"";s:20:"social_twitter_title";s:0:"";s:26:"social_twitter_description";s:0:"";}'
categories:
  - web
tags:
  - css
  - frontend
  - print
---
[<img class="aligncenter size-large wp-image-346" src="http://josephrex.me/wp-content/uploads/2014/11/wallpaper-106773-1024x640.jpg" alt="wallpaper-106773" width="687" height="429" />][1]

The @media is mostly known these days for its use with responsive design in a conditional structure. However, it has been for a very long time. It has been used to separate visual CSS from paged CSS. The different media consists screen, print, projector, audio (formerly aural).

I needed to do a print design in one of my recent projects and I knew I could just make a stylesheet link with a media=&#8221;print&#8221;. I&#8217;ve also been privy that I can use  @media print{} to wrap it but that wasn&#8217;t all it took. I never really knew there was more to it but I took the search to see how it&#8217;s been done by the leaders of the industry. Not too long after, I stumbled upon the following alistapart article by Eric Meyer from 2002.

<a href="http://alistapart.com/article/goingtoprint" target="_blank">http://alistapart.com/article/goingtoprint</a>

The article really pointed out a lot of things I had thought I will have to implement while designing my print stylesheet. Fortunately, I happen to be <a title="Sass and Compass: My Best Friends" href="http://josephrex.me/sass-and-compass-my-best-friends/" target="_blank">using the awesome compass</a>.

From the beginning of my styles. I already had the following print.sass file predefined for me

<pre class="lang:css decode:true ">/* Print Styles */
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
    page-break-after: avoid</pre>

If you checked out the Eric Mayer&#8217;s link. You&#8217;d find out most of what he explained here.

prefixing links with a parentheses containing their link reference seems like a really good way to show on the printed versions where that link references to.

They also avoided page breaks inside certain elements. This really set the pace for me to go on and add my other print styles.

### Debugging

At a point I had to inspect element and know where a padding was coming from. Meanwhile, all I had was my chrome print preview. Not too long after, I discovered the emulation feature in my chromium.

[<img class="aligncenter size-full wp-image-349" src="http://josephrex.me/wp-content/uploads/2014/11/Selection_005.png" alt="Selection_005" width="464" height="219" />][2]

Once the CSS media is checked, and the print is selected from the combo box, the web page renders the print version. Sometimes it&#8217;s still not exactly as the chrome print preview but it&#8217;s really close. This helps for major debugs when trying to remove style rules made by the all media stylesheet.

 [1]: http://josephrex.me/wp-content/uploads/2014/11/wallpaper-106773.jpg
 [2]: http://josephrex.me/wp-content/uploads/2014/11/Selection_005.png