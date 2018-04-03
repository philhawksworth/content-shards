# Content Shard

This example site is intended as a proof of concept for content sharding and using an intra-build cache on Netlify.


## Instructions

To get your own instance of this example site cloned and deploying to Netlify very quickly, just click the button below and follow the instructions.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/philhawksworth/content-shards)


## Wait, what happens when I click that button?

Good question. Here's what it will do...

1. Netlify will clone the git repository of this project into your Github account. It will be asking for permission to add the repo for you.
2. We'll create a new site for you in Netlify, and configure it to use your shiny new repo. Right away you'll be able to deploy changes simply by pushing changes to your repo.
3. That's it really.


## Deployments

Generating anf deploying the site happens automatically following any push to your site repository (once this is configure as a new site in Netlify via the steps above).

You can target which part of the site to rebuild and deploy by specifying that in the `netlify.toml` file when you push. The options are:

- `command = "yarn run build:site"` to rebuild the entire site
- `command = "yarn run build:news"` to rebuild just the news section of site and use cached assets from the previous build for everything else
- `command = "yarn run build:docs"` to rebuild just the docs section of site and use cached assets from the previous build for everything else

A full site build must have taken place at some point on order for any of the partial builds to subsequently be successful.

