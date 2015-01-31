---
title: Butterfly and Fish
author: Joseph Rex
layout: post
comments: true
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
{% image butterfly_1.gif class="head-image" alt="butterfly_1" %}
I recently stumbled upon butterfly on <http://paradoxxxzero.github.io/2014/02/28/butterfly.html> and it is a really awesome web browser shell execution program written in python. It's not like it's the first of it's kind. There are others like:

[ajaxterm][2] and [anyterm][3]

They are also good but development has stopped on them and I don't think they are better than butterfly. Ajaxterm was adapted from anyterm and there have been no new commits since 2011.

Why should you use butterfly?

You can run butterfly on your server and use it within your browser from any client to SSH into your server and bypass filters. It also has a lot more good use. Just think about it.

Installation is as easy as:

```
sudo pip install butterfly
```

To start the server,

```
butterfly.server.py
```

and you can go to [localhost:57575][4] on your web browser to access it

To bind to a specific host for remote access,

```
butterfly.server.py --host="0.0.0.0"
```

which isn't secure according to the owner's article

One more awesome feature is that you can specify your shell to be used in butterfly

```
butterfly.server.py --shell=/usr/bin/fish
```

#### What's Fish?

{% image fish-shell.png alt="Fish Shell" %}

[Fish][1] is a user-friendly shell  with awesome features. I've been using it for a while now and it's even a lot more awesome inside butterfly.

Its awesome features include auto-suggestions, super-awesome tab completion, scripting, job timing, and more. It also opens any file with its default program just by doing a

```open filename```

Try them out.

[1]: http://fishshell.com
[2]: https://github.com/antonylesuisse/qweb/tree/master/ajaxterm
[3]: http://anyterm.org/
[4]: http://localhost:57575