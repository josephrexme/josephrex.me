---
date: 2017-06-16T06:29:06-05:00
title: Predicting and prefetching to improve UX
url: /predicting-and-prefetching-to-improve-ux/
draft: true
tags:
  - UX
  - performance
---

One of the biggest reasons why single page apps (SPA) are very common in the web industry today is because of how fast navigation can be from it. Besides the decoupling of server-side logic for client-side engineering focus, SPAs have improved performance of web apps greatly by saving users from waiting for server responses before pages are rendered.
<!--more-->

By pinging the server only when in need for extra uncached data, page loads are incredibly fast. But even SPAs suffer from loading static assets slowly the first time a page/view is rendered. There are solutions like image compression or use of progressive JPEGs to improve the experience but what if we could make it even better?

