---
title: Beautiful world of houdini
permalink: /beautiful-world-of-houdini/
comments: true
layout: post
author: Joseph Rex
tags: frontend css
---
Besides the beautiful name, houdini would be a great addition to web technologies when eventually implemented by browsers. Before going into what it is exactly, you can think of it as the [babel][1] of CSS. Each time I come across the name Houdini, I imagine Agent Phil Coulson saying _"tahiti, it's a magical place"_.
<!--more-->

<figure class="figure--fullwidth">
<img src="https://res.cloudinary.com/strich/image/upload/v1494943349/Houdini_tndspt.jpg" alt="Houdini poster by Joseph Rex" class="image">
<figcaption>Houdini, It's a beautiful place. You should go there sometime</figcaption>
</figure>

The objective of the CSS houdini is to create an extendable CSS where everyone can add new custo features without a hassle to the language. [Phillip Walton explains why CSS can't be extended with polyfills like we do with JS today][2]. The goal of the Houdini task force is to provide more access to the rendering pipeline on clients (Browsers, Webviews) because of the current limited access.

In a [recent article I talked about container queries][3] and how [eqcss][4] is a great solution for them. But the problem is if things already accepted into the spec take forever to be implemented, how long would it take for something that's yet to be accepted. One of the authors of eqcss started writing a [proposal][5] for it already but it's not close to being accepted yet. Before this there's been [GSS][6] which may never have a future without houdini.

For some other possible houdini extensions in the wild there's [hitch][7] that lets you create your own custom selectors, [glitter][8] which goes a step further from CSS custom properties (or CSS variables) to let you define operations on properties. Some of these things are already achievable with preprocessors but here's how glitter may handle style extension:

{% highlight scss %}
.pod{
  color: blue; /* #00f */
  --color-filter: inverse(); /* Produces #f00 red */
}
.bay{
  color: papayawhip;
  --color-filter: darken(10%);
}
{% endhighlight %}

and if you hate deriving rgb() values of hex colors when you want to add translucency with an alpha channel you can simply do that like Sass already does:

{% highlight scss %}
.pod{
  color: rgba(midnightblue, .5);
}
{% endhighlight %}

With these and more in the [current spec][9] it's obvious that houdini is worth looking forward to and passing on ideas to.

In the next article I'll write about my thoughts on namespacing in CSS and how we may achieve it in preprocessors if accepted and in CSS if we get importable modules, nesting in the language, and houdini.

[1]: https://babeljs.io
[2]: https://www.smashingmagazine.com/2016/03/houdini-maybe-the-most-exciting-development-in-css-youve-never-heard-of/#so-why-dont-we-just-write-more-css-polyfills
[3]: https://josephrex.me/anticipated-birth-of-element-queries/
[4]: http://elementqueries.com
[5]: https://tomhodgins.github.io/element-queries-spec/element-queries.html
[6]: http://gridstylesheets.org/
[7]: https://github.com/bkardell/Hitch/wiki/FAQ
[8]: https://github.com/GlitterOrg/pipeline
[9]: https://github.com/w3c/css-houdini-drafts/wiki/specs
