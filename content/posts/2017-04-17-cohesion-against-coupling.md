---
author: Joseph Rex
comments: true
date: 2017-04-17T00:00:00Z
tags:
  - software
title: Cohesion against coupling
url: /cohesion-against-coupling/
---

Coupling and Cohesion are two major principles for structured design in software. It's commonly heard that high cohesion and low/loose coupling leads to good software design. Cohesion is an act of sticking together. In physics cohesion gets contrasted against adhesion as the sticking together of particles of the same substance where adhesion happens with dissimilar substances. With this in mind we know that any 2 things can be put together and we could assume a cohesive code.
<!--more-->

Cohesion in software is a measure of function relationship within a module. Cohesion is brought up in the <abbr title="Object Oriented Programming">OOP</abbr> paradigm than any other paradigm because of the methods that make up a class which is usually what makes up a module. An object-oriented code is considered cohesive if its methods are closely related to each other with little or no dependency from external modules. I said earlier that cohesion and coupling make up structured design and structured design with structured analysis are used to analyze business requirements since they were invented by Larry Constantine. According to Wikipedia:

> In software engineering, structured analysis (SA) and structured design (SD) are methods for analyzing business requirements and developing specifications for converting practices into computer programs, hardware configurations, and related manual procedures.
> - [Structured analysis][1]

To meet business needs, developers create business specific tests for <abbr title="Behavior Driven Development">BDD</abbr> which would then define the related methods per class with each following the <abbr title="Single Responsiblity Principle">SRP</abbr>. It's known that a method needs to have a single responsibilty if you follow SRP already hence you could have the following class:

```js
class Chat{
  connectSocket() {}
  printLog() {}
  kickBanUser() {}
  spamIPverification() {}
}
```

While all these may be performing a single responsibility they are not related in any way. This is like adhesion in physics as described earlier where the class would be an adhesive substances that merges all sort of unrelated particles. This is also an example of low cohesion. It is about the relationship of responsibilities. Here's a cohesive version of the Chat class example:

```js
class Chat{
  pullChatThread() {}
  getOnlineStatus() {}
  sendMessage() {}
  addEmoji() {}
  sanitizeInputs {}
  updateChatThread() {}
}
```

The method names explain what the methods here are doing and you can think of how they are related to each other in order to make the chat work. If you fire up a chat, you want to be able to see past messages and the `pullChatThread()` method helps with that after which you may want to know the online status of the user. The `pullChatThread()` method might be calling that method within itself to let you know if the user is active to have a conversation with. You decide to send a message which invokes the `sendMessage()` method that sanitize your inputs with `sanitizeInput()` and could also call the `addEmoji()` method if you are using an emoji. Finally the method sends this message to a socket server with you as the sender and your sanitized input. The socket server replies with your message and any message from the other party which you can then use `updateChatThread()` to update the chat thread. This is basically how most chat applications work. And all that happen in very little time.

In Chapter 10 of Uncle Bob's [clean code][2], he says by introducing instance variables to be shared between methods of a class we make those methods cohesive to the class.

> Classes should have a small number of instance variables. Each of the methods of a class should manipulate one or more of those variables. In general the more variables a method manipulates the more cohesive that method is to its class. A class in which each variable is used by each method is maximally cohesive.

Now I'll introduce some instance variables to our chat class. In JavaScript you could add instance variables within the constructor as:

```js
class Chat{
  constructor() {
    this.currentUser = User.authenticated();
  }
}
```

or you could use the stage-2 proposed ES syntax of instance variables with [babel class properties plugin][3] which I'd prefer to use:

```js
class Chat{
  currentUser = User.authenticated();
  recipient = Conversation.of(currentUser).last.recipient;

  pullChatThread() {
    const thread = Conversation.between(
      this.currentUser,
      this.recipient,
      this.getOnlineStatus(this.recipient)
    );
    return thread;
  }

  getOnlineStatus(entity) {
    return entity.status() == 'active' ? true : false;
  }

  sendMessage(inputText) {
    const newMessage = this.sanitizeInput(inputText);
    this.pullChatThread();
    this.updateChatThread(this.addEmoji(message), this.currentUser, this.recipient);
  }

  addEmoji() {
    // ... Some magic happens here. It's Tahiti
  }

  sanitizeInput(text) {
    text.replace(/all evil things/, 'all that glimmers');
  }

  updateChatThread(...params){
    const message, sender, recipient = params;
    const socketUpdate = Socket.retrieveWithNew(sender, recipient, message);
    return socketUpdate;
  }
}
```

In this example you can see methods referencing methods and the instance variables for the current user and the recipient. The most cohesive method here is the `sendMessage()` as it makes use of `this.currentUser`, `this.recipient` and also the instance methods `this.addEmoji()` and `this.sanitizeInput()`. The least are the `getOnlineStatus()`, `sanitizeInput()` and `addEmoji()` which aren't referencing any other method directly. As a matter of fact those could become static methods instead of being instance method. There's a [eslint rule][4] to make sure such methods are made static.

Uncle bob suggested using instance variables but wasn't explicit enough about why so I'd try to explain. In a language that supports private methods, we may make such instance variables even private as they have nothing to do outside of the class. In JavaScript or any language without private methods, this values are of no use outside of the class so it's better to keep them as instance variables to add an extra layer of construction before invocation.

Cohesion can reduce the complexity of a module, increase usability, and system maintanability. It is of 8 major types. I'll only list them because [Wikipedia has done a good job at explaining them][5].

- Coincidental cohesion (worst)
- Logical cohesion
- Temporal cohesion
- Procedural cohesion
- Communcation/informational cohesion
- Sequential cohesion
- Function cohesion (best)
- Perfect cohesion (atomic)

<hr>

Coupling measures the degree of module interdependency as cohesion does for function interdependency within a module. A software is considered properly designed when it has loose coupling. Loose coupling goes with high cohesion and vice versa.

In previous examples, a chat module was used in building a chat application. Modules could really be anything beyond the scope of a class but to maintain simplicity we'd keep a class to a module. The chat module could use some lower coupling. Notice how we call an alien `Socket` class within the `updateChatThread()`?

We could improve this by making the user of the API to add the Socket class themselves when the Chat class gets constructed. Hence a [dependency injection][8].

```js
updateChatThread(...params){
  const message, sender, recipient, socket = params;
  return socket(sender, recipient, message);
}
```

Because the `sendMessage()` method invokes `updateChatThread()`, it still needs the socket but we are trying to avoid depending on the Socket module directly in our Chat module so we could once again apply dependency injection.

```js
sendMessage(...params) {
  const inputText, socket = params;
  const newMessage = this.sanitizeInput(inputText);
  this.pullChatThread();
  this.updateChatThread(this.addEmoji(message), this.currentUser, this.recipient, socket);
}
```

If `sendMessage()` gets called on instance its parameters would be like:

```js
myChatInstance.sendMessage('hello :)', Socket.retrieveWithNew);
```

We could further reduce the coupling of this by finding ways to take out the dependency of the Conversation class but I could also see reasons to keep that. It's great to write optimal code, reduce coupling and increase cohesion but we shouldn't put all the focus on this that we end up making our software inconvenient to maintain.

Balance is a big factor in software engineering and everything in life. You'd notice by reducing coupling we add more cohesion. The `sendMessage()` method had always used the `updateChatThread()` but now `updateChatThread()` also depends on it for the socket call. Like cohesion, coupling can also be broken down in types:

- Content coupling (high)
- Common coupling
- External coupling
- Control coupling
- Stamp coupling
- Data coupling
- Message coupling (low)
- No coupling

An example of data coupling is how we changed the use of a supposed `Socket` module to a parameter entry in the Chat module. The major reason why tightly coupled software is discouraged is that it increases [connascence][6] of system implementations i.e a change in one may lead to a ripple effect to have to change another. If the `Socket` module gets directly called in `Chat` module then the API for socket changes to use a `retrieve()` method instead of `retrieveWithNew()` we'd have to update the chat module too respectively. But now we have it such that our chat module is almost independent of changes from other modules.

Abiding by the [law of demeter (LoD)][7] would prevent the method change on the dependent Socket module. The law says:

- Each unit should have only limited knowledge about other units: only units "closely" related to the current unit
- Each unit should only talk to its friends; don't talk to strangers.
- Only talk to your immediate friends

Why speak with Socket who is a stranger? what is retrieveWithNew? I don't even know Socket enough to know it has a child named that. Socket is not my friend!

[1]:https://en.wikipedia.org/wiki/Structured_analysis
[2]:https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882
[3]:https://babeljs.io/docs/plugins/transform-class-properties/
[4]:http://eslint.org/docs/rules/class-methods-use-this
[5]:https://en.wikipedia.org/wiki/Cohesion_(computer_science)#Types_of_cohesion
[6]:https://en.wikipedia.org/wiki/Connascence_(computer_science)
[7]:https://en.wikipedia.org/wiki/Law_of_Demeter
[8]:https://en.wikipedia.org/wiki/Dependency_injection
