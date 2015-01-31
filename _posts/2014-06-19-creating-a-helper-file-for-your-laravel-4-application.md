---
title: Creating a helper file for your Laravel 4 application
author: Joseph Rex
layout: post
comments: true
permalink: /creating-a-helper-file-for-your-laravel-4-application/
categories:
  - web
tags:
  - frameworks
  - laravel
  - PHP
---
At some point we will like to define our own unique functions even with all the awesome packages and inbuilt functions of laravel. Coming from a framework like codeigniter, you may expect to find a helpers directory in laravel but there's no such thing. To create your Laravel helper, you can open the `app/start/global.php` file and add any new functions you want at the bottom.  
Doing this however will mess up your global.php code. The best approach to this from my perspective will be to require a separate file from the bottom of that file and add all your functions to the new file. In my case, I decided to create a helpers.php file in my app directory and then include this line

{% highlight php %}
require app_path().'/helpers.php';
{% endhighlight %}

at the bottom of global.php. As seen in the folder, the filters.php file had been included this way too.  
Now you can start adding your functions to the helpers.php file created in the app/ directory.

I recently came across another approach to this by [Mack Hankins][1] on this [blog post][2].  
Now you have two choices, you can pick the one that feels best for you

 [1]: https://twitter.com/mackhankins
 [2]: http://www.mackhankins.com/blog/laravel/defining-your-own-helper-classes-in-laravel-4