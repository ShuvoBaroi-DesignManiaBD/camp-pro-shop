## [Camp Pro Shop](https://camp-pro-shop.shuvobaroi.com/)

Welcome to Camp Pro Shop, an e-commerce web application designed to offer a seamless shopping experience for outdoor enthusiasts. Explore a wide range of products, manage your cart, place orders, and discover more about us through this feature-rich platform.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
  - [Development](#development)
  - [Production](#production)
- [Building the Application](#building-the-application)
- [Linting and Formatting](#linting-and-formatting)
- [Technology Stack](#technology-stack)

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher)

## Features

- **Homepage:** Contains a hero section, best-selling products, categories, featured items, FAQs, and a footer.
- **Products Page:** Displays all available products with sorting, filtering, and search functionalities.
- **Product Details Page:** Shows product-specific details, stock availability, and an option to add products to the cart.
- **Zoom functionality:** users can see the product images in zoom-in in product details page.
- **Cart Page:** Users can view selected items, adjust quantities, remove products, and view the total pricing.
- **Checkout Page:** Collects user information and offers various payment methods such as Cash on Delivery.
- **Product Management:** Allows administrators to create, edit, and delete products.
- **Responsive Design:** Compatible with desktops, tablets, and smartphones.
- **Payment Gateways:** Allows users to make payments using Paypal, SSLCommerze, Cash on delivery.
- **FAQ Section:** Contains frequently asked questions about the products and services.
- **Dashboard:** Different dashboards with different capabilities for different roles.

## Installation of the Frontend

1. Clone the repository:

   ```sh
   git clone https://github.com/ShuvoBaroi-DesignManiaBD/camp-pro-shop.git
   cd camp-pro-shop
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

## Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
VITE_BACKEND_URL=your_backend_url
```

These secret keys should be in the `.env` file for running the app properly.

## Running the Application

### Development

To run the application in development mode with hot reloading:

```sh
npm run dev
```

### Production

To run the application in production mode:

1. Build the project:

   ```sh
   npm run build
   ```

2. Start the application:

   ```sh
   npm run prod
   ```

## Building the Application

To build the TypeScript project:

```sh
npm run build
```

This will compile the TypeScript files into JavaScript and place them in the `dist` folder.

## Linting and Formatting

To lint the code:

```sh
npm run lint
```

## Technology Stack
### Frontend
- **React.js**: Frontend library for building the user interface.
- **Redux & Redux Toolkit Query (RTK Query)**: State management and server-side data 
- **Tailwind CSS**: CSS framework for building the user interface.
- **Ant Design**: React component library for building the user interface.
- **React Hook Form**: for handeling forms in React.
fetching.
- **React Router**: Client-side routing for navigation.
- **React Icons**: Custom icons for UI design.
- **Zod**: Advanced data validation.
- **Vite**: Development server and build tool for modern frontend projects.
- **TypeScript**: For enhanced type safety and code quality.
### Backend
- **TypeScript**: Used as the programming language.
- **Express.js**: Used as the web framework.
- **Mongoose**: Used as the Object Data Modeling (ODM) and validation library for MongoDB.
- **Zod**: Used for advanced data validations.
- **JWT**: Used for generating tokens for authentication and authorization.
- **Paypal**: Payment gateway integration.
- **SSLCommerz**: Payment gateway integration.
- **Multer**: Used for uploading files.
- **Sharp**: Used for file optimization.
---
#### Live link: [https://camp-pro-shop.shuvobaroi.com/](https://camp-pro-shop.shuvobaroi.com/)

#### GitHub Repo: [https://github.com/ShuvoBaroi-DesignManiaBD/camp-pro-shop](https://github.com/ShuvoBaroi-DesignManiaBD/camp-pro-shop)
#### GitHub Backend Repo: [https://github.com/ShuvoBaroi-DesignManiaBD/camp-pro-shop-backend](https://github.com/ShuvoBaroi-DesignManiaBD/camp-pro-shop-backend)
```
