---
title: 'Good son, bad father: I&#8217;m leaving PHP but I love Laravel'
author: Joseph Rex
layout: post
permalink: /good-son-bad-father-im-leaving-php-but-i-love-laravel/
categories:
  - programming
tags:
  - frameworks
  - laravel
  - PHP
  - web
---
[<img class="aligncenter size-full wp-image-194" src="http://josephrex.me/wp-content/uploads/2014/08/parents-need-to-parents-not-friends.png" alt="parents-need-to-parents-not-friends" width="600" height="314" />][1]

PHP has a really shallow learning curve. It&#8217;s easy for a 8 year old to pick it up and start messing around with it. This is good and I love it about Python as well. However, PHP has been known to have a lot of flaws, one of the major reasons being because it was not built as a functional programming language but rather, just a Hypertext pre-processor. It was meant to just automate the behaviour of HTML. Around 2005, OOP was introduced to PHP and it made PHP developers feel among the big boys of the web.

However, there are still some things wrong about how it behaves in its OOP. For example when using namespaces, the following still seems wrong to me

<pre class="lang:php decode:true ">&lt;?php
namespace Joseph;

$object = new \Rex\say_hello();</pre>

I needed the preceding backward slash to bring me back to the global namespace. But when using the use statement,

<pre class="lang:php decode:true ">&lt;?php
namespace Joseph;

use Rex\say_hello();</pre>

Everything is wrong about this. I have friends that hate me for being a PHP developer but I chose to stick with it anyway.

While I was contemplating to leave PHP earlier before now, I had seen <a title="@ircmaxell" href="http://twitter.com/ircmaxell" target="_blank">Anthony Ferrara</a>&#8216;s <a title="PHP sucks but I like it" href="http://blog.ircmaxell.com/2012/04/php-sucks-but-i-like-it.html" target="_blank">blog post</a> &#8220;PHP sucks! but I like it&#8221; which convinced me to still stick with it. It was a response to the popular post by <a href="http://eev.ee/" target="_blank">Eevee</a> on <a href="http://eev.ee/blog/2012/04/09/php-a-fractal-of-bad-design/" target="_blank">&#8220;PHP:A Fractal of Bad design&#8221;</a>. Anthony said it&#8217;s easy to get help with PHP. At the time, I was gullible to go with it.

When I think of it now, It&#8217;s easy to get help on whatever you need if you have internet. On the Freenode IRC, I went ahead to count the present number of users at this time <span style="color: #888; font-size: 11px; background: rgba(255, 255, 255, .5); padding: 5px; border-radius: 10px; margin: 0 5px;">12/08/2014</span> which is the date of this article, and then I checked the users on the following channels:

> ##php  <span style="color: red;">639 users</span> (including bots),
> 
> #ruby <span style="color: red;">885 users</span> (including bots)
> 
> #node.js <span style="color: red;">1299 users</span> (including bots)
> 
> #python <span style="color: red;">1469 users</span>  (including bots)

Doesn&#8217;t seem like PHP has much help anymore. The need for PHP developers by organizations has plummeted.

Although, the PHP community still have awesome frameworks like Laravel and Symfony where you can use composer and other cool stuff. But that&#8217;s for you the coder to think about. An average tech savvy looking to hire a developer for his new idea of a web app will ask other entrepreneurs about what&#8217;s best for development and they&#8217;ll mention Ruby-on-Rails, Python, Node. After which he starts searching for developers into those. It may take a while to convince them that there is actually a good part to the PHP that sounds evil (or never gets heard of).

Someone may come on the comments to rant that sites like Facebook use PHP. There are still big websites and CMS still making use of PHP but Facebook has been using its <a href="http://hacklang.org/" target="_blank">in-house developed language called Hack</a> since February 2014. It&#8217;s commonly described as <a href="http://www.phpclasses.org/blog/post/230-Hack-Language-is-All-that-PHP-Should-Have-Been.html" target="_blank">&#8220;All that PHP should have been&#8221;</a>.

Facebook had to leave because they had their own better JIT runtime compiler <a href="http://hhvm.com/" target="_blank">HHVM</a> which helps them a lot better and faster. <a href="http://twitter.com/rasmus" target="_blank">Rasmos Lerdorf</a> was faced with <a href="http://www.sitepoint.com/rasmus-lerdorf-php-frameworks-think-again/" target="_blank">a question on how PHP could be sped up and his response was &#8220;Well, it can&#8217;t be&#8221;</a>. He admitted! Now why should Facebook keep tweaking what isn&#8217;t getting better. They just had to get their own stuff.

This is not about criticizing PHP. Besides, I&#8217;m just a 21st century programmer. I don&#8217;t have a 10 years or 20 years programming experience but I like to do what I do right. I am really poor at ASM even as I&#8217;ve been reading some books on x86. If you are looking for critiques against PHP, the following sites can be of help

  * <a href="http://www.phpwtf.org/" target="_blank">http://www.phpwtf.org/</a>
  * <a href="http://phpsadness.com/" target="_blank">http://phpsadness.com/</a>
  * <a href="http://quaxio.com/wtf/php.html" target="_blank">http://quaxio.com/wtf/php.html</a>

In <a href="http://readwrite.com/2014/08/11/why-learn-php#comment-1538686844" target="_blank">my comment</a> to <a href="http://readwrite.com/2014/08/11/why-learn-php" target="_blank">this post</a> on &#8220;why learn PHP&#8221;, I was soliciting for Laravel as a PHP framework.

**Conclusion:**

I don&#8217;t at all hate PHP as I&#8217;ve said earlier, it&#8217;s not like something you should not do. It&#8217;s just something you may not get satisfied with if you like to get the best results. Simply because I&#8217;m seeking to do more projects I&#8217;ll be happy with myself about, I&#8217;ll be dropping PHP after my current project. Well, I can&#8217;t leave it totally. I will still be contributing to the open source Laravel packages I&#8217;ve forked and I will have to touch it sporadically.

**References:**

  * <a href="http://blog.ircmaxell.com/2012/04/php-sucks-but-i-like-it.html" target="_blank">http://blog.ircmaxell.com/2012/04/php-sucks-but-i-like-it.html</a>
  * <a href="http://www.phpclasses.org/blog/post/230-Hack-Language-is-All-that-PHP-Should-Have-Been.html" target="_blank">http://www.phpclasses.org/blog/post/230-Hack-Language-is-All-that-PHP-Should-Have-Been.html</a>
  * <a href="http://www.sitepoint.com/rasmus-lerdorf-php-frameworks-think-again/" target="_blank">http://www.sitepoint.com/rasmus-lerdorf-php-frameworks-think-again/</a>
  * <a href="http://readwrite.com/2014/08/11/why-learn-php" target="_blank">http://readwrite.com/2014/08/11/why-learn-php</a>

 [1]: http://josephrex.me/wp-content/uploads/2014/08/parents-need-to-parents-not-friends.png