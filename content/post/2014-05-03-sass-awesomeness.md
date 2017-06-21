---
author: Joseph Rex
comments: true
date: 2014-05-03T00:00:00Z
title: Oh Sass! How awesome is it gonna get
url: /sass-awesomeness/
tags:
  - css
  - sass
  - web
---

I started writing Sass not too long ago and it has been one of the best experiences I've had. Sass (Syntatically Awesome Stylesheet) is just as awesome as the name sounds.

Sass is a CSS predecessor that gives smart designers a lot more flexibility with the styling. New features are being added to Sass and with contributions of the Google team, it's getting even faster than you can imagine. This [talk by Chris Eppstein][1] reveals the work in progress.
<!--more-->

Some of the common things that can be done with Sass are

#### VARIABLES

{{< highlight css >}}
$color: #ff0000;
.warning
    color: $color
{{< / highlight >}}

#### MIXINS

{{< highlight css >}}
=border-radius($radius)
    -webkit-border-radius: $radius
    -moz-border-radius:    $radius
    -ms-border-radius:     $radius
    -o-border-radius:      $radius
    border-radius:         $radius

.object
     +border-radius(5px)
{{< / highlight >}}

And that's a sweet way to defeat repetition of vendor prefixes.

#### Extend (Inheritance)

{{< highlight css >}}
.message
        border: 1px solid #ccc
        padding: 10px
        color: #333

.success
        @extend .message
        border-color: green
{{< / highlight >}}

For most of the new features, Sass3 (SCSS) is used.

#### @each loop

{{< highlight css >}}
@each $alert in success, warning, error{
  .#{$alert}-display {
    background-image: url('/images/#{$alert}.png');
  }
}
{{< / highlight >}}

Thanks to [Ben Frain][2], I learnt about maps from [his blog][3].

You see how he had applied the @each loop in that article to handle a json encoded data by making use of maps this way

{{< highlight css >}}
// Map
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
{{< / highlight >}}

There's more to play with on Sass, @while loops, @for loops, @if statements, mathematical operations, and more. Head over to the <a href="http://sass-lang.com/documentation/file.Sass_REFERENCE.html" target="_blank">Sass documentation</a> to see more of them and join me in rocking this world of Sass.

Thinking why you may not need Sass if you can just write your CSS? Check out this <a href="http://css-tricks.com/video-screencasts/132-quick-useful-case-sass-math-mixins/" target="_blank">screencast</a> on some use cases by Chris Coyier

 [1]: https://www.youtube.com/watch?v=-ZJeOJGazgE
 [2]: http://benfrain.com/
 [3]: http://benfrain.com/using-lists-with-maps-in-sass-3-3
