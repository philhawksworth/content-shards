---
layout: layouts/base.njk
pageClass: docs
templateEngineOverride: njk, md
---

<h1>{{ title }}</h1>
<main>
  {{ content | safe }}
</main>
