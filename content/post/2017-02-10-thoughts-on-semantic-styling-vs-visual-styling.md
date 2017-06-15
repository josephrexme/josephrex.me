---
author: Joseph Rex
comments: true
date: 2017-02-10T00:00:00Z
tags:
  - css
  - opinions
title: Thoughts on Semantic Styling vs Visual Styling
url: /thoughts-on-semantic-styling-vs-visual-styling/
---

After reading this [rebuttal][1] to Jeffrey Zeldman's [Kiss my classname][2] what came up on my mind is I think everyone's doing this wrong. This is the main problem with the industry. Impatience to accept and learn why opinions that differ from yours could be relevant.
<!--more-->

I'd agree with [Thierry Koblentz][3] for the most part as he doesn't totally dismiss what others consider the right way. However, I think referencing [Lea Verou's tweet][4] and [Sara Soueidan's][5] as a thing leaders should not do is wrong. From skimming through Atomic CSS, it does look terrible and those tweets are their opinions. It might have some advantages that they aren't aware of. They probably could have given it a try and not found it to be solving any problems for them. Seriously, look at this

{{< highlight html >}}
<div class="Row">
    <div class="Fl(start) W(1/2) Bgc(#0280ae.5) H(90px)"></div>
    <div class="Fl(start) W(1/2) Bgc(#0280ae) H(90px)"></div>
</div>
<div class="D(tb) W(100%)" role="presentation">
    <div class="D(tbc) Bgc(#0280ae) H(90px)"></div>
    <div class="D(tbc) Bgc(#0280ae.5) H(90px)"></div>
</div>
   <div class="IbBox W(50%) Bgc(#0280ae.5) H(90px)"></div><!--
--><div class="IbBox W(50%) Bgc(#0280ae) H(90px)"></div>
<div class="D(f)">
    <div class="Flxg(1) Bgc(#0280ae) H(90px)"></div>
    <div class="Flxg(1) Bgc(#0280ae.5) H(90px)"></div>
</div>
{{< / highlight >}}

Doesn't it look like [trimming Satan's pubic hair][6]?

Semantic styling does have its good usecases but it doesn't mean visual styling should be ditched. While I'd agree that the [ C in CSS doesn't mean Component][3], I find using a component based <abbr title="Seperation of Concerns">SoC</abbr> to be great as most of our web apps structure are components anyway ( *filters*, *buttons*, *accordions*).

With separation of components, the styles stay reusable and maintanable. While components help at a large scale, not everything can fit in a component. CSS wasn't built to be OOP and that's what most component structure look like especially if you're following a pattern like [BEM][7] or [rscss][8]. These component misfits are called utilities and they should have a place too.

A utility classes file can be managed with a documentation to avoid repetition and they may get visual in most cases. I use the `u-` namespace with them and here's an example `u-txtcenter`, `u-fr`. Which are my utility classes for text-align center and float right like many other CSS frameworks have them. They can be really helpful [yet so dangerous][9]. But there's room for them in our stylesheets when used properly. I believe documentation as Zeldman said does help reduce the trouble of dealing with terrible stylesheets and it can be especially useful with utility classes. They shouldn't be so much but if they grow, it'd prevent different developers from adding already used utility classes.

In the end we have both visual and semantic styles.

[1]:http://cssmojo.com/opinions_of_leaders_considered_harmful/
[2]:http://www.zeldman.com/2017/01/03/kiss-my-classname/
[3]:https://twitter.com/g16n/status/793046513215737856
[4]:https://twitter.com/LeaVerou/status/686651368736698370
[5]:https://twitter.com/SaraSoueidan/status/602443556884721664
[6]:https://www.stilldrinking.org/programming-sucks
[7]:https://bem.info
[8]:http://rscss.io
[9]:https://benfrain.com/fun-css-naming-convention-explained/
