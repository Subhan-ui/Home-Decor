

# Table of Contents
- [Overview](#overview)
- [Features](#features)
  - [User Authentication and Profile Management](#user-authentication-and-profile-management)
  - [Furniture Catalog](#furniture-catalog)
  - [Shopping Cart and Favorites](#shopping-cart-and-favorites)
  - [Order Management](#order-management)
  - [Product Reviews](#product-reviews)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
  - [User Management](#user-management)
    - [Register](#register)
    - [Email Verification](#next-step-is-verification-of-email-address)
    - [Login](#login)
    - [Change Password](#change-password)
    - [Updating User](#updating-user)
      - [Updating Profile Picture](#updating-profile-picture)
      - [Updating User Data](#updating-user-data)
  - [Address Management](#address-management)
    - [Adding Address](#adding-address-with-the-user)
    - [Update Address](#update-address)
    - [Delete Address](#delete-address)
  - [Furniture Item Management](#furniture-item)
    - [Add Furniture Item](#add-furniture-item)
  - [Cart Management](#cart-management)
    - [Adding Item to Cart](#adding-item-to-cart)
    - [Adding Single Item to Cart](#adding-single-item-to-cart)
    - [Removing Single Item from Cart](#removing-single-item-from-cart)
    - [Remove Cart Item](#remove-cart-item)
  - [Favourite Management](#favourite-management)
    - [Adding Item to Favourites](#adding-item-to-favourites)
    - [Removing Item from Favourites](#removing-item-from-favourites)
  - [Order Management](#order-management)
    - [Adding Order Item](#adding-order-item)
    - [Confirming Order](#confirming-an-order)
    - [Delivered](#delivered)
    - [Cancelling Order](#cancelling-an-order)
    - [Deleting Order](#deleting-an-order)
  - [Review Management](#review-management)
    - [Adding Review](#adding-review)
    - [Deleting Review](#deleting-a-review)

# Home Decor Backend App Server

## Overview

The Home Decor E-Commerce Application is a comprehensive backend solution designed to power an online furniture store. It provides users with secure authentication and profile management, supports a rich catalog of furniture items, and offers features like shopping carts, favorites, and order tracking. The system also includes a review functionality to enhance the customer shopping experience. Built using modern technologies such as TypeScript, Prisma, GraphQL, and TypeGraphQL, this backend ensures scalability, security, and performance for a seamless e-commerce experience.



# Features

### User Authentication and Profile Management
- Login: Secure login using email/username and password.
- Signup: Create a new user account with name, email, and password.
- Password Management: Functionality to reset or change passwords, as well as email-based password recovery (Forgot Password).
- Profile Management: Users can update their personal information, including name, email, phone number, and addresses.

### Furniture Catalog
- Extensive catalog of furniture items categorized by type and space (e.g., Sofas, Beds, Tables, Chairs, Auxiliary Furniture, etc.).
- Each furniture item is available under a specific category and subcategory, providing easy navigation for users.

### Shopping Cart and Favorites
- Cart: Users can add, update, and remove items from their cart before placing an order.
- Favorites: Users can mark items as favorites for future reference.

### Order Management
- Order Tracking: Track orders through various stages, from pending to in-progress, and finally delivered.
- Order Details: Includes the ordered items, total price, and current status.

### Product Reviews
- Review System: Users can add reviews for purchased furniture items and read reviews left by others to make informed decisions.




## Technologies Used.

- Node.js:  Backend framework for scalable server-side applications.
- TypeScript: Strongly-typed JavaScript ensuring code quality and scalability.
- Prisma: An ORM for working with databases in a type-safe way.
- GraphQL: For querying and managing application data efficiently.
- TypeGraphQL: Framework to build GraphQL APIs using TypeScript.
- Nodemailer: Used for sending password recovery emails.
- Bcrypt: For hashing and verifying passwords securely.
# Getting Started
To get started with the home decor Backend server.

## Prerequisites
- Node.js 
- PostgreSQL (or any preferred relational database supported by Prisma)
- A Cloudinary account for handling image uploads (optional)

## Installation
- Clone the Repository. 
- Install Dependencies
    

```bash
  npm install
```

 - Set up the following environment variables 
DATABASE_URL, PORT, APP_SECRET, EMAIL_USER, EMAIL_PASSWORD,    CLOUD_NAME, API_SECRET, API_KEY
 - Run the following to generate the Prisma client:

```bash
  npx prisma generate
```

- Start the development server:
```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`DATABASE_URL`

`PORT`

`APP_SECRET`

`EMAIL_USER`

`EMAIL_PASSWORD`

`CLOUD_NAME`

`API_SECRET`



## API Reference

#### Then endpoint for all GraphQL api is as follows

```
  /graphql
```

Queries and Mutations parameter and outputs types all are available in graphql docs section.


## User Management

### Register

```
 mutation {
  signUp(
    name: "Abdul Mueed"
    email: "xoxivis413@abevw.com"
    password: "password"
    mobileNumber: "4323243234"
    dateOfBirth: "12 Nov 2003"
  ) {
    user {
      name
      email
    }
  }
}
```

| Parameter | Type | Description |
|---|---|---|
| name | string | Required: Name of the user signingUp |
| email | string | Required: Unique Email address of the user |
| password | string | Required: Password of minimum length 8. |
| mobileNumber | string | Required: Unique Mobile Phone number of the user. |
| dateOfBirth | string | Required: Date of Birth of the user. |

### Next step is verification of email address.
```
mutation {
  verifyEmail(email: "xoxivis413@abevw.com", verificationCode: "verification code you received from the email")
}
```

| Parameter | Type | Description |
|---|---|---|
| email | string | Required: Unique email address of the user |
| verificationCode | string | Required: code received after signing up through email |

### Login
```
mutation {
  login(email:"xoxivis413@abevw.com", password:"password"){
  token
  user{
    name
    }
  }
}
```

| Parameter | Type | Description |
|---|---|---|
| email | string | Required: Unique email address of the user |
| password | string | Required: password with that specified Email Address |

token that we received from when we login we need to use that token to put it in the header as follows.
 ```
 {
    "authorization":"Your token here"
 }
```

After completing these steps now you are completely logged in.

### Change Password
For changing the password, there are total 2 steps involved. First step is getting the email which include the reset token using which we will change the password.

#### 1st Step:
```
mutation {
 forgotPassword(email:"xoxivis413@abevw.com")
}
```
A reset token will be received now in this email address, we will take that token to change the password.

#### 2nd Step:
```
mutation {
  resetPassword(
    resetToken: "token here"
    newPassword: "new Password here"
  )
}
```
now the password is successfully changed.

| Parameter | Type | Description |
|---|---|---|
| email | string | Required: Unique email address of the user |
| newPassword | string | Required: new password to use |
| resetToken | string | Required: reset token received in the email given. |

### Updating User

We can only update user's profile photo or we can update user every detail at once. Here's how we can do that.

#### Updating Profile Picture.

```
mutation {
  uploadImage(email: "xoxivis413@abevw.com", picture: "pp1.jpg")
}
```
Right now I have only two options for uploading profile picture. 1 is pp1.jpg and 2nd is pp2.jpg. These are the only profile pictures that I kept in uploads folder right now.

#### Updating User Data

```
mutation {
  updateUser(
    name: "Some other name"
    picture: "pp1.jpg"
    mobileNumber: "434234234"
  )
}
```
The above function can only works if the user is logged in.

| Parameter | Type | Description |
|---|---|---|
| email | string | Required: Unique email address of the user |
| picture | string | Required: Name of the image |
| mobileNumber | string | Required: Mobile Number |


## Address Management

### Adding Address with the user.

```
mutation {
  addAddress(
    country: "Pakistan"
    postalCode: "3234234"
    state: "Punjab"
    city: "Faisalabad"
    street: "Some street address here"
  ) {
    id
  }
}
```

To add the address obviously one need to be logged in.

### Update Address 
```
mutation {
  updateAddress(
    country: "Pakistan"
    postalCode: "3234234"
    state: "pnjb"
    city: "Faisalabad"
    street: "Some street address here"
  ) 
}
```
To Change the address the user need to be logged in..

### Delete Address
```
mutation{
  deleteAddress
}
```
To delete the address the user need to be logged in.

| Parameter | Type | Description |
|---|---|---|
| street | string | Required: Street address of the user |
| city | string | Required: City where user lived in | 
| state | string | Required: State where user lived in | 
| postalCode | string | Required: postal code of teh area. | 
| country | string | Required: Country where user lived in. |


## Furniture Item

To add new furniture items to the catalog, users must have the "admin" role. Users with the "user" role are restricted from creating items. This ensures that only authorized individuals can modify the product database.

### Add Furniture Item
```
mutation {
  addItem(
    subCategory: "Bed"
    category: BedRoom
    picture: "bed.webp"
    price: 12.3
    description: "This is a Bed Good and Confirtable for resting."
    name: "Bed for 2."
  ){
    name
    price
    picture
  }
}
```

The ```picture``` parameter currently accepts the following image file types: ```bed.webp```, ```BedSheet.jpg```, ```chair.jpg```, ```sofa.jpg```, and ```table.jpg```. When the valid parameters are provided, the API returns a complete item object representing the newly created furniture item.

```
enum Categories {
  BedRoom
  LivingRoom
  Kitchen
  Office
  DinningRoom
}
```

| Parameter | Type | Description |
|---|---|---|
| name | string | Required: Name of the item being added. |
| description | string | Required: Description of the item being added. |
| price | number | Required: Price of the item being added. |
| picture | string | Required: Picture of the item being added. |
| category | Categories | Required: Category of the item being added. |
| subCategory | string | Required: SubCategory of the item being added. |


## Cart Management

### Adding Item to Cart
To add a furniture item to the cart, users must be logged in. The required parameter for adding an item is the unique identifier (ID) of the desired furniture item. This ID is used to locate the specific item in the database and add it to the user's cart and second is quantity of the specific item.

```
mutation {
  addItemToCart(quantity: 2, id: "cm1kmefxj000as7zjk9z63w0r") {
    id
  }
}
```

| Parameter | Type | Description |
|---|---|---|
| quantity | number | Required: Number of furniture item you want to add |
| id | string | Required: Id of the furniture item that you want to add in your cart. |

### Adding Single Item to Cart
```
mutation {
  addSingleItem(cartId:"cm1kmh048000es7zjetv7fzfi")
}
```
 
To use this mutation cartItem should already exist then we can increase its quantity by 1 by giving its id as cartId here in this mutation.

### Removing Single Item from Cart
```
mutation {
  removeSingleItem(cartId:"cm1kmh048000es7zjetv7fzfi")
}
```
Similarly, We can use removeSingleItem to decrease cart's quantity by 1.

### Remove Cart Item.
```
mutation {
  removeCartItem(id:"cm1kmh048000es7zjetv7fzfi")
}
```
And this is how we can completely remove an item from the cart no matter what its quantities are at the point.

## Favourite Management

User need to be login in order to perform the actions related to favourite. User can add an item to favourite and can remove from its favourite.

### Adding an Item to Favourite

```
mutation {
  addToFavourites(itemId:"cm1klymin0006s7zjj9vx6ept")
}
```
This is how an item can be added to the cart. 

| Parameter | Type | Description |
|---|---|---|
| itemId | string | Required: The id of the furniture that need to be added into favourite by the user. |

### Removing an Item from Favourite

```
mutation {
  removeFromFavourites(id:"cm1koa7z9000gs7zjck1mp7iq")
}
```
| Parameter | Type | Description |
|---|---|---|
| id | string | Required: The id of the favourite item that need to be removed. |


## Order Management

### Adding Order Item
The addOrderItem mutation allows an authenticated user to add an item to their order. The item can either be added to an existing pending order or a new order can be created. If the item already exists in the order, its quantity is updated. If not, a new item is created in the order. The order's total price is updated accordingly.

```
mutation{
  addOrderItem(quantity:2, productId:"cm1kmf8fa000cs7zj4x1i5wa4")
}
```

#### Returns of this mutation are as follows
- ```"Order and OrderItem updated"``` : If the item was already in the pending order and its quantity was updated.

- ```"New OrderItem created"``` : If the item was added to a pending order for the first time.

- ```"Order and OrderItem created"``` : If a new order and item were created for the user.

- ```"You need to login"``` : If the user is not authenticated.

- ```"item not found"``` : If the product with the provided ID was not found.

- ```"An error occurred [error details]"``` : If any error occurs during the process.

| Parameter | Type | Description |
|---|---|---|
| quantity | number | Required: The total quantity of the item you want to order. |
| productId | string | Required: The id of the product that you want to order. |

### Confirming an order.
The ```makeOrder``` mutation allows an authenticated user to confirm and proceed with an order that is in the ```PENDING``` status, changing its status to ```IN_PROGRESS```.

```
mutation{
  makeOrder(id:"cm1koghp6000is7zj6fqqt8wn")
}
```
| Parameter | Type | Description |
|---|---|---|
| id| string| Required: The id of the order to which a user will proceed. |

### Delivered
The delivered mutation allows only an admin to mark an order as ```DELIVERED``` once it has been processed.

```
mutation{
  deliverOrder(id:"cm1koghp6000is7zj6fqqt8wn")
}
```
| Parameter | Type | Description |
|---|---|---|
| id| string| Required: The id of the order to which an admin will deliver. |

### Cancelling an order
The cancelOrder mutation allows an authenticated user to cancel their own pending order.

```
mutation{
  cancelOrder(id:"cm1koghp6000is7zj6fqqt8wn")
}
```
| Parameter | Type | Description |
|---|---|---|
| id| string| Required: The id of the order a user need to cancelled. |

### Deleting an order
The deleteOrder mutation allows an authenticated user to delete their order, along with all associated order items, from the system.

```
mutation{
  deleteOrder(id:"cm1koghp6000is7zj6fqqt8wn")
}
```
| Parameter | Type | Description |
|---|---|---|
| id| string| Required: The id of the order a user need to delete.|


## Review Management

An authenticated user can add or delete a review. User can only delete a review which is created by himself. A review include rating which is as follows 
```WORST```, ```BAD```, ```NORMAL```,
```GOOD``` and ```BEST``` including a comment on the product. 
### Adding Review.
The example for adding a review is as follows:

```
mutation {
  addReview(
    comment: "Some comment here"
    rating: NORMAL
    productId: "cm1kmefxj000as7zjk9z63w0r"
  )
}
```

```
enum Rating {
  WORST 
  BAD
  NORMAL
  GOOD
  BEST
}
```

| Parameter | Type | Description |
|---|---|---|
| comment | string | Required: The user's review or feedback about the product. |
| rating | Rating | Required: The user's rating of the product. |
| productId | string | Required: The unique identifier of the product to be reviewed. |

### Deleting a Review

The example for removing a review is as follows:

```
mutation {
  deleteReview(id: "cm1lw466w0001amapljl9ziyq")
}
```
| Parameter | Type | Description |
|---|---|---|
| id | string | Required: The unique identifier of the review that you want to delete. |
