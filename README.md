
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


## API Reference

#### Then endpoint for all GraphQL api is as follows

```http
  /graphql
```

Queries and Mutations parameter and outputs types all are available in graphql docs section.