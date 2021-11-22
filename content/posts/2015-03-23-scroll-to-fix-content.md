---
author: Joseph Rex
comments: true
date: 2015-03-23T00:00:00Z
title: 'Sticky: Scroll to fix content'
permalink: /scroll-to-fix-content/
---

Late last year, [Chris Coyier](https://twitter.com/chriscoyier) addressed this on [CSS-Tricks](https://css-tricks.com/scroll-fix-content/) with illustrating images including GIF. In his solution to the problem, he had used [magic numbers](http://css-tricks.com/magic-numbers-in-css/) which he confirmed made his soluton not re-usable. He also wrote it in jQuery which may be nice considering that a lot of people use jQuery as it works on legacy browsers.
<!--more-->

The first issue I'll address here is that jQuery may be used by majority of web developers but not everyone does. To produce code that works in less time, I use jQuery to handle a lot of my freelance projects just to get the job done so fast. In this cases, performance is my least priority. I'm usually not trying to meet any performance budget even though I still take things like concatenation and minification very seriously. I maintain my blog here and I try my best possible to keep good performance. In total, I'm only having to use JavaScript to achieve about 6 things on my blog and I saw no need to load the whole jQuery library just to achieve those. I have chosen to go with vanilla JavaScript.

I had to talk about my blog not using jQuery because the point I'm making is that I want a solution with no dependency of jQuery. If you notice the home page of this blog, the logo gets fixed to the header after scroll. This is exactly what we are trying to achieve here. While Chris focused on mobile, I think we usually need this even on desktop web platforms as well. Infact, my mobile view, does not have the scroll-to-fix effect like the desktop does.

Considering a vanilla JavaScript solution without magic numbers, [Jessica][4] wrote [one][5] where she was using anchor to aid the sticky position retrieval and I think it's a bit too much work for the little thing we need to do.

To listen on scroll event, we add a event listener with

```js
document.addEventListener("scroll", function(){});
```

Now to avoid the use of magic numbers, I suggest the element that gets fixed is already an absolutely positioned element with a `top` value determining its initial distance from the top of the window. That top value becomes the fix point where we make the element become sticky.

```js
/* Selecting the DOM element that'll be fixed */
var wrap = document.getElementById('js-wrap');
/* Get the top property which must have been set in
the CSS and remove whatever units it has with parseInt */
fixPoint = parseInt( getComputedStyle(wrap).getPropertyValue('top') );
```

Lastly, we want the element to get fixed when scrolled to. We do this by creating a condition to fix the content when the distance from the document top exceeds our acquired fixPoint.

```js
wrap.classList.toggle("fixed", document.body.scrollTop > fixPoint);
```

The whole code should now look like this:

```js
document.addEventListener("scroll", function(e) {
  fixPoint = parseInt( getComputedStyle(wrap).getPropertyValue('top') );
  wrap.classList.toggle( "fixed", document.body.scrollTop > fixPoint );
});
```

Toggling a class `fixed` that gives the element a fixed position a new top value with a shorter distance from the window top as shown with the CSS code:

```css
.logo{
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 100;
  margin: 0 auto;
  width: 40px;
}
.logo.fixed{
  position: fixed;
  top: 5px;
  z-index: 200;
  width: 30px;
}
```

Here's a demo pen to show it in action

<p data-height="268" data-theme-id="0" data-slug-hash="myLbNw" data-default-tab="result" data-user="bl4ckdu5t" class='codepen'>See the Pen <a href='http://codepen.io/bl4ckdu5t/pen/myLbNw/'>Scroll Fix content</a> by Joseph Rex (<a href='http://codepen.io/bl4ckdu5t'>@bl4ckdu5t</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

My home page has the perfect demo for it.

[1]: https://twitter.com/chriscoyier
[2]: https://css-tricks.com/scroll-fix-content/
[3]: http://css-tricks.com/magic-numbers-in-css/
[4]: https://css-tricks.com/scroll-fix-content/#comment-1585386
[5]: https://codepen.io/anon/pen/chDbg
