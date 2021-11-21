---
author: Joseph Rex
title: Markdown format for code tabs
date: 2021-03-16T09:03:39-05:00
lastmod: 2021-03-16T09:03:39-05:00
permalink: /markdown-format-for-code-tabs/
tags:
  - software
  - code
  - web
---
For a while I've been working on [ui-pack](https://ui-pack.js.org/docs/intro/principles) which is intended to be a
home for those UI components that aren't used frequently enough to make
it to most component libraries or are often implemented with very little
research.
<!--more-->

In setting up the documentation website, I wanted more control and power
than I have ever had from using documentation tools I would reach out
for in the past. This independence has affected my speed of release but,
it has simultaneously helped me learn and get to do things how I imagine
them.

One of such things is the tabbable code snippets as shown below:

![tabbable code preview](https://res.cloudinary.com/strich/image/upload/v1615911710/71ffd4a1f79b2ae6d30989dc2dbca6d3_qvevwn.gif)

With [MDX][2] offering full control of how my markdown is rendered, it offered
me an opportunity to have markdown for what would have otherwise been a React
component I have to use each time I am writing a doc that needs one of those.

Even though MDX allows for both markdown and JSX in the same file, I prefer to
keep most of my documentation files written mostly in markdown.

To add a simple multi-line code to markdown now, you write it this way:

<p class="note">
<strong>Note:</strong> Examples below use 2 backtics instead of 3 to avoid cofusing
my markdown parser and myself.
</p>

```md
``
some code
``
```

The code markdown takes argument unlike every other markdown syntax[^1]. A lot of platforms
will process syntax highlighting based on the language argument passed to your code like:

```md
``js
var fruit = "apple"
console.log(`I ate ${fruit} this morning`)
``
```

It still feels like we may be limited to tabless code snippets with this format. So how do we
get to what we have in the tabbed image above? We pass more arguments like:

```md
``bash tabs='npm|yarn'
npm i @ui-pack/react
--
yarn add @ui-pack/react
``
```

With this format, the output can be formatted to easily look like what we have in the image.

Are there other markdown formats you process with interesting outputs? Share them with me.


[^1]: If you know any other syntax that takes argument, let me know in the comments. I want
to be able to do more with blockquotes but I haven't found a way to pass arguments to them.

[1]: https://ui-pack.js.org/docs/intro/principles
[2]: https://mdxjs.com