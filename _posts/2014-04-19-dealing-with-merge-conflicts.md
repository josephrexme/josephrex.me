---
title: Dealing with merge conflicts
author: Joseph Rex
layout: post
comments: true
permalink: /dealing-with-merge-conflicts/
categories:
  - git
tags:
  - git
  - meld
---
Recently, I started using git and mercury for version control. I've never really used any other version control system before these two. For most of my recent projects, I've chosen to make more use of git. Git is a really awesome version control system as I've heard from a lot of Pros coming from other version control system like Subversion (SVN).
<!--more-->

I just saw this article by Tobias Günther on[ CSS-Tricks][1] and it was really detailed and interesting, explaining everything about merge conflicts and  how we fix them. Tobias works for[ Tower][2] where they built the git-tower. In the article he made demonstrations with <a href="http://www.kaleidoscopeapp.com/" target="_blank">Kaleidoscope</a> which is a diff / merge  client for Mac OS X.

As a Linux user, I thought of how I could make use of a merge tool like that to save me the stress of manually cleaning up merges, then I saw this [comment][3] by [Richard Ayotte][4] which made made me check out <a href="http://meldmerge.org" target="_blank">meld merge</a>. He also talked about <a href="https://wiki.gnome.org/Apps/Gitg/" target="_blank">Gitg</a> which I didn't try out.

{% image meld-merge.png class="head-image" alt="Meld on my Debian Linux" %}

It's barely a day since I've been using it and it has helped me come a long way on my current project. I'll just gather up all the diff / merge tools I'm aware of for various OS below.

  * <a href="http://meldmerge.org" target="_blank">Meldmerge</a>  (Linux &#8211; *stable*, Windows and OS &#8211; *unstable*)
  * <a href="https://wiki.gnome.org/Apps/Gitg/" target="_blank">Gitg</a> (Linux)
  * <a href="http://www.kaleidoscopeapp.com/" target="_blank">Kaleidoscope</a> (OS X)
  * <a href="http://www.araxis.com/merge" target="_blank">Araxis merge</a> (Windows and OS X)
  * <a href="http://www.scootersoftware.com/" target="_blank">Beyond compare</a> (Windows)
  * <a href="http://www.perforce.com/product/components/perforce-visual-merge-and-diff-tools" target="_blank">P4merge</a> (Linux, OS X, and Windows)
  * <a href="http://www.deltopia.com/compare-merge-sync/macosx" target="_blank">DeltaWalker</a> (OS X)
  * <a href="http://winmerge.org/" target="_blank">WinMerge</a> (Windows)

Try them out and they'll improve your projects version control just like they did mine.

 [1]: http://css-tricks.com/deal-merge-conflicts-git/
 [2]: http://www.git-tower.com/
 [3]: http://css-tricks.com/deal-merge-conflicts-git/#comment-1579934
 [4]: http://ayottesoftware.com/
