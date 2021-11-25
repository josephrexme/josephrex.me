---
author: Joseph Rex
comments: true
date: 2014-08-12T00:00:00Z
title: 'Good son, bad father: I''m leaving PHP but I love Laravel'
permalink: /good-son-bad-father-im-leaving-php-but-i-love-laravel/
tags:
  - frameworks
  - laravel
  - PHP
  - web
---

PHP has a really shallow learning curve. It's easy for a 8 year old to pick it up and start messing around with it. This is good and I love it about Python as well. However, PHP has been known to have a lot of flaws, one of the major reasons being because it was not built as a functional programming language but rather, just a Hypertext pre-processor.
<!--more-->

It was meant to just automate the behaviour of HTML. Around 2005, OOP was introduced to PHP and it made PHP developers feel among the big boys of the web.

However, there are still some things wrong about how it behaves in its OOP. For example when using namespaces, the following still seems wrong to me

```php
<?php
namespace Joseph;

$object = new \Rex\say_hello();

?>
```

I needed the preceding backward slash to bring me back to the global namespace. But when using the use statement,

```php
<?php
namespace Joseph;

use Rex\say_hello();
?>
```

Everything is wrong about this. I have friends that hate me for being a PHP developer but I chose to stick with it anyway.

While I was contemplating to leave PHP earlier before now, I had seen [Anthony Ferrara][1]'s <a title="PHP sucks but I like it" href="http://blog.ircmaxell.com/2012/04/php-sucks-but-i-like-it.html" target="_blank">blog post</a> "PHP sucks! but I like it" which convinced me to still stick with it. It was a response to the popular post by <a href="http://eev.ee/" target="_blank">Eevee</a> on <a href="http://eev.ee/blog/2012/04/09/php-a-fractal-of-bad-design/" target="_blank">"PHP:A Fractal of Bad design"</a>. Anthony said it's easy to get help with PHP. At the time, I was gullible to go with it.

When I think of it now, It's easy to get help on whatever you need if you have an internet connection. On the Freenode IRC, I went ahead to count the present number of users at this time `12/08/2014` which is the date of this article, and then I checked the users on the following channels:

> \#\#php  <span style="color: red;">639 users</span> (including bots),
> 
> \#ruby <span style="color: red;">885 users</span> (including bots)
> 
> \#node.js <span style="color: red;">1299 users</span> (including bots)
> 
> \#python <span style="color: red;">1469 users</span>  (including bots)

Doesn't seem like PHP has much help anymore. The need for PHP developers by organizations has plummeted.

Although, the PHP community still have awesome frameworks like Laravel and Symfony where you can use composer and other cool stuff. But that's for you the coder to think about. An average tech savvy looking to hire a developer for his new idea of a web app will ask other entrepreneurs about what's best for development and they'll mention Ruby-on-Rails, Python, Node. After which he starts searching for developers into those. It may take a while to convince them that there is actually a good part to the PHP that sounds evil (or never gets heard of).

Someone may come on the comments to rant that sites like Facebook use PHP. There are still big websites and CMS still making use of PHP but Facebook has been using its <a href="http://hacklang.org/" target="_blank">in-house developed language called Hack</a> since February 2014. It's commonly described as <a href="http://www.phpclasses.org/blog/post/230-Hack-Language-is-All-that-PHP-Should-Have-Been.html" target="_blank">"All that PHP should have been"</a>.

Facebook had to leave because they had their own better JIT runtime compiler <a href="http://hhvm.com/" target="_blank">HHVM</a> which helps them a lot better and faster. <a href="http://twitter.com/rasmus" target="_blank">Rasmos Lerdorf</a> was faced with <a href="http://www.sitepoint.com/rasmus-lerdorf-php-frameworks-think-again/" target="_blank">a question on how PHP could be sped up and his response was "Well, it can't be"</a>. He admitted! Now why should Facebook keep tweaking what isn't getting better. They just had to get their own stuff.

This is not about criticizing PHP. Besides, I'm just a 21st century programmer. I don't have a 10 years or 20 years programming experience but I like to do what I do right. I am really poor at ASM even as I've been reading some books on x86. If you are looking for critiques against PHP, the following sites can be of help

  * <a href="http://www.phpwtf.org/" target="_blank">http://www.phpwtf.org/</a>
  * <a href="http://phpsadness.com/" target="_blank">http://phpsadness.com/</a>
  * <a href="http://quaxio.com/wtf/php.html" target="_blank">http://quaxio.com/wtf/php.html</a>

In <a href="http://readwrite.com/2014/08/11/why-learn-php#comment-1538686844" target="_blank">my comment</a> to <a href="http://readwrite.com/2014/08/11/why-learn-php" target="_blank">this post</a> on "why learn PHP", I was soliciting for Laravel as a PHP framework because Laravel is the only reason why I still have some hopes in PHP.

## Conclusion

I don't at all hate PHP as I've said earlier, it's not like something you should not do. It's just something you may not get satisfied with if you like to get the best results. Simply because I'm seeking to do more projects I'll be happy with myself about, I'll be dropping PHP after my current project. Well, I can't leave it totally. I will still be contributing to the open source Laravel packages I've forked and I will have to touch it sporadically.

## References

  * <a href="http://blog.ircmaxell.com/2012/04/php-sucks-but-i-like-it.html" target="_blank">http://blog.ircmaxell.com/2012/04/php-sucks-but-i-like-it.html</a>
  * <a href="http://www.phpclasses.org/blog/post/230-Hack-Language-is-All-that-PHP-Should-Have-Been.html" target="_blank">http://www.phpclasses.org/blog/post/230-Hack-Language-is-All-that-PHP-Should-Have-Been.html</a>
  * <a href="http://www.sitepoint.com/rasmus-lerdorf-php-frameworks-think-again/" target="_blank">http://www.sitepoint.com/rasmus-lerdorf-php-frameworks-think-again/</a>
  * <a href="http://readwrite.com/2014/08/11/why-learn-php" target="_blank">http://readwrite.com/2014/08/11/why-learn-php</a>

 [1]: http://twitter.com/ircmaxell "@ircmaxell"
