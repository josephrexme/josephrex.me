---
title: 'It doesn&#8217;t have to be important'
author: Joseph Rex
layout: post
permalink: /it-doesnt-have-to-be-important/
categories:
  - web
tags:
  - css
  - web
---
[<img src="http://josephrex.me/wp-content/uploads/2014/07/name_not_important_on_drumzz_visaomedia.jpg" alt="name_not_important_on_drumzz_visaomedia" width="400" height="271" class="aligncenter size-full wp-image-169" />][1]  
Thanks to collaborated projects, I&#8217;ve come across crappy CSS in my life. I talked about it in a [previous article][2].

I&#8217;m not impeccable and I wouldn&#8217;t be dissing someone else&#8217; because of their faults. However, one point I failed to mention about what I experienced from a co-designer on the project I mentioned in that article was the use of too many nested selectors.

Nested selectors reduce specificity and they should be avoided when they can. In an instance where you have

<pre class="lang:css decode:true ">.header{...}</pre>

which contains a nav. If you wouldn&#8217;t be using navs on any other part of your design, it will be unnecessary to have its selector named

<pre class="lang:css decode:true ">.header nav{...}</pre>

when it will work just fine as

<pre class="lang:css decode:true ">nav{...}</pre>

I had to take that drift because the article is majorly about specificity. Specifically about the use of !important for specificity in CSS.

Based on <a href="http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/" target="_blank">an article </a>I recently read by <a href="http://twitter.com/csswizardry" target="_blank">Harry Roberts</a> and the words from a lot of a lot of professionals in front-end communities,  it is best to avoid specificity with !important. Harry demonstrated how we can increase specificity without using !important. These pens are simple illustrations:

<p class="codepen" data-height="268" data-theme-id="0" data-slug-hash="dhxLv" data-default-tab="result">
  See the Pen <a href="http://codepen.io/bl4ckdu5t/pen/dhxLv/">dhxLv</a> by Joseph Rex (<a href="http://codepen.io/bl4ckdu5t">@bl4ckdu5t</a>) on <a href="http://codepen.io">CodePen</a>.
</p>



<p data-height="268" data-theme-id="0" data-slug-hash="loCyb" data-default-tab="result" class='codepen'>
  See the Pen <a href='http://codepen.io/bl4ckdu5t/pen/loCyb/'>loCyb</a> by Joseph Rex (<a href='http://codepen.io/bl4ckdu5t'>@bl4ckdu5t</a>) on <a href='http://codepen.io'>CodePen</a>.
</p>

  
The first pen shows how the &#8220;bar&#8221; class overrides the &#8220;foo&#8221; class that sets a red color to the paragraph, and the in the second, &#8220;foo&#8221; has more power. We can add more specificity by chaining the same class as many times as we want it like:

<pre class="lang:css decode:true ">.foo.foo.foo.foo.foo{...}</pre>

Nice right? See we don&#8217;t have to do it this way:

<pre class="lang:css decode:true ">.foo{color: red !important; }
.bar{color: blue; }</pre>

** Conclusion:**

There&#8217;s a lot more interesting features of CSS which you may not be aware of. To be a great designer, you should take advantage of these features and design the right way.

**Reference:**

<a href="http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/" target="_blank">http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/</a>

 [1]: http://josephrex.me/wp-content/uploads/2014/07/name_not_important_on_drumzz_visaomedia.jpg
 [2]: http://josephrex.me/collaborated-projects-are-good-and-bad/ "Collaborated Projects are good and bad"