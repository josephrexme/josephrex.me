---
author: Joseph Rex
comments: true
date: 2014-07-31T00:00:00Z
title: It does not have to be important
url: /it-doesnt-have-to-be-important/
tags:
  - css
  - web
---

Thanks to collaborated projects, I've come across crappy CSS in my life. I talked about it in a [previous article][1].

I'm not impeccable and I wouldn't be dissing someone else' because of their faults. However, one point I failed to mention about what I experienced from a co-designer on the project I mentioned in that article was the use of too many nested selectors.

Nested selectors increase specificity and they should be avoided when they can. In an instance where you have
<!--more-->

```css
 .header{...}
 ``` 

which contains a nav. If you wouldn't be using navs on any other part of your design, it will be unnecessary to have its selector named

```css
.header nav{...}
```j

when it will work just fine as

```css
nav{...}
```

I had to take that drift because the article is majorly about specificity. Specifically about the use of !important for specificity in CSS.

Based on <a href="http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/" target="_blank">an article </a>I recently read by <a href="http://twitter.com/csswizardry" target="_blank">Harry Roberts</a> and the words from a lot of a lot of professionals in front-end communities,  it is best to avoid specificity with !important. Harry demonstrated how we can increase specificity without using !important. These pens are simple illustrations:

<p class="note">
<strong>NOTE:</strong> The pens referenced here have been deleted
</p>
  
The first pen shows how the "bar" class overrides the "foo" class that sets a red color to the paragraph, and the in the second, "foo" has more power. We can add more specificity by chaining the same class as many times as we want it like:

```css
.foo.foo.foo.foo.foo{...}
```

Nice right? See we don't have to do it this way:

```css
.foo{color: red !important; }
.bar{color: blue; }
```

### Conclusion

There's a lot more interesting features of CSS which you may not be aware of. To be a great designer, you should take advantage of these features and design the right way.

### Reference

<a href="http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/" target="_blank">http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/</a>

 [1]: /collaborated-projects-are-good-and-bad/
