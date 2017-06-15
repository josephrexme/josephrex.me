---
author: Joseph Rex
comments: true
date: 2014-12-05T00:00:00Z
title: Adding a break statement to laravel4 blade templating
url: /adding-a-break-statement-to-laravel4-blade-templating/
tags:
  - laravel
  - PHP
---

It's been quite long since I had to develop with laravel4 but in my active days, I leveraged blade templating in my views. View files have less logic but then we have to perform simple loop operations and conditional statements. Blade provides @if, @endif, @foreach, @endforeach. Well, I wasn't satisfied with that because I had a lot cases to break my loop. This was my solution

If you have a helpers file that extends start/global.php you can add the following to extend blade
<!--more-->

{{< highlight php >}}
<?php
Blade::extend(function($value)
{
    return preg_replace('/(\s*)@break(\s*)/', '$1<?php break; ?>$2', $value);
});
{{< / highlight >}}

I always recommend having the separate helpers file. If you think other wise, then you can just drop that in your global.php file.

That makes @break available for use in your view files.

### Update (12/07/2014)

I found a <a href="http://stackoverflow.com/questions/21532488/how-to-extend-laravel-blade-functionality-and-add-break-and-continue-support" target="_blank">solution on stackoverflow</a> that handles both @break and @continue. You may want to update to this

{{< highlight php >}}
<?php
Blade::extend(function($value)
{
  return preg_replace('/(\s*)@(break|continue)(\s*)/', '$1<?php $2; ?>$3', $value);
});
{{< / highlight >}}

&nbsp;
