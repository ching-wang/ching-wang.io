---
layout: post
title: How to Start a Static Blog with Jekyll
date: 2019-12-30
---

How to Start a Static Blog with Jekyll

## Why do I start my own blog

- Easy to maintain
- Easy to track with GitHub
- More flexible with style

Before I starting my blog, I was thinking of writing it on other platforms such
as Medium or Dev, as I have an account and read articles from both sites.

However, I decided that running the blog myself would be worthwhile in the long
term. By running it myself, I can customize the style and layout, and it is easy
to maintain with GitHub anyway. What is more, I can add more custom features in
future when I want to.

## Where and how to start

I started to build the blog pages with basic HTML and CSS when I started to
learn those a few months ago. I soon ran into some issues with maintaining a
consistent layout and style across different pages, which got repetitive.

I did some research and found that Jekyll could be a good solution. Jekyll
allows you to create your own themes or you can create your layout.

In this blog, I'm going to go through how I setup my static site with Jekyll.

## What is Jekyll?

According to [Wikipedia](<https://en.wikipedia.org/wiki/Jekyll_(software)>),
Jekyll is a "simple, blog-aware, static site generator for personal, project, or
organization sites."

## Set up Jekyll step by step

Instead of adding Jekyll to my existing blog pages that I built with HTML, CSS
and a few lines of JQuery, I started a new repository and moved the old files to
the new directory.

There are two things you need before starting.

- Ruby
- Jekyll Gem

Jekyll is provided by Ruby Gems, a package manager for Ruby which allows us to
install, update, maintain Ruby dependencies. Before you start anything, make
sure you have Ruby installed on your machine.

To check if you have Ruby and Ruby Gems installed, open your terminal and type:

```bash
ruby - version
```

```bash
gem -v
```

Let's start! I'm using Mac, so the following commands apply to Mac.

#### Install Jekyll

Open your terminal and input the following line:

```bash
gem install jekyll bundler
```

To verify if we have successfully install jekyll, in your terminal, type

```bash
jekyll -v
```

You should see a Jeykll version, in my case like this: `jekyll 4.0.0`.

#### Create a Site

Open your terminal, and enter:

```bash
jekyll new qing_blog
```

In my case, named my blog `qing_blog`.

Enter that directory, and you'll see some default files and folders.

Now in that directory, run this in your terminal.

```bash
bundle exec jekyll serve
```

This will start host on our local host.

```
Server address:
http://127.0.0.1:4000/
```

Now open that in your browser, and you'll see an example page on the new site.

Let's have a look at the file structure and find the example page. It's under
the `_post` folder. Under it, you can see a folder called `_site` which stores
and holds the compiled version of your website. You shouldn't edit these
files manually, as they will be automatically updated for you by Jekyll.

#### Create a Blog Post

By default, when we create a new site with Jekyll, there is already an example
blog in the `_post` folder. In my case it's
`2019-12-30-welcome-to-jekyll.markdown`.

By default, the filename starts the date that the site was created. Whenever you
start a new post, you have to keep the same naming convention of the date
followed by title of the blog, e.g.:

```
YYYY-MM-DD-my-title.markdown
```

This date is not necessarily the date you create
you blog, it can be any date that you would like to show on your post.

Let's create a new post. In the `_posts` folder, create a new file with the
naming convention above. Now if we run the server:

```bash
jekyll serve
```

...we should be able to see a new post that we have just created.

Of course, it's empty and unstyled right now, so let's add something. First up,
the new post needs to include front matter.

Front matter is the information that we store about the pages of our site.
The `layout` is the template that we use to display a given post.

```markdown
---
layout: "post"
data: "2019-12-30"
---
```

The "post" is the default layout attribute; you can define your own layout as
well, which I will talk about later.

If you don't assign a post date in the front matter, then Jekyll will grab it
from the file name.

I will go through more details about how to set up layouts in the next blog.
