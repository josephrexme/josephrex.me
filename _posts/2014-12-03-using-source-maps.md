---
title: Using source maps
author: Joseph Rex
layout: post
comments: true
permalink: /using-source-maps/
categories:
  - web
tags:
  - frontend
  - sass
  - scss
---
{% image mappings.png class="head-image" alt="source maps" %}

The web browser inspector plays a good role when debugging CSS. However, with the widespread of pre-processors now, we are faced with a challenge of debugging our CSS. Using a pre-processor like Sass, when you have your output style to be expanded or nested, this may not be much of a problem as you will almost get accurate debugging lines except if those lines had been separated by variables and mixins within your pre-processor stylesheet. In my case, I use the compressed (minified) output and I believe a lot of other developers do this to boost their pagespeed. This way, the whole of your compiled CSS stylesheet is on a single line and if you will try to debug for a line number, you will always find rule on line 1.

From Sass 3.3, we can compile our Sass adding the -sourcemap argument to create source maps. Source maps are css.map files that maps our CSS styles to our pre-processor code such that when we inspect element (in chrome browsers), we can see the exact line numbers in our pre-processor stylesheet. To read more about Sourcemaps. <a title="Source maps" href="https://developer.chrome.com/devtools/docs/css-preprocessors#toc-how-css-source-maps-work" target="_blank">Google have it in their pre-processor docs</a>.

Source maps is not just limited to CSS and its pre-processor. It also has its JS implementations that helps us work with it when using minified JS files. <a href="https://twitter.com/ryanseddon" target="_blank">Ryan Seddon</a> speaks about it <a title="Javascript sourcemaps" href="http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/" target="_blank">on HTML5 rocks</a>.

Since I use compass, I didn't want to have to go back to compiling sass manually when I have the awesome \`compass watch\`. So I did a little look up for how to use sass maps from within compass and I found <a href="https://chillco.com/blog/setting-sass-and-compass-source-maps" target="_blank">this article</a>. Sweet enough, all I have to do is append my config.rb with

{% highlight ruby %}
sourcemaps = true
{% endhighlight %}

I believe other browsers will bring support for this in future. This remains one of the reasons I prefer chrome dev tools for my front-end debugging.