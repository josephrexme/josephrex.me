---
author: Joseph Rex
comments: true
date: 2014-06-18T00:00:00Z
title: Leveraging Sass for your front-end designs
url: /leveraging-sass-for-your-front-end-designs/
tags:
  - css
  - sass
---

Recently I chose to move from vanilla CSS to the syntactically awesome stylesheeets and this has been a great step in my life. It's like leaving a klingon which I've had as a girlfriend to date a human or vulcan :)

<a href="http://sass-lang.com" target="_blank">Team-Sass</a> provided a style guide for SASS concerning how we can name our variables for colors. A basic variable naming should be as it is on <a href="http://sass-lang.com/styleguide/color/" target="_blank">http://sass-lang.com/styleguide/color/</a> where all the colors have their names as variables like so:
<!--more-->

```scss
$hopbush: #c69
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
$light-green: #98cbad
```

<a href="http://webdesign.tutsplus.com/tutorials/quick-tip-name-your-sass-variables-modularly--webdesign-13364" target="_blank">This article</a> by <a href="http://tutsplus.com" target="_blank">tutsplus</a> teaches on how you can create better variable names.

One of SASS awesome features that I cherish besides the wonders of mixins, inheritance, loops, and the other most lauded features of SASS is its rgba().

It's syntax is

```scss
rgba($color, $alpha)
```

This way, it's not limited to just rgb() values for the colors but it converts even hexadecimal colors to RGB for its RGB values

I think everyone that's not taking advantage of what these pre-processors have to offer is missing out on a lot
