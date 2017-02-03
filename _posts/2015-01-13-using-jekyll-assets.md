---
title: Using Jekyll Assets
author: Joseph Rex
layout: post
comments: true
permalink: /using-jekyll-assets/
categories:
  - blogging
tags:
  - jekyll
  - compass
  - breakpoint
---
{% image jekyll_assets.jpg class="head-image" alt="jekyll assets" %}

I've always enjoyed all the experience with sprockets and the whole of the assets pipeline including how it allows me use compass just by having it in my Gemfile. On my quest for seeking ways to use compass properly with my jekyll blog, I came across [a blog][1] suggesting a hacky way of using compass with jekyll. The blog post had referenced this [gist][2] which referenced [another gist][3]. I followed this for a bit till I hit a stumbling block. The method was fine from the start. I had to use the following plugin:
<!--more-->

{% gist parkr/2874934 %}

### What is wrong with this technique?
Since we want to write our custom CSS with this, this will mostly define the site layout, considering that the main.css in the css/ folder uses the `_layout.scss`, `_base.scss`, and `_syntax-highlighting.scss`. We wouldn't be taking it out of the HTML but instead, we will add an extra stylesheet to define most of our layouts. At this point, the `_layout.scss` could have been scraped. This will cause for an extra HTTP request. One of my reasons for leaving WordPress was the fact that I couldn't manage all my CSS files and make them single, or rather, it was a pain for me to achieve.

With further hacks, you can get it all to be fine with a single HTTP request on stylesheet but that'll just be too much and required if there are no better alternatives.

### Jekyll Assets to the rescue
Not long after, I found [jekyll-assets][4] which works so similar to the [rails asset pipeline][5]. As a rails developer, I know how good assets pipeline as been to me in my projects. Here are few things I particularly love about it:

#### extra digest on assets
app.css becomes something like `app-623b9d195371e35e001b7443cacf426c.css`. As we implement HTTP caching, we can bust caches just by modifying the contents of this files, thus changing the digest which gives a different file to be fetched for cache again. We don't need to do the app.css?v=1 kind of cache busting technique. This is just so comfortable and you don't even to bother about it as it handles it nicely for you

#### assets tag extensions on liquid
You have the following tags at your disposal to extend liquid tags and reference.
{% highlight html %}
{% raw %}
<!-- Liquid tag -->
{% stylesheet app.css %}
<!-- Generated HTML -->
<link rel="stylesheet" href="/assets/app-623b9d195371e35e001b7443cacf426c.css">
{% endraw %}
{% endhighlight %}

{% highlight html %}
{% raw %}
<!-- Liquid tag -->
{% image cat.jpg %}
<!-- Generated HTML -->
<img src="/assets/cat-623b9d195371e35e001b7443cacf426c.jpg">
{% endraw %}
{% endhighlight %}

{% highlight html %}
{% raw %}
<!-- Liquid tag -->
{% javascript app.js %}
<!-- Generated HTML -->
<script src="/assets/app-623b9d195371e35e001b7443cacf426c.js"></script>
{% endraw %}
{% endhighlight %}

not only are those tags available to you, but you can also call `{% raw %}{% asset_path cat.jpg %}{% endraw %}` which fetches the path of the image like `/assets/cat-623b9d195371e35e001b7443cacf426c.jpg` in places you may need it.
<hr>
After much excitement on using this, you may face another problem of not having your blog generated when you push to github (if you host with github pages). This is because github pages run your jekyll blog on safe mode which disables the use of plugins with a [few exceptions][6].

When I experienced this for the first time, I had to create an [issue][7] which ixti replied by directing me to his blog post on [using jekyll plugins on github pages][8]. The post describes all you need to know.

Just as the blog post provided, github pages also suggests that if you want to use plugins, you can build your blog on your local jekyll installation before pushing. ixti's use of rake tasks make it all magical. All you need to get it up in the end is

{% highlight text %}
rake publish
{% endhighlight %}

[1]: http://davidpots.com/blog/jekyll-github-pages-compass/
[2]: https://gist.github.com/davidpots/5853188
[3]: https://gist.github.com/parkr/2874934
[4]: https://github.com/ixti/jekyll-assets
[5]: http://guides.rubyonrails.org/asset_pipeline.html
[6]: https://help.github.com/articles/using-jekyll-plugins-with-github-pages/
[7]: https://github.com/ixti/jekyll-assets/issues/122
[8]: http://ixti.net/software/2013/01/28/using-jekyll-plugins-on-github-pages.html
