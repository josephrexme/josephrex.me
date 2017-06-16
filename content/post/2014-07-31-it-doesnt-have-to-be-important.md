---
author: Joseph Rex
comments: true
date: 2014-07-31T00:00:00Z
title: It doesn't have to be important
url: /it-doesnt-have-to-be-important/
tags:
  - css
  - web
---

Thanks to collaborated projects, I've come across crappy CSS in my life. I talked about it in a [previous article][1].

I'm not impeccable and I wouldn't be dissing someone else' because of their faults. However, one point I failed to mention about what I experienced from a co-designer on the project I mentioned in that article was the use of too many nested selectors.

Nested selectors increase specificity and they should be avoided when they can. In an instance where you have
<!--more-->

{{< highlight css >}} .header{...} {{< / highlight >}}

which contains a nav. If you wouldn't be using navs on any other part of your design, it will be unnecessary to have its selector named

{{< highlight css >}}
.header nav{...}
{{< / highlight >}}

when it will work just fine as

{{< highlight css >}}
nav{...}
{{< / highlight >}}

I had to take that drift because the article is majorly about specificity. Specifically about the use of !important for specificity in CSS.

Based on <a href="http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/" target="_blank">an article </a>I recently read by <a href="http://twitter.com/csswizardry" target="_blank">Harry Roberts</a> and the words from a lot of a lot of professionals in front-end communities,  it is best to avoid specificity with !important. Harry demonstrated how we can increase specificity without using !important. These pens are simple illustrations:

<p data-height="268" data-theme-id="0" data-slug-hash="dhxLv" data-default-tab="result" data-user="bl4ckdu5t" class='codepen'>See the Pen <a href='http://codepen.io/bl4ckdu5t/pen/dhxLv/'>dhxLv</a> by Joseph Rex (<a href='http://codepen.io/bl4ckdu5t'>@bl4ckdu5t</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


<p data-height="268" data-theme-id="0" data-slug-hash="loCyb" data-default-tab="result" data-user="bl4ckdu5t" class='codepen'>See the Pen <a href='http://codepen.io/bl4ckdu5t/pen/loCyb/'>loCyb</a> by Joseph Rex (<a href='http://codepen.io/bl4ckdu5t'>@bl4ckdu5t</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
  
The first pen shows how the "bar" class overrides the "foo" class that sets a red color to the paragraph, and the in the second, "foo" has more power. We can add more specificity by chaining the same class as many times as we want it like:

{{< highlight css >}}.foo.foo.foo.foo.foo{...} {{< / highlight >}}

Nice right? See we don't have to do it this way:

{{< highlight css >}}
.foo{color: red !important; }
.bar{color: blue; }
{{< / highlight >}}

###Conclusion

There's a lot more interesting features of CSS which you may not be aware of. To be a great designer, you should take advantage of these features and design the right way.

###Reference

<a href="http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/" target="_blank">http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/</a>

 [1]: {% post_url 2014-07-24-collaborated-projects-are-good-and-bad %}
