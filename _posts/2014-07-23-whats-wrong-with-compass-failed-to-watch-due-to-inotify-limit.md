---
title: "What's wrong with Compass? Failed to watch due to inotify limit"
author: Joseph Rex
layout: post
comments: true
permalink: /whats-wrong-with-compass-failed-to-watch-due-to-inotify-limit/
categories:
  - web
tags:
  - compass
  - sass
---
In a [recent article][1], I talked about my OS migration. Changing Operating System is not an easy thing to go through but I went through it anyway. After setting up all I needed, I wanted to resume to my projects ASAP. I downloaded Sass and Compass again and pulled my project from it's repository on an SVN. I tried `compass watch` and I got an error like:

> No space left on device - Failed to watch "…": The user limit on the total number of inotify watches was reached or the kernel failed to allocate a needed resource. (Errno::ENOSPC)

I went on the the #sass channel on FreeNode but couldn't find a solution and compass do not really have an IRC presence. Not too long I found this blog <a href="http://blog.sorah.jp/2012/01/24/inotify-limitation" target="_blank">http://blog.sorah.jp/2012/01/24/inotify-limitation</a> and it was talking about getting that kind of error with dropbox or guardian. I almost took off from the page since I wasn't seeing anything related to compass. I had a second thought and just went through the article.

It was just what I wanted. I ran

`$ cat /proc/sys/fs/inotify/max_user_watches `and it gave me 8192. This wasn't enough so I changed it to 1000 like so:

`echo 100000|sudo tee /proc/sys/fs/inotify/max_user_watches Password: 100000`

but this was temporary. On the next boot of my machine, I started getting the error again and then I had to change it permanently by editing `/etc/sysctl.conf` and append the following to its bottom `fs.inotify.max_user_watches=100000` Now I'm back to doing some Sass magic

[1]: {% post_url 2014-07-23-the-divorce-comeback-debian-and-matriux %}