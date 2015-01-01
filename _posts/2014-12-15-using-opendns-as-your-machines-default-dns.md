---
title: 'Using OpenDNS as your machine&#8217;s default DNS'
author: Joseph Rex
layout: post
permalink: /using-opendns-as-your-machines-default-dns/
categories:
  - web
tags:
  - debugging
  - dns
---
I was working on a rails app last week and at some point, it failed to fetch the google fonts I had used within it. After about 2 days, everything was fine again so I didn&#8217;t have to worry about anything. Earlier today, I was developing a jekyll blog and the same thing happened. This time I really needed my fonts to be the way I wanted them from development. Chrome failed to fetch the woff2 google fonts displaying the following error.

> Failed to load resource: net::ERR\_NAME\_NOT_RESOLVED

Then I tried out my firefox developers edition and it suggested it was a <acronym title="Cross Origin Resource Sharing">CORS</acronym> problem which I didn&#8217;t totally agree with.

<div id="attachment_472" style="width: 644px" class="wp-caption aligncenter">
  <a href="http://josephrex.me/wp-content/uploads/2014/12/cors-firefox.png"><img class="wp-image-472 size-large" src="http://josephrex.me/wp-content/uploads/2014/12/cors-firefox-1024x222.png" alt="cors on firefox-dev" width="634" height="137" /></a>
  
  <p class="wp-caption-text">
    click to enlarge
  </p>
</div>

After all these, a friend from the IRC suggested I changed my DNS and try out OpenDNS. I did that and it all came back fine. Here&#8217;s the short article that guided me through changing to OpenDNS

<a href="http://debian-bits-and-snips.blogspot.co.uk/2010/09/using-opendns-as-your-default-dns-in.html" target="_blank">http://debian-bits-and-snips.blogspot.co.uk/2010/09/using-opendns-as-your-default-dns-in.html</a>

FYI, I use a Debian machine and I believe that should walk on Ubuntu and Mint as well. I heard it&#8217;s a very easy thing to go about on OS X too.