---
title: "Welcome to the Blog"
description: "This is your first blog post"
pubDate: 2024-01-01
author: "Your Name"
tags: ["astro", "blog"]
---

# Welcome!

This is your first blog post. You can edit it or create new `.md` files in the `src/content/blog/` folder.

To query posts, use:
```astro
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
```
