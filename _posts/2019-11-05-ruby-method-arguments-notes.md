---
layout: post
title: Notes on Ruby method arguments
date: 2019-11-05
---

### How to use method arguments properly in Ruby?

Questions about Ruby methods and arguments that I had when I started to
learn programming.

1. Why do we need methods? 
2. What do they do? 
3. How to use them?
4. What are parameters?
5. What are method arguments?

Here's one analogy for Q1 and Q2: a method is like a machine and the method
arguments are the raw material for the machine. Remember that every method
returns a value: in this analogy, the value the method returns is the finished
product that the machine produces.

### What are parameters and what are method arguments? 

Just to clarify, parameters and arguments are closely related concepts but
technically they are different. A **parameter** is the thing a method defines
as its requirement, and an argument is what is passed for that paramter.

In practice, though, most people use the words argument and parameter
interchangeably. 

### You can pass arguments with or with parentheses

E.g.

```ruby
def greeting name
	puts "Hello #{name}!"
end
```

### You can choose to call a method with or without arguments

From the example you can see that the value came out exactly the same.
However, I prefer to leave parameters explicit to make my code more readable.

### How many types of arguments are there?

You can group arguments into 3 types:

1. Standard required arguments
2. Default argument /Optional Parameters 
3. Keyword Arguments (some people call it name arguments)

#### Standard required arguments

```ruby
def print_full_name(first_name, last_name)
  puts first_name + " " + last_name
end

print_full_name("Qing", "Wang") => Qing Wang

print_contact_address("Qing")

#ArgumentError: wrong number of arguments (given 1, expected 2)
```

When you call the method, you have to pass exact number of required arguments.
Otherwise, you will get an error like this: `ArgumentError: wrong number of
arguments...`

### Can we only provide one argument when calling the method?

The answer is yes.

Paramters can have default values. As the name suggests, you set a default
value, which will be used if none is provided when the function is called.

It’s easy to add default argument: you just assign it with `=` like a
variable. Also, there is no limit on how many default arguments you can have on a function.

#### Default arguments

```ruby
def movie(title, lang = "EN")
  puts title
  puts lang
end

#  call mothod:
movie("Spider-Man") #=> 
Spider-Man
EN



def greeting(name,language="python")
  puts "Hi #{name}, I've heard that you are a great #{language} programmer"
end

#when you call the method without passing two argument, instead an error we got the default value "pathon"

#call the method:
greeting("Qing") #=>

Hi Qing, I've heard that you are a great python programmer.
```

#### Named aruments or Key arguments

Method arguments can be defined on the method in any order; the parameters
must then be passed in the same order.

Alternatively, you can use named keyword arguments, for example:

```ruby
def print_person_details(name:, city:, job:)
  puts "my name is #{name}, I live in #{city} and I am a #{job}"
end

#call the method:
print_person_details(city:"London", job:"Programmer", name:"Qing")

=> "my name is Qing, I live in London and I am a Programmer"
```
