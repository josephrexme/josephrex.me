---
title: Anticipated birth of element queries
layout: post
author: Joseph Rex
permalink: /anticipated-birth-of-element-queries/
comments: true
tags: frontend css gui
---
There have been so many talks on constraint-based layouts or container/element queries lately and that's because without them responsive styling with [media queries will remain an unpleasant hack][1].
<!--more-->

What does any of all that mean? Constraints based layouts puts child layouts or components to the scope of their parents such that changes made are relative to the parent/container size.

<figure>
{% image container-qs-1.png alt="Container and child fluidity constraint" %}
</figure>

What may come to your thought at first is **just use a percentage value to achieve a size constrained to parent**. By doing that we'd be making a [fluid design][2] and we had that before responsive design with media queries yet we needed more responsiveness beyond fluidity.

Media queries allow you make certain styles based on the size of the viewport `(min-width: 720px)` means target viewports that are 720 or wider. Consider having that constraint to be in the scope of an element instead.

What is an element scope? Like [scopes in JavaScript][3], [scoped styles][4] were implemented to limit a set of rules to an element and its children without the need for a class or any selector. But after a while they were removed from chrome and most of the other browser vendors never attempted to implement them. With its syntax,

{% highlight html %}
<section>
  <style scoped>
    h1,p{ color: tomato }
  </style>
  <h1>Time to play a game</h1>
  <p>I left my game pads at the zoo.</p>
</section>
{% endhighlight %}

every scoped style only applies to elements within the container element that has the style but this wasn't really solving any problem that can't already be handled with existing selectors. Container queries are to behave somewhat like this but with a combination of the media query behavior.

<figure>
{% image container-qs-2.png alt="Container scope with condition based descendant" %}
</figure>

Up until now I've used container queries and element queries like they mean the exact same thing. To clarify I'll try to explain them better. If given a syntax like in the figure above:

{% highlight scss %}
section{
  @container (min-width: 100px){
    h1{
      color: tomato;
    }
  }
}
{% endhighlight %}

our constraint will always have to contain the depending elements (i.e a parent element) which would leave us with half the solution of what we need constraint based layout. There is so much that can be done with this which we will get into later but as of now this just shows that a container query isn't the solution to constraint based layouts for the web, elements queries are.

Another syntax that have been [proposed by the <abbr title="Responsive Issues Community Group">RICG</abbr>][8] for container queries is as below:

{% highlight scss %}
section:media(min-width: 100px) h1{
  color: tomato;
}
{% endhighlight %}

We could Sass that up with some nesting:

{% highlight scss %}
section:media(min-width: 100px){
  h1{
    color: tomato;
  }
}
{% endhighlight %}

as it shows, container queries would only ever be able to affect their descendants. Element queries on the other hand should affect just about anything. If we weren't targeting descendants only, that same syntax could look this way:

{% highlight scss %}
section:media(min-width: 100px){
  body{ background: lime; }
}
{% endhighlight %}

This means if I have a section greater than or equal to 100px make the body background lime. body doesn't have to be a child or descendant to section to be affected by its scope. It goes beyond container scoping as a great way to address element queries however the syntax could be very misleading. Anyone with normal experience in CSS would expect `section` to have a `body` descendant. How do we solve the syntax problem and achieve this right?

### Solutions to constraint based layouts
[Cassowary][5] constraint satisfaction algorithm, a known layout solution used in Apple development was used as an early implementation of CCSS (Constrained Cascading Style Sheet) after which more solutions like [GSS (Grid Style Sheets)][6] have tried to adapt the concept behind it.

<figure>
{% image https://www.smashingmagazine.com/wp-content/uploads/2016/07/eqcss-logo-opt.png class="image image--wide" alt="EQCSS Logo" %}
</figure>

More recently, [EQCSS (Element Queries CSS)][7] was born as a great speculative polyfill for element queries by [Tom Hodgins][11] and [Maxime Euzière][13]. It puts the at-rule into consideration for scoping elements like it is used with media queries and proposes the best syntax yet.

{% highlight scss %}
@element 'section'{
  body{
    background: lime;
  }
}
{% endhighlight %}

Like media queries before being used for RWD (Responsive Web Design), we could target any media without specifying any dimensions

{% highlight css %}
@media screen{
  body{
    background: lime;
  }
}
{% endhighlight %}

the eqcss snippet would change the background color provided there is one or more `section` element in the [CSSOM][9]. Then with media queries we get responsive design with conditions:

{% highlight css %}
@media screen and (min-width: 720px){
  body{
    background: lime;
  }
}
{% endhighlight %}

which element queries offer as:

{% highlight scss %}
@element '.mod' and (min-width: 100px){
  body{
    background: lime;
  }
}
{% endhighlight %}

an element could be its own constraint which would help achieve better pluggable [atomic design][10].

What happens when there is more than one element being used as constraint? Eqcss allows you to target current scope only with meta selectors

{% highlight scss %}
@element 'input' and (min-width: 100px){
  $this:focus{
    border: solid thin crimson;
  }
}
{% endhighlight %}

This would only apply a border to the input that is focused and no other input. There are more meta selectors including with [demos here][12]. They include `$parent`, `$next`, `$prev`, and `$root`.

EQCSS allows more conditions for the scoped element including `min-aspect-ratio`, `orientation`, `min-scroll-y`, `min-lines`, `min-characters`, `min-children`, and more.

### Container queries and cyclic dependency problem
People have raised possible issues with container queries to be circularity of dependent containers or recursion. Basing an element on the container of a container of a container may lead to a O(N<sup>2</sup>) [complexity][14]. Here's what the recursion looks like from an [example][16] by [Martin Auswöger][15]

<figure>
{% image container-qs-3.png alt="Cyclic dependency of container query" %}
</figure>

{% highlight scss %}
.container{ float: left; }
.child{ width: 200px; }
.container:media(min-width: 150px){
  .child{
    width: 100px;
  }
}
{% endhighlight %}

Ausi recommended that the fix to this would be to use a syntax like this:

{% highlight scss %}
.child:container(min-width: 150px){ width: 100px }
{% endhighlight %}

leaving the browser to make a decision of a reliable container after traversing the DOM to find ancestors. The container would then be the nearest ancestor with a fixed width or the document width when no ancestors are found.

How does EQCSS handle this? As said earlier, EQCSS does not use container queries but element queries hence there's no such thing as scoping child elements within their parents. It simply picks an element and gives it a condition to be met. What this means is, when the problem above is addressed with eqcss, the child element would just always base on its on min-width since  the scoped element relies on it. It does cause a few self-referencing issue but CSS already has self referencing issues. This video explains:

<div class="video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/QfM_JwSDdjo" frameborder="0" allowfullscreen></iframe>
</div>

Here's eqcss addressing the problem above. As of the time of testing it only behaves weird in Chrome Canary (Chrome 60)

<iframe width="100%" height="300" src="//jsfiddle.net/bl4ckdu5t/6wuzuer5/embedded/result,css,html/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

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
