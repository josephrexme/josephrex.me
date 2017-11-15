---
author: Joseph Rex
title: Building Intelligent Chatbots
date: 2017-11-15T05:40:17-06:00
url: /building-intelligent-chatbots/
tags:
  - AI
  - bots
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
+ Tell me a story
- I stepped on a rabbit turd and it was gross
```

Anyone would pick that over XML syntax. Wildcards can be used as it can with AIML to create a bot that acts like Eliza or Alice. The SRAI syntax in rivescript is as simple as:

```
+ Tell me a story
- I stepped on a rabbit turd and it was gross

+ Humor me
@ Tell me a story
```

To vary the responses you can add different replies

```
+ Tell me a story
- I stepped on a rabbit turd and it was gross
- What did the buffalo say to his son leaving for college? Bison
- There once lived a beautiful maiden who wanted to marry for love
```

Now when told `Tell me a story`, your bot can reply with any of the responses set. This solves the problem of fixed responses but at some point you will know all the possible responses and get bored again.

### Introducing APIs
To get APIs to work properly with rivescript you need to be able to process the queries asynchronously. For this, it should be able to return promises. Sadly, rivescript hasn't implemented promise replies up to the time of this writing so I had to make [rivescript-promises][3] from a fork with some help from [@genericallyloud][4].

I started by hooking up a weather API, wikipedia API for the definitions of anything, and more. After a while, I thought of leveraging the <abbr title="Natural Language Processing">NLP</abbr> of IBM Watson for an improved experience with common conversation patterns. This addition meant I could now take APIs directly hooked to rivescript and hook them up with Watson instead. Especially the ones that may have different input patterns.

The weather API is a good example of this. A person could express that they want to know the weather with any of these 3 statement constructs: `What's the weather like in Milwaukee?`, `Is the weather okay in Madison?`, `How is the weather in Paris?`. There could be more that I can't think of. Hence, I can't program all the possible inputs or predict them through the flexible patterns of rivescript. This makes a good use for Watson.

Watson language processing is split into 3 categories:

- Intents
- Entities
- Dialog

An intent expresses the intention of the user passing in inputs. To increase the likelihood of matching inputs with their desired responses, you can train the AI with different ways to express that one intent. This would increase the range of possible intents that the chatbot can now interpret including the ones you have not specified.

Entities are like keywords to be picked out of a user input. For the weather API, every location name is set as an entity so if the bot sees a location specified in the statement, it tries to see if it is any close to the trained set of intents and responds.

The dialog is simply the responses to give when an input is matched. The addition of Watson makes it all beautiful but there are things that are better not kept in Watson which is why [Sia][5], my creation from these technologies, is an hybrid using about 25% of Watson and being mostly powered by my [rivescript-promises][3].

Here's a sample conversations with Sia:

<figure>
<img src="https://cdn.rawgit.com/josephrexme/sia/7aaa9f8b/data/conversation.jpg" alt="Sia in a conversation">
</figure>

and the capabilities go beyond what's conveyed in the figure. Different instances of Sia currently runs on 4 slack teams. The goal is to have a single instance be omnipresent in various channels of the internet including Slack, Twitter, Facebook, and anywhere at all.

It doesn't end there. While it has been easier to implement [backpropagation][6] and [LSTM][7] for machines to learn games and play better than human, language is rather complex. Even we humans haven't decided on what's right or wrong in our society - It's a foggy area, so how do we build machines that can independently think and be conscious with a proper sense of rights and wrongs? Hopefully we'd get there soon and I'll keeping exploring possibilities with Sia till I can reproduce a world of blade runner with her.

[1]: https://en.wikipedia.org/wiki/Natural_language_processing
[2]: https://www.rivescript.com
[3]: https://github.com/josephrexme/rivescript-promises
[4]: https://twitter.com/genericallyloud
[5]: https://github.com/josephrexme/sia
[6]: https://en.wikipedia.org/wiki/Backpropagation
[7]: https://en.wikipedia.org/wiki/Long_short-term_memory
