---
title: 'Future of CSS: Content Pseudo Selector'
author: Joseph Rex
layout: post
permalink: /content-pseudo-selector/
categories:
  - web
tags:
  - css
  - web
---
Before I started making use of CSS3 to create beautiful websites, I had crappy ways of getting some things done which I think some other designers also did. Since the introduction of [CSS3 pseudo selectors][1], my life got  better. They helped me achieve decent mark-up.

Lately, I thought of making my life a lot easier by doing something even more awesome. I don&#8217;t know if it exists already or in the works, but I&#8217;ll go into details on how I came about it and I think it will be really cool.

I was disquieted by the much unnecessary mark-up used by a UI designer I worked with while playing back-end role on a project and I thought of cleaning up. There was a paragraph that required inner styles on some of it&#8217;s contents (last three words). Every normal thinker feels hunky-dory to wrap it around a span and get on but there are people who just aren&#8217;t satisfied with the normal way. I happen to be in this category of people. This is what it could have been

<pre class="lang:xhtml decode:true" title="The normal way">&lt;p&gt;The quick brown fox jumped &lt;span&gt;over the dog&lt;/span&gt;&lt;/p&gt;</pre>

and the following style

<pre class="lang:css decode:true">p span{color:red;}</pre>

But I came up with this simple mark-up

<pre class="lang:xhtml decode:true" title="The future way">&lt;p&gt;The quick brown fox jumped over the dog&lt;/p&gt;</pre>

and a style like so:

<pre class="lang:default decode:true">p:[26:]{color: red;}</pre>

As a python programmer, I feel this should also be handled the way python strings are picked from their variables. The pseudo selector `p:[26:]` should pick characters from the 26th character in the element, using a cardinal numbering and it then styles it till it hits the end of the element.

To have just **jumped over** styled, we have to specify an end for the selection. That way we can have it this way

<pre class="lang:css decode:true">p:[20:30]{color: red; }</pre>

#### Handling possible drawbacks

If a user has a the following `
<p>Foobar</p>
<p>` and does a style `p:[0:8]{}`, since the content doesn&#8217;t have up to 8 cardinal numbers, it breaks at the end of the closing tag still applying the style to all the characters it could pick. Also, when used on an element with inline <img> or any other inline tag, it breaks when it meets them.

Let&#8217;s make the web better for both users and coders!!

&nbsp;

 [1]: http://www.w3.org/TR/css3-selectors/