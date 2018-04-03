---
title: content shards - docs
layout: layouts/base.njk
tags: []
---

# Docs section

This section of the site collects together all the pages tagged with `docs` thanks to the nice filtering mechanics provided by [Eleventy](https://11ty.io). It can be regenerated and deployed independently of the rest of the site.

<ul class="listing">
{%- for page in collections.docs -%}
  <li>
    <a href="{{page.url}}">{{ page.data.title }}</a> -
    <time datetime="{{ page.date }}">{{ page.date | dateDisplay }}</time>
  </li>
{%- endfor -%}
</ul>
