---
title: 'Performance Concerns'
author: Joseph Rex
layout: post
comments: true
permalink: /performance-concerns/
---

Performance is a very essential thing for every UX researcher or specialist. Great enough, performance is more [evangelized][1] these recent years than ever before in the history of the web. Thanks to the [major performance heroes][2] spreading the word.

In the last month, the only attention I've given this blog while being occupied with other freelance projects was to optimize its performance. I went from 73 to 95 on its Google speed score, and I also got a way better result with first byte time, number of HTTP requests, speed index, and time to visually complete rendering.
<!--more-->
{% image 'speedcurve-performance.png' alt="Performance image" class="head-image" %}

The first byte time is not as fast as I want it to be and that is because of my server control limits. I run this blog on [Github pages][3] and which limits me from doing server configurations to set Expires header and Max age. The max age on all jekyll blogs hosted on Github is 10 minutes (600 seconds) and Google recommends about 2 weeks Max age.

Using [Google pagespeed insights][4], the only thing that keeps this blog from a 100% score is the **Leverage browser caching** issue which is caused by my little max age for all assets.

### Why does Max-Age matter?
When a max-age is set in the HTTP header for certain assets, that makes the server tell the browser to retain those assets for a certain time set in the max-age which is usually in seconds. Having set a max-age, the next time a user makes a request to the target website, the browser tells the server *Chill bro! I've got all that stuff already*. [Ilya Grigorik][5] sheds more light on that at the [Google developers website][6].

<hr>

I recently worked on improving my Rule based metric for this blog with [Google Pagespeed][4] and one of the performance challenges I was able to tackle was the **Eliminating render blocking CSS** . I have my JavaScript already loading asynchronously with the `async` attribute and CSS kept delaying the above-the-fold content rendering. Then I decided to [prioritize][12] critical css and find a way to load the rest of the CSS asynchronously. I discussed this in a [previous article][12]. I got a great improvement but with a side-effect of a heavier HTML file after adding some inline CSS for above-the-fold content in order to also prevent a [FOUC][21]. It does not mean for everyone that takes this step of eliminating render blocking CSS, this problem will exist. One major way I may have faultered in the design of this blog was using inline SVGs. For every SVG on this webpage, I have an extra byte on the HTML and those are some additional factors to my HTML demanding compression.

I don't totally accept it as a fault that I used inline SVGs because there aren't too many of them so the inline bunch of CSS really did contribute to my larger HTML file size and one way to avoid this in the future will the `rel="import"` with `<link>` tags. [More info here][13]. This way I could have written all the inline CSS in an external HTML file and import it here. Hopefully, the little above-the-fold CSS inlined in the imported HTML will not affect the page render.

With all of these in place, I would have achieved a great Rule based metric but as [Tim Kadlec][14] mentioned in his [post][8],

> Monitoring your PageSpeed or YSlow score is a good idea, but not necessarily for your performance budget. Use these tools as a safety net for making sure you haven’t overlooked any simple optimizations.

All of those things are less important as budgets. So what's with performance budget?

### Performance Budget
There are various articles on the web on performance and a few on performance budgets but my picks are [Tim Kadlec's][8] and [Daniel Mall's][7]. Before diving much into this, I'll like to emphasize how important it is to consider performance before a project starts. I've not been privileged to work in large software development teams but on this blog I knew I had to do without jQuery from the first day I started its development just to cut off some load on requests or request size (whichever way you think of it). Most websites on the internet use jQuery and as [Hugo Giraudel][9] requoted [Lea Verou][10] in this [tweet][11]

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">&quot;Avoiding jQuery entirely can feel like you’re some sort of digital vegan.&quot;&#10;&#10;Best quote ever from <a href="https://twitter.com/LeaVerou">@LeaVerou</a>: <a href="http://t.co/QPHsv9xLmD">http://t.co/QPHsv9xLmD</a>.</p>&mdash; Hugo Giraudel (@HugoGiraudel) <a href="https://twitter.com/HugoGiraudel/status/590074553906421760">April 20, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I got away with it anyway and I'm that vagan who keeps off some restaurants because they don't have my options in the digital world. For whatever it is the real vagans benefit healthwise, I am benefiting in my own way on performance.

That was one heck of a drift. Concluding the point of carrying on performance before code is written, I like [the way clearleft handles it][12]. Performance is something that should holistically be considered from the wireframing stage of the site. It shouldn't also be seen as just a duty of the developer alone but rather a concern for the UX designer, the visual designer, the developer, and everyone besides the share holders and executives (and in a way, them too).

Keeping a list of great competitors to measure up with on WPT is a great idea to start taking your performance budget seriously. To keep track of your budget changes and set more budget, Tim Kadlec's [grunt perfbudget][15] is a great [Grunt][16] plugin and it was nicely [explained on sitepoint][17].

While I'm concerned on improving my speed index and every other performance metric, it's essential to note that [chasing perfection][18] can lead us to [doing things excessively till we err][19] or get rid of some rather important things. I analyze usage with Google Analytics and [Hotjar][20]. While Google Analytics may have almost no impact on the rendering of a webpage, hotjar does make an impact with some scripts it fetches for detailed insights. Another thing that comes to mind is the need for fetching assets from various remote URLs (CDNs). While they have their benefits, they cause various DNS resolution down the HTTP request which I believe may have an impact in the milestone timing.

[1]: http://perf.rocks
[2]: http://perf.rocks/people/
[3]: https://pages.github.com/
[4]: https://developers.google.com/speed/pagespeed/insights/
[5]: https://www.igvita.com/
[6]: https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=en#cache-control
[7]: http://danielmall.com/articles/how-to-make-a-performance-budget/
[8]: http://www.timkadlec.com/2014/11/performance-budget-metrics/
[9]: https://twitter.com/HugoGiraudel
[10]: https://twitter.com/LeaVerou
[11]: https://twitter.com/HugoGiraudel/status/590074553906421760
[12]: http://josephrex.me/prioritizing-critical-above-the-fold-css-to-optimize-page-load-speed/
[13]: http://w3c.github.io/webcomponents/spec/imports/#link-type-import
[14]: https://twitter.com/tkadlec
[15]: https://github.com/tkadlec/grunt-perfbudget
[16]: http://gruntjs.com/
[17]: http://www.sitepoint.com/automate-performance-testing-grunt-js/
[18]: http://josephrex.me/im-not-a-perfectionist/
[19]: http://calendar.perfplanet.com/2013/being-the-fastest/
[20]: http://hotjar.com
[21]: http://en.wikipedia.org/wiki/Flash_of_unstyled_content