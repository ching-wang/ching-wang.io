---
title: Twitter Card and OpenGraph with Jekyll
layout: post
date: 2020-04-22
image: "/assets/post_image/twitter_card_post_image.png"
---

Today I added Twitter Card and OpenGraph markup to my blog, and I would like to
share how I did it. My blog site is built with Jekyll, I had two options for
Twitter Cards and OpenGraph tags. Option #1 is installing the
[jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag) plugin, which can
automatically add metadata tags for search engines and social networks to better
index and display your site's content. Option #2 is adding the Twitter Card and
OpenGraph Markup directly in your layout file, e.g. `head.html`. I will show you
both methods here.

## Option 1 with Jekyll SEO plugin

### Step 1 - Install Jekyll SEO plugin

Add the following to your site's Gemfile:

```text
gem 'jekyll-seo-tag'
```

Add the following to your site's `_config.yml`:
plugins:

```text
_jekyll-seo-tag
```

My `_config.yml` look like this:

```text
plugins:
  - jekyll-seo-tag
```

Add the following before `</head>` in the appropriate layout template file:

```html
{% raw %}{% seo %} {% endraw %}
```

I included it in my `head.html` file like this:

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="ie=edge" />
<link
  href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700&display=swap"
  rel="stylesheet"
/>
<link rel="stylesheet" href="/assets/css/style.css" />
<link rel="icon" href="/assets/favicon.png" type="image/png" />
{% raw %} {% seo %} {% endraw %}
```

### Step 2 - Define variables in `_config.yml`

```markdown
---
title: Ching Wang
tagline: Junior Fullstack Software Engineer
description: Blog of Ching Wang, a Fullstack Software Engineer based in London.
  React, JavaScript, Ruby, Rails, Python, Flask, Jest, SASS / CSS, postgreSQL.
url: https://www.ching-wang.io/
Author: Ching Wang
image: "/assets/img/Ching-Wang-Profile.jpg"
lang: en_GB
twitter:
  username: ching_wang_io
  card: summary
---
```

### Step 3 - Include the following variables in page-level markdown files

Examples of my page-level markdown frontmatter:

#### index.markdown

```markdown
---
title: Ching Wang \| Blog \| Junior Fullstack Software Engineer
layout: home
author: Ching Wang
image: "/assets/img/Ching-Wang-Profile.jpg"
---
```

#### Project.markdown

```markdown
---
layout: page
title: My Projects
permalink: projects/
author: Ching Wang
image: "/assets/img/what-to-watch.png"
description: "A list of my software engineering projects, built with technologies including JavaScript, React, Python, Flask, Ruby on Rails, postgreSQL and AWS."
---
```

#### hire-me.markdown

```markdown
---
layout: page
title: Hire me \| Junior Fullstack Software Engineer, London
description: >
  "I am available to start immediately as a Junior Fullstack Software Engineer in London. I’m a self-starter, with energy, enthusiasm and passion for problem solving and learning new things. I can bring a breadth of business experience and pragmatism from my previous roles in the sourcing and shipping industry."
permalink: hire-me/
author: Ching Wang
image: "https://images.unsplash.com/photo-1544980919-e17526d4ed0a"
---
```

All done! As you can see, using the Jekyll SEO plugin is pretty simple.

## Option 2: without Jekyll SEO plugin

### Step 1: Define variables in `_config.yml`

```markdown
---
title: Ching Wang
description: Blog of Ching Wang, a Fullstack Software Engineer based in London.
  React, JavaScript, Ruby, Rails, Python, Flask, Jest, SASS / CSS, postgreSQL.
url: https://www.ching-wang.io/
Author: Ching Wang
image: "/assets/img/Ching-Wang-Profile.jpg"
lang: en_GB
twitter_username: ching_wang_io
---
```

### Step 2 - Include the following variables in page-level markdown files

One example of my page-level markdown:

#### index.markdown

```markdown
---
layout: page
title: My Projects
permalink: projects/
author: Ching Wang
image: "/assets/img/what-to-watch.png"
description: "A list of my software engineering projects, built with technologies including JavaScript, React, Python, Flask, Ruby on Rails, postgreSQL and AWS."
---
```

### Step 3 Include Twitter Card and OpenGraph meta tags

Now you update `head.html` with the variables that we just defined in
`_config.yml` and the page-level markdown files.

E.g. in `_includes/head.html`:

```html
<meta
  name="twitter:site"
  content="@{% raw %}{{site.twitter_username }}{% endraw %}"
/>
<meta
  name="twitter:creator"
  content="@{% raw %}{{ page.author }}{% endraw %}"
/>
<meta name="twitter:title" content="{% raw %}{{ page.title }} {% endraw %}" />
<meta
  name="twitter:description"
  content="{% raw %} {{ page.description }} {% endraw %}"
/>
<meta name="twitter:image" content="{% raw %}{{ page.image}} {% endraw %}" />

{% if page.summary %}

<meta
  name="twitter:description"
  content="{% raw %}{{ page.summary }}{% endraw %}"
/>
{% else %}
<meta
  name="twitter:description"
  content="{% raw %}{{ site.description }}{% endraw %}"
/>
{% endif %} {% if page.image %}

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="{{ site.baseurl }}{{ page.image }}" />
{% else %}
<meta name="twitter:card" content="summary" />
<meta name="twitter:image" content="{% raw %} {{ site.image }}{% endraw %}" />
{% endif %}
```

You can find more information on
[developer.twitter](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary)
and [SEO
TAG](https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/usage.md)
