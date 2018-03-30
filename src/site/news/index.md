---
title: content shards - docs
layout: layouts/base.njk
---

# news shard

The pages found in in the news section

<ul class="listing">
{%- for page in collections.news -%}
  <li>
    <a href="{{ page.url }}">{{ page.data.title }}</a> -
    <time datetime="{{ page.date }}">{{ page.date | dateDisplay }}</time>
  </li>
{%- endfor -%}
</ul>
