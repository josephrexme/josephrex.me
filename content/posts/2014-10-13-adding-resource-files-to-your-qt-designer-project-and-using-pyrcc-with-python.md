---
author: Joseph Rex
comments: true
date: 2014-10-13T00:00:00Z
title: Using resources files with Qt designer
url: /adding-resource-files-to-your-qt-designer-project-and-using-pyrcc-with-python/
tags:
  - gui
  - pyqt
  - python
---

I've planned writing on this for long but I've just been so busy. When I started building GUI programs with Qt designer, this was a big challenge for me for a while but somehow I figured it out on my own.
When creating a GUI project in Qt designer, you need images on some parts of your interface. Qt designer allows you add images that have been included in your resource files. My first pain was "How the heck do I add images to this resource file and where the heck is it?".
<!--more-->

Well I said I figured it out on my own but yet I got the little internet aid. I found out from a search that I needed to have a **app.qrc** file for my resource files. This was all the information I got.

After failing to create a resource file several times, I decided to try out the "Add new resource file button"

![apprc](https://res.cloudinary.com/strich/image/upload/v1497715921/apprc_q6mqse.png)

From this point you can open an existing qrc file or create a new one.

<figure>
<img src="https://res.cloudinary.com/strich/image/upload/v1497715924/apprc1_nsb5kn.png" alt="apprc1" class="image">
</figure>

Now we can add images as needed to the file

<figure>
<img src="https://res.cloudinary.com/strich/image/upload/v1497715926/apprc2_f2ujxx.png" alt="apprc2" class="image">
</figure>

Now that's it. When saved, this creates our app.qrc in the following format:

```xml
<RCC>
  <qresource prefix="/images">
    <file>resources/images/128x128/james.jpg</file>
    <file>resources/images/128x128/jacque.jpg</file>
    <file>resources/images/128x128/sandra.jpg</file>
    <file>resources/images/128x128/alex.jpg</file>
    <file>resources/images/128x128/adams.jpg</file>
    <file>resources/images/128x128/joerex.jpg</file>
    <file>resources/images/48x48/stop.png</file>
  </qresource>
</RCC>
```

So far I've named my resource file app.qrc. After compiling your ui file with pyuic, it will require a app\_rc.py to be imported. In a case where you chose example.qrc for your resource files, a example\_rc.py file is expected from the generated UI python modules. To create this resource modules containing binaries of our image data, we have to use pyrcc to compile to python like so:

```
pyrcc app.qrc > app_rc.py
```

Now we have successfully made use of our resource files with our GUI program. If you have any additions please don't hesitate to drop it in the comments.
