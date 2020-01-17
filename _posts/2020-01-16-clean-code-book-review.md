---
title: Some initial points on how to keep your code clean
layout: post
date: 2020-01-16
---

I love reading, and I love reading fiction especially. Through reading I can get
into worlds that I never would have experienced otherwise.

However, since I started my course in Flatiron School, I have less time to spare
for reading fiction as I've been reading more technical books and blogs.

One of the books I'm reading at the moment is called "Clean Code": A Handbook of
Agile Software Craftsmanship” by Robert C. Martin. I've found some of the
concepts in it extremely helpful.

As a software engineering student in Flatiron School without any tech-related
background, I've been learning how to code from scratch. The concepts and tools
we have been given a large amount of labs (material) to study and practicing on.

We focus on the fundamentals of these skills with less time spent on
higher-level ideas. It was only when I started to read 'Clean Code' I realized
that how import to keep my code clean.

Here are some concepts / quotes I picked from the book that are especially worth
sharing:

> "Clean code can be read, and enhanced by a developer other than its original
> author, It has unit and acceptance tests. It has meaningful names. It provides
> one way rather than many ways for doing one thing. It has minimal dependencies.
> which are explicitly defined, and provides a clear and minimal API. Code should
> be literate since depending on the language, not all necessary information can
> be expressed clearly in code alone." - 'Big' Dave Thomas

> "You know you are working on clean code when each routine you read turns out to
> be pretty much what you expected. You can call it beautiful code when the code
> also makes it look like the language was made for the problems." - Ward
> Cunningham, Inventor of the Wiki

### Meaningful Names

Names matter. Giving meaningful names to classes, functions, variables and
arguments is a big deal.

> "Use Intention-Revealing Names"

The name of a variable, function or class should answer all the big questions.
It should tell you why it exists. what it does and how it is used. For example:

```ruby
const d // elapsed time in days
```

> “This name reveals nothing. We should choose a name that specifies what is being measured and the unit of that measurement:”

```ruby
const elapsedDays
```

> "Make Meaningful Distinctions"

We should avoid number-series naming, such as `a1`, `a2`, `mN`. These are the
opposite of intentional naming. They provide no clue as to the author's
intention.

We should also avoid using "noise words". Imagine that you have a `Stock` class.
If you have another one called `StockInfo` or `StockData`, you have made the
names different without making them mean anything different. In code, "Info" and
"Data" are indistinct noise words like `a`, `an`, and `the`.

> "Use Pronounceable Names. If you can't pronounce it, you can't discuss it
> efficiently or properly.""

> "Use Searchable Names. Avoiding use single-letter and numeric constants as
> they are not easy to locate across a body of text. For example, `e`, `2` are
> poor choice for any variable for which a programmer might need to search.

### Class Naming Rules

Use specific noun or noun phrase names like `Product`, `ProductPage`,
`AddressParser`. Avoid words like `Data`, `Info`, `Processor` in
the name of a class.

A class name should not be a verb.

### Function/ Method Naming Rules

Function or Methods are different from classes. They should have verb or verb
phrase names like `updatePoemList` , `deletePoem`,
`increaseLikesOnPoem`.

#### Bad code

```ruby
const d // elapsed time in days
```

#### Good code

```ruby
const elapsedDays
```

#### Number-series example:

```
 a1, a2, `mN`

```

#### Noise words

```ruby
 Stock
 StockInfo
 StockData

```

It's not easy to choose a good name and it requires good descriptive skills. I'm
working on improving this. Now when I give a name to a function or class, I
think about the above rules and try to find the most descriptive words.

We should bear this in mind being a programmer also means being an author.
Authors have readers. We are writing something for readers who will judge your
effort. It probably won't get read immediately but it will eventually.
