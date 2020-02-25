---
title: Algodaily Day1 Reverse String
layout: post
date: 2020-02-25
---

Recently I have signed up [Alodaily](https://algodaily.com/) to do some coding task for fun and also practice my algoratheim skills. Here are some notes from my first coding task - **Reverse String**.

> Can you write a function that reverses an inputted string without using the built-in Array#reverse method? So, for example, calling:

> reverseString("jake") should return "ekaj".

> reverseString("reverseastring") should return "gnirtsaesrever".\*

Here is my solution with the build in methods.
First of all, we split the string to an array, and then we reverse the array, and then we join the array back to a string. done!

```javaScript
  function reverseString(str) {
    return str.split("").reverse().join("");
  }
```

They way algodaily did is reverse the string with a decrementing for loop

```javaScript
  function reverseString(str) {
  let newString = '';

	// start from end
  for (let i = str.length-1; i >= 0; i--) {
    console.log(newString, str[i]);
		// append it to the string builder
    newString = newString + str[i];
  }

	// return the string
  return newString;
}
```
