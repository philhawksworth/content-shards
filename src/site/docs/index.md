---
title: content shards - docs
layout: layouts/base.njk
---

# docs shard

The pages found in in the docs section

<ul class="listing">
{%- for page in collections.docs -%}
  <li>
    <a href="{{ page.url }}">{{ page.data.title }}</a> -
    <time datetime="{{ page.date }}">{{ page.date | dateDisplay }}</time>
  </li>
{%- endfor -%}
</ul>
