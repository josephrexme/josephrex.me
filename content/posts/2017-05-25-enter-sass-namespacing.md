---
author: Joseph Rex
comments: true
date: 2017-05-25T00:00:00Z
tags:
  - frontend
  - sass
title: Enter Sass namespacing
permalink: /enter-sass-namespacing/
---

Sass has always been to me that one preprocessor that makes others not worth learning. I think stylus is quite okay but I've never used Less and I don't even know if it is spelled LESS or Less but we're not here to talk about less we are here to talk about more (pun intended). More features to the amazing Sass.
<!--more-->

Maintaining CSS has been at large scale has been an issue that's been brought up many times. Companies with well engineered programs unfortunately still have a hard time keeping a properly maintained CSS managed by multiple members in a team. Thanks to React and all the goodness that has come with it like CSS-in-JS, we've been able to thwart this problem to a great extent by [scoping styles with JavaScript][1].

Before [JSX][2], [CSS Modules][3], [Styled Components][4], [Glamorous][5] became the new buzzwords in webdev, we had Sass helping with most of our styling needs. This is in no way saying Sass is mutually exclusive of all of those tools. [You could use Sass with CSS Modules if you want to][6]. But Sass has been there and is still there. Most of the new approaches to CSS provide a baked in way to maintain CSS, avoid scoping conflicts, reduce specificity and do [even more][1].

But what happens with Sass now? Does it stay exactly the same till its only relevance is creation of compact [pens][7] like HTML preprocessors are mostly used? Will it be the end of Sass in production. The Sass project development is not as fast-paced as it once was. A lot of decisions have to be made for new features especially because the growth of Sass relies on that of CSS.

To solve maintainance problem in CSS we've seen OOCSS, RSCSS, SMACSS, and BEM. With BEM being the most adopted, we opt-in to create namespaced classes like *Block__element*. But as [Mark Dalgleish][8] had [said][1], this should be a baked-in feature like it now is with those CSS-in-JS tools but we have to opt-in to use it in non-SPA apps using Sass and can't leverage the benefits of CSS-in-JS.

To solve this, Sass doesn't really need to wait for CSS. The module system can be built to include namespacing but as [Chris Eppstein][9] [mentioned][10], it was delayed because of the switch from Ruby. Before getting aware of this, I'd raised [an issue][12] on creating a namespacing syntax for Sass. It was initially thought of as:

```scss
@import 'partial_file', 'my-namespace'
```

with this as an alternative option to specify the namespace from the module/partial:

```scss
@namespace 'my-namespace';

.foo{}
```

which would yield a CSS class as `.my-namespace__foo`. Then I soon realized the `@namespace` at-syntax was already being used in CSS which led to a change from that to this:

```scss
@module 'my-namespace';

.foo{}
```

As seen in the issue, this was closed without much consideration and before I could get into explaining myself. It could have been nice to at least be told the module system targeted for Sass 4 addresses namespacing.

This is not new as it's exactly what CSS-modules does. So the idea of concatenating classes to a namespace shouldn't hurt. I never really tried to use id(s) with CSS modules to know if it also namespace those but id(s) aren't so entertained in CSS anyway so a namespace system could ignore them completely leaving all the ids in a specified module just as they were written.

This module syntax is meant to just act like the ampersand (`&`) concatenation. making it possible to just add pseudo selectors, pseudo elements, attribute selectors/combinators, and any form of complex selector to it:

```scss
@module 'my-namespace';

:hover{
  color: darkgreen;
}
::after{
  content: '';
}
[title^="The"]{
  font-weight: bolder;
}
:first-letter{
  font-size: 3rem;
}
```

The biggest concern with this scoping for `@extend` and when you think of it, it is no concern at all. Or I could be missing something and be totally wrong but the way I think of this is that `@extend` only works in the same file/module/partial and if that's the case, extend operation is performed across the classes before the concatenation happens so if

```scss
@module 'my-namespace';

.foo{
  color: tomato;
}
.bar{
  @extend .foo;
  background: white;
}
```

we get the resulting CSS:

```css
.my-namespace__foo, .my--namespace__bar{
  color: tomato;
}
.my-namespace__bar{
  background: white;
}
```

<hr>

But Chris mentioned that the module system to be expected in Sass version 4 is heavily inspired by [dart][11]'s module system and its initial design phase is complete which means all of this may never actually come true. From Chris' statement from the [Sass team AMA][10] I derived that modules would act somewhat like mixins when imported. So here's what dart syntax looks like:

```dart
import 'package:angular2/angular2.dart';
import 'hero.dart';
@Component(
  selector: 'hero-detail',
  template: '''
    <div *ngIf="hero != null">
      <h2>{{hero.name}} details!</h2>
      <div><label>id: </label>{{hero.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name">
      </div>
    </div>''',
  directives: const [COMMON_DIRECTIVES],
)
class HeroDetailComponent {
  @Input()
  Hero hero;
}
```

With a library prefixed with `package:` in the import statement and for a local module within the file system the prefix is not required. That's like we already have in SCSS now except we don't have to specify extension.

It also have the following syntax for importing modules:

```dart
// import entire module with a namespace prefix
import 'first.dart' as myModule;
// import only foo from module
import 'first.dart' show foo;
// import everything except foo
import 'first.dart' hide foo;
```

This is definitely great and better than the earlier suggested `import 'file' 'myNamespace'` but how does it get used when imported? Since they are meant to work like mixins my thought is they should be in the following format instead of an automatic concatenation:

```scss
import 'components' show button;

@include button{
  .primary{
    background: skyblue;
  }
}
```

compiling to the following CSS `.button__primary{ background: skyblue }`. But these are all speculations and not even standard ones at that so I'm glad this is being worked on for version 4 and I look forward to it because now is the time Sass really needs to join the league of making CSS more maintainable.


[1]:https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660
[2]:https://facebook.github.io/react/docs/jsx-in-depth.html
[3]:https://github.com/css-modules/css-modules
[4]:https://github.com/styled-components/styled-components
[5]:https://github.com/paypal/glamorous
[6]:https://hashnode.com/ama/with-sass-team-cj0j8hjmy0005f5533xzd86xs#cj0krco1k000m1553mvthzqoi
[7]:https://codepen.io
[8]:https://twitter.com/markdalgleish
[9]:https://twitter.com/chriseppstein
[10]:https://hashnode.com/ama/with-sass-team-cj0j8hjmy0005f5533xzd86xs#cj0jwc58p00313n53ujyilglw
[11]:https://www.dartlang.org/
[12]:https://github.com/sass/sass/issues/2285
