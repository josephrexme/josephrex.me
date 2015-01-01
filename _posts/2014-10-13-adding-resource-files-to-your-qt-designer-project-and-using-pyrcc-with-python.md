---
title: Adding Resource files to your Qt designer project and using pyrcc with python
author: Joseph Rex
layout: post
permalink: /adding-resource-files-to-your-qt-designer-project-and-using-pyrcc-with-python/
categories:
  - python
  - software development
tags:
  - gui
  - pyqt
  - python
  - qt4
  - software development
---
[<img class="aligncenter size-full wp-image-278" src="http://josephrex.me/wp-content/uploads/2014/10/original_197540_cFBHyyvbg3IyK6SnFMmj5IyPO.jpg" alt="original_197540_cFBHyyvbg3IyK6SnFMmj5IyPO" width="720" height="480" />][1]

I&#8217;ve planned writing on this for long but I&#8217;ve just been so busy. When I started building GUI programs with Qt designer, this was a big challenge for me for a while but somehow I figured it out on my own.

When creating a GUI project in Qt designer, you need images on some parts of your interface. Qt designer allows you add images that have been included in your resource files. My first pain was &#8220;How the heck do I add images to this resource file and where the heck is it?&#8221;.

Well I said I figured it out on my own but yet I got the little internet aid. I found out from a search that I needed to have a **app.qrc** file for my resource files. This was all the information I got.

After failing to create a resource file several times, I decided to try out the &#8220;Add new resource file button&#8221;

[<img class="aligncenter size-full wp-image-287" src="http://josephrex.me/wp-content/uploads/2014/10/apprc.png" alt="apprc" width="528" height="297" />][2]

From this point you can open an existing qrc file or create a new one.

[<img class="aligncenter size-full wp-image-288" src="http://josephrex.me/wp-content/uploads/2014/10/apprc1.png" alt="apprc1" width="530" height="435" />][3]

Now we can add images as needed to the file

[<img class="aligncenter size-full wp-image-289" src="http://josephrex.me/wp-content/uploads/2014/10/apprc2.png" alt="apprc2" width="531" height="292" />][4]

Now that&#8217;s it. When saved, this creates our app.qrc in the following format:

<pre class="lang:default decode:true ">&lt;RCC&gt;
  &lt;qresource prefix="/images"&gt;
    &lt;file&gt;resources/images/128x128/james.jpg&lt;/file&gt;
    &lt;file&gt;resources/images/128x128/jacque.jpg&lt;/file&gt;
    &lt;file&gt;resources/images/128x128/sandra.jpg&lt;/file&gt;
    &lt;file&gt;resources/images/128x128/alex.jpg&lt;/file&gt;
    &lt;file&gt;resources/images/128x128/adams.jpg&lt;/file&gt;
    &lt;file&gt;resources/images/128x128/joerex.jpg&lt;/file&gt;
    &lt;file&gt;resources/images/48x48/stop.png&lt;/file&gt;
  &lt;/qresource&gt;
&lt;/RCC&gt;</pre>

So far I&#8217;ve named my resource file app.qrc. After compiling your ui file with pyuic, it will require a app\_rc.py to be imported. In a case where you chose example.qrc for your resource files, a example\_rc.py file is expected from the generated UI python modules. To create this resource modules containing binaries of our image data, we have to use pyrcc to compile to python like so:

<pre class="lang:default decode:true ">pyrcc app.qrc &gt; app_rc.py</pre>

Now we have successfully made use of our resource files with our GUI program. If you have any additions please don&#8217;t hesitate to drop it in the comments.

 [1]: http://josephrex.me/wp-content/uploads/2014/10/original_197540_cFBHyyvbg3IyK6SnFMmj5IyPO.jpg
 [2]: http://josephrex.me/wp-content/uploads/2014/10/apprc.png
 [3]: http://josephrex.me/wp-content/uploads/2014/10/apprc1.png
 [4]: http://josephrex.me/wp-content/uploads/2014/10/apprc2.png