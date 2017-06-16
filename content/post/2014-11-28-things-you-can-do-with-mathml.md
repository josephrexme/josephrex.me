---
author: Joseph Rex
comments: true
date: 2014-11-28T00:00:00Z
title: Things you can do with MathML
url: /things-you-can-do-with-mathml/
tags:
  - math
  - mathML
---

For a while, I've been enjoying the awesomeness of mathML. I've not had specific use cases but just playing around with it gives me fun. Sometimes I idly just write equations that should be on a paper in my local web pages.

There's a lot you can learn about MathML by looking through the MDN spec. I'll just drop in the little parts I've played. This has been for so many years and it still available but it is only supported by gecko browsers (Mozilla Firefox, Iceweasel, some others) .
<!--more-->

I use Chromium as my major browser and I need to see all of my works of any sort within it. For this reason I had gotten <a title="MathML chrome extension" href="https://chrome.google.com/webstore/detail/math-anywhere/gebhifiddmaaeecbaiemfpejghjdjmhc" target="_blank">a mathML extension for chrome browsers that makes it work fine</a>. However, I find it disturbing that some websites using mathML readily assume that you can't use mathML from chrome browsers so they check if your browser is gecko based and if not, they serve you up with maybe a warning.

I've been able to view mathML on those few websites that do not do these from my Chromium but whenever I hit one of the presumptuous websites, I just have to move over to iceweasel even if it's not so convenient.

Here are some play-arounds with mathML:

<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mtext>Matrix: </mtext>
  <mspace width="10px" />
  <mrow>
    <mo>(</mo>
    <mtable>
      <mtr>
        <mtd>
          <mn>2</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>4</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>8</mn>
        </mtd>
      </mtr>
    </mtable>
    <mo>)</mo>
    <mspace width="30px" />
    <!-- A new table -->
    <mo>{</mo>
    <mtable>
      <mtr>
        <mtd>
          <mn>4</mn>
        </mtd>
        <mtd>
          <mn>8</mn>
        </mtd>
        <mtd>
          <mn>16</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>8</mn>
        </mtd>
        <mtd>
          <mn>16</mn>
        </mtd>
        <mtd>
          <mn>32</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>16</mn>
        </mtd>
        <mtd>
          <mn>32</mn>
        </mtd>
        <mtd>
          <mn>64</mn>
        </mtd>
      </mtr>
    </mtable>
    <mo>}</mo>
  </mrow>
</math>
<br>
<math>
  <mtext>More:</mtext>
  <mspace width="20px" />
  <mrow mathcolor="#00f">
    <mi mathvariant="bold">&pi;</mi>
    <msup>
      <mi>r</mi>
      <mn>2</mn>
    </msup>
  </mrow>
  <mspace width="20px" />
  <mrow mathcolor="#f00">
    <mmultiscripts>
        <mi>X</mi>
        <none />
        <mi>c</mi>
        <mprescripts />
        <mi>b</mi>
        <none />
    </mmultiscripts>
</mrow>
</math>
<br>
<math>
  <mrow>
    <mfrac>
      <mrow>
        <mi>x</mi>
        <mo>+</mo>
        <msup>
          <mi>y</mi>
          <mn>3</mn>
        </msup>
      </mrow>
      <mrow>
        <mi>2</mi>
      </mrow>
    </mfrac>
    <mspace width="20px" />
    <mo>&sum;</mo>
    <mo>,</mo>
    <mo>&int;</mo>
    <mspace width="20px" />
    <mo stretchy="false">(</mo>
    <mn>2</mn>
    <mo>,</mo>
    <mn>3</mn>
    <mo stretchy="false">)</mo>
  </mrow>
</math>

For more on mathML, check out the <a href="https://developer.mozilla.org/en-US/docs/Web/MathML" target="_blank">MDN docs</a>

<div class="update">
  <h4>
    Update - 14/12/2014
  </h4>

  <p>
    When I said some sites assume that you can't use mathML and prevent usage on non-gecko browsers, I've majorly had <a href="http://fred-wang.github.io/MozSummitMathML/index.html" target="_blank">this Fred Wang's presentation</a> in mind. I got an email from Fred making me understand why that was necessary. Here it is:
  </p>

  <blockquote>
    <p>
      MathJax has many issues with CSS, Javascript, Unicode fonts, RTL writing etc so I doubt your chrome extension can make <a href="http://fred-wang.github.io/MozSummitMathML/index.html" target="_blank">http://fred-wang.github.io/MozSummitMathML/index.html</a> work as expected. This page was designed for demo presentation at the Mozilla summit so this verification is done on purpose to prevent people from opening it into a browser with poor HTML5 support. For normal pages (not MathML demos), I use <a class="moz-txt-link-freetext" href="https://github.com/fred-wang/mathml-warning.js" target="_blank">https://github.com/fred-wang/mathml-warning.js</a> on my Website so that should not be a problem.
    </p>
  </blockquote>
</div>

Fred is among the developers at Mozilla working on mathML
