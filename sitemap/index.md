---
title: Sitemap
author: Joseph Rex
layout: page
permalink: /sitemap/
---
## Pages
<ul>
  {% for page in site.pages %}
    {% if page.title %}
      <li><a href="{{ page.url | prepend: site.baseurl }}">{{ page.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>

## Posts
<ul>
  {% for post in site.posts %}
    <li><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>