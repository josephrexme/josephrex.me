---
title: Accessing non-specific javascript object properties
author: Joseph Rex
layout: post
permalink: /accessing-non-specific-javascript-objects/
categories:
  - web
tags:
  - javascript
  - jquery
  - json
  - oop
---
If you are a regular JavaScript programmer, then you know that when you see an object like this

<pre class="lang:js decode:true">var data = {name:'John Doe', gender: 'male'}</pre>

The best way to access the values of the object data will be to have it this way

<pre class="lang:js decode:true">data.name //returns John Doe
data.gender //returns male</pre>

While working with Laravel for my back-end programming on my current project, I had cases where I received JSON objects as validation messages. The json being received is something like

<pre class="lang:default decode:true">{"message":"Validation Successful","id":"13"}</pre>

The message is always validation successful when the validation passes but when it fails, it creates an object of the particular field that failed as the content of my validation message, and then the actual message for the user to get is inside this object so it become something like

<pre class="lang:default decode:true">{"message":{"slug":"The slug field is required"},"id":"13"}</pre>

When it&#8217;s the username field that is omitted by the user, the following is returned

<pre class="lang:default decode:true">{"message":{"user":"The username field is required"},"id":"13"}</pre>

With this, I can&#8217;t just have a script like

<pre class="lang:js decode:true">data.message.slug
//OR
data.message.user</pre>

because there are a lot more validation for my fields. Doing that will only land me in an unnecessarily long conditional statement.

I sought for my best friend &#8220;Google&#8221; and he showed me <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys" target="_blank">Javascript Object Keys</a>. With Javascript object keys, I could access my object properties like so:

<pre class="lang:js decode:true">var inobject = data.message
        Object.keys(inobject);
        Object.keys(inobject).forEach(function (key){
          //do whatever you want to do with the property here
          console.log(inobject[key]);
        });</pre>

Whew! That&#8217;s awesome right! Did I solve your problem. Give me a feedback tweet on <a href="http://twitter.com/joerex101" target="_blank">@joerex101</a>