---
author: Joseph Rex
comments: true
date: 2016-01-06T00:00:00Z
title: Using version managers and virtual environments
permalink: /{{ title | slugify }}/
tags:
  - software
---

It's a new year and 2015 was a blast for me. I successfully ticked every item on my list for 2015 and I had even more that I hadn't expected from the start of the year.
In July, I got an email from [PacktPub](http://packtpub.com) about reviewing a book on building GUIs with Python. The opportunity was influenced by [the article I'd written](/getting-started-with-gui-development-in-python/) on the subject and I'm glad I did. The book was completed and published in December and I got really excited to see that I'm a part of something that'll impact the lives of people around the world. It is available on [Amazon](http://www.amazon.com/gp/product/1785283758?keywords=python%20gui%20programming%20cookbook&qid=1451209838&ref_=sr_1_1&s=books&sr=1-1) and [PacktPub](https://www.packtpub.com/application-development/python-gui-programming-cookbook) and I urge you to grab a copy as there's so much to learn from it.
<!--more-->

I had to let that out to share my excitement, and happy new years by the way. One of the things that impacted my productivity last year was using version managers which made working with various tools a lot easier.

I mostly work with JavaScript, Ruby, and Python and each of these languages have different versions that can be used on different projects I work on. For Python the version difference isn't so big and doesn't change so often. There is python2 and python3 and in various projects I'm either having to use 2.7 or 3.5 each of which have their own packages and modules. Both versions of Python can be installed with 2.7 being run with the `python` binary and 3.5 with `python3`. This seemed fine to me for so long till I started installing wrong packages with pip. I'd use pip for python2 when I really need python3. Remembering to type pip3 all the time was so not fun. I don't use python on the web and I think it would have been a bigger nightmare for me if I kept on using it that way with the web.

The solution for the python2, python3 issue as well as package management in python was to use virtualenv which simply just needs to be activated for each version we want. Having it this way there's no limit to the python versions that we can have including 2.5, 2.6, 2.7, 3.3, 3.5.

Ruby has more minor releases and when building rails applications or other ruby applications, we rely on the version for the operations and gems that we use. Usually gems are stored in `~/.gem` directory but we could manage them easily per version with rvm, rbenv, or chruby. I use and prefer rbenv.

With the popularity of node on the web today, almost every JavaScript framework relies on it. I was working on an ember project where version 0.12 was used and I had version 5.1 installed. At first I thought I'd just update all it's npm modules to work with 5.1. It was a hectic task but I went on with it anyway. At first it seemed like success but I hit a block not too long within the project and I learned about nvm. Nvm has since made it easy for me to manage packages for 0.12, 5.1, and 5.3. I also have a io.js 3.3 among my nvm versions making it easy to just juggle on my desired environment per project.

## Why you should use them
In a [recent post](/quality-against-speed-in-development/) I discussed the 5s on productive maintenance and while explaining **seiton** which means tidiness I quoted

> A place for everything and everything in its place <br>
  - Benjamin Franklin

The primary goal of virtual environments are to be able to create any environment for different projects with ease and the ultimate goal is tidiness. This is the same with version managers

## Setting up NVM, Rbenv, and VirtualEnv
To set up nvm you need to have a version of node and npm running on the system to install it globally after which all npm packages will be installed on nvm versions. For a global install of nvm

```
npm install -g npm
```

To view versions of node or iojs available for install:
```
nvm ls-remote
```
versions you have installed
```
nvm ls
```
and more info can be found with `nvm help`. For each version activated, the $PATH is updated to use binaries from within that version. I've heard nvm isn't available for Windows users but I don't know how true that is.

To install Rbenv in OS X 10.11 you should follow [this guide][5] and [this for Ubuntu][6]. Gorails have some of the best and most updated guides on how to do this so make sure to check there.

For Virtualenv with python you can follow [this guide][7] to install, enter your virtual environment folder and use:

```
source bin/activate
```

and to deactivate when you are in the environment the `deactivate` command is always available.

If you aren't already using them then you should give them a try to improve your productivity in 2016.

[1]: http://packtpub.com
[2]: http://josephrex.me/getting-started-with-gui-development-in-python/
[3]: http://www.amazon.com/gp/product/1785283758?keywords=python%20gui%20programming%20cookbook&qid=1451209838&ref_=sr_1_1&s=books&sr=1-1
[4]: https://www.packtpub.com/application-development/python-gui-programming-cookbook
[5]: https://gorails.com/setup/osx/10.11-el-capitan
[6]: https://gorails.com/setup/ubuntu
[7]: https://hackercodex.com/guide/python-development-environment-on-mac-osx/
