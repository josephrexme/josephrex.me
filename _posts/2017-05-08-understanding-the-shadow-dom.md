---
title: Understanding the shadow dom
layout: post
comments: true
author: Joseph Rex
permalink: /understanding-the-shadow-dom/
tags: frontend
---
For the decades programming have existed there have been abstractions over abstractions
which to many appear only as simplification of process and better <abbr title="Developer Experience">DX</abbr>. Yes that is the ultimate goal but it gets there by taking some tunnels.
<!--more-->

{% image https://res.cloudinary.com/strich/image/upload/v1494252872/shadow-dom_owxzlx.jpg class="image figure--fullwidth" alt="Shadow DOM banner" %}

[Modularity is confirmed an attribute of well written programs][1] and one of the goals for
modularity is encapsulation. This is what the shadow DOM offers.

If you've been developing long enough you've probably heard this [so many][3] [times][4] [by now][5]:

> Do not mess with the global scope

Although it may seem totally unrelated but shadow dom addresses the scope issue as well. It's just different in that we aren't talking about global variables with literals. So this isn't about scoping `this`, `self` or `global` or whatever you way you call [global scope][2] in JavaScript.

A lot of us believe the [problem with CSS is that all its classes (and ids if you use those in CSS) are global][6]. And to solve this we've tried things like OOCSS, BEM, [rscss][7] and all of such solutions that require human effort to maintain a namespace out of the global scope. The problem with this so far is inexperienced devs would join larger codebases and mess it all up.

If you happen to be using Sass nesting without a style lint to prompt for errors it wouldn't be long before you have this in your codebase:

{% highlight scss %}
.block{
  &--myModifier{}
  &.i-like-messy-code{}
  &-myNewModifier{}
  &__elementB{
    @media(min-width: 765px){
      .foo.bar.baz{
        &:after{
          content: 'danger!!!';
        }
      }
      &_element_of_element{
        color: red !important;
      }
    }
  }
}
{% endhighlight %}

I couldn't control myself so I made that a little worse than it should look but the point is human are prone to errors and there are times single underscores would be used, single hyphens would be used when trying to follow something like BEM.

Well [good news everyone][8], CSS-modules solves this problem and even though it may also be abused it seem like a better option over sprinkling global styles everywhere. The problem with CSS-modules is what if you aren't building a React or Vue app? Or anything that complex at all? There should be a way to handle this in the web platform.

The shadow DOM tackles this problem exactly and more. It offers a way to encapsulate components as part of [web components][9]. Here's an example

{% highlight javascript %}
const parent = document.querySelector('.root');
const shadow = parent.attachShadow({mode: 'open'});
shadow.innerHTML = '<span>This should appear!</span><style>span{ color: red}</style>';
{% endhighlight %}

If you work with React, this is the `ReactDOM.render()` of shadow DOM.

<figure>
  {% image http://res.cloudinary.com/strich/image/upload/v1494275896/screenshot-shadow-dom_ay4top.png alt="Shadow DOM insertion" class="image figure--fullwidth" %}
</figure>

As shown in the figure above, the shadow root can take its own style that applies to that particular component only. Not messing with the rest of the DOM. Best part is the shadow node also doesn't take the styles of whatever parent elements it has since it is an external and detached DOM from the regular DOM. To make it take its parent styles you'd have to explicitly tell it to:
{% highlight javascript %}
shadow.applyAuthorStyles = true;
{% endhighlight %}

If you've ever looked through the DOM when using 3rd party libraries like modals, datepickers, and whatever cool stuff you use on your websites, you'd notice some massive additions into the DOM by them. These library authors are very much aware of the CSS cascading problems so they try to increase specificity of whatever they add. In most situations, direct inline elements are added but imagine there's a library author that decides to add classes and pass a `<style>` tag with the DOM insertions. The library has a class `.pod{ color: red !important }` and in your code you've been trying a `.pod{ color: papayawhip }` that doesn't seem to be working. This is the kind of clash that happens when you have everyone peeing in the DOM. ShadowDOM gives every library author their own bathroom.

Also, like the virtual dom in React, you can make traversals in the shadow dom and make only few direct data passing into the DOM improving performance over directly messing with the DOM.

[1]: https://josephrex.me/cohesion-against-coupling/
[2]: http://2ality.com/2016/09/global.html
[3]: https://www.w3.org/wiki/JavaScript_best_practices#Avoid_globals
[4]: http://lucybain.com/blog/2014/js-dont-touch-global-scope/
[5]: https://www.smashingmagazine.com/2016/11/css-inheritance-cascade-global-scope-new-old-worst-best-friends/
[6]: https://medium.com/seek-developers/the-end-of-global-css-90d2a4a06284
[7]: http://rscss.io
[8]: https://www.youtube.com/watch?v=z6ODMDtG6-I
[9]: https://developer.mozilla.org/en-US/docs/Web/Web_Components
