# 📡 Mangata & Gallo REST API Documentation

**Base API URL**: `http://localhost:5000/api`  
**Authentication**: HTTP Bearer Token (`Authorization: Bearer <JWT_TOKEN>`)  

---

## 1. Authentication Endpoints (`/api/auth`)

### `POST /api/auth/register`
Creates a new customer account.
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
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
  ```

### `POST /api/auth/login`
Authenticates existing credentials and returns JWT session token.
- **Request Body**:
  ```json
  {
    "email": "mariana@mangatagallo.com",
    "password": "Password123!"
  }
  ```
- **Response (200 OK)**: Returns user profile and token.

### `GET /api/auth/me` *(Protected)*
Returns the current authenticated user session profile.

---

## 2. Product Catalog Endpoints (`/api/products`)

### `GET /api/products`
Retrieves products catalog with optional query parameters.
- **Query Parameters**:
  - `category`: Filter by category slug (`rings`, `crowns`, `necklace`, `earrings`, `all`).
  - `search`: Fuzzy search query string.
  - `sort`: Sorting criteria (`price-low`, `price-high`).
- **Response (200 OK)**: Array of product objects.

### `GET /api/products/:id`
Retrieves detailed information for a single product.

### `POST /api/products` *(Protected - Admin Only)*
Creates a new product in the catalog.

---

## 3. Shopping Cart Endpoints (`/api/cart`)

### `GET /api/cart` *(Protected)*
Retrieves the persistent shopping cart for the authenticated user.

### `POST /api/cart/items` *(Protected)*
Adds a product to the user's cart.
- **Request Body**:
  ```json
  {
    "productId": "ring-01",
    "quantity": 1,
    "selectedMetal": "18K Yellow Gold",
    "selectedCarat": "2.0ct"
  }
  ```

### `DELETE /api/cart/items/:id` *(Protected)*
Removes an item from the cart.
