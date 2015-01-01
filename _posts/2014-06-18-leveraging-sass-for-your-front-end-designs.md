---
title: Leveraging SASS for your front-end designs
author: Joseph Rex
layout: post
permalink: /leveraging-sass-for-your-front-end-designs/
categories:
  - web
tags:
  - css
  - sass
  - scss
---
Recently I chose to move from vanilla CSS to the syntactically awesome stylesheeets and this has been a great step in my life. It&#8217;s like leaving a klingon which I&#8217;ve had as a girlfriend to date a human or vulcan <img src="http://josephrex.me/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> .

<a href="http://sass-lang.com" target="_blank">Team-Sass</a> provided a style guide for SASS concerning how we can name our variables for colors. A basic variable naming should be as it is on <a href="http://sass-lang.com/styleguide/color/" target="_blank">http://sass-lang.com/styleguide/color/</a> where all the colors have their names as variables like so:

<pre class="lang:sass decode:true">$hopbush: #c69
$bouquet: #b37399
$venus: #998099
$patina: #699
$nebula: #d2e1dd
$dawn-pink: #f2ece4
$wafer: #e1d7d2
$iron: #dadbdf
$regent-grey: #808c99
$pale-sky: #6b717f
$midnight-blue: #036
$light-green: #98cbad</pre>

rather than like this

<pre class="lang:default decode:true">$companycolor: #c69
$companybackground: #b37389
$usersborder: #699</pre>

Making it like the second example below only makes you prove an irrelevance of SASS like those that rant about the irrelevance of CSS pre-processors.

<a href="http://webdesign.tutsplus.com/tutorials/quick-tip-name-your-sass-variables-modularly--webdesign-13364" target="_blank">This article</a> by <a href="http://tutsplus.com" target="_blank">tutsplus</a> teaches on how you can create better variable names.

One of SASS awesome features that I cherish besides the wonders of mixins, inheritance, loops, and the other most lauded features of SASS is its rgba().

It&#8217;s syntax is

<span class="lang:sass decode:true  crayon-inline ">rgba($color, $alpha)</span>

This way, it&#8217;s not limited to just rgb() values for the colors but it converts even hexadecimal colors to RGB for its RGB values

I think everyone that&#8217;s not taking advantage of what these pre-processors have to offer is missing out of a lot