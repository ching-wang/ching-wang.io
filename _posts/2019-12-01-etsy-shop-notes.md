# Etsy Shop

## Models
User
 - name
 - Email
 - Password
 - (buyer)has many orders

Product
 - Name
 - Description
 - Price
 - Stock_count
 - has_many :tags
 - has_many :tag through: :product_tag
 - has many reviews
 - Belongs to User (seller) (optional)


 product_tag
 - product_id
 - tag_id 


 Tag
 - name
 - has_and_belongs_to_many :products


Order
 - buyer_id
 - address_id
 - product_id
 - product_price
 - Has many Order Items
 - belongs to product 
 - Has delivery address details
 - Belongs to User (buyer)
 Gets made from Cart when order is submitted


Order Item
  - order_id
  - product_name
  - description

 - Belongs to Order
 - Copy of Product information (name, description, price) at time of purchase (in case product gets changed, we don't want to change past orders)
 - Gets made from Cart Item when order is submitted 

 Review
 - Belongs_to_user(buyer)
 - Belongs_to_product
 - content 


## General process

 - Seller user creates a product
 - Buyer user adds the product to their Cart as a Cart Item
 - (Above steps could be repeated for different products)
 - Buyer submits their order
 - Order and Order Item get made from Cart and Cart Item (copying):
 - Cart -> Order
 - Cart Item -> Order Item
 - Empty the cart
 - Product stock gets reduced
 - Seller cash balance gets increased
 - Buyer cash balance gets reduced

## Extra features

 - Seller user can view the orders they need to dispatch
 - Buyer user can view their purchase history
 - Buyer user can leave review for seller user

 ## Instant Buy 

## If we want to make it simpler

Don't have seller users, only buyer users. Just have products that exist in the
system from seeds, and users can buy them.

Cart
 - Belongs to User (buyer)
 - Has many Cart Items
 - Has delivery address details once the buyer adds them 


Cart Item (1 single product)

 - Belongs to Cart
 - Belongs to Product
 - Quantity
 Query price : cart_item.product.price




