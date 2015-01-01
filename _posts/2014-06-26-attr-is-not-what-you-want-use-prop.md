---
title: .attr() is not what you want, use .prop()
author: Joseph Rex
layout: post
permalink: /attr-is-not-what-you-want-use-prop/
categories:
  - web
tags:
  - DOM
  - javascript
  - jquery
  - web
---
JavaScript is boss at what it does by helping us manipulate the DOM. jQuery has helped JS starters and also PROs that want to get work done in time. The .attr() function is meant to get the attributes of a selected node in the DOM. Starting with jQuery, I felt it was totally ok to use .attr() not just because it was the function I felt I wanted, but it sounded semantically ok with the task I want to achieve. Thinking of it in a simple way, &#8220;attr&#8221; looks like an abbreviation of &#8220;attribute&#8221; and what I want to do is access the contents of my HTML element attribute. Used it like this for a while and found out it didn&#8217;t work as perfect as I expected till I discovered I shouldn&#8217;t have been doing it this way. .attr() accesses defaultValue (initial value) of an element&#8217;s attribute which means if I have a mark-up like this

<pre class="lang:js decode:true ">&lt;input type="text" value="FooBar"&gt;</pre>

then <span class="lang:js decode:true  crayon-inline ">.attr(&#8216;value&#8217;)</span>  will return &#8220;FooBar&#8221; What if I type something else into this text input in the DOM, what happens? I did a little experiment on that and here are some screenshots: [<img class="aligncenter size-full wp-image-116" src="http://josephrex.me/wp-content/uploads/2014/06/Screenshot-from-2014-06-25-174459.png" alt="Screenshot from 2014-06-25 17:44:59" width="531" height="184" />][1] [<img class="aligncenter size-full wp-image-117" src="http://josephrex.me/wp-content/uploads/2014/06/Screenshot-from-2014-06-25-174543.png" alt="Screenshot from 2014-06-25 17:45:43" width="534" height="226" />][2] I used Firebug Lite on my Chromium to inspect my simple HTML input and I could see that my defaultValue was still &#8220;Foobar&#8221; at the point I had replaced the input value in the browser with &#8220;Joseph&#8221;. But the value is &#8220;Joseph&#8221; just like I want it. The problem with .attr() is that it picks the defaultValue and not the current value. I wrote a little script to find out the operations of .attr() and .prop() on my input above

<div class="codepen" data-height="268" data-theme-id="0" data-slug-hash="umpdA" data-default-tab="js">
  <pre><code>$('button').click(function(){
		alert('attr: '+$('input').attr('value')+'\n'+'prop: '+$('input').prop('value'));
	});</code></pre>
  
  <p>
    See the Pen <a href="http://codepen.io/bl4ckdu5t/pen/umpdA/">umpdA</a> by Joseph Rex (<a href="http://codepen.io/bl4ckdu5t">@bl4ckdu5t</a>) on <a href="http://codepen.io">CodePen</a>.</div> 
    
    <p>
      After Clicking the button I got this dialog window <a href="http://josephrex.me/wp-content/uploads/2014/06/Screenshot-from-2014-06-25-174806.png"><img class="aligncenter size-full wp-image-118" src="http://josephrex.me/wp-content/uploads/2014/06/Screenshot-from-2014-06-25-174806.png" alt="Screenshot from 2014-06-25 17:48:06" width="361" height="180" /></a>   Does this mean .attr() shouldn&#8217;t be used again. I don&#8217;t think so! If it&#8217;s not meant to be used anymore, it should have been deprecated since version 1.6 of jQuery. I think it still exists because there are times you may need the default value for some other DOM operations you may have. However, you should try to stay off it because in most cases, it&#8217;s not what you want.
    </p>

 [1]: http://josephrex.me/wp-content/uploads/2014/06/Screenshot-from-2014-06-25-174459.png
 [2]: http://josephrex.me/wp-content/uploads/2014/06/Screenshot-from-2014-06-25-174543.png