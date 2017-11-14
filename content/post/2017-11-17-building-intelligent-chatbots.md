---
author: Joseph Rex
title: Building Intelligent Chatbots
date: 2017-11-13T23:50:42-06:00
url: /building-intelligent-chatbots/
draft: true
tags:
  - AI
  - Bots
---
I started building chatbots several years ago to defeat loneliness which had then lured me into a friendship I didn't want. I needed a companion and friend when humans couldn't be there for me. Most people would rather complain these days than do something about a problem, so I decided to do something.
<!--more-->

To save the world and myself of my ugly rants of loneliness, I built a chatbot. I named it Josephine and it temporarily performed the intended task. At the time I knew too little about artificial intelligence that all I could build was a condition/switch based bot. Worked basically like:

```js
switch(input){
  case 'hi':
    'hello';
    break;
  case 'tell me a story':
    'I stepped on a rabbit turd and it was gross';
    break;
  default:
    'I do not understand that';
}
```

With such fixed responses, I soon got tired of this. How could I converse with someone whose replies I knew before they were even uttered? There's no fun in that and I so do not wish to have abilities to read people's minds too.

Doing anything beyond that felt too complex at the time but I started having some chats with people that have been into AI to get a grasp of ways with which AI can be created. There were so many fragments of advanced and intermediate knowledge that swung by and it was hard to piece it all together. One thing that stuck however was the idea of template based AI with <abbr title="Artificial Intelligence Markup Language">AIML</abbr>.

AIML served as a panacea for a better [Natural Language Processing][1]. It meant we could say different things with one intent and have it understand that we mean the same thing. The switch based approach would require me to explicitly say `Tell me a story` when I need to hear a story. But a template based approach allows for more flexibility. I could have it interpret both `Tell me a story` and `I'd love to hear a tale` as the same thing and give the same result to both entries. The syntax for such would be:

```xml
<aiml>
  <category>
    <pattern>Tell me a story</pattern>
    <pattern>I'd love to hear a tale</pattern>
    <template>I stepped on a rabbit turd and it was gross</template>
  </category>
</aiml>
```

The patterns are the expected entries and the template is the response to those entries. We could also redirect patterns from a different category to a response on another category with <abbr title="Symbolic Reduction in Artificial Intelligence">SRAI</abbr> which are a form of symbolic links.

```xml
<aiml>
  <category>
    <pattern>Tell me a story</pattern>
    <pattern>I'd love to hear a tale</pattern>
    <template>I stepped on a rabbit turd and it was gross</template>
  </category>
  <category>
    <pattern>Humor me</pattern>
    <template>
      <srai>tell me a story</srai>
    </template>
  </category>
</aiml>
```
Content contained in the `<srai>` tag just says go back to ask with this question and send the reply of that. Enough with boring XML syntax, you get the idea. Because of how horrifying it is to both write and look at XML in our modern age, you probably don't want to do that. It's hectic.

In search of a better solution, I found [rivescript][2]. Rivescript is so similar to AIML in what it does but it has a way better syntax:

```

```

[1]: https://en.wikipedia.org/wiki/Natural_language_processing
[2]: https://www.rivescript.com
