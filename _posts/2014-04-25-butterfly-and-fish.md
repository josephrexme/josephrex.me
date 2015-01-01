---
title: Butterfly and Fish
author: Joseph Rex
layout: post
permalink: /butterfly-and-fish/
categories:
  - Unix
tags:
  - butterfly
  - fish
  - linux
  - mac
  - shell
  - unix
---
[<img class="aligncenter size-large wp-image-60" src="http://josephrex.me/wp-content/uploads/2014/04/butterfly_1-1024x813.gif" alt="butterfly_1" width="474" height="376" />][1]I recently stumbled upon butterfly on <http://paradoxxxzero.github.io/2014/02/28/butterfly.html> and it is a really awesome web browser shell execution program written in python. It&#8217;s not like it&#8217;s the first of it&#8217;s kind. There are others like:

[ajaxterm][2] and [anyterm][3]

They are also good but development has stopped on them and I don&#8217;t think they are better than butterfly. Ajaxterm was adapted from anyterm and there have been no new commits since 2011.

Why should you use butterfly?

You can run butterfly on your server and use it within your browser from any client to SSH into your server and bypass filters. It also has a lot more good use. Just think about it.

Installation is as easy as:

<pre>sudo pip install butterfly</pre>

To start the server,

<pre>butterfly.server.py</pre>

and you can go to [localhost:57575][4] on your web browser to access it

To bind to a specific host for remote access,

<pre>butterfly.server.py --host="0.0.0.0"</pre>

which isn&#8217;t secure according to the owner&#8217;s article

One more awesome feature is that you can specify your shell to be used in butterfly

<pre>butterfly.server.py --shell=/usr/bin/fish</pre>

#### What&#8217;s Fish?

[<img class="aligncenter size-full wp-image-61" src="http://josephrex.me/wp-content/uploads/2014/04/Screenshot-from-2014-04-24-153719.png" alt="Screenshot from 2014-04-24 15:37:19" width="574" height="498" />][5]<a href="http://fishshell.com" target="_blank">Fish</a> is a user-friendly shell  with awesome features. I&#8217;ve been using it for a while now and it&#8217;s even a lot more awesome inside butterfly.

Its awesome features include auto-suggestions, super-awesome tab completion, scripting, job timing, and more. It also opens any file with its default program just by doing a

<pre>open filename</pre>

Try them out.

 [1]: http://josephrex.me/wp-content/uploads/2014/04/butterfly_1.gif
 [2]: https://github.com/antonylesuisse/qweb/tree/master/ajaxterm
 [3]: http://anyterm.org/
 [4]: http://localhost:57575
 [5]: http://josephrex.me/wp-content/uploads/2014/04/Screenshot-from-2014-04-24-153719.png