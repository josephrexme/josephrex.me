---
author: Joseph Rex
title: How I set up frontmatter With Next.js and MDX
description: A guide on how to use frontmatter with mdx.js and next.js by creating a remark plugin
date: 2021-03-23T18:29:31-05:00
lastmod: 2021-03-23T18:29:31-05:00
permalink: /frontmatter-with-nextjs-and-mdx/
tags:
  - code
  - next.js
  - ssg
---
As I began writing documentation for my project [ui-pack](https://ui-pack.js.org/docs/intro/principles) I wanted full control of the
medium to prevent limitations that may be met with existing documentation tools. A primary
goal of the project is to be so comprehensive to its users.
<!--more-->

To get the custom experience, I started out with next.js and added [mdxjs][2] for an ability to
write in markdown like any static site generator (SSG). MDX has a section on frontmatter
that is very poorly documented (but that does not speak for the entire project, just this section).

The first approach I took to having metadata for each page was wrapping them in a component within
my mdx files. Here's what that looked like:

```jsx
<Documentation
  title="My section title"
  lastUpdated="2021-03-23T19:00"
>

# My Markdown heading

Content here...

</Documentation>
```

I couldn't go for long with starting every documentation file with that. I write a lot in markdown
and I prefer not to have to write any JSX or do anything that feels like an additional task to
writing. Here's what I really would like that to be.

```md
---
title: My section title
lastUpdated: 2021-03-23T19:00
---

# Markdown heading

Content here...
```

After some digging, I found a [github gist][3] that paved the way for me by answering some unknown
questions and offering a structure. It still felt like something was missing as I could not figure
out how to use the frontmatter in the component that houses each of my markdown. As seen from the
first snippet, I was able to pass the `title` and `lastUpdated` values into the `Documentation`
component which formats them and processes them for render.

<hr>

## Steps
The first step is to create a `frontmatter.js` plugin file that we will edit later. If you don't
already have a `next.config.js` file, create one

```js
// next.config.js
const frontmatterPlugin = require('./lib/frontmatter')


const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [frontmatterPlugin]
  }
})
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  target: 'serverless'
})
```

import the frontmatter file as seen above and start editing. First, we need [graymatter][4] to extract
the YAML frontmatter from the content and [stringify-object][5] which converts an object to non-quoted
string.

```js
const matter = require('gray-matter')
const stringifyObject = require('stringify-object')
```

and here is everything else:

```js
module.exports = () => (tree, file) => {
  const { consent, data } = matter(file.contents)

  // Step 2: Remove frontmatter after converting it into JS object
  if(tree.children[0].type === 'thematicBreak') {
    const firstHeadingIndex = tree.children.findIndex(t => t.type === 'heading')
    if (firstHeadingIndex !== -1) {
      tree.children.splice(0, firstHeadingIndex + 1)
    }
  }

  // Step 3: Insert JSX to pass frontmatter to parent component
  tree.children.unshift({
    type: 'import',
    value: `
      import Documentation from '../files/documentation'
    `
  },{
    type: 'jsx',
    value: `
    <Documentation
      title={frontMatter.title}
      author={frontMatter.author}
      lastUpdated={frontMatter.lastUpdated}
    >

    `
  })

  // Step 4: Close JSX parent component
  tree.children.push({
    type: 'jsx',
    value: `
    
    </Documentation>
    `
  })

  // Step 1: Convert frontmatter to JS object and push to document tree
  tree.children.push({
    type: 'export',
    value: `
    export const frontMatter = ${stringifyObject(data)}
    `
  })
}
```

If you that's all you need, you may skip the rest of the post but to get a better
understanding of what the plugin is doing, the output of that is something like this:

```jsx
import Documentation from '../files/documentation'

<Documentation
  title={frontMatter.title}
  author={frontMatter.author}
  lastUpdated={frontMatter.lastUpdated}
>

<!-- All markdown content here -->

</Documentation>

export const frontMatter = {
  title: "My Section title",
  author: "Joseph",
  lastUpdated: "2021-03-23T19:00"
}
```

In the first step, we make a `frontMatter` object that has all our frontMatter. This was
where a lot of resources ended and left me with questions. It's placed at the bottom to
prevent it from complicating the document tree before I get to traverse through it in
step 2.

The second step removes the YAML frontMatter from the document as we have already
derived its values. The `---` at the start of the frontmatter is a `thematicBreak` node
type, and the last line of the frontmatter along with its ending `---` are seen as a
heading node. That means we have to delete everything from the first thematic break to
the first heading.

In the third step, the parent component is imported to pass the frontmatter data into it,
and the fourth step just closes this parent component with all the markdown content
existing within the tree.

That's all for now! Thanks for reading and subscribe to my newsletter below for a broad
range of amazing content if you haven't done so yet.


[1]: https://ui-pack.js.org/docs/intro/principles
[2]: https://mdxjs.com/
[3]: https://gist.github.com/sudkumar/70834062f9243558846249f2c2f98902
[4]: https://npm.im/gray-matter
[5]: https://npm.im/stringify-object
