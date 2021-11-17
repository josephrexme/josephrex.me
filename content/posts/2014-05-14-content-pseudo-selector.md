---
author: Joseph Rex
comments: true
date: 2014-05-14T00:00:00Z
title: 'Future of CSS: Content Pseudo Selector'
url: /content-pseudo-selector/
tags:
  - css
  - web
---

Before I started making use of CSS3 to create beautiful websites, I had crappy ways of getting some things done which I think some other designers also did. Since the introduction of [CSS3 pseudo selectors][1], my life got  better. They helped me achieve decent mark-up.

Lately, I thought of making my life a lot easier by doing something even more awesome. I don't know if it exists already or in the works, but I'll go into details on how I came about it and I think it will be really cool.
<!--more-->

I was disquieted by the much unnecessary mark-up used by a UI designer I worked with while playing back-end role on a project and I thought of cleaning up. There was a paragraph that required inner styles on some of it's contents (last three words). Every normal thinker feels hunky-dory to wrap it around a span and get on but there are people who just aren't satisfied with the normal way. I happen to be in this category of people. This is what it could have been

{{< highlight html >}}
<p>The quick brown fox jumped <span>over the dog</span></p>
{{< / highlight >}}

and the following style

{{< highlight css >}}
p span{color:red;}
{{< / highlight >}}

But I came up with this simple mark-up

{{< highlight html >}}
<p>The quick brown fox jumped over the dog</p>
{{< / highlight >}}

and a style like so:

{{< highlight css >}}
p:[26:]{color: red;}
{{< / highlight >}}

As a python programmer, I feel this should also be handled the way python strings are picked from their variables. The pseudo selector `p:[26:]` should pick characters from the 26th character in the element, using a cardinal numbering and it then styles it till it hits the end of the element.

To have just **jumped over** styled, we have to specify an end for the selection. That way we can have it this way

{{< highlight css >}}
p:[20:30]{color: red; }
{{< / highlight >}}

#### Handling possible drawbacks

If a user has a the following
{{< highlight html >}}
<p>Foobar</p>
{{< / highlight >}}
and does a style `p:[0:8]{}`, since the content doesn't have up to 8 cardinal numbers, it breaks at the end of the closing tag still applying the style to all the characters it could pick. Also, when used on an element with inline `< img >` or any other inline tag, it breaks when it meets them.

Let's make the web better for both users and coders!!
 
[1]: http://www.w3.org/TR/css3-selectors/
