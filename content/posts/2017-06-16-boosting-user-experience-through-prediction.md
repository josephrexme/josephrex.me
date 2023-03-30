---
author: Joseph Rex
date: 2017-06-16T22:47:37-05:00
title: Boosting user experience through prediction
permalink: /boosting-user-experience-through-prediction/
tags:
  - UX
  - performance
---

One of the biggest reasons why single page apps (SPA) are very common in the web industry today is because of how fast navigation can be from it. Besides the decoupling of server-side logic for client-side engineering focus, SPAs have improved performance of web apps greatly by saving users from waiting for server responses before pages are rendered.
<!--more-->

By pinging the server only when in need for extra uncached data, page loads are incredibly fast. But even SPAs suffer from loading static assets slowly the first time a page/view is rendered. There are solutions like image compression or use of progressive JPEGs to improve the experience but what if we could make it even better?

If assets on unvisited links could load right before users click into the link you can have users on the slowest networks get a perceived performance of a blazingly fast website. There are terms and implementations around this concept which include [preconnecting][1], [prefetching][2], [prerendering][3].

These can be used in the following ways:

```html
<link rel="prefetch" href="//fonts.googleapis.com">
```

```html
<link rel="prerender" href="//fonts.googleapis.com">
```

```html
<link rel="preconnect" href="//fonts.googleapis.com">
```

Prefetching can download files from a specified URL ( or even pages for non-SPA architectures ) and store them in a cache till when needed. Preconnect makes a DNS request and TCP handshake ahead of time while prerender could completely render a page yet to be clicked by a user and hide it, making it feel like you toggling visibility on a visually hidden element.

These solutions are affected by the common caveat with any prediction. It could be wrong. Your users may in fact not click the link you have anticipated they will click and you'd have made a request on their internet data for nothing. There are layouts where the user is most likely certain to click a corresponding link like if you have a page with a single search input like Google that leads to a page with results or a pagination where you predict every next step in the pagination.

The effort in doing all of this is to provide a better experience to the users hence we may overlook the fact that our predictions are sometimes wrong and always look ahead of the users for links they are likely to click.

In other UI layouts where links aren't quite as predictable as a pagination process, the use of `<link>` for prefetch becomes more prone to failure so we can decide to just stop right here or we could tune up the brain scanning technique on the users.

Eye tracking and mouse tracking are the next steps. I have no idea how at the moment and it'd definitely not be easy to implement eye tracking but by gaining a eye hitmap on a section of our UI from the users eye we could predict they are very likely to click a link or take an action. These are known as [action oriented user experience][4]. For mouse tracking, there are different approaches to it. On this website I use Pjax (Page Ajax) to smoothly transition between pages and one of the biggest downside of that is that for users on slower networks the page animations become janky. The closest thing I had to a solution was to start prefetching the page the moment a user hovers any link. You could open up devtools and monitor the network tab then hover a link.

This blog uses [Barba.js][5] and it comes with a prefetch feature. There are other great solutions out there. You can see from the demo of [trial-js][6] how it monitors mouse interaction. [Callum Macrae][7] also wrote a brilliant one called [futurelink][8] that goes with a detailed [blog post and video demos][9].

Futurelink even does better than prefetching on hover state. It studies the mouse navigation to detect the acceleration/decelaration towards a link hence it can start prefetching before the user hovers upon the link.

With an understanding of [behavioral economics][10], we could predict more behavior change or foresee expected actions in users and take away inconveniences of product usability.

[1]: https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/
[2]: https://css-tricks.com/prefetching-preloading-prebrowsing/
[3]: https://www.youtube.com/watch?v=Msqs1jIzgo4
[4]: http://www.freepatentsonline.com/y2013/0159408.html
[5]: http://barbajs.org
[6]: https://markocen.github.io/trialjs/trial-js.html
[7]: https://twitter.com/callumacrae
[8]: https://github.com/SamKnows/futurelink
[9]: https://blog.samknows.com/intelligent-page-preloading-with-futurelink-c1de25449dee
[10]: http://oreilly.com/go/behavior-change
