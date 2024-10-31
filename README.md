
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
    - [Getting User Data](#getting-user-data)
      - [Logged In User data](#logged-in-user-data)
      - [Every User Data](#every-user-data)
    - [Deleting User](#deleting-user)
    - [Getting Refresh Token](#getting-refresh-token)
  - [Address Management](#address-management)
    - [Adding Address](#adding-address-with-the-user)
    - [Update Address](#update-address)
    - [Delete Address](#delete-address)
    - [Getting Address](#getting-address)
  - [Furniture Item Management](#furniture-item)
    - [Add Furniture Item](#add-furniture-item)
    - [Getting All Furniture Items](#getting-all-furniture-items)
    - [Get My Furniture Items](#get-my-furniture-items)
    - [get Items according to Categories](#get-items-according-to-categories)
    - [Searching](#searching)
    - [Getting New Collection](#getting-new-collection)
    - [Getting popular Items](#getting-popular-items)
    - [Getting items according to categories and subCategories](#getting-items-according-to-categories-and-subcategories)
    - [Getting all categories and subCategories](#getting-all-categories-and-subcategories)
  - [Cart Management](#cart-management)
    - [Adding Item to Cart](#adding-item-to-cart)
    - [Adding Single Item to Cart](#adding-single-item-to-cart)
    - [Removing Single Item from Cart](#removing-single-item-from-cart)
    - [Remove Cart Item](#remove-cart-item)
    - [Getting Cart Items](#getting-cart-items)
  - [Favourite Management](#favourite-management)
    - [Adding Item to Favourites](#adding-item-to-favourites)
    - [Removing Item from Favourites](#removing-item-from-favourites)
    - [Getting the favourite items](#getting-the-favourite-items)
      - [By User](#by-user)
      - [By Items](#by-items)
  - [Order Management](#order-management)
    - [Adding Order Item](#adding-order-item)
    - [Confirming Order](#confirming-an-order)
    - [Delivered](#delivered)
    - [Cancelling Order](#cancelling-an-order)
    - [Deleting Order](#deleting-an-order)
    - [Getting the order details](#getting-the-order-details)
  - [Review Management](#review-management)
    - [Adding Review](#adding-review)
    - [Deleting Review](#deleting-a-review)
    - [Get the items reviews](#get-the-items-reviews)

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
  accessToken
  refreshToken
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
    "authorization":"Your accessToken here"
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


### Getting User Data

There are two ways by which we can get user data 
- Getting the data of the user who is logged in.
- Getting the data of every user.

#### Logged In User data
```
{
    getUser {
      name
      email
      mobileNumber
      profilePicture
      id
      dateOfBirth
      address {
        street
        city
        state
        postalCode
        country
      }
      orders {
        totalPrice
        id
        status
        updatedAt
        items {
          id
          quantity
          price
          furnitureItem {
            name
            id
            description
            price
            picture
            category {
              name
              id
            }
            subCategory {
              name
              id
            }
          }
        }
      }
      cartItems {
        id
        quantity
        totalPrice
        furnitureItem {
          name
          id
          description
          price
          picture
          category {
            name
            id
          }
          subCategory {
            name
            id
          }
        }
      }
      favourites {
        id
        furnitureItem {
          name
          id
          description
          price
          picture
          category {
            name
            id
          }
          subCategory {
            name
            id
          }
        }
      }
      reviews {
        id
        rating
        comment
        furnitureItem {
          name
          id
          description
          price
          picture
          category {
            name
            id
          }
          subCategory {
            name
            id
          }
        }
      }
    }
  }
```

this data can only available when the user is logged in 

#### Every User Data
```
{
    getUsers {
      name
      email
      mobileNumber
      profilePicture
      id
      dateOfBirth
      address {
        street
        city
        state
        postalCode
        country
      }
      orders {
        totalPrice
        id
        status
        updatedAt
        items {
          id
          quantity
          price
          furnitureItem {
            name
            id
            description
            price
            picture
            category {
              name
              id
            }
            subCategory {
              name
              id
            }
          }
        }
      }
      cartItems {
        id
        quantity
        totalPrice
        furnitureItem {
          name
          id
          description
          price
          picture
          category {
            name
            id
          }
          subCategory {
            name
            id
          }
        }
      }
      favourites {
        id
        furnitureItem {
          name
          id
          description
          price
          picture
          category {
            name
            id
          }
          subCategory {
            name
            id
          }
        }
      }
      reviews {
        id
        rating
        comment
        furnitureItem {
          name
          id
          description
          price
          picture
          category {
            name
            id
          }
          subCategory {
            name
            id
          }
        }
      }
    }
  }
```

### Deleting User

```
mutation{
  DeleteUser(email:"xoxivis413@abevw.com")
}
```
| Parameter | Type | Description |
|---|---|---|
| email | string | Required: Unique email address of the user |

### Getting Refresh Token
This query is usefull when the accessToken is expired then usually the refreshToken is not expired so we just give the refreshToken to this query and it will automatically generate the new accessToken and only change the refreshToken when it is going to expire otherwise return the previous one. Following query can be used to achieve this functionality.

```
mutation {
  refreshToken(refreshToken: "Previous Refresh Token here") {
    accessToken
    refreshToken
    user {
      name
      email
    }
  }
}
```
| Parameter | Type | Description |
|---|---|---|
| refreshToken | string | Required: Refresh token that was received while logging in or while refreshing the accessToken |

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

### Getting Address
In order to get the address user must login first. Following is how we can get the user's Address

```
{
  getAddress {
    street
    city
    state
    postalCode
    country
    user {
      name
      email
    }
  }
}
```

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

### Getting All Furniture items
In order for this query to run user don't have to login. 
Following is how we can get all the furniture items

```
{
  getItems {
    id
    name
    price
    description
    picture
    category {
      name
      id
    }
    subCategory {
      id
      name
    }
  }
}
```

### Get My Furniture Items
This query is for getting the items that are added by the user that are admin and are logged in right now. 

```
{
  getMyItems {
    id
    name
    price
    description
    picture
    category {
      name
      id
    }
    subCategory {
      id
      name
    }
  }
}
```

### Get Items according to Categories
This query is for getting the items according to there categories. Forexample I want to get all the items available related to a specific category like Kitchen or Office then i just use this query.

```
{
  getCategoryItems(id: "1") {
    id
    name
    price
    description
    picture
    category {
      name
      id
    }
    subCategory {
      id
      name
    }
  }
}
```

| Parameter | Type | Description |
|---|---|---|
| id | string | Required: Unique id of categories available. |

### Searching 
This query is really helpful in searching functionality user just have to type a term that he want to search for and the all the items related to that search term will appear as a result of this query.

```
{
  searchItems(term: "text here") {
    id
    name
    price
    description
    picture
    category {
      name
      id
    }
    subCategory {
      id
      name
    }
  }
}
```

| Parameter | Type | Description |
|---|---|---|
| term | string | Required: Term that a user want to search for in all the furniture items. |

### Getting New Collection
This query is helpful if we want to get the items are recently added. Following is the way we can get the new collection items.

```
{
  newCollection {
    id
    name
    price
    description
    picture
    category {
      name
      id
    }
    subCategory {
      id
      name
    }
  }
}
```

### Getting popular Items
This query is helpful if we want to get the items who are popular means are ordered by most users.

```
{
  popularItems {
    id
    name
    price
    description
    picture
    category {
      name
      id
    }
    subCategory {
      id
      name
    }
  }
}
```

### Getting items according to categories and subCategories

This query is usefull when a user wants to get the items based on their categories and subCategories. Following is how we can get the items based on their categories and subCategories

```
{
  getSubItems(subCategoryId: "6", categoryId: "1") {
    id
    name
    price
    description
    picture
    category {
      name
      id
    }
    subCategory {
      id
      name
    }
  }
}
```

| Parameter | Type | Description |
|---|---|---|
| categoryId | string | Required: id of the category. |
| subCategoryId | string | Required: id of the subCategory. |

### Getting all categories and subCategories
For above query to work we need to some hwo show all the categories and subCategories available at the moment. So for this purpose we use can use this query here.

```
{
    getCategories{
        id
        name
        subCategories{
            id
            name
        }
    }
}
```



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

### Getting Cart Items
This query is used to get the items that are put by the users in cart. In order to get these items that are available in cart we can use the following query.

```
{
  getCartItems {
    id
    quantity
    totalPrice
    furnitureItem {
      id
      name
      description
      price
      picture
      category {
        id
        name
      }
      subCategory {
        id
        name
      }
    }
  }
}
```


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

### Getting the favourite items
There are actually two ways by which we can get favourite items. One is by user means the items that are added to favourite by the user who's login. Second is by items means the items is favourite by how many and by which user.

#### By User
```
{
  getUserFavourites {
    id
    furnitureItem {
      id
      name
      description
      price
      picture
      category {
        id
        name
      }
      subCategory {
        id
        name
      }
    }
  }
}
```

#### By Items
```
{
  getItemFavourites(itemId: "id of the item here") {
    id
    furnitureItem {
      name
      description
    }
    user {
      id
      name
      email
      mobileNumber
      profilePicture
    }
  }
}
```

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


### Getting the order details
User must login in order to get the details of teh order and user can only get the details of the order that is his own.

```
{
  getOrders {
    id
    totalPrice
    status
    items {
      id
      quantity
      price
      furnitureItem {
        id
        name
        description
        price
        picture
        category {
          id
          name
        }
        subCategory {
          id
          name
        }
      }
    }
  }
}
```


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


### Get the items reviews
```
{
  getReviews(productId: "") {
    id
    rating
    comment
    user {
      id
      name
      email
      profilePicture
    }
  }
}
```

| Parameter | Type | Description |
|---|---|---|
| productId | string | Required: The unique identifier of the item that you want to see the reviews of. |


## Contributing
Contributions are welcome!

## Acknowledgments
Special Thanks to the [Techloset Team](https://www.techloset.com/) for their valuable guidelines.


## Support
If you have any questions or need support, feel free to reach out via [subhanshoukat1908@gmail.com](mailto:subhanshoukat1908@gmail.com)



## Authors

- [@Subhan Shoukat](https://github.com/Subhan-ui)


---

Thank you for using our project! If you find any issues or have any suggestions for improvement, feel free to contribute or reach out.