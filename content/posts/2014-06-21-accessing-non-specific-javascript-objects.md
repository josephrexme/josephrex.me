---
author: Joseph Rex
comments: true
date: 2014-06-21T00:00:00Z
title: Accessing non-specific javascript object properties
url: /accessing-non-specific-javascript-objects/
tags:
  - javascript
---

If you are a regular JavaScript programmer, then you know that when you see an object like this

```js
var data = {name:'John Doe', gender: 'male'}
```

The best way to access the values of the object data will be to have it this way

```js
data.name //returns John Doe
data.gender //returns male
```

While working with Laravel for my back-end programming on my current project, I had cases where I received JSON objects as validation messages. The json being received is something like
<!--more-->

```js
{"message":"Validation Successful","id":"13"}
```

The message is always validation successful when the validation passes but when it fails, it creates an object of the particular field that failed as the content of my validation message, and then the actual message for the user to get is inside this object so it become something like

```js
{"message":{"slug":"The slug field is required"},"id":"13"}
```

When it's the username field that is omitted by the user, the following is returned

```js
{"message":{"user":"The username field is required"},"id":"13"}
```

With this, I can't just have a script like

```js
data.message.slug
//OR
data.message.user
```

because there are a lot more validation for my fields. Doing that will only land me in an unnecessarily long conditional statement.

I read about [Javascript Object Keys][1] and found I could access my object properties like so:

```js
var inobject = data.message
Object.keys(inobject);
Object.keys(inobject).forEach(function (key){
  //do whatever you want to do with the property here
  console.log(inobject[key]);
});
```

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
