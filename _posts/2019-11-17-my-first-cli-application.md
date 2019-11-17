---
layout: post
title: My first CLI application using an API
date: 2019-11-17
---

This week is the third week of my Flatiron journey and last week we had a code
challenge. Students who pass the code challenge get paired up with one of their
peers and complete a CLI project together. Those who don't pass have to complete
the project on their own.

This is our chance to use everything we've learned in the past two weeks to
build something that can run and interact with the user. I was paired up with
Faris, a lively guy in our cohort who sits opposite me. After some discussion we
decided to build a stock trading application using a real stock price API
service. 

The process didn't go very smoothly at first but eventually we solved various
issues and completed the project. I enjoyed the pair programming and
learned a lot about how to collaborate with others, and know much more about git
work flow now.

In this blog, I'm going to focus on some of the problems I came cross when we
built this application.

First, though, let me quickly show you the models for the project.

The schema looks like this:

### 4 Models
```
│       ├── user.rb
│       ├── portfolio.rb
│       └── position.rb
│       └── stock.rb
```

## User Stories (CRUD)

 - As a user, I want to create a account (Create)
 - As a user, I want to view my portfolio (Read)
 - As a user, I want to view my account (Read)
 - As a user, I want to top up and withdraw my balance (Update account balance)
 - As a user, I want buy stock (Update position quantity and account balance)
 - As a user, I want to sell stock(update position quantity and account balance) 
 - As a user, I want to delete my account (Destroy account)


### Entity relationships

```ruby
class User
  has_one :portfolio
end


class Portfolio
  has_many :positions
  belongs_to :user  
end


class Stock 
  has_many :positions
end


class Position  # This is the join or pivot class for portfolio and stock.
  belongs_to :stock
  belongs_to :portfolio
end
```

### Database migrations

#### User table

```ruby
class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.integer :account_balance
      t.string :email
      t.string :password
      t.string :security_answer
    end
  end
end
```

#### Portfolio table

```ruby
class CreatePortfolios < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolios do |t|
      t.integer :user_id
    end
  end
end
```

#### Position table (join / pivot table for the Portfolio and the Stock table)

```ruby
class CreatePositions < ActiveRecord::Migration[5.2]
  def change
    create_table :positions do |t|
      t.integer :portfolio_id
      t.integer :stock_id
      t.integer :quantity, :null => false, :default => 0
    end
  end
end
```

#### Stock table

Note that there is no `price` column in the Stock table. Instead we used a
public stock price API to fetch live prices at runtime.

```ruby
class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :company_name
      t.string :symbol
    end
  end
end
```

### Some problems and mistakes we encountered  

1. We wrote a name format checker method which can identify if the name looks
like a reasonable name. We used a regex to solve this issue:

```ruby
  def name_format_checker
        if /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.match(@name)
        email_getter
        else
           puts "Oops! Looks like your name format is incorrect. Please try again."
           register
        end
    end
```

2. When I worked on the method for topping up the balance, I kept hitting this
error:  

```in `deposit': undefined method `+' for nil:NilClass (NoMethodError)```

The solution was to ensure both parts existed in the user class:

```ruby
def deposit(money_in)
    if money_in == nil
      money_in = 0
   end
   if self.account_balance == nil
      self.account_balance = 0
   end
   self.account_balance += money_in
   self.save  
end
```

I also made some changes on my user table, changing the data type for
account_balance from integer to decimal, and giving it a default value of 0.0.

```ruby
	class CreateUsers < ActiveRecord::Migration[5.2]
	  def change
	    create_table :users do |t|
	      t.string :first_name
	      t.string :last_name
	      t.decimal :account_balance,
	                :precision => 10, 
	                :scale => 2, 
	                :null => false, 
	                :default => 0.0
	      t.string :email
	      t.string :password
	      t.string :security_answer
	    end
	  end
	end
 ```

3. Formatting monetary amounts with two decimal places using `%.2f`

Example:

```ruby
def fmt_balance
	balance = 165
    '%.2f' % balance
  end

  #"%.4f" would print 165.0000
  #"%.2f" prints 165.00 rounded
```
The ".2" tells your "print" to print only the first 2 digits after the point.

4. top_up method issue: it was accepting a negative number for a top up.

This meant it deducted the amount from your account which of course doesn't make
sense. I solved this by checking if the deposit amount seemed valid before
processing it. 

Solution code:

```ruby
def handle_top_up
	@user.reload
	puts "How much would you like to top up? input a number please!"
	  deposit_amount = gets.chomp.to_f
	  if deposit_amount > 0     #check the deposit amount first
	    @user.deposit(deposit_amount)
	    puts ""
	    puts "You have sucessfully topped up $#{'%.2f' % deposit_amount}."
	    puts "You now have $#{@user.fmt_balance} in your cash account."
	    puts ""
	  else
	    puts "Invalid top-up amount!"
	  end
end
```

5. Withdraw method issue: when I first created the withdraw method, it let you
withdraw as much as you want regardless of your account balance, which of course
is a major bug!

To solve it, I had it check if the account balance has enough money first before
proceeding.

Example: 

```ruby 

 def account_valid?(money_out)
    money_out <= self.account_balance
  end

  def withdraw(money_out)
    self.account_balance -= money_out
    self.save  
  end

```

5. Issue with the database: the data in memory was not in sync with the
database.

I solved this by using the Active Record
`reload` method in each function that needed the latest state from the database.

You probably noticed that the `handle_top_up` function uses `reload` in this
way.

Here is another example:

```ruby
def view_current_stocks
    @user.reload
    stocks = Stock.all
    100.times do
        sleep 0.02
        @bar.increment!
      end
    puts "Stocks in the system:"
    puts ""
    tp stocks, "company_name", "symbol"
    puts ""
    input = @prompt.select(
        "Which stock are you interested in?",
        stocks.map { |stock| stock.symbol }
    )
    view_single_stock(input)
end
```

I used a public stock price API to fetch live prices on the real stock market,
provided by [Alpha Vantage APIs](https://www.alphavantage.co/).

I'll write another blog to share how I set up API for this application.
