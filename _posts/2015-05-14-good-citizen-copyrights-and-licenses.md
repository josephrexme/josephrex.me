---
title: 'Good Citizen: Copyrights and Licenses'
author: Joseph Rex
layout: post
comments: true
permalink: /good-citizen-copyrights-and-licenses/
---

A lot of us follow most legal laws to be remain good citizens and mostly stay out of trouble. The best people are those who follow these laws because they feel it's the right thing to do, and not just because they may get arrested for doing otherwise.
In the Software development industry, there are licenses and copyright laws. These laws are ignored by many and I used to be one.
<!--more-->

While working on a rails project recently, I had upgraded my version of rails from 4.1.7 to 4.2. In the process, my uglifier gem had [upgraded][1] to version 2.7.1 and that was cool. I love updated stuff!

The one thing about the uglifier update I was not pleased with initially was its [copyright comment preservation][2]. Uglifier started allowing comments that had a bang to remain unminified and this kept giving me a warning from my rule based metric that JavaScript is not minified because of some whitespaces sold off with the copyright comment lines.

{% highlight javascript %}
/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */
{% endhighlight %}

I wanted nothing more than to get rid of this and my resort was to edit my production configuration from 

{% highlight ruby %}
config.assets.js_compressor = :uglifier
{% endhighlight %}

to

{% highlight ruby %}
config.assets.js_compressor = Uglifier.new(output: { comments: :none })
{% endhighlight %}

At this point, I'm including jquery2 with sprockets and [sizzlejs][3] with it.

{% highlight javascript %}
//= require jquery2
{% endhighlight %}

With a change in the production configuration, I got my JS file smoothly minified the way I want it and then I started writing this blog post to tell anyone else trying to get rid of it that this is how I've gone about it. Then I read [this tldr MIT license][4]  which was an eye opener for me. I've taken licenses and copyrights with lethargy for so long and this was a turn-around for me and I needed to get back the copyrighted JQuery in my app and at the same time keep most of it minified. Luckily there's a minified jquery2 that can be included with sprockets

{% highlight javascript %}
//= require jquery2.min
{% endhighlight %}

That has a single-line copyright with less white-space and it was my go.

{% highlight javascript %}
/*! jQuery v2.1.3 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
{% endhighlight %}

If you're privileged to use a software or product for free. For all its worth which may be inclusion of License and Copyrights, we'll be good software community citizens by keeping them.


[1]: https://github.com/gneatgeek/uglifier/commit/8816c85ee0dca0dd1b9b22c7e5ea301c903362a9#diff-0a1bbe5d453e58345ac2d708f80701b0L240
[2]: https://github.com/lautis/uglifier/pull/78
[3]: http://sizzlejs.com/
[4]: https://tldrlegal.com/license/mit-license