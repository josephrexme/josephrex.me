---
author: Joseph Rex
comments: true
date: 2014-07-23T00:00:00Z
title: Using Frontend assets the right way on Laravel and other Frameworks:Bower
url: /using-frontend-assets-the-right-way-on-laravel-and-other-frameworksbower/
tags:
  - frontend
  - laravel
---

Non laravel users are getting intimidated with the unending trend of Laravel discussions everywhere they go :)

Laravel is an awesome back-end framework that has attracted a lot of PHP developers including the Professionals like Jeffrey Way who makes awesome videos on [Laracast][1] (Netflix for Developers).
<!--more-->

I do front-end and back-end development so I care about every bit of my current project and it's best performance.

Sometimes you need the front-end frameworks like Bootstrap not because you like bootstrap ( I don't ) but because some preceding developer had used its classes on the front-end pages and you don't want to go through the stress of changing all that. I had to download bootstrap but I hate to manually download stuffs from the internet so I used composer which Laravel provides.

Composer stores its packages in vendor/ directory which isn't available to public access so you have to move downloaded front-end packages like bootstrap to public/packages/ . This was a bit of stress too. I wouldn't say I'm lazy but I love to do things the easiest and the best way.

With the large noise on <a href="http://bower.io" target="_blank">bower</a> around the web community I never gave attention to know what it's meant for. Recently I took a closer look and found out it is the man. There is a large number of available frameworks, plugins, and tools available with bower when you do:

> bower install package

If you're unsure of which packages are available with bower, <a href="http://bower.io/search/" target="_blank">search for what you need.</a> With this method, I make my bower install command in my public/ folder and the packages are stored in a public/bower_components/ directory.

At any point, some of this packages may be updated by their vendors and I can always run a bower update against them. For this reason, I wouldn't take my bower components out of the bower\_components folder and store in a separate assets folder. I think and I've heard that it is a better practice to link to them in our scripts from the bower\_components folder.

 [1]: https://www.debian.org/News/2014/20140424
