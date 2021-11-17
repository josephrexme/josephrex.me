---
author: Joseph Rex
categories:
- web
comments: true
date: 2014-12-17T00:00:00Z
title: Specificity wars
url: /specificity-wars/
tags:
  - css
  - performance
---

When you look through the element styles of your browser web developer tools, you can see how CSS rules override themselves. What is prioritized is mostly based on the specificity level. It's a usual thing that styles below override the ones above, inline styles override external styles. These are the little things but it gets deeper when we use id selectors around our stylesheets. Ids have high specificity and there are uncalled for as we don't want unnecessary spikes in our specificity graph. This <a href="http://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/" target="_blank">css-wizardry article</a> tells why IDs can be the demons of our stylesheets.
<!--more-->

I seldom use CSS frameworks, but I do know that bootstrap makes use of classes. If you are not taking advantage of many selectors available today, then you can just stick with the type (element) selectors and classes.

I just sounded like IDs were evil. What's more evil is the <span style="color: #ff0000;">!important</span>. If you're a beginner or intermediary CSS coder, then there is a big chance you use the !important which is a maximum specificity level and it's why it usually overrules the other rules (predecessors and successors). Some designers/developers now find themselves in a quandary when told not to make use of !important they have gotten so used to. They ask questions like *Then what should I use?*, *What else can do the job?*.

Chained class naming bro! Chained class naming does it like a boss and then you don't have to worry about doing something wrong. When you have a class like *.box* that you need to specify more. You can do it by chaining this way.

{{< highlight css >}}
.box.box.box.box{ color: red; }
{{< / highlight >}}

I had only gone on four chains. You could make this as long as you want. I recently had to go about 12 chains long to overrule an existing style on a wordpress child theme I worked on.

The class chaining should always be used in place of !important.

I made this pen to create a specificity war.

<p data-height="268" data-theme-id="0" data-slug-hash="PwzPpo" data-default-tab="result" data-user="bl4ckdu5t" class='codepen'>See the Pen <a href='http://codepen.io/bl4ckdu5t/pen/PwzPpo/'>A specificity test</a> by Joseph Rex (<a href='http://codepen.io/bl4ckdu5t'>@bl4ckdu5t</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


If you look through the stylesheet of the pen you will see I had a 30 chains class selector, an id selector, and a class selector with !important. Well, I know, !important overrules our chained class naming but when we are on a specificity fight with normal class and id selectors, the class chaining will be king. So for no reason should we still use the !important over class chaining except we already have it used in the rules we are overruling. Then the order of precedence will be our win point.

<a href="http://twitter.com/csswizardry" target="_blank">Harry Roberts</a> described <a href="http://csswizardry.com/2014/10/the-specificity-graph/" target="_blank">how the specificity graph of your project should be</a>. He spoke of our helper classes that usually tend to carry !important. As much as I avoid the !important, I have it occurring once or twice in my helper classes. Before I ever put specificity to consideration, I've always imported my helpers at the bottom of the stylesheet. You can see that of a jekyll project I just worked on here:

{{< highlight css >}}
@charset "utf-8";

// Our variables
$base-font-family: 	Helvetica, Arial, sans-serif;
$base-font-size:   	16px;
$small-font-size:  	$base-font-size * 0.875;
$base-line-height: 	1.5;

$spacing-unit:     	30px;

$text-color:       	#111;
$background-color: 	#fdfdfd;
$brand-color:      	#2a7ae2;

$grey-color:       	#828282;
$grey-color-light: 	lighten($grey-color, 40%);
$grey-color-dark:  	darken($grey-color, 25%);
$color-darktheme: 	#eee;
$darktheme-outter: 	#222;
$darktheme-inner: 	#444;
$border-darktheme: 	#999;

// Width of the content area
$content-width:    800px;

$on-palm:          600px;
$on-laptop:        800px;
$nav-height: 	   30px;



// Using media queries with like this:
// @include media-query($on-palm) {
//     .wrapper {
//         padding-right: $spacing-unit / 2;
//         padding-left: $spacing-unit / 2;
//     }
// }
@mixin media-query($device) {
    @media screen and (max-width: $device) {
        @content;
    }
}



@import
        "fonts",
        "h5bp",
        "variables",
        "mixins",
        "base",
        "syntax-highlighting",
        "helpers"
;
{{< / highlight >}}

The reason for this as mentioned by Harry is for our specificity graph to be upward trending.

I used the <a href="http://jonassebastianohlsson.com/specificity-graph/" target="_blank">online specificity graph tool</a> to analyze that pen and here's what it gave:

<figure>
<img src="https://res.cloudinary.com/strich/image/upload/v1497701559/specifity-graph_avdcml.png" class="image" alt="specifity-graph">
</figure>

This graph is great and it has worked fine in giving me a graph of bigger projects. There's a downside to it though. It doesn't include rules with a !important value in them. I have my codepen demo giving me the selector with !important as the most specific but then the graph has its highest specificity at the end of the stylesheet to be the 30 chained class selector. The other rise in the middle is the id selector.

<a href="https://github.com/katiefenn/parker" target="_blank">Parker</a> is a command-line npm package that analyzes CSS and also shows elements with highest specificity.

### Conclusion

Avoid ID selectors, avoid !important, start with selectors like `*`, `html`, and other element selectors that aren't too specific, then move on to class selectors. If there is a need for class chaining or !important in your helpers, they should be at the bottom. If there is no need for them, the helpers partial of your project should still be at the bottom if you want it overruling other styles by precedence.
