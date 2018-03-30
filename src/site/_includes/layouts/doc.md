---
layout: layouts/base.njk
pageClass: docs
templateEngineOverride: njk, md
---

<h1>{{ title }}</h1>
<p class="date">
  Posted as an example, on <time datetime="{{ date }}">{{ date | dateDisplay }}</time>
</p>
<main>
  {{ content | safe }}
  <div class="footnote">
    <p>
      This page is part of the docs section.
    </p>
  </div>
</main>
