# 📡 Mangata & Gallo REST API Documentation

**Version**: `v3.0.0`  
**Base API Endpoint**: `http://localhost:5000/api`  
**Authentication Standard**: HTTP Bearer Token (`Authorization: Bearer <JWT_TOKEN>`)  
**Data Format**: JSON (`Content-Type: application/json`)

---

## Table of Contents
1. [Authentication API (`/api/auth`)](#1-authentication-api-apiauth)
2. [Product Catalog API (`/api/products`)](#2-product-catalog-api-apiproducts)
3. [Shopping Cart API (`/api/cart`)](#3-shopping-cart-api-apicart)
4. [Health & System API (`/api/health`)](#4-health--system-api-apihealth)
5. [Standard Error Status Codes](#5-standard-error-status-codes)

---

## 1. Authentication API (`/api/auth`)

### `POST /api/auth/register`
Creates a new customer account and returns a JWT session token.

- **Access**: Public
- **Request Body**:
  ```json
  {
    "name": "Lady Mariana Gallo",
    "email": "mariana@mangatagallo.com",
    "password": "Password123!"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "user": {
      "id": "usr-8a9f2",
      "name": "Lady Mariana Gallo",
      "email": "mariana@mangatagallo.com",
      "role": "CUSTOMER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Response (400 Bad Request)**:
  ```json
  {
    "error": "User already exists with this email"
  }
  ```

---

### `POST /api/auth/login`
Authenticates user credentials and issues a JWT token.

- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "vip.client@mangatagallo.com",
    "password": "Password123!"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "user": {
      "id": "usr-vip-001",
      "name": "Lady Mariana Gallo",
      "email": "vip.client@mangatagallo.com",
      "role": "VIP"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Response (401 Unauthorized)**:
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

---

### `POST /api/auth/logout`
Terminates user session client-side.

- **Access**: Public
- **Response (200 OK)**:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

---

### `GET /api/auth/me`
Retrieves the profile of the currently authenticated user.

- **Access**: Protected (`Bearer <JWT_TOKEN>`)
- **Headers**:
  `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Response (200 OK)**:
  ```json
  {
    "user": {
      "userId": "usr-vip-001",
      "email": "vip.client@mangatagallo.com",
      "role": "VIP"
    }
  }
  ```
- **Error Response (401 Unauthorized)**:
  ```json
  {
    "error": "Unauthorized: Missing token"
  }
  ```

---

## 2. Product Catalog API (`/api/products`)

### `GET /api/products`
Retrieves the luxury jewelry product catalog with optional filtering.

- **Access**: Public
- **Query Parameters**:
  - `category` *(optional)*: `rings`, `crowns`, `necklace`, `earrings`, `all`
  - `search` *(optional)*: Fuzzy search string (e.g. `diamond`)
  - `sort` *(optional)*: `price-low`, `price-high`
- **Response (200 OK)**:
  ```json
  [
    {
      "id": "ring-01",
      "name": "The Eternal Solitaire Ring",
      "description": "A timeless 2.0 carat round brilliant diamond set in pure 950 Platinum.",
      "price": 2450,
      "category": "rings",
      "image": "/assets/ring-1.jpg",
      "stock": 12
    }
  ]
  ```

---

### `GET /api/products/:id`
Retrieves detailed information for a single jewelry item.

- **Access**: Public
- **Response (200 OK)**:
  ```json
  {
    "id": "ring-01",
    "name": "The Eternal Solitaire Ring",
    "description": "A timeless 2.0 carat round brilliant diamond set in pure 950 Platinum.",
    "price": 2450,
    "category": "rings",
    "image": "/assets/ring-1.jpg",
    "stock": 12
  }
  ```
- **Error Response (404 Not Found)**:
  ```json
  {
    "error": "Product not found"
  }
  ```

---

### `POST /api/products`
Creates a new jewelry item in the catalog.

- **Access**: Protected (**ADMIN Only**)
- **Request Body**:
  ```json
  {
    "name": "The Empress Emerald Tiara",
    "description": "Hand-set Colombian emeralds surrounded by VVS1 diamonds.",
    "price": 12800,
    "category": "crowns",
    "image": "/assets/crown-1.jpg",
    "stock": 3
  }
  ```
- **Response (201 Created)**: Returns created product object.
- **Error Response (403 Forbidden)**:
  ```json
  {
    "error": "Forbidden: Insufficient permissions"
  }
  ```

---

### `PUT /api/products/:id`
Updates an existing product in the catalog.

- **Access**: Protected (**ADMIN Only**)
- **Request Body**: Partial product fields to update.
- **Response (200 OK)**: Updated product object.

---

### `DELETE /api/products/:id`
Deletes a product from the catalog.

- **Access**: Protected (**ADMIN Only**)
- **Response (200 OK)**:
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```

---

## 3. Shopping Cart API (`/api/cart`)

### `GET /api/cart`
Retrieves the persistent cart for the authenticated user.

- **Access**: Protected (`Bearer <JWT_TOKEN>`)
- **Response (200 OK)**:
  ```json
  {
    "userId": "usr-vip-001",
    "items": [
      {
        "id": "cart-item-1a2b",
        "productId": "ring-01",
        "quantity": 1,
        "selectedMetal": "18K Yellow Gold",
        "selectedCarat": "2.0ct"
      }
    ]
  }
  ```

---

### `POST /api/cart/items`
Adds an item to the user's shopping cart.

- **Access**: Protected (`Bearer <JWT_TOKEN>`)
- **Request Body**:
  ```json
  {
    "productId": "ring-01",
    "quantity": 1,
    "selectedMetal": "950 Platinum",
    "selectedCarat": "2.0ct"
  }
  ```
- **Response (201 Created)**: Updated cart object.

---

### `PUT /api/cart/items/:id`
Updates the quantity of a cart item.

- **Access**: Protected (`Bearer <JWT_TOKEN>`)
- **Request Body**:
  ```json
  {
    "quantity": 3
  }
  ```
- **Response (200 OK)**: Updated cart object.

---

### `DELETE /api/cart/items/:id`
Removes an item from the cart.

- **Access**: Protected (`Bearer <JWT_TOKEN>`)
- **Response (200 OK)**: Updated cart object.

---

## 4. Health & System API (`/api/health`)

### `GET /api/health`
System health check endpoint.

- **Access**: Public
- **Response (200 OK)**:
  ```json
  {
    "status": "healthy",
    "version": "3.0.0",
    "timestamp": "2026-08-03T01:10:00.000Z"
  }
  ```

---

## 5. Standard Error Status Codes

| HTTP Status | Meaning | Description |
| :--- | :--- | :--- |
| **`400 Bad Request`** | Validation Error | Invalid payload or missing required body parameters. |
| **`401 Unauthorized`** | Auth Failure | Missing, expired, or invalid Bearer JWT token. |
| **`403 Forbidden`** | RBAC Guard | User role lacks required permission (e.g. non-Admin calling Admin endpoints). |
| **`404 Not Found`** | Missing Entity | Product or cart item ID does not exist. |
| **`500 Internal Error`** | Server Fault | Unhandled exception processed by centralized error handler. |
