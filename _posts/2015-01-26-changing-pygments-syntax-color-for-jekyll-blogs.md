---
title: Changing pygments syntax color for jekyll blogs
author: Joseph Rex
layout: post
comments: true
permalink: /changing-pygments-syntax-color-for-jekyll-blogs/
categories:
  - blogging
tags:
  - jekyll
---
{% image syntax-highlight.png class="head-image" %}
Syntax highlighting is one of the great benefits we get from text editors we use in writing code. Besides making the code more readable, it makes me spot errors in my code without a linter. Training on Front-end development has been part of my profession for 2 years and I keep hammering on the fact that my students should make use of a good text editor. This has been a great thing as I find some students with mark-up like this:
<!--more-->

{% highlight html %}
<img src="foo.jpg" alt="foo"
{% endhighlight %} 

Notice how that is void of a closing angle bracket (`>`). A student particularly got fond of leaving those out and the change in syntax colors make me figure that out so quick and gradually, he overcame that error.

If you use jekyll's default confguration, then you have a _sass folder that contains a _syntax-highlighting.scss partial. Since I use the [jekyll-assets]({% post_url 2015-01-13-using-jekyll-assets %}), I have it in assets/stylesheets. This file has contents like below:

{% highlight css %}
.highlight {
    background: #fff;
    @extend %vertical-rhythm;

    .c     { color: #998; font-style: italic } // Comment
    .err   { color: #a61717; background-color: #e3d2d2 } // Error
    .k     { font-weight: bold } // Keyword
    .o     { font-weight: bold } // Operator
    
    ...
}
{% endhighlight %}

The file above is a generated pygments stylesheet only nested within the highlight class.

There are different styles provided by pygments. To view every one of them, you need to have python installed on your box. If you've been using pygments, then you should have already installed the pygments module. Run the following with your interpreter
{% highlight python %}
>>> from pygments.styles import get_all_styles

>>> styles = list(get_all_styles())

>>> styles

{% endhighlight %}

Output on my machine is:
{% highlight python %}
['monokai',
 'manni',
 'rrt',
 'perldoc',
 'borland',
 'colorful',
 'default',
 'murphy',
 'vs',
 'trac',
 'tango',                                                                                                                  
 'fruity',
 'autumn',
 'bw',                                                                                               
 'emacs',
 'vim',
 'pastie',
 'friendly',
 'native']
{% endhighlight %}

You can pick any style from the style options and generate a CSS for it with the `pygmentize` command-line program:

{% highlight text %}
pygmentize -S autumn -f html > style.autumn.css

{% endhighlight %}

I had chosen autumn above. You can choose any other option and the generated CSS will be like:

{% highlight css %}
.c     { color: #998; font-style: italic } // Comment
.err   { color: #a61717; background-color: #e3d2d2 } // Error
.k     { font-weight: bold } // Keyword
.o     { font-weight: bold } // Operator
{% endhighlight %}

We just need to replace the nested selectors in the .highlight class of our _sytnax-highlighting.scss file with the newly produced highlighting style we generated.

Pygments can be used on other static sites as well but the process may be a bit longer than this.
