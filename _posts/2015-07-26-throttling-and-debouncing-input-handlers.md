---
title: 'Throttling and debouncing input handlers'
author: Joseph Rex
layout: post
comments: true
permalink: /throttling-and-debouncing-input-handers/
---

2 years ago when JavaScript sounded a lot impossible to me and yet I had to perform a tasks in it for a project I was working on, I requested help on the *#jQuery* IRC channel and someone mentioned:
<!--more-->

> You may wanna debounce inputs on that one. I use this plugin for that <http://benalman.com/projects/jquery-throttle-debounce-plugin/>


I didn't understand what he was saying but I couldn't express how much I was confused so I decided to play the *I get it* character. While I found the solution to what I really needed as a JavaScript script kiddie, of course I didn't understand what the solution was doing neither could I explain how it worked but I used it anyway. I had since bookmarked that link telling myself **This will be useful some day**. That day has come and I've used it on couple of projects. I'll go through what it does.

A common example here is scroll events which [Paul Lewis][1] explained properly and more clearly than I can in a [Rendering Performance article][2] he wrote at Google. He wrote about scroll events and touch events and mentioned how these input handlers are scheduled to run after `requestAnimationFrame` callbacks.

[Chris Coyier][3] also recently wrote about [the difference between throttling and debouncing][4] which he metioned he had been confused about them just as I stayed confused about them for long. I'll rehash how he explained the difference.

**Throttling:** It enforces a maximum number of times a function can be called over a time. It says you can't call this function more than once in X duration.

**Debouncing:** It enforces that a function can not be called again until a certain amount of time has passed. It says if function Y is called, it can't be called until after X duration.

A big difference there that's hardly a difference. What it does primarily is save the CPU or GPU from performing way too much calculations especially in resize events aspect where you go through a window resize and you hit various width from about 2400px down to 320px and back up. Monitoring the scroll and having a change occur in the DOM on the scroll event will be too much computing.

With throttling or debouncing, the DOM changes can wait until after every pause during the resize rather than through every resize point.

Here's a pseudocode of what happens

{% highlight text %}
// Without a throttle/debounce
Listener(EventScroll) ->
   print 'The quick brown fox'
// With a throttle of every 900ms
Listener(EventScroll, throttle(800s) ) ->
   print 'The quick brown fox'
{% endhighlight %}

If we hit 200 resize points scrolling from 2400px to 320px, the first case will print "The quick brown fox" 200 times but instead with a 900ms throttle which says only call this function once in 900ms, while the scrolling takes 3s from 2400px it will be
<figure>
3s = 3000ms
<br>
3000 / 900 = 3.3
</figure>
The function now has to run 3 times saving it from the heavy 200 times of computation which may cause lagging on the web page. Another good use case I've come across for this especially in a recent project was handling ajax submission on click of radio button among several options.

As a human with an understanding of cognitive science, I try to think of how other humans think and while I have 3 radio button options to be selected from, an indecisive user can select option A and in that minute choose to change to option B. With a little debounce on the click input, it says do not send the ajax request again until X seconds are gone, saving my database from getting too frequent hits.

About the first [jQuery throttle-debounce plugin][5] that found me before I even knew its use, it had been my option when it comes to debouncing my input handlers and it works just great but on my most recent I chose to give the [underscorejs][6] a try and I liked using it more with its _.debounce() callback which works just like below

{% highlight javascript %}
$(window).on('resize', _.debounce(function(){
	console.log("The quick brown fox");
}, 800));
{% endhighlight %}

Ben Alman mentions in the jquery plugin page that debouncing can be especially useful for rate limiting execution of handlers on events that will trigger AJAX requests and I chose debounce over throttle for this in my usecase.

[1]: http://aerotwist.com/
[2]: https://developers.google.com/web/fundamentals/performance/rendering/debounce-your-input-handlers?hl=en
[3]: https://twitter.com/chriscoyier
[4]: https://css-tricks.com/the-difference-between-throttling-and-debouncing/
[5]: http://benalman.com/projects/jquery-throttle-debounce-plugin/
[6]: http://underscorejs.org