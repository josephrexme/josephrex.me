---
title: There shall be binaries
author: Joseph Rex
layout: post
permalink: /there-shall-be-binaries/
categories:
  - python
tags:
  - gui
  - pyinstaller
  - pyqt
  - python
  - qt4
  - upx
---
[<img class="aligncenter size-large wp-image-301" src="http://josephrex.me/wp-content/uploads/2014/10/screenshot5-1024x575.png" alt="screenshot5" width="687" height="385" />][1]

There comes a point when your program needs to be distributed to other users. You don&#8217;t want to always have to give every intended user of your program a list of modules or libraries to be installed before they can use your software.

I&#8217;ve found myself developing software with python a lot lately and usually, I like people to check them out. Most times, my target users are Windows OS users. I built my programs but packing them into binaries became the pain in the neck for me.

Thanks to sherafff on the IRC. He got my first required binary done for me from his windows development machine. I&#8217;m no windows user and yet I have to be on the operating system for the target binary while I bundle it. This is no big deal! I have a windows VM.

After sherafff made the first binary for me, I found there were still a lot of program bugs that I had to fix. After fixing this in the source, I needed my binary to be updated again but then I wasn&#8217;t seeing sherafff active. He was on like most IRC users but was always away.

### Taking my decision on what binary builder to use

I&#8217;d always thought of py2exe but it seemed like too much headache for me as a starter. Sherafff had used PyInstaller and said it was cool so I tried reading the docs carefully and I was able to make use of it. My preferred way of running pyinstaller on windows is

<pre class="lang:default decode:true">pyinstaller --noconsole --onefile --upx-dir=. --icon=program.ico program.py</pre>

  * &#8211;icon because I like specifying my icon because I don&#8217;t like the default icon for generated executables
  * &#8211;noconsole because I don&#8217;t need a debugger console being displayed to a human end user
  * &#8211;onefile to get my single file rather than folders with a lot of DLLs (Dynamic Link Libraries)
  * &#8211;upx-dir just to specify where I&#8217;ve downloaded UPX to.

<a href="http://upx.sourceforge.net/#download" target="_blank">Upx</a> helps with compression while the executable is being packed. Pyinstaller integrates finely with upx and that is cool to me. I know py2exe has limitations even as I&#8217;ve not explored it well enough (I should soon). There are other builders that can be used to build my binaries which I also hope to explore soon and they are:

  * py2app
  * cx_Freeze
  * bbFreeze
  * vendorID

While I was being lazy to read the docs and get started with pyinstaller, I also got a heads up on a graphical builder which I think is cool. I haven&#8217;t used it yet but I hope to put it to use in my next project. It is <a href="https://code.google.com/p/gui2exe/" target="_blank">gui2exe</a> which was built with wxpython.

I&#8217;ve only scratched the surface of C programming but I believe in such a compiled language as C, we don&#8217;t have to create executable for Linux as that is what is done after compiling. 0xFEEDBAC had always felt python will ruin me but I love it anyway :D. He said run while you can <img src="http://josephrex.me/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> . Yea after a few more python experiments, I think I will be building most of my desktop applications in C and just make stick to web applications and simple programs with Python.

 [1]: http://josephrex.me/wp-content/uploads/2014/10/screenshot5.png