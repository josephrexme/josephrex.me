---
title: 'You damn Analytics'
author: Joseph Rex
layout: post
comments: true
permalink: /you-damn-analytics/
---

Just recently I have been paying a lot more attention to my Google Analytics on this blog although I'm always on New Relic for web apps I run. These analytics platforms do a great job breaking down the way our applications/websites/blogs are performing and that's really helpful.
<!--more-->
{% image 'damn-analytics.jpg' alt="damn analytics" class="head-image" %}

However, they play a negative role on our performance budget. I'll focus on the Analytics tools I use most which are Google Analytics, Hotjar, and New Relic.

### Google Analytics

Google Analytics is really great and I use it on every website/web app I build except the client decides otherwise. Google Analytics is a light weight sorta and it's actually 24.7KB on my blog but it also fetches a 35B gif image which I don't understand but it totals 24.735 ~ 24.74 so it is still fine to say google analytics (GA) adds a 24.7kb to our page size. Although that's worth sacrificing considering the great benefit with the way we can analyze users behaviour and acquisitions from its platform but another disturbing part is that this analytics.js script is only cached for 2 hours and an extra secure ga.js is cached for 2 hours. There are bigger brains in Google and I trust they have their purpose for caching it for such short time but after caching all my other assets this makes the exemption and affects my rule based metric putting which is less to be considered compared to how it affects the website speed for users.

### Hotjar

I started using hotjar from its beta stage and it is very good for analyzing user behaviour showing countries users are from, heatmaps on most clicked areas, most visited pages, user mouse movements and site interactions. Imagine all that awesomeness. Great right? Without being paid a dime from Hotjar I've been advertising for them and convincing my clients to use it for great analytics and while I still use it on my blog here I had to take it off on a client website recently because it was just an extra load to the page size and I needed it to reach my performance budget. I'd thought if this wouldn't be used often and there was no way to convince them to use a premium plan on Hotjar that is more meaningful then there'll be no need for it at all. Hotjar serves at 400B and caches for 60 seconds which is almost like not caching at all.

### New Relic

What's sweet about New Relic is the way it's there in your page but acts like it's not there. The primary script is 542B and and additional script it uses is 362B which sums up to 904B not making up to 1Kb which is good. It caches for 60 minutes. Better than HotJar but that's still a very little cache time.

Putting all the bytes from using the three analytics together we have 

> 24.7K + 400B + 904B = 26.004K

Adding that up to the font size, and other static asset sizes we'll be reaching higher numbers and just like Golf, lower numbers make up better scores.

## Conclusion
Analytics are great but be careful with them and take out any where you see it will be of less use or no use.
