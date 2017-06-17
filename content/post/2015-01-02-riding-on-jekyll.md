---
author: Joseph Rex
categores:
- web
comments: true
date: 2015-01-02T00:00:00Z
title: Riding on jekyll
url: /riding-on-jekyll/
tags:
  - jekyll
---

It's a new year and I'm to begin with new things. I started josephrex.me blog in 2014 and it has revived my old blogging habits. I have been on Wordpress which is nice considering how I get comments plugged into my blog posts without any third-party integration, the awesome jetpack services, the performance plugins, and most of all the easy WYSIWYG editor where I write with ease. I had a feel of version 4.0.1 before leaving and they had added the distraction-free writing feature. All of this is good but it was too much in a way.
<!--more-->

The need for one or two plugins to do their jobs required extra one or more CSS files to be included. At a point, I couldn't keep track of the assets being loaded. May not seem like something that matters much but it does in that it makes me stay balanced with pagespeed. Besides pagespeed, it is a good user experience to let my weblog load faster for the viewers.

Jekyll is a static site generator and even if it doesn't offer all that Wordpress had offered, it does have its own advantages. Some of which includes:

* Lesser security concerns (because there's no databases to be hacked)

* Light-weight

* Easily Customizable (You don't need to learn a set of back-end functions as you have to in Wordpress using PHP)

* Editing right from your own personal text editor or markdown editor without being online. (Then you can push to your github repo later)

All those things are what makes Jekyll awesome for me. I may be missing some things but this are the most prominent things. I develop WordPress templates and I shouldn't complain about having to write a set of PHP functions for a new theme but being good at something does not necessariy mean you should enjoy doing it if it causes inconveniences to you. To see more benefits of Ruby over Wordpress, I'll point you at [Hugo Giraudel's article][1].

I've been programming in Ruby lately and I find it interesting to use something that is from the Rubyist community even if it doesn't really require me to write Ruby code. Migrating from WordPress to Ruby took me just one day. And it was with the aid of an awesome [wordpress-to-jekyll-converter][2] tool. Next challenge I had was having my domain josephrex.me point to bl4ckdu5t.github.io where the blog actually lives on github.

I created a CNAME file in the root of my github repository containing the domain name ```josephrex.me``` and had to create an A record with my domain registrar (godaddy) using [a guide from github help][3]. Godaddy provided me with an interface like below to set my new A records pointing to the github IP

Having a TTL of one hour, it took me a while to be able to see a change when a friend on a separate DNS provider that had never visited josephrex.me already could already see the change and tell me all the images in your blog posts are missing. Then I waited a little longer to see that myself. Jekyll doesn't have a fancy image uploader like WordPress does so I had to retrieve all my images from my Wordpress (the converter helped with that). And they are in a wp-contents folder in my jekyll blog to keep the images pointing at a right location.

This is my first blog post on jekyll and I've enjoyed it so far. After my present rails project, I will give it a better look.

[1]: http://www.sitepoint.com/blogging-wordpress-or-jekyll/
[2]: https://github.com/benbalter/wordpress-to-jekyll-exporter
[3]: https://help.github.com/articles/tips-for-configuring-an-a-record-with-your-dns-provider/
