---
author: Joseph Rex
comments: true
date: 2017-04-29T00:00:00Z
tags:
  - frontend
  - css
  - gui
title: Anticipated birth of element queries
permalink: /anticipated-birth-of-element-queries/
---

There have been [so many](https://alistapart.com/article/container-queries-once-more-unto-the-breach) [talks](https://au.si/css-container-queries) [on](http://www.xanthir.com/b4PR0) [constraint-based](http://www.xanthir.com/b4VG0) [layouts](https://ethanmarcotte.com/wrote/on-container-queries/) [or](https://ethanmarcotte.com/wrote/a-bit-more-on-container-queries/) [container/element](https://www.smashingmagazine.com/2013/06/media-queries-are-not-the-answer-element-query-polyfill/) [queries](http://codepen.io/tomhodgins/post/what-the-heck-are-element-queries-container-queries) [lately](http://kittygiraudel.com/2014/04/22/why-element-queries-matter/) and that's because without them responsive styling with [media queries will remain an unpleasant hack](http://ianstormtaylor.com/media-queries-are-a-hack/).
<!--more-->

What does any of all that mean? Constraints based layouts puts child layouts or components to the scope of their parents such that changes made are relative to the parent/container size.

<figure>
<img src="https://res.cloudinary.com/strich/image/upload/v1497692305/container-qs-1_grttug.png" alt="Container and child fluidity constraint">
</figure>

What may come to your thought at first is **just use a percentage value to achieve a size constrained to parent**. By doing that we'd be making a [fluid design][2] and we had that before responsive design with media queries yet we needed more responsiveness beyond fluidity.

Media queries allow you make certain styles based on the size of the viewport `(min-width: 720px)` means target viewports that are 720 or wider. Consider having that constraint to be in the scope of an element instead.

What is an element scope? Like [scopes in JavaScript][3], [scoped styles][4] were implemented to limit a set of rules to an element and its children without the need for a class or any selector. But after a while they were removed from chrome and most of the other browser vendors never attempted to implement them. With its syntax,

```html
<section>
  <style scoped>
    h1,p{ color: tomato }
  </style>
  <h1>Time to play a game</h1>
  <p>I left my game pads at the zoo.</p>
</section>
```

every scoped style only applies to elements within the container element that has the style but this wasn't really solving any problem that can't already be handled with existing selectors. Container queries are to behave somewhat like this but with a combination of the media query behavior.

<figure>
<img src="https://res.cloudinary.com/strich/image/upload/v1497697668/container-qs-2_fsipar.png" alt="Container scope with condition based descendant">
</figure>

Up until now I've used container queries and element queries like they mean the exact same thing. To clarify I'll try to explain them better. If given a syntax like in the figure above:

```scss
section{
  @container (min-width: 100px){
    h1{
      color: tomato;
    }
  }
}
```

our constraint will always have to contain the depending elements (i.e a parent element) which would leave us with half the solution of what we need constraint based layout. There is so much that can be done with this which we will get into later but as of now this just shows that a container query isn't the solution to constraint based layouts for the web, elements queries are.

Another syntax that have been [proposed by the <abbr title="Responsive Issues Community Group">RICG</abbr>][8] for container queries is as below:

```scss
section:media(min-width: 100px) h1{
  color: tomato;
}
```

We could Sass that up with some nesting:

```scss
section:media(min-width: 100px){
  h1{
    color: tomato;
  }
}
```

as it shows, container queries would only ever be able to affect their descendants. Element queries on the other hand should affect just about anything. If we weren't targeting descendants only, that same syntax could look this way:

```scss
section:media(min-width: 100px){
  body{ background: lime; }
}
```

This means if I have a section greater than or equal to 100px make the body background lime. body doesn't have to be a child or descendant to section to be affected by its scope. It goes beyond container scoping as a great way to address element queries however the syntax could be very misleading. Anyone with normal experience in CSS would expect `section` to have a `body` descendant. How do we solve the syntax problem and achieve this right?

## Solutions to constraint based layouts
[Cassowary][5] constraint satisfaction algorithm, a known layout solution used in Apple development was used as an early implementation of CCSS (Constrained Cascading Style Sheet) after which more solutions like [GSS (Grid Style Sheets)][6] have tried to adapt the concept behind it.

More recently, [EQCSS (Element Queries CSS)][7] was born as a great speculative polyfill for element queries by [Tom Hodgins][11] and [Maxime Euzière][13]. It puts the at-rule into consideration for scoping elements like it is used with media queries and proposes the best syntax yet.

```scss
@element section{
  body{
    background: lime;
  }
}
```

Like media queries before being used for RWD (Responsive Web Design), we could target any media without specifying any dimensions

```css
@media screen{
  body{
    background: lime;
  }
}
```

the eqcss snippet would change the background color provided there is one or more `section` element in the [CSSOM][9]. Then with media queries we get responsive design with conditions:

```css
@media screen and (min-width: 720px){
  body{
    background: lime;
  }
}
```

which element queries offer as:

```scss
@element .mod and (min-width: 100px){
  body{
    background: lime;
  }
}
```

an element could be its own constraint which would help achieve better pluggable [atomic design][10].

What happens when there is more than one element being used as constraint? Eqcss allows you to target current scope only with meta selectors

```scss
@element input and (min-width: 100px){
  $this:focus{
    border: solid thin crimson;
  }
}
```

This would only apply a border to the input that is focused and no other input. There are more meta selectors including with [demos here][12]. They include `$parent`, `$next`, `$prev`, and `$root`.

EQCSS allows more conditions for the scoped element including `min-aspect-ratio`, `orientation`, `min-scroll-y`, `min-lines`, `min-characters`, `min-children`, and more.

## Container queries and cyclic dependency problem
People have raised possible issues with container queries to be circularity of dependent containers or recursion. Basing an element on the container of a container of a container may lead to a O(N<sup>2</sup>) [complexity][14]. Here's what the recursion looks like from an [example][16] by [Martin Auswöger][15]

<figure>
<img src="https://res.cloudinary.com/strich/image/upload/v1497697683/container-qs-3_rldb7o.png" alt="Cyclic dependency of container query">
</figure>

```scss
.container{ float: left; }
.child{ width: 200px; }
.container:media(min-width: 150px){
  .child{
    width: 100px;
  }
}
```

Ausi recommended that the fix to this would be to use a syntax like this:

```scss
.child:container(min-width: 150px){ width: 100px }
```

leaving the browser to make a decision of a reliable container after traversing the DOM to find ancestors. The container would then be the nearest ancestor with a fixed width or the document width when no ancestors are found.

How does EQCSS handle this? As said earlier, EQCSS does not use container queries but element queries hence there's no such thing as scoping child elements within their parents. It simply picks an element and gives it a condition to be met. What this means is, when the problem above is addressed with eqcss, the child element would just always base on its on min-width since  the scoped element relies on it. It does cause a few self-referencing issue but CSS already has self referencing issues. This video explains:

<figure class="video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/QfM_JwSDdjo" frameborder="0" allowfullscreen></iframe>
</figure>

Here's eqcss addressing the problem above. As of the time of testing it only behaves weird in Chrome Canary (Chrome 60) and that's not surprising as we see [with the growth of Chrome things get weird like it did with will-change][26].

<iframe width="100%" height="300" src="//jsfiddle.net/bl4ckdu5t/6wuzuer5/embedded/result,css,html/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

and a demonstation of it when resized:

<div style='position:relative;padding-bottom:36%'><iframe src='https://gfycat.com/ifr/FirstCheerfulFrenchbulldog' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div>

<hr>

## Resources
- [Brad Frost's list of element/container queries post and tools][24]
- [EQCSS demos][25]
- [2014 state of element queries][18]
- [Element queries][17]
- [Alistapart - Container queries once more unto the breach][8]
- [Ausi's css container queries][16]
- [On container queries - Ethan Marcotte][19]

[1]: http://ianstormtaylor.com/media-queries-are-a-hack/
[2]: http://css-discuss.incutio.com/wiki/Fluid_Design
[3]: https://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/
[4]: https://css-tricks.com/saving-the-day-with-scoped-css/
[5]: https://en.wikipedia.org/wiki/Cassowary_(software)
[6]: http://web-design-weekly.com/2015/01/21/gss-layout-reimagined/
[7]: http://elementqueries.com
[8]: https://alistapart.com/article/container-queries-once-more-unto-the-breach
[9]: https://www.w3.org/TR/cssom-1/
[10]: http://atomicdesign.bradfrost.com
[11]: https://twitter.com/innovati
[12]: http://elementqueries.com/#meta-selectors
[13]: http://twitter.com/MaximeEuziere
[14]: https://josephrex.me/big-o-notation-explained/
[15]: https://twitter.com/ausi
[16]: https://au.si/css-container-queries
[17]: http://www.xanthir.com/b4PR0
[18]: http://www.xanthir.com/b4VG0
[19]: https://ethanmarcotte.com/wrote/on-container-queries/
[20]: https://ethanmarcotte.com/wrote/a-bit-more-on-container-queries/
[21]: https://www.smashingmagazine.com/2013/06/media-queries-are-not-the-answer-element-query-polyfill/
[22]: http://codepen.io/tomhodgins/post/what-the-heck-are-element-queries-container-queries
[23]: http://kittygiraudel.com/2014/04/22/why-element-queries-matter/
[24]: https://bradfrost.github.io/this-is-responsive/resources.html#element-queries
[25]: https://github.com/eqcss/eqcss#documentation--tutorials
[26]: https://greensock.com/will-change
