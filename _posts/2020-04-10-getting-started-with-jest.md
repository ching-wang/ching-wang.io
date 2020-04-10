---
title: Getting started with Jest for software testing
layout: post
date: 2020-04-10
---

I have developed a few applications with Rails and React so far. However, up
till now I hadn't written any automated tests for my apps. I'm aware how
important tests are in software development, so I've started to learn
[Jest](<https://en.wikipedia.org/wiki/Jest_(JavaScript_framework)>).

The best way to remember what you have learn is practicing, and I also like to
write down my personal notes as I go. Here are some notes to myself about what
I've learnt about Jest for software testing today.

### How are test files identified?

In my setup, any files inside a folder named `__tests__` and with the extension
`.spec` or `.test` in their filename are considered tests.

_Examples:_

`\*.spec.js`

`\*.test.js`

`\__tests_/\*.js\`

You can set up any test file path pattern matching that you like in your
project's `package.json` file.

Prefixing the test folder with `__` is quite nice as it means it gets sorted
alphabetically to the top of the directory listing. That also means that new
tests and test changes appear at the top of every PR, which is a good ordering
for anyone reading through a PR (tests are a kind of documentation after all).

### Installing Jest in your project

You can install Jest via NPM like any other library:

```bash
npm install --save-dev jest
```

Note that it's a dev dependency. This means it's required for working on the
project, but not required by the project to run in production.

### Running tests with Jest

You can run the Jest executable directly, but most projects set up an NPM script
called `test` to run Jest in the project. Then you can just run this:

```bash
npm run test
```

The app I've been testing today is built with React, which has a wide variety of
components and other logic inside.

I encountered some issues when I tried to run `npm test` for the first time. The
first thing was the default test that you get out of the box when using React
scripts (`src/App.test.js`):

Here is the content:

```javascript
import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

This looks like a useful test to have -- it tries to render the entire App and
just confirms that there are no errors when doing so.

When I ran `npm test` for the first time, it detected that test file but threw
errors as it tried to run the test for the whole App. Unfortunately for me, I
hadn't been running this test as I developed my application, so Jest hit various
errors when trying to render it, even though it renders fine in real usage.

If I'd kept this test passing from the start then it would've been useful to
keep, but I decided that the effort required to fix it for a large-ish existing
React app was probably not worth it for a Jest beginner like me. At least I
learned the importance of adding and running tests from the start of a project,
rather than trying to add them later.

### Where should I put my test files?

It's best to keep tests in their own separate folder rather than alongside
implementation code. Why is that? I have read some articles about this question,
such as
[Organizing Tests in Jest](https://medium.com/@JeffLombardJr/organizing-tests-in-jest-17fc431ff850).

The consensus seems to be that it's best to keep the tests separate so that
the application structure is easier to follow, and you don't mix up production
code with testing code.

To conform with that, I would make a directory named `__tests__`, and then add
individual test files in there with whatever directory structure is convenient
to keep it clear. One simple approach is to mirror the directory structure of
your application's implementation code.

For example, if you want to test a function called `sanitiseQuery` in a file at
`src/common/util/sanitiseQuery.js`, then I would create a test file at
`src/__tests__/common/util/sanitiseQuery.test.js`. This keeps thing consistent
and makes it easy to find the relevant tests for each function or class in the
application.

#### An exciting moment: writing my first automated test!

The function I'm going to test is this:

```javascript
export const sanitiseQuery = (query) =>
  String(query)
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/, "")
    .split(/\s+/)
    .slice(0, 10)
    .map((word) => encodeURIComponent(word))
    .join("+");
```

It takes user input for a search query in my [What to Watch](https://wattowatch.netlify.com/) film wishlist app.
As the function name suggests, we want to sanitise the user input and make sure
we end up with a reasonable search query to send to the server.

The test I wrote for this function ended up like this:

```javascript
import { sanitiseQuery } from "../../../common/util";

describe("sanitiseQuery", () => {
  test("empty string", () => {
    const sanitisedQuery = sanitiseQuery("");
    expect(sanitisedQuery).toEqual("");
  });

  //test 1
  test("it should remove any spaces", () => {
    const sanitisedQuery = sanitiseQuery(
      "    THIS TEST IF    FOR MAKE   QUERY LOWERCASE   "
    );
    expect(sanitisedQuery).toEqual("this+test+if+for+make+query+lowercase");
  });

  //test 2
  test("it should make the query lowercase", () => {
    const sanitisedQuery = sanitiseQuery(
      "THIS TEST IS FOR MAKE QUERY LOWERCASE"
    );
    expect(sanitisedQuery).toEqual("this+test+is+for+make+query+lowercase");
  });

  //test 3
  test("only accept letters and numbers", () => {
    const sanitisedQuery = sanitiseQuery(
      ",./@@THIS TEST ONLY ACCEPT LETTERS AND NUMBERS"
    );
    expect(sanitisedQuery).toEqual("this+test+only+accept+letters+and+numbers");
  });

  //test 4
  test("it should split each word with '+'", () => {
    const sanitisedQuery = sanitiseQuery("this is a nice query");
    expect(sanitisedQuery).toEqual("this+is+a+nice+query");
  });

  //test 5
  test("limits to 10 words", () => {
    const sanitisedQuery = sanitiseQuery(
      "this test is for testing if the query can accept more than ten words"
    );
    expect(sanitisedQuery).toEqual(
      "this+test+is+for+testing+if+the+query+can+accept"
    );
  });

  //test 6
  test("random letters", () => {
    const sanitisedQuery = sanitiseQuery("thisisanicetest");
    expect(sanitisedQuery).toEqual("thisisanicetest");
  });
});
```

I tried to think of various important behaviours of this function and add tests
that covered them.

By writing and running this test, I was actually able to find a bug that I
wasn't aware of before. The tests failed on third test, which is
`"only accept letters and numbers"`.

Here is the error I got from the test:

```text
● sanitiseQuery › only accept letters and numbers

    expect(received).toEqual(expected) // deep equality

    Expected: "this+test+only+accept+letters+and+numbers"
    Received: ".%2F%40%40this+test+only+accept+letters+and+numbers"

      25 |       ",./@@THIS TEST ONLY ACCEPT LETTERS AND NUMBERS"
      26 |     );
    > 27 |     expect(sanitisedQuery).toEqual("this+test+only+accept+letters+and
    +numbers");
         |                            ^
      28 |   });
      29 |

```

Looking into it, I realised that the regex pattern used to replace anything
other than letters, numbers and whitespace was only applying once, rather than
globally. Oops! It seems like it's quite easy to forget the important `g` flag
on a regex that makes it apply unlimited times, rather than just once.

Here's the regex in question:

```regex
/[^a-zA-Z0-9\s]/
```

I fixed it by changing it to:

```regex
/[^a-zA-Z0-9\s]/g
```

The only difference is the `g` flag on the end. This means `global`, i.e. that
the regex will be applied an unlimited number of times, rather than just once.

After that, all test passed! Super!

```text
 PASS  src/__tests__/common/util/sanitiseQuery.test.js
  sanitiseQuery
    ✓ empty string (2ms)
    ✓ it should remove any spaces (1ms)
    ✓ it should make the query lowercase
    ✓ only accept letters and numbers
    ✓ it should split each word with '+'
    ✓ limits to 10 words (1ms)
    ✓ random letters

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        1.391s, estimated 2s
Ran all test suites.
```

I found it quite satisfying that I was able to find and fix an actual bug in my
first attempt at automated testing. It seems very worthwhile.
