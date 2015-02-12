---
title: .attr() is not what you want, use .prop()
author: Joseph Rex
layout: post
comments: true
permalink: /attr-is-not-what-you-want-use-prop/
categories:
  - web
tags:
  - DOM
  - javascript
  - jquery
  - web
---
JavaScript is boss at what it does by helping us manipulate the DOM. jQuery has helped JS starters and also PROs that want to get work done in time. The .attr() function is meant to get the attributes of a selected node in the DOM. Starting with jQuery, I felt it was totally ok to use .attr() not just because it was the function I felt I wanted, but it sounded semantically ok with the task I want to achieve. Thinking of it in a simple way, "attr" looks like an abbreviation of "attribute" and what I want to do is access the contents of my HTML element attribute. Used it like this for a while and found out it didn't work as perfect as I expected till I discovered I shouldn't have been doing it this way. .attr() accesses defaultValue (initial value) of an element's attribute which means if I have a mark-up like this
<!--more-->

{% highlight html %}
<input type="text" value="FooBar">
{% endhighlight %}

then `.attr('value')`  will return "FooBar" What if I type something else into this text input in the DOM, what happens? I did a little experiment on that and here are some screenshots:

{% image Screenshot-from-2014-06-25-174459.png alt="Screenshot from 2014-06-25 17:44:59" %}
{% image Screenshot-from-2014-06-25-174543.png alt="Screenshot from 2014-06-25 17:45:43" %}

I used Firebug Lite on my Chromium to inspect my simple HTML input and I could see that my defaultValue was still "Foobar" at the point I had replaced the input value in the browser with "Joseph". But the value is "Joseph" just like I want it. The problem with .attr() is that it picks the defaultValue and not the current value. I wrote a little script to find out the operations of .attr() and .prop() on my input above

{% highlight javascript %}
$('button').click(function(){
	alert('attr: '+$('input').attr('value')+'\n'+'prop: '+$('input').prop('value'));
});
{% endhighlight %}

<p data-height="268" data-theme-id="0" data-slug-hash="umpdA" data-default-tab="result" data-user="bl4ckdu5t" class='codepen'>See the Pen <a href='http://codepen.io/bl4ckdu5t/pen/umpdA/'>umpdA</a> by Joseph Rex (<a href='http://codepen.io/bl4ckdu5t'>@bl4ckdu5t</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

After Clicking the button I got this dialog window

{% image Screenshot-from-2014-06-25-174806.png alt="Screenshot from 2014-06-25 17:48:06" %}

Does this mean .attr() shouldn't be used again. I don't think so! If it's not meant to be used anymore, it should have been deprecated since version 1.6 of jQuery. I think it still exists because there are times you may need the default value for some other DOM operations you may have. However, you should try to stay off it because in most cases, it's not what you want.