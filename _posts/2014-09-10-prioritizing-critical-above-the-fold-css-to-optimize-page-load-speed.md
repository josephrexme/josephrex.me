---
title: Prioritizing Critical (Above the fold) CSS to optimize page load speed
author: Joseph Rex
layout: post
permalink: /prioritizing-critical-above-the-fold-css-to-optimize-page-load-speed/
categories:
  - web
tags:
  - css
  - frontend
  - performance
  - ui
  - ux
  - web
---
[<img class="aligncenter  wp-image-235" src="http://josephrex.me/wp-content/uploads/2014/09/F58bHgM.jpg" alt="F58bHgM" width="638" height="411" />][1]

I made <a href="http://slides.com/bl4ckdu5t/critical-css" target="_blank">a slide</a> on this about a month back and I&#8217;ve intended to write about it here.

Every developer that cares about user experience will always want to fix everything that makes a user think of not coming back to their website after first visit. I&#8217;ve found myself in such situations where I begin to think that whoever did this thing must have invested a lot of time making something that technically feels like nothing. We don&#8217;t want our applications to be thought of this way.

I design websites using technologies like <a href="http://sass-lang.com" target="_blank">Sass</a> and Javascript, and desktop applications with <a href="http://python.org" target="_blank">python</a> and <a href="http://qt-project.org" target="_blank">Qt</a> . Usually, on my desktop applications, all I have to care about when considering UX is where the objects are placed around the Window frames to give a good affordability and mapping based on the principles of design by Don Norman. I&#8217;ve not taken time to go through the <a href="http://www.gui-bloopers.com/" target="_blank">GUI Bloopers</a> book and for that reason I&#8217;ll say I may be wrong on my GUI opinions even as I am capable of building them.

Unlike desktop applications for me, I have to include page load time to the considerations for a good user experience on the web. [I&#8217;m a DO-IT-RIGHT freak][2] so I try to keep up with the recommended and best ways. <del>I&#8217;m in the habit of <a href="http://validator.w3.org/" target="_blank">validating my HTML</a> and <a href="http://jigsaw.w3.org/css-validator/" target="_blank">my CSS </a>when I do website designs</del>. As much as I spend time making sure I have a syntactically ok code,  I&#8217;m privy that validation tools wouldn&#8217;t check for semantic flaws so I put this in place myself.  I use <a href="https://developers.google.com/speed/pagespeed/insights" target="_blank">Google pagespeed insights</a> and <a href="http://webpagetest.org" target="_blank">Web page test</a> to analyze my web pages behavior. I don&#8217;t pursue 100% on all my projects but I try to get close on the ones I can by familiarizing with the requirements for good result. Recently, I started getting this line

[<img class="aligncenter size-full wp-image-236" src="http://josephrex.me/wp-content/uploads/2014/09/snapshot7.png" alt="snapshot7" width="798" height="356" />][3]

when I see things like this initially, I just ignore them and tell myself &#8220;you don&#8217;t need to care about this, it&#8217;s for people who love to stress their brain&#8221;. After some time, I remember I fall in that class and I start trying to carry out what I almost ignored. Well, my trial paid off and I was able to implement it on this little bootstrap project <a href="http://ostrich-dev.com/lab/feedapp" target="_blank">http://ostrich-dev.com/lab/feedapp</a> . As of the date of this writing, that website has 100% user experience and 44% page speed because I didn&#8217;t minify my JavaScript and CSS and I&#8217;m not leveraging browser caching. Besides this, check the details of the passed rules I have and you will see I have defeated the above-the-fold issue. Now let&#8217;s talk about what is really going on here

The image below represents what happens when users request for their favorite websites on their browsers. The following client-server model occurs:

&nbsp;

[<img class="aligncenter size-full wp-image-233" src="http://josephrex.me/wp-content/uploads/2014/09/client-server-model.jpg" alt="client-server-model" width="466" height="234" />][4]

For each request, HTML, CSS, Javascript, Images, and every other assets are requested by the client&#8217;s browser from your website, except if the client isn&#8217;t visiting for the first time and you implement a client-side caching mechanism. Images can be optimized (I&#8217;ll talk about this in another article soon), JavaScript and CSS can be minified and then made to load better than we may expect.

What we did here was reduce the resources being requested on the initial HTTP request and we requested for the things we really need our users to see first while we waited for the other things to load before they scroll down. Don&#8217;t be fooled by the jQuery plugin I used in my example site to think that&#8217;s what makes my images make a bouncy load as you scroll below. That&#8217;s just an animation effect.

I wouldn&#8217;t like to repeat everything I&#8217;ve already said in my slide so I&#8217;ll just give it to you here



### Conclusion:

This is just one step to optimizing page load speed. There are other steps that may be required. As you have seen from my example that this didn&#8217;t just give me a 100% speed because it wasn&#8217;t everything that had to be done. Don&#8217;t ignore this as these little things matter. In the slide, I wrote briefly about the Compass extension: jacket. I will talk fully about how I achieved the separation of my critical CSS from the non-critical CSS with this in a future article.

 [1]: http://josephrex.me/wp-content/uploads/2014/09/F58bHgM.jpg
 [2]: http://josephrex.me/im-not-a-perfectionist/ "I’m not a perfectionist"
 [3]: http://josephrex.me/wp-content/uploads/2014/09/snapshot7.png
 [4]: http://josephrex.me/wp-content/uploads/2014/09/client-server-model.jpg