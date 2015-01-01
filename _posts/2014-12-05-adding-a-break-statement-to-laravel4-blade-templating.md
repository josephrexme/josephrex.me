---
title: Adding a break statement to laravel4 blade templating
author: Joseph Rex
layout: post
permalink: /adding-a-break-statement-to-laravel4-blade-templating/
categories:
  - web
tags:
  - blade
  - laravel
format: aside
---
It&#8217;s been quite long since I had to develop with laravel4 but in my active days, I leveraged blade templating in my views. View files have less logic but then we have to perform simple loop operations and conditional statements. Blade provides @if, @endif, @foreach, @endforeach. Well, I wasn&#8217;t satisfied with that because I had a lot cases to break my loop. This was my solution

If you have a helpers file that extends start/global.php you can add the following to extend blade

<pre class="lang:php decode:true ">Blade::extend(function($value)
{
    return preg_replace('/(\s*)@break(\s*)/', '$1&lt;?php break; ?&gt;$2', $value);
});</pre>

I always recommend having the separate helpers file. If you think other wise, then you can just drop that in your global.php file.

That makes @break available for use in your view files.

### Update (12/07/2014)

I found a <a href="http://stackoverflow.com/questions/21532488/how-to-extend-laravel-blade-functionality-and-add-break-and-continue-support" target="_blank">solution on stackoverflow</a> that handles both @break and @continue. You may want to update to this

<pre class="lang:php decode:true ">Blade::extend(function($value)
{
  return preg_replace('/(\s*)@(break|continue)(\s*)/', '$1&lt;?php $2; ?&gt;$3', $value);
});</pre>

&nbsp;