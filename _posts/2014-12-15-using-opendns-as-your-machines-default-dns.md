---
title: Using OpenDNS as your machine's default DNS
author: Joseph Rex
layout: post
comments: true
permalink: /using-opendns-as-your-machines-default-dns/
categories:
  - web
tags:
  - debugging
  - dns
---
{% image what-is-dns.png alt="dns" class="head-image" %}
I was working on a rails app last week and at some point, it failed to fetch the google fonts I had used within it. After about 2 days, everything was fine again so I didn't have to worry about anything. Earlier today, I was developing a jekyll blog and the same thing happened. This time I really needed my fonts to be the way I wanted them from development. Chrome failed to fetch the woff2 google fonts displaying the following error.
<!--more-->

> Failed to load resource: net::ERR\_NAME\_NOT_RESOLVED

Then I tried out my firefox developers edition and it suggested it was a <acronym title="Cross Origin Resource Sharing">CORS</acronym> problem which I didn't totally agree with.

{% image cors-firefox.png alt="cors on firefox-dev" %}

After all these, a friend from the IRC suggested I changed my DNS and try out OpenDNS. I did that and it all came back fine. Here's the short article that guided me through changing to OpenDNS

<a href="http://debian-bits-and-snips.blogspot.co.uk/2010/09/using-opendns-as-your-default-dns-in.html" target="_blank">http://debian-bits-and-snips.blogspot.co.uk/2010/09/using-opendns-as-your-default-dns-in.html</a>

FYI, I use a Debian machine and I believe that should walk on Ubuntu and Mint as well. I heard it's a very easy thing to go about on OS X too.