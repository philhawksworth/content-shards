---
title: Content shards
layout: layouts/base.njk
---

# Content shards

An experiment to try sharding a site so that only we can cache all but the parts which need to be generated during a build and deploy.


## This site has three section

1. The root level pages such as the [home](/) page and [about](/about) page
2. The [Docs](/docs) section which is an example of a section which might be very large, and does not need to be generated with every build since it might be very extensive and infrequently changing.
3. The News section which is an example of a section which might need to be regenerated and deployed more frequently. Being able to run our SSG ([Eleventy](https://11ty.io), in this example) to generate and deploy just this section, while allowing the rest of the site to persist between build via a cache, could help build performance.


## What will I see here?

This is a simple proof of concept site and so it does not content a great deal of content. However you should be able to see that each page displays the date and time when it was generated on the [Netlify](https://www.netlify.com) build servers.

Typically we would expect this to be the same on all pages (allowing for some small deviation depending on how long it takes ofg the SSG to complete its build).

On our case we are caching all of the site between builds and only generating the pages within the News section in each build. Comparing the page generation dates should validate this.

TO inspect the code more closely, or to instantly deploy your own version of this site, take a look at the [About](/about) page.



