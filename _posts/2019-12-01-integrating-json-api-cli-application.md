---
layout: post
title: Integrating a JSON API into my CLI application
date: 2019-12-01
---

As I mentioned in [a previous post]({% post_url
2019-11-17-my-first-cli-application %}), the CLI application I worked on for my
Flatiron course involved a JSON API. I used a public stock price API to fetch
live prices on the real stock market, provided by [Alpha Vantage
APIs](https://www.alphavantage.co/).

## Implementing the API class

I added a `StockPriceService` class to act as the interface to the API for the
rest of the application.

The `StockPriceService` takes the API key in its initializer:

```ruby
def initialize(api_key)
  @api_key = api_key
end
```

This avoids hard-coding the API key, and means we can take it from config.

One method grabs the whole series of daily prices for a given stock symbol:

```ruby
def time_series_daily(symbol)
  content = open("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{symbol}&apikey=#{@api_key}").read
  JSON.parse(content)
end
```

Calling that method gives us a big hash like this:

```json
{
  "Meta Data": {
    "1. Information": "Daily Prices (open, high, low, close) and Volumes",
    "2. Symbol": "MSFT",
    "3. Last Refreshed": "2019-11-29",
    "4. Output Size": "Compact",
    "5. Time Zone": "US/Eastern"
  },
  "Time Series (Daily)": {
    "2019-11-29": {
      "1. open": "152.1000",
      "2. high": "152.3000",
      "3. low": "151.2800",
      "4. close": "151.3800",
      "5. volume": "11977300"
    },
    "2019-11-27": {
      "1. open": "152.3300",
      "2. high": "152.5000",
      "3. low": "151.5200",
      "4. close": "152.3200",
      "5. volume": "15201293"
    },
  },
}
```

The rest of the application is actually only interested in the _latest_ price
for a given stock, though, so I added another method on top of
`time_series_daily` to do that:

```ruby
def latest_price_for_symbol(symbol)
  if !@@price_cache.include?(symbol) 
    time_series = time_series_daily(symbol)["Time Series (Daily)"] 
    recent_day, recent_day_data = time_series.first  
    close_price = recent_day_data["4. close"] 
    @@price_cache[symbol] = close_price.to_f
  end
  @@price_cache[symbol]
end
```

It gets the big hash shown above, and then pulls out the most recent price from
that JSON structure.

Also note the `price_cache` class variable. Using a class variable for this
might not be ideal in some ways, but it made it easy to ensure that the stock
prices get cached for the lifetime of the application. That means we don't have
to fetch them multiple times over the network, as network is slow.

## Using the API class

The main CLI application class initializes an instance of `StockPriceService`
during application start-up, like this:

```ruby
@price_service = StockPriceService.new(ENV["ALPHAVANTAGE_KEY"])
```

Note how the API key is pulled from `ENV` so that we don't have to hard-code it.
That also avoids accidentally committing the API key, which should be secret,
into the Git repository where it might get leaked.

Now the CLI application is able to easily get the latest price for a given stock
symbol, using real stock market data provided by the JSON API.

For example, when showing the user their current stock positions and their
value, we have:

```ruby
positions.each do |p|
  price = @price_service.latest_price_for_position(p)
  puts "
Company: #{p.stock.company_name}
- Shares: #{p.quantity}
- Price: $#{'%.2f' % price}
- Value: $#{'%.2f' % (price * p.quantity)
}
"
end
```

Note that `latest_price_for_position` is another helper method I added to make
this easier to use. It calls `latest_price_for_symbol` using the stock symbol of
the given position.
