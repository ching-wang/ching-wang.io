---
title: Build a Rails App from Scratch
layout: post
date: 2020-03-13
---

I have been thinking of building an online shop for a while. Today I have started to build it.

I'm going to record how I'm going to implement this App along the way as I build it.

Before starting anything else, I need to plan out the logic by creating user stories and then the models and relationships of the schema.

To start, I'm going to keep my user stories simple for now and will add more stretch features later on.

## User stories

- As a buyer, I want to sign up and login.
- As a buyer, I want to search for projects.
- As a buyer, I want to add an item to my basket.
- As a buyer, I want to checkout with my basket.
- As a buyer, I want to have an address book.
- As a buyer, I want to view my order history.
- As a staff, I can login and logout.
- As a staff, I want to CRUD a product.

## Models

### Buyer

- username
- email
- password_hash

### Address

- buyer_id
- line_1
- line_2
- city
- post_code
- country

### Order

- buyer_id
- address_id
- total_cost

We save the total_cost on the order, because we want a record of what the actual cost
was at that time. We don't want this to change if the price of the products changes later.

### Product

- sku
- image
- name
- price
- stock_count

This is a simple product model representing a class of physical object that we count stock for. If I want to have product options or variations, I might add a product_page model that can group multiple products on to a single page. The important thing is that each product is individual for stock-keeping and delivery purposes.

### Order_items

- image
- price
- order_id
- product_id

As with the order, we store the price on each order_item, as we want a record of it. It shouldn't update if the price of the product is subsequently changed.

### Staff

- email
- password

## Relationships

### User (buyer)

- A user has many orders.
- A user has many addresses.

## Address

- An address belongs to a buyer.

## Order

- An order belongs to a buyer.
- An order has many order items.

## Product

- A product has many order items.

## Order_items

- An order item belongs to an order.
- An order item belongs to a product.
