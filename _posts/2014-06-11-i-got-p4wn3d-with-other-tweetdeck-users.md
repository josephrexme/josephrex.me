---
title: I got p4wn3d with other tweetdeck users
author: Joseph Rex
layout: post
permalink: /i-got-p4wn3d-with-other-tweetdeck-users/
categories:
  - Hacking
tags:
  - hacking
  - twitter
  - XSS
---
I&#8217;ve been using the Chrome extension for Tweetdeck for a while. It has a good layout of columns that help you stay updated with your favorite events on Twitter.  
Some hours earlier, while I was busy not being busy, my browser window switched tab to the tab where I had tweetdeck opened and I got a dialog window displaying

> XSS in Tweetdeck

And afterwards, I went on twitter and found out the XSS attack had made me retweet the following script

<blockquote class="twitter-tweet" lang="en">
  <p>
    <script class=&#8221;xss&#8221;>$(&#8216;.xss&#8217;).parents().eq(1).find(&#8216;a&#8217;).eq(1).click();$(&#8216;[data-action=retweet]&#8217;).click();alert(&#8216;XSS in Tweetdeck&#8217;)</script>♥
  </p>
  
  <p>
    — *andy (@derGeruhn) <a href="https://twitter.com/derGeruhn/statuses/476764918763749376">June 11, 2014</a>
  </p>
</blockquote>



Not just me but 36,000 people have also retweeted this at the time of my writing.

From what I&#8217;ve been seeing, more malicious people over the internet which will of course include more script kiddies, are taking advantage of this and sending various messages to users.

In my case, I go a dialog window that displayed

> XSS In Tweetdeck

just as shown in the script I embedded. For some, it was messages like

> penis penis penis

and for some it was <a title="Never gonna give you up" href="http://www.youtube.com/watch?v=qb_hqexKkw8" target="_blank">rickrolling</a>

If you have as much paranoia as I do, you&#8217;ll take the following actions as soon as possible

  * Revoke Tweetdeck Access on your Twitter Account Settings
  * Change your Twitter Account Password
  * Change your Tweetdeck Password (If you have one. I didn&#8217;t because I don&#8217;t have a tweetdeck account)