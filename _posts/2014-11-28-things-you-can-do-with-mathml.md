---
title: Things you can do with MathML
author: Joseph Rex
layout: post
permalink: /things-you-can-do-with-mathml/
categories:
  - web
tags:
  - math
  - mathML
---
[<img class="aligncenter  wp-image-399" src="http://josephrex.me/wp-content/uploads/2014/11/mathematical-equations-152650-1024x640.jpg" alt="math equations" width="602" height="376" />][1]

For a while, I&#8217;ve been enjoying the awesomeness of mathML. I&#8217;ve not had specific use cases but just playing around with it gives me fun. Sometimes I idly just write equations that should be on a paper in my local web pages.

There&#8217;s a lot you can learn about MathML by looking through the MDN spec. I&#8217;ll just drop in the little parts I&#8217;ve played. This has been for so many years and it still available but it is only supported by gecko browsers (Mozilla Firefox, Iceweasel, some others) .

I use Chromium as my major browser and I need to see all of my works of any sort within it. For this reason I had gotten <a title="MathML chrome extension" href="https://chrome.google.com/webstore/detail/math-anywhere/gebhifiddmaaeecbaiemfpejghjdjmhc" target="_blank">a mathML extension for chrome browsers that makes it work fine</a>. However, I find it disturbing that some websites using mathML readily assume that you can&#8217;t use mathML from chrome browsers so they check if your browser is gecko based and if not, they serve you up with maybe a warning.

I&#8217;ve been able to view mathML on those few websites that do not do these from my Chromium but whenever I hit one of the presumptuous websites, I just have to move over to iceweasel even if it&#8217;s not so convenient.

Here are some play-arounds with mathML&nbsp;<span style="color: #ff0000;">(if you don&#8217;t see any unique math shapes, your browser doesn&#8217;t support mathML. Try Firefox)</span>:

<p class="codepen" data-height="268" data-theme-id="0" data-slug-hash="qEOogO" data-default-tab="result" data-user="bl4ckdu5t">
  See the Pen <a href="http://codepen.io/bl4ckdu5t/pen/qEOogO/">qEOogO</a> by Joseph Rex (<a href="http://codepen.io/bl4ckdu5t">@bl4ckdu5t</a>) on <a href="http://codepen.io">CodePen</a>.
</p>



For more on mathML, check out the <a href="https://developer.mozilla.org/en-US/docs/Web/MathML" target="_blank">MDN docs</a>

<div class="update">
  <h4>
    Update &#8211; 14/12/2014
  </h4>
  
  <p>
    When I said some sites assume that you can&#8217;t use mathML and prevent usage on non-gecko browsers, I&#8217;ve majorly had <a href="http://fred-wang.github.io/MozSummitMathML/index.html" target="_blank">this Fred Wang&#8217;s presentation</a> in mind. I got an email from Fred making me understand why that was necessary. Here it is:
  </p>
  
  <blockquote>
    <p>
      MathJax has many issues with CSS, Javascript, Unicode fonts, RTL writing etc so I doubt your chrome extension can make <a href="http://fred-wang.github.io/MozSummitMathML/index.html" target="_blank">http://fred-wang.github.io/MozSummitMathML/index.html</a> work as expected. This page was designed for demo presentation at the Mozilla summit so this verification is done on purpose to prevent people from opening it into a browser with poor HTML5 support. For normal pages (not MathML demos), I use <a class="moz-txt-link-freetext" href="https://github.com/fred-wang/mathml-warning.js" target="_blank">https://github.com/fred-wang/mathml-warning.js</a> on my Website so that should not be a problem.
    </p>
  </blockquote>
</div>

Fred is among the developers at Mozilla working on mathML

 [1]: http://josephrex.me/wp-content/uploads/2014/11/mathematical-equations-152650.jpg