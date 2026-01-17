# TechWave E-commerce
TechWave is a Single Page Application (SPA) that simulates a complete online store, allowing users to browse, search, purchase products, and manage a shopping cart.  
Administrators have access to an exclusive dashboard to manage the product catalog with full CRUD capabilities.

The application consumes data from a **private REST API** developed exclusively for this project.
### 🔗 API Repository: [TechWave-API](https://github.com/emicarolina/TechWave-API)

## Technologies Used
- JavaScript
- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Motion
- Lenis (smooth scrolling)
- Vercel (deployment)

## Features
### User Features
- **Product Catalog**: Smooth navigation through available products
- **Search System**: Search products by name
- **Shopping Cart**:
  - Add and remove products
  - Adjust product quantities
  - View cart total
  - Animated dropdown with custom smooth scrolling
- **Complete Authentication Flow**:
  - User login and registration
  - JWT tokens with a 7-day expiration
  - Route protection (cart and checkout require authentication)
- **Purchase Simulation**: Order confirmation modal

### Admin Features
- **Exclusive Admin Dashboard**: Permission-based access
- **Product CRUD**:
  - Create new products
  - Edit existing products
  - Delete products
  - All operations are reflected in real time in the database
- **Visual Management Interface**: Optimized UI for administration tasks

## 👩‍💻 Developed by Emilly
If you made it this far, thank you for checking out the project! 🤍
