---
title: A grid framework from Susy Part 1
author: Joseph Rex
layout: post
comments: true
permalink: /a-grid-framework-from-susy/
---
{% image susy.png class="head-image" alt="Susy" %}

[Susy][1] is a great grid framework and something I really love about it is the idea of grid on demand rather than having to use frameworks just as Chris Coyier quoted:

> I like the idea of grids-on-demand, rather than a strict framework.

Susy is really broad and I haven't explored half of its awesomeness. However, the very basic part in which I've played around is what my demonstration will be based on.

We really don't want third-party frameworks for grids because we think it is much load to be loaded over HTTP request. This is why we have chosen Susy. A very simple susy setting is:

{% highlight css %}
$susy: (columns: 12, gutters: 1 / 4);
{% endhighlight %}

With this set, we can use the container and span mixins. container(100%) on the parent element i.e row in bootstrap terms. and the span(0%) where span is the percentage out of 100 for a grid to be fit within the 12 column grid.

Using the [Attribute Modular CSS][2], we can create a little framework to use within our apps having grids from column 1 to 12 represent with a data-grid attribute. I've chosen to use data attributes for validation purposes. If you are indifferent about validation, you can adopt some of the primary styles from AMCSS.

AMCSS has a grid framework from flexbox where they used am-Grid where fractions were used to derive grid values. In order to stick with the regular convention of numbers from 1 to 12, the little framework uses 1 to 12 for its grids. To achieve this, it takes only 4 lines of code in your Sass file and you're done. Here it is:

{% highlight css %}
@for $i from 1 through 12 {
    [data-grid="#{$i}"]{
        @include span( 100% * ( $i / 12% ) - 2% );
    }
}
{% endhighlight %}

With that set, we can use grids like so

{% highlight html %}
<div data-grid="12">
<div data-grid="6"><div data-grid="6">
<div data-grid="4"><div data-grid="4"><div data-grid="4">
{% endhighlight %}

[1]: http://susy.oddbird.net/
[2]: https://amcss.github.io/
