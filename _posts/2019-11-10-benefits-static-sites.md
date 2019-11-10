---
layout: post
title: Some Benefits of Static Sites
date: 2019-11-10
---

You might have noticed that this is a static website. Here are some reasons why
I chose a static website instead of a dynamic one.

## Fast to load

With a dynamic website like Wordpress, the page is generated when you make a
request to the server. The server has to do some work to load the content from
the database and render it into an HTML page.

With a static website, on the other hand, you generated all of the HTML files
once in advance. All the server has to do is serve the pre-generated HTML file
for a request. This is much less work, so it's a lot faster. You might notice
this when you visit a static site -- they often feel a lot faster.

This also has another benefit: the site can serve more requests at once without 
slowing down. This is handy if you are lucky enough to make the front page of 
[Hacker News](https://news.ycombinator.com/)!

## Cheap to host

Because the server has to do less work for each request, it's a lot cheaper to 
host a static site. You don't need a database or any other components; you just 
need to store and serve files.

AWS has a [free tier](https://aws.amazon.com/free/) for one year which I plan to
use. It lets you use [S3](https://aws.amazon.com/s3/) to host your static site
free for one year and then cheaply (as in pennies a year) after that.

## More secure

One problem with dynamic sites like Wordpress is that they often get hacked.
Because the content management and content serving are all in one system on the
server, it's  possible for a hacker to get access to the whole thing and make
changes on your live website.

With a static website, there is much less to be hacked. You can let Amazon
handle the security of the files they are hosting for you.

## Easy to maintain

Static sites can be easy to maintain, because you don't have to worry about
upgrades and server maintenance. The website is simpler so there is less to
maintain.

## Portable

Finally, it can be easier to port content from a static site system. All the
content is in plain markdown files rather than stuck in some database where it's
hard to transfer. This also means that you can use version control like Git to
track your content.
