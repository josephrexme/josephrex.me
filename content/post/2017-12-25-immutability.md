---
author: Joseph Rex
title: Immutability
date: 2017-12-25T06:42:56-06:00
url: /immutability/
tags:
  - functional programming
  - javascript
---

I started a [series on functional programming][1] on the [X-Team blog][2] with a goal to make the perplexing functional paradigm in JavaScript fathomable. [Immutability][3] plays a vital role in creating pure functions for functional programming and it was only covered in brief.
<!--more-->

After bringing up the topic of immutability in a slack conversation, the first response I got was this:

![Immutability conversation](https://res.cloudinary.com/strich/image/upload/v1514070403/immutability_jxhqpz.jpg)

The use of the `const` keyword in modern JavaScript has been assumed by many as a way to preserve immutable data. This notion is right to an extent but wrong in regards to the way functional programmers perceive immutable code.

The problem with the `const` keyword is that it doesn't create immutable values but rather, it creates immutable assignments which are only of little benefits when compared to value immutability. Here's what I mean:

```js
const foo = 'I am Thor the god of thunder'
foo += ' and my brother Loki is the god of mischief'

console.log(foo) // I am Thor the god of thunder
```

The operation above is the same as

```js
const foo = 'I am Thor the god of thunder'
foo = 'I am Thor the god of thunder and my brother Loki is the god of mischief'

console.log(foo) // I am Thor the god of thunder
```

and both will raise reassignment errors. Whereas, `foo` will be successfully reassigned if we had used `var` or `let`. This (`const`) is good for primitive types (null, undefined, number, string) with already immutable values, but it can't help much when using Arrays and Objects

```js
const bar = ['Thor', 'Asgard']
bar[0] = 'Loki'

console.log(bar) // ['Loki', 'Asgard']
```

```js
const Odin = {
  hela: 'death',
  thor: 'hammer',
  loki: 'mischief'
}
Odin[thor] = 'thunder'

console.log(Odin) // {hela: 'death', thor: 'thunder', loki: 'mischief'}
```

Complex datatypes get mutated because they can be modified without reassignment. Pure functions can't operate on array or object inputs without safely cloning them first, as I've explained in the [functional programming primer][1].

To achieve value immutability with object values, we can simply apply a freeze.

```js
const bar = Object.freeze(['Thor', 'Asgard'])
bar[0] = 'Loki'

console.log(bar) // ['Thor', 'Asgard']
```

In strict mode, reassignment attempts will raise a type error. This solves small usecases as a shallow freeze. It is shallow because this can still be done

```js
const avengers = Object.freeze(['Captain America', 'Iron Man', 'Black Widow', ['Thor', 'Loki']])

avengers[3][0] = 'Spiderman'
avengers[3][1] = 'Antman'

console.log(avengers) // ['Captain America', 'Iron Man', 'Black Widow', ['Spiderman', 'Antman']]
```

Languages with truly deep immutability usually offer persistent data structures like List, Stack and more types that inherently provide deep immutability. We can employ libraries like [immutable.js][4], [mori][5] and [seamless-immutable][6] to get some of those benefits in JS without having to reinvent the wheel.

An obvious benefit of immutability in functional programming is in how it helps in maintaining/creating purity in functions. But it's just as much an important factor for [thread safety][7] and an aid for [memoization][8].

Even when the languages we use are not strictly immutable, by trying to reduce the immutability throughout our code, we end up with an easier to maintain and debug code. [Loose coupling][9] goes in tandem with immutability in a lot of cases.

Happy Holidays 🎄🎅🏽🥛

[1]: https://x-team.com/blog/functional-programming-primer/
[2]: https://x-team.com/blog/author/joseph
[3]: https://en.wikipedia.org/wiki/Immutable_object
[4]: https://facebook.github.io/immutable-js/
[5]: https://github.com/swannodette/mori
[6]: https://github.com/rtfeldman/seamless-immutable
[7]: https://en.wikipedia.org/wiki/Thread_safety
[8]: https://en.wikipedia.org/wiki/Memoization
[9]: https://www.josephrex.me/cohesion-against-coupling/
