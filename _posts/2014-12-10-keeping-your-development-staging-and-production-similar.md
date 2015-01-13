---
title: Keeping your development, staging, and production similar
author: Joseph Rex
layout: post
permalink: /keeping-your-development-staging-and-production-similar/
categories:
  - web
tags:
  - ethics
format: link
---
{% image dev-prod-parity.jpg class="head-image" %}
In this 12factor.net series, a major point for development process is discussed. Being a rails developer, you will likely start your development on the default sqlite database and you may get tempted to just use sqlite for your production as well. I use sqlite mostly for software and applications that are meant to run internally (i.e intranet) for organizations and I don&#8217;t think they should be used for regular web apps as they are stored to the disk and they consume data. For those that decide to give the gap and use sqlite only in development, then postgresql or MySql in production, it is not so recommended as well. See reasons why:

<http://12factor.net/dev-prod-parity>