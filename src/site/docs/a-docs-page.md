---
title: A docs page
date: 2018-03-21
layout: "layouts/doc.md"
tags: "docs"
templateEngineOverride: "njk,md"
---

## There's not much here in the sample post page. Better get to work.

The common front-matter data for all of the files in the posts section are abstracted into a `posts.json` file so that we don't need to repeat that on every file. Handy.

It looks like this:

```
{
  "layout" : "layouts/post.md",
  "tags" : "post",
  "templateEngineOverride": "njk,md"
}
```


