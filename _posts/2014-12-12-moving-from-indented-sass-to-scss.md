---
title: Moving from Indented Sass to Scss
author: Joseph Rex
layout: post
permalink: /moving-from-indented-sass-to-scss/
categories:
  - web
---
As soon as I knew about pre-processors, I wanted to test them so bad then I stumbled upon <a href="http://sass-lang.com" target="_blank">Sass website</a>. Syntactically awesome they said? I totally love anything with awesome attached to it because I feel I&#8217;m awesome (especially around opposite genders :D).

I program in python and even though strict indentations may be a pain, that pain has become my honey. I fell in love with the indented Sass <a href="http://sassnotsass.com/" target="_blank">(not SASS)</a>. I love checking out <a href="https://twitter.com/thebabydino" target="_blank">Ana Tudor </a>and <a href="https://twitter.com/HugoGiraudel" target="_blank">Hugo Giraudel&#8217;</a>s works. A lot more awesome people like <a href="http://twitter.com/codingdesigner" target="_blank">Mason Wendell</a> who created <a href="http://github.com/Team-Sass/breakpoint" target="_blank">breakpoint </a>(a compass extension I can not do without). All these great people in the community have once used the indented Sass but now, they all write SCSS.

> Breakpoint itself was written in SCSS even though I could use it in Sass

SCSS is also Sass. If that&#8217;s confusing see this <a href="http://www.sitepoint.com/whats-difference-sass-scss/" target="_blank">article by Hugo</a>.

One great advantage of SCSS is that it is so similar to CSS and a CSS document passes as a SCSS document but it doesn&#8217;t always work vice-versa. This makes it easy for people that are new to pre-processors to easily deal with it.If it&#8217;s so easy, why did I choose the indented style? I wouldn&#8217;t make excuses that SCSS hadn&#8217;t been in existence when I started writing pre-processors because they were and I wasn&#8217;t so early to the party. I only felt indented CSS will be cool. Without braces and semi-colon, my code was shorter, sweeter, and more pleasing to my eye even though regular CSS guys couldn&#8217;t figure out what was going on whenever I was styling my websites. You can see the line differences in the image below

<div id="attachment_448" style="width: 644px" class="wp-caption aligncenter">
  <a href="http://josephrex.me/wp-content/uploads/2014/12/sass2scss.png"><img class="size-large wp-image-448" src="http://josephrex.me/wp-content/uploads/2014/12/sass2scss-1024x485.png" alt="sass to scss" width="634" height="300" /></a>
  
  <p class="wp-caption-text">
    click to enlarge
  </p>
</div>

The image shows my text editor while I was switching from Sass to SCSS but it didn&#8217;t just happen as easy as it appears there. First I had to change all the files with .sass extension to .scss in my current project and I had that done with this little python script

<pre class="lang:default decode:true ">import os,glob
for file in glob.glob("*.sass"):
  os.rename(file, file[:-4] + 'scss')</pre>

Just that little code did the trick for me but it had to be in the same directory as my sass files. Next step was using <a href="http://sass2scss.com" target="_blank">sass2scss.com</a> which was a good service for me converting my sass files neatly to scss.

I have chosen to change and leave the indented format which had become more poison because the community of Sass has more people writing in the SCSS format. This means I don&#8217;t have to convert every awesome mixin to my own indented format, I&#8217;m rest assured I can work with any extensions (although sass still works fine with scss written extensions). I usually have a _external mixin which is where I place styles from javascript plugins I use and I&#8217;ve had to convert them to my sass format back then. Although, I still do some refactoring making them inherit (@extend) where neccessary, using the nesting, and the other little Sass benefits, but it is less stress as their CSS already passes as SCSS.