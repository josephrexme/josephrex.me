---
title: What happens when using CSS frameworks
author: Joseph Rex
comments: true
layout: post
permalink: /what-happens-when-using-css-frameworks/
---
I've always been an anti-css-frameworks person for no reason. I just knew I preferred writing my own CSS even though I'm seen as a back-end developer and a lot of people think [design and development should be mutually exclusive][1]. I love design and development and I wouldn't allow a self-limiting thought or people's opinions to keep me from exploring either of them to my satisfaction.
<!--more-->

There are developers that just choose to spend more time at what they're good at which is server-side languages but that's not the case with me. Being so interested in everything on the clientside as much I am with server-side, I've once believed I had to understand every CSS framework that is released and they were majorly Bootstrap and Foundation. I've worked with bootstrap2 and 3, foundation3, and 4 and I never enjoyed writing code with either. It got me wondering why people speak so much of them like they should be indispensable. At a point when I told someone I prefer to write my own CSS he told me that's because I feel like showing off my CSS skill and don't understand the essence of time management. What followed that was an abused use of [DO NOT RE-INVENT THE WHEEL][2] which you should have learned [can be dangerous when taken too literally][3] as a learning software developer or a software developer who knows better than the existing wheel and prefers to build solid wheels.

CSS Frameworks are great! I'd use them when prototyping, I'd advise anyone that's just after demonstrating an implementation to use them as it gives you more time to focus on the purpose of what you're making while ignoring a satisfying user interface. When building larger applications with frameworks you'd find yourself wanting to change the look of components already provided by the framework, you'd have to keep overriding things to suit your own visual desires or goals. If you consider your process carefully you'd realise that the framework that should make your work faster is slowing you down.

Let's build an imaginary computer in two scenarios. In the first scenario we are given a built computer with motherboards we do not want, PCI slots that are rusty or not good enough, redundant disk. In the second scenario we are given the chasis with a new motherboard and brand new components to assemble. Speed may depend on the person on the experiment but the second case will definitely win on efficiency.

I have a Framework-gone-weird detector with the way I style my applications. I have an `_overrides.scss` partial where I place... well you guessed it right overrides. For static sites overrides only occur when I use a CSS Framework and I have to change the way certain things look from how the framework makes them look. In Rails applications where I use bower for asset management, some file dependencies from the CSS of used libraries can't be accessed by my [rails assets pipeline][4] so I create specificity overrides pointing at files in a directory assets pipeline can reach. If `_overrides.scss` gets too long then there's something wrong. I've been spending too much time undoing things I could have just done newly.

If you need a backbone for your design and want to save time, [grid systems][5] are a good call, if you've been doing this long enough some of your old styles should be reusable. Frameworks also bloat your CSS files and make you bend to the will of someone else on naming your HTML classes. If you'd argue on my point that they bloat CSS by bringing up [uncss][6] or any similar tool that takes off irrelevant CSS rules then your argument is invalid because that's not even the main point from the whole of this article. Also, I've had cases where uncss removed styles for elements added with JavaScript. It scans through your HTML and takes out every rule that is presently in use. For me, I sometimes have cases where uncss is rather a pain and I'd stay off it by writing efficient code.

Server-side frameworks make the work easier with little or no reasons to tweak them, JavaScript frameworks may include the needed number of assets resulting in more HTTP requests or will result in a bloated JS file when compressing all JavaScript files but they serve a good purpose in the end and are always worth the performance loss but CSS Frameworks are never worth it on production apps. [Industry experts think so too][7]

[1]: http://uxdiogenes.com/blog/on-being-a-designer-and-a-developer-not-quite-unicorn-rare
[2]: https://en.wikipedia.org/wiki/Reinventing_the_wheel
[3]: https://blog.codinghorror.com/dont-reinvent-the-wheel-unless-you-plan-on-learning-more-about-wheels/
[4]: http://guides.rubyonrails.org/asset_pipeline.html
[5]: http://www.thegridsystem.org/
[6]: http://bit.ly/uncss
[7]: https://psdtowp.net/best-responsive-css-frameworks.html#jeremy-keith