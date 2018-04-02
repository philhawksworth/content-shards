---
layout: layouts/base.njk
pageClass: news
templateEngineOverride: njk, md
---

<h1>{{ title }}</h1>
<main>
  {{ content | safe }}
</main>
