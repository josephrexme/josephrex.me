---
author: Joseph Rex
comments: true
date: 2015-08-31T00:00:00Z
title: Revealing animations on scroll with pureJS
url: /revealing-animations-on-scroll-with-purejs/
tags:
  - animation
---

This is one of the posts I hesitate to write about because I feel there's too many blog authors that have already written on it. The concept of lazy loading is majorly for performance reasons and it is welcomed on various aspects of technology. However its use in this case is majorly for aesthetics purpose as it doesn't improve performance in any way. I decided to write this after seeing that many solutions to this are written in jQuery.
<!--more-->

With much we can do using JavaScript these days and browser compatibility with recent browsers including IE9+, the purpose of jQuery is being served by our [vanillaJS][1]. If so, why waste an additional [242.55 Kb (minified 82.27Kb)][2] on HTTP request making your [users suffer][3] long page loads? There are [so many][4] [interesting][5] [write-ups][6] [on why jQuery][7] [is not needed][8] [anymore][9] so I wouldn't need to dive into that here.

To achieve this we need:

- library to track our scroll position on the viewport - [*Waypoints*][10]
- [Animate.css][11] to do what it does best; *Animate*

Using the No Framework version of Waypoints, we can include the library before our main script however it suits the existing workflow. In my case 01_waypoints.js to make it included first on compilation for gulp-concat. Also you should include animate.css whichever way you want. For every element on the page that needs to be animated, animate.css requires they have a class of `animated` in the HTML.

AnimateCSS plays the role of using some transitions to **load in** the content to the page. To load in content, it shouldn't pre-exist. Well it should be existing in the DOM but visually unseen. To do this you may need to create a unique class like `.waypoints` for giving all waypoint elements a default property of `visibility: hidden`. This way they still occupy their expected spaces in the layout, keeping the layout intact even before the animations come alive. I'll recommend you do not use a utility/helper class e.g `u-invisible, u-hidden` for this.

You can have various waypoints handling various animations per section of your web page. To do this in your script, it's as simple as:

```js
function ready(cb) {
  /in/.test(document.readyState) // in = loadINg
  	? setTimeout(ready.bind(null, cb), 9)
  	: cb();
}
ready(function(){
  /*======= Waypoints http://imakewebthings.com/waypoints/ ============= */
  var waypointRow1 = new Waypoint({
    element: document.querySelector('.waypoint'),
    handler: function() {
      var one = document.getElementById('animation1'),
      two = document.getElementById('animation2');
      one.classList.add('bounceInLeft');
      two.classList.add('bounceInRight');
      one.style.visibility = 'visible';
      two.style.visibility = 'visible';
    },
    offset: '70%'
  });
  var waypointRow2 = new Waypoint({
    element: document.querySelector('.waypoint2'),
    handler: function(){
      var one = document.getElementById('animation3'),
      two = document.getElementById('animation4');
      one.classList.add('zoomIn');
      two.classList.add('rubberBand');
      one.style.visibility = 'visible';
      two.style.visibility = 'visible';
    },
    offset: '70%'
  });
});
```

Notice how I used that tiny ready function? That's for those concerned about how they'll load it on documentReady like the jQuery `$(document).ready()`. Also I had set my offset to 70% because that works just fine for me. You can choose to go 100% like a lot of the jQuery implementations do. You can pick up one of the [animations for animate.css][11] and add their classes in place of the ones I used in the code above.

Your HTML should look similar to this:

```html
<section class="animated waypoint" id="animation1">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</section>
```

[1]: http://vanilla-js.com/
[2]: https://mathiasbynens.be/demo/jquery-size
[3]: http://www.websiteoptimization.com/speed/tweak/psychology-web-performance/
[4]: http://youmightnotneedjquery.com/
[5]: http://lea.verou.me/2015/04/jquery-considered-harmful/
[6]: http://www.sitepoint.com/do-you-really-need-jquery/
[7]: http://blog.garstasio.com/you-dont-need-jquery/why-not/
[8]: http://developers.slashdot.org/story/15/04/27/1754230/javascript-devs-is-it-still-worth-learning-jquery
[9]: http://callmenick.com/post/jquery-functions-javascript-equivalents
[10]: http://imakewebthings.com/waypoints/
[11]: http://daneden.github.io/animate.css/
