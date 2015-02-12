---
title: CSS Sanitation
author: Joseph Rex
layout: post
permalink: /css-sanitation/
categories:
  - web
tags:
  - css
  - nodejs
  - web
---
I do a lot of back-end web development but front-end calls me a lot because of my passion for creativity. I've had to consider CSS files on various projects I've worked on. Some as front-end designer, some as back-end. On a project I'm working on, we've had various hands in the stylesheets and it has caused a lot of irrelevant rules in the CSS. Some global classes are not really been put to use and the CSS already contains over 6,500 lines of code already. Also, the fact that multiple frameworks are used on the present project, it lands us in a larger number of selectors.
<!--more-->

To clean up my unused rules I have picked on the following:

  * UNCSS -[ https://github.com/giakki/uncss][1]
  * Helium-CSS -<https://github.com/geuis/helium-css>

Uncss is really easy to install with npm. You should see this video on how to automate CSS cleanup with uncss <https://www.youtube.com/watch?v=833xr1MyE30>

 [1]: https://github.com/giakki/uncss