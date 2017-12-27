---
author: Joseph Rex
title: Garbage Collection in V8
date: 2017-12-27T12:48:42-06:00
url: /v8-garbage-collection/
draft: true
tags:
  - uncategorized
---

In my last post on immutability, I explained how the mutation of string variable values isn't an actual mutation but a reassignment of a new value in the string. Because JavaScript Numbers and Strings are immutable, we can't actually mutate their values like we can with Arrays and Objects.
<!--more-->

When a variable is defined with a value, that value gets stored in memory then passes a reference to the variable, making the variable a pointer to the location of the data in memory. This only makes sense in my head right now so I'll try to make it a little less confusing to any reader and my future self with these images:
