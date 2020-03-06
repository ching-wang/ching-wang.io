---
title: find VS find_by in Ruby
layout: post
date: 2020-03-03
---

_Notes to myself_

I've been reviewing ruby and ruby on rails that I've learnt a few months ago. There are a few concepts that I would like to write down to refresh my knowledge of ruby.

`find` and `find_by` are both ActiveRecord methods for [CRUD]("https://guides.rubyonrails.org/active_record_basics.html#crud-reading-and-writing-data"). According to Activerecord Doc, CRUD is an acronym for the four verbs we use to operate on data: Create, Read, Update and Delete. Active Record automatically creates methods to allow an application to read and manipulate data stored within its tables.

The difference between `find` and `find_by`:

> **find will return an error if not found**

> **find_by will return nil**

#### Let's have a look at them with examples:

## find

The find method will raise an ActiveRecord::RecordNotFound exception unless a matching record is found for all of the supplied primary keys.
Find operates with four different retrieval approaches:
**find(\*args)**

```ruby
#find the user with id 1
User.find(2)
# => #<User id: 1, username: "Qing" >

#find first, #find first, the last methods finds the first record ordered by primary key(default).
#For example:
User.find(:first, *args)
#find first shortcut
User.first


#find last, the last methods finds the last record ordered by primary key(defult).
#For example:
User.find(:last, *args)
#find last shortcut
User.last

#find all
User.all(:all, *args)
#find all shortcut
User.all

```

## find_by

The find_by method finds the first record matching some conditions.
For example:

```ruby
User.find_by(username: 'Qing')
# => #<User id: 1, username: "Qing">

User.find_by(username: 'Jenny')
# => nil

#The above code is equivalent as below:
User.find_by_username("Qing")

```

### Summary

The find(id) raises ActiveRecord::RecordNotFound exception when the record does not exist, whereas, the finder find_by(id: id) returns nil. Therefore, I would use use find_by(id: id) to avoid catching exceptions.
