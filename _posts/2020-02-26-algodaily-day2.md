---
title: Algodaily Day2 Array Intersection
layout: post
date: 2020-02-26
---

According to [Wikipedia](<"https://en.wikipedia.org/wiki/Intersection_(set_theory)">), in mathematics, the intersection of two sets A and B, denoted by A ∩ B, is the et containing all elements of A that also belong to B (or equivalently, all elements of B that also belong to A), and nothing else.

Given two unsorted arrays of integers, find intersection of these two arrays. Intersection means common elements in the given two arrays.

**For example**:

_A = [1,4,3,2,5,6]_

_B = [3,2,1,5,6,7,8,10]_

_intersection of A and B is [ 1,3,2,5,6 ]_

Here what we need to check is the presence of each element of the Array A in the Array B.
I'm going to use **filter()** and **indexOf()** to solve this.

```javascript
function intersection(arrayA, arrayB) {
  //filtered the elements in the array A that are also in the arrayB.
  const insersection = arrayA.filter(arr => arrayB.indexOf(arr) !== -1);
  return insersection;
}

//Let's test out
A = [1, 4, 3, 2, 5, 6];
B = [3, 2, 1, 5, 6, 7, 8, 10];

intersection(A, B);
// [1, 3, 2, 5, 6]
```

To check the presence we can also use **includes()**, it's slightly simpler compare with using indexOf.

```javascript
function intersectiona(arrayA, arrayB) {
  //filtered the elements in the array A that are also in the arrayB.
  const insersection = arrayA.filter(arr => arrayB.includes(arr));
  return insersection;
}

//Let's test out
A = [1, 4, 3, 2, 5, 6];
B = [3, 2, 1, 5, 6, 7, 8, 10];

intersection(A, B);
// [1, 3, 2, 5, 6]
```

One of Algodaily's solution is **using Set**, according to [MND web docs]("https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), Set objects are collections of values. You can iterate through the elements of a set in insertion order. A value in the Set may only occur once; it is unique in the Set's collection.

Here is the example from Algodaily, we transform our input arrays into sets, we can make use of the filter method, and apply it to one of the sets-- filtering out anything not in the other set.:

```javascript
  function intersection(nums1, nums2) {
  const set = new Set(nums1);
  const fileredSet = new Set(nums2.filter(n => set.has(n)));
  return [...fileredSet];

  }

//test
  A = [1, 4, 3, 2, 5, 6];
  B = [3, 2, 1, 5, 6, 7, 8, 10];
  intersection(A, B);
  //[3, 2, 1, 5, 6]
```

Her is the other solution from Algodaily:
```javascript
function intersection(nums1, nums2) {
	let intersection = {};
 //collect unique intersections by doing an indexOf check and then returning it in array form:
	for (const num of nums1) if (nums2.indexOf(num) !== -1) intersection[num] = 1;

	return Object.keys(intersection).map((val) => parseInt(val));
}

```
