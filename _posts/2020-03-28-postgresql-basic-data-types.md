---
title: PostgreSQL Data Types
layout: post
date: 2020-03-28
---

I have been reviewing database to refresh my knowledge of SQL. I have used both
SQLite and PostgreSQL before. For my recent project
[What to Watch]("https://wattowatch.netlify.com/") I've used PostgreSQL as I was
planning to deploy it [Heroku]('https://en.wikipedia.org/wiki/Heroku'). Here are
some notes to myself about PostgreSQL.

## What is PostgreSQL?

PostgreSQL is a general-purpose object-relational database management system.

## Data Types

The full list of Data Types can be found here
[Data Type full list]("https://www.postgresql.org/docs/current/datatype.html").
I will only list some main PostgreSQL data types such as _Character_, _Number_,
_Serial_, _Temporal Data_, _Boolean_.

Here are some examples:

### Character

PostgreSQL offers three character data types: `CHAR(n)`, `VARCHAR(n)`, and
`TEXT`.

```TEXT
CHAR(n) - fixed-length character strings

VARCHAR(n) - Variable-length strings

TEXT - Strings of any length(unlimited length character string)
```

### Numeric

PostgreSQL supports two distinct types of numbers, `Integers` and
`Floating-point numbers`. Each of these type has several subtypes.

##### Integer subtypes

```TEXT
SMALLINT(Small integer) - 2-byte signed integer that has a range from -32,768 to
32,767.

INT(Integer) - 4-byte integer that has a range from -2,147,483,648 to
2,147,483,647.

Serial - It's the same as integer except that PostgreSQL will automatically
generate and populate values into the SERIAL column.

```

##### Floating-Point Number subtypes

In PostgreSQL there are three main types of floating-point numbers:

```TEXT
float(n) - is a floating-point number whose precision - is at least, n, up to a
maximum of 8 bytes.

real - is a 4-byte floating-point number.

numeric or numeric(p,s): is a real number with p digits with s number after the
decimal point. The numeric(p,s) is the exact number
```

### Temporal Data Types

Temporal data types store time-related information:
Data, time, timestamp, interval, timestamptz

### Boolean

Boolean data type includes _TRUE_, _FLASE_, _NULL_. Postgres is not limited by
storing only `true` and `false` values into boolean columns. In boolean columns
we can insert values like `1`, `0`, `t` or `f` and they will be interpreted as
`true` or `false`.

In my next post, I will give some instances with the data types listed above.
