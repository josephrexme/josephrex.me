---
title: Moving from Indented Sass to Scss
author: Joseph Rex
layout: post
comments: true
permalink: /moving-from-indented-sass-to-scss/
categories:
  - web
---
As soon as I knew about pre-processors, I wanted to test them so bad then I stumbled upon <a href="http://sass-lang.com" target="_blank">Sass website</a>. Syntactically awesome they said? I totally love anything with awesome attached to it because I feel I'm awesome (especially around opposite genders :D).

I program in python and even though strict indentations may be a pain, that pain has become my honey. I fell in love with the indented Sass <a href="http://sassnotsass.com/" target="_blank">(not SASS)</a>. I love checking out <a href="https://twitter.com/thebabydino" target="_blank">Ana Tudor </a>and <a href="https://twitter.com/HugoGiraudel" target="_blank">Hugo Giraudel'</a>s works. A lot more awesome people like <a href="http://twitter.com/codingdesigner" target="_blank">Mason Wendell</a> who created <a href="http://github.com/Team-Sass/breakpoint" target="_blank">breakpoint </a>(a compass extension I can not do without). All these great people in the community have once used the indented Sass but now, they all write SCSS.
<!--more-->

> Breakpoint itself was written in SCSS even though I could use it in Sass

SCSS is also Sass. If that's confusing see this <a href="http://www.sitepoint.com/whats-difference-sass-scss/" target="_blank">article by Hugo</a>.

One great advantage of SCSS is that it is so similar to CSS and a CSS document passes as a SCSS document but it doesn't always work vice-versa. This makes it easy for people that are new to pre-processors to easily deal with it.If it's so easy, why did I choose the indented style? I wouldn't make excuses that SCSS hadn't been in existence when I started writing pre-processors because they were and I wasn't so early to the party. I only felt indented CSS will be cool. Without braces and semi-colon, my code was shorter, sweeter, and more pleasing to my eye even though regular CSS guys couldn't figure out what was going on whenever I was styling my websites. You can see the line differences in the header image above

{% image sass2scss.png alt="sass to scss" class="head-image" %}

The image shows my text editor while I was switching from Sass to SCSS but it didn't just happen as easy as it appears there. First I had to change all the files with .sass extension to .scss in my current project and I had that done with this little python script

{% highlight python %}
import os,glob
for file in glob.glob("*.sass"):
  os.rename(file, file[:-4] + 'scss')
{% endhighlight %}

Just that little code did the trick for me but it had to be in the same directory as my sass files. Next step was using <a href="http://sass2scss.com" target="_blank">sass2scss.com</a> which was a good service for me converting my sass files neatly to scss.

I have chosen to change and leave the indented format which had become more poison because the community of Sass has more people writing in the SCSS format. This means I don't have to convert every awesome mixin to my own indented format, I'm rest assured I can work with any extensions (although sass still works fine with scss written extensions). I usually have a _external mixin which is where I place styles from javascript plugins I use and I've had to convert them to my sass format back then. Although, I still do some refactoring making them inherit (@extend) where neccessary, using the nesting, and the other little Sass benefits, but it is less stress as their CSS already passes as SCSS.