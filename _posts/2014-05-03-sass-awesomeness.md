---
title: Oh Sass! How awesome is it gonna get
author: Joseph Rex
layout: post
permalink: /sass-awesomeness/
categories:
  - web
tags:
  - css
  - sass
  - scss
  - web
---
I started writing SASS not too long ago and it has been one of the best experiences I&#8217;ve had. Sass (Syntatically Awesome Stylesheet) is just as awesome as the name sounds.

SASS is a CSS predecessor that gives smart designers a lot more flexibility with the styling. New features are being added to SASS and with contributions of the Google team, it&#8217;s getting even faster than you can imagine. This [talk by Chris Eppstein][1] reveals the work in progress.

Some of the common things that can be done with SASS are

#### VARIABLES

<pre class="lang:sass decode:true" title="variables">$color: #ff0000;
.warning
    color: $color</pre>

#### MIXINS

<pre class="lang:sass decode:true">=border-radius($radius)
    -webkit-border-radius: $radius
    -moz-border-radius:    $radius
    -ms-border-radius:     $radius
    -o-border-radius:      $radius
    border-radius:         $radius

.object
     +border-radius(5px)</pre>

And that&#8217;s a sweet way to defeat repetition of vendor prefixes.

#### Extend (Inheritance)

<pre class="lang:sass decode:true" title="Sass inheritance">.message
        border: 1px solid #ccc
        padding: 10px
        color: #333

.success
        @extend .message
        border-color: green
</pre>

For most of the new features, SASS3 (SCSS) is used.

#### @each loop

<pre class="lang:default decode:true">@each $alert in success, warning, error{
  .#{$alert}-display {
    background-image: url('/images/#{$alert}.png');
  }
}
</pre>

Thanks to [Ben Frain][2], I learnt about maps from [his blog][3].

You see how he had applied the @each loop in that article to handle a json encoded data by making use of maps this way

<pre class="lang:sass decode:true" title="maps and @each loop">// Map
$colourList: (
    1  : (#000000, #000011), 
    2  : (#000011, #000022), 
    3  : (#000022, #000033), 
    4  : (#000033, #000044), 
    7  : (#000044, #000055), 
    8  : (#000055, #000066), 
    9  : (#000066, #000077), 
    10 : (#000077, #000088), 
);
// @each loop
@each $colourList, $keyNumber in $colourList {
    $background: nth($keyNumber, 1);
    $lowlight: nth($keyNumber, 2);
    header {
        .section_#{$colourList} & {
            background-color: $background;
            border-right: 2px dotted $lowlight;
        }
    }
}
</pre>

There&#8217;s more to play with on SASS, @while loops, @for loops, @if statements, mathematical operations, and more. Head over to the <a href="http://sass-lang.com/documentation/file.SASS_REFERENCE.html" target="_blank">SASS documentation</a> to see more of them and join me in rocking this world of SASS.

Thinking why you may need SASS if you can just write your CSS? Check out this <a href="http://css-tricks.com/video-screencasts/132-quick-useful-case-sass-math-mixins/" target="_blank">article with video</a> on some use cases by Chris Coyier

 [1]: https://www.youtube.com/watch?v=-ZJeOJGazgE
 [2]: http://benfrain.com/
 [3]: http://benfrain.com/using-lists-with-maps-in-sass-3-3