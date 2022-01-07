---
author: Joseph Rex
title: Ban embed codes
date: 2022-01-06T23:50:19-05:00
lastmod: 2022-01-06T23:50:19-05:00
permalink: /ban-embed-codes/
tags:
  - opinions
  - web
---

Owning and managing a blog of your own offers a feeling of complete control over content
decision in a world where majority of content is on social media platforms. My favorite
part of it is that I get to decide how good the experience will be for my content consumers.
<!--more-->

If like me you have an affinity for creating usable, accessible, and performant experiences,
your personal website is one of the best places to practice being empathetic about your users.
I recently read Jeremy Keith's [ain't no party like a third party](https://adactio.com/articles/18676)
and it aligned mostly with some thoughts I've been having recently for my website. While I may
understand a business product's reliance on third party scripts, I think a lot more people should
accomodate less to none of them in their personal blogs.

Your audience on every other platform give up their rights to complete data privacy by being on
those platforms. If some of your audience are more paranoid to the data mining by these social
media websites, it is on you to provide that safety when they come on yours. The use of third-party
scripts to embed content gives up their safety.

I will admit I still use Google Analytics on this website because I still care about analyzing
my traffic and I am not sure I will ever make the time to roll out my own analytics solution.
A part of me feels guilty for this but at the same time I feel I can make up for it by
confidently assuring my website visitors that it's the only third-party script they will get here.
Perhaps, some day I will find an alternative or grow beyond a need for site analytics.
In his article, Jeremy said:

> Just take a minute to consider the implications of that: any third-party script on your site is allowing someone else to execute code on your web pages. That’s astonishingly unsafe.

I'm deciding to focus only on content embed scripts here as they not only potentially jeopardize your
user's privacy, they also reduce the performance of your website, affect your layout, and cause inconsitencies.

Let's consider twitter embeds. By adding one to your website from their https://publish.twitter.com, you include
a script with a size that probably didn't undergo your performance budget audit. The script could slow down your
website for your users, it could alter the experience they get by causing a <abbr title="Flash of Unstyled Content">FOUC</abbr>,
and trigger a [cumulative layout shift](https://web.dev/cls).

Instead of using twitter's embed, you can make use of their APIs to embed tweets tailored for visitors of your website. Here's an example:

{% twitter "1479197132011839490" %}

The tweet above is rendered on the server-side in the generation of my blog. It's like every other static content so it does
not need to cause any shifts in my page after initial load. It also does not add to the network requests my website has to make
on the client-side.

I had chosen that particular tweet because it stretches my point here further. There is Chris Ferdinandi celebrating his migration
to ConvertKit from Mailchimp with one of the reasons being that he can now have simple subscribe forms without third-party scripts. Although, ConvertKit's default embed forms come with scripts, you may also do without the script like [in this gist](https://gist.github.com/josephrexme/af468d52b694c19ba811bf7f88fc8d6b). That's how my subscription form below is implemented.


Besides twitter, 2 other websites I find that I frequently want to embed are CodePen and YouTube. They both offer iframe alternatives. Codepen's [script embed](https://blog.codepen.io/documentation/embedded-pens/) offers some options like [prefill embeds](https://blog.codepen.io/documentation/prefill-embeds/) which may make it an option for some. I decided that the
iframe can be sufficient for my needs by having it preconfigured the way I like it. When using YouTube's iframe, be sure to use
the one without cookies to track your users -- youtube-nocookie.com.

One of the many woes of embed scripts is the unpredictability you get with them. Here's the same tweet as above in 2 browsers

<figure>
{% image "twitter-embed-inconsistency_trptwf", {alt: 'Screenshot of twitter embed in Safari and Brave browser'} %}

<figcaption>Safari on left, Brave browser on right</figcaption>
</figure>

For some unknown reason, my brave browser never loads tweet embeds nicely. My visitors using brave shouldn't have to experience that.

At other times, twitter just doesn't load at all. A while ago, I had opened a CSS tricks article to read on mobile Safari, and I got this:

<figure>
{% image "css-tricks-add-less-twitter_q5xa8g", {alt: 'Mobile screenshot of tweet embed on css-tricks.com'} %}

<figcaption>Article at <a href="https://css-tricks.com/add-less/">https://css-tricks.com/add-less/</a></figcaption>
</figure>

I hope some day that css tricks is able to implement tweet embeds differently without relying on twitter's third-party script.
This was an article I really wanted to read so I was forced to pop it open on my computer.

What embed codes are you using now? How are you planning on letting go of them?