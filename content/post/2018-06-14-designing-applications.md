---
author: Joseph Rex
title: Designing Applications
date: 2018-06-14T12:51:26-05:00
url: /designing-applications
tags:
  - design
  - frontend
---
A good number of applications get into development phase and then to production
with no proper design or architecture. My context of application would remain
in the scope of mobile apps and web apps for most part of this article. The
common reason for this is because there's no designer on the team or the sole
designer working on the product lacks design skills. You can't really blame
a single developer working on a project because we were not all born to be
unicorns 🦄.
<!--more-->

However, on teams I'd recommend having a designer or client-side developer with
a good eye for design and some design skill. This post focuses on designing for web
applications. A team without a designer can use a good CSS framework as
[living styleguide][1]. More about CSS frameworks and
living styleguides in a bit.

### Why does application design matter?
We generally take 3 things into consideration for every software product we build
and it's more than just software these days. They are:

- Functionality
- Usability/Design
- Security

Some company choose to focus on one more than the others but it's always great to
find a perfect balance between them all. With these 3 focus areas, you can apply
the triangle of application development.

<figure>
<img src="https://res.cloudinary.com/strich/image/upload/v1528653990/app-triangle_ijyc4r.jpg" alt="Application Triangle">
</figure>

You could still do great by leaning towards the edge of one of these and focusing
on that as a product like [Apple does with its product and application designs][2].
Despite the emphasy on design at Apple, they still provide a fairly good security
and functionality which makes their triangle conceptually like this:

<figure>
<img src="https://res.cloudinary.com/strich/image/upload/v1528653989/app-triangle-apple_qq0qwc.jpg" alt="Apple's Application Triangle">
</figure>

Even though they might have a perfect balance of security and functionality like the first
image in practice.

When placing little or no focus on design/usability, we risk losing our users to
competitors offering a better experience. A little focus on security means your users
aren't safe and while they might hop on your application at its early stage, they would
eventually leave if their data keeps getting compromised. With little focus on functionality,
why do you even call that an app? You only have a prototype of what mightsome day become an
application.

To build products with the balanced application triangle, we need some process in place.
For design consistency, a simple styleguide is needed. The styleguide defines the look of
things across the application. It should rules on typography, component sizing, and colors.

Here's an example of a simple styleguide:

<figure class="figure--fullwidth">
<img src="https://res.cloudinary.com/strich/image/upload/v1528912935/Styleguide_template_tk2ssp.jpg" class="image" alt="Styleguide template">
<figcaption>Styleguide template. Available in PSD <a href="https://www.dropbox.com/s/nt47frcvxxz74zw/Styleguide%20template.psd?dl=0">here</a></figcaption>
</figure>

I never thought color consistency would be a problem on a project until a recent project
I worked on where the designer gave different colors for the same component for each of
the mockups. Sticking to the typography rules in the styleguide during development also
guides the developer in the way they write their CSS, preventing unneccessary heading
styles.

**But when does a team make a styleguide?** A styleguide should be made in parallel or
before initial mockups of an application after wireframing. What comes after this should be
a pattern library. Pattern libraries are also known as living styleguides. If you've ever
used a CSS framework like Bulma, Bootstrap, or Foundation, then you've used a pattern
library. [I've always had strong opinions about CSS frameworks][3] and that's because they
are generic and bloated. In most cases, they have more than you need but you load it all
anyway. The major problem often encountered with these kind of frameworks is that the
design needs grow beyond them as an application grows, leading to overrides and repitition
of components already provided by the framework.

CSS Frameworks aren't always a bad choice. I only think they are wrong to use when trying
to build a growing product especially on a team large enough (2 or more) to have
designer(s). I'd recommend CSS frameworks if:

- You're building an application solely with little or no design skill
- You're building a static website that wouldn't need design changes in the future

Unlike the design styleguide, a living styleguide does more than just defining the look and
feel of an application. It conveys how markup should be used to build a component. It helps
both the designer and developer to conceptualize the application in components.

<figure class="figure--fullwidth">
<img src="https://res.cloudinary.com/strich/image/upload/v1528998015/styledown-shot_wzwu0p.png" alt="Styledown pattern lib generator" class="image">
<figcaption>Pattern library generated with styledown</figcaption>
</figure>

The example above was generated with [styledown][4]. The rise of SPA frameworks using the
[webcomponents][5] model (e.g Vue) and CSS-in-JS solutions for React like
styled-components, currently shapen our encapsulation of markup per component. We can have
much simpler living styleguides with components like:

```html
<Button primary>Hey</Button>
<Button success>Hey</Button>
<Button disabled>Hey</Button>
<Carousel />
```

On smaller teams, this can also eliminate the need for a pattern library.

[1]: https://teamgaslight.com/blog/what-is-a-living-style-guide
[2]: http://qr.ae/TUptpB
[3]: https://www.josephrex.me/what-happens-when-using-css-frameworks/
[4]: https://github.com/styledown/styledown
[5]: https://www.webcomponents.org/
