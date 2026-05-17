# 🪑 Rustik Plank - MERN Stack eCommerce App

**Lab 12 - MERN Stack Next.js Dynamic Ecommerce App**
**Student:** BSSE-VI-B & A | **Instructor:** Mr. Sharif Hussain

---

## 📋 Project Overview

A fully dynamic eCommerce application for **Rustik Plank Furniture** built using the MERN stack with Next.js frontend. Based on the provided Rustik Plank design mockup.

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| HTTP Client | Axios |
| Icons | React Icons |

---

## 🗂 Project Structure

```
rustik-plank/
├── backend/                    # Node.js + Express API
│   ├── models/
│   │   ├── Product.js          # Product schema
│   │   └── Order.js            # Order schema
│   ├── routes/
│   │   ├── products.js         # CRUD + seed
│   │   ├── categories.js       # Category list
│   │   ├── cart.js             # Session cart
│   │   └── orders.js           # Order management
│   ├── .env
│   └── server.js               # Express entry point
│
└── frontend/                   # Next.js App
    ├── app/
    │   ├── page.tsx            # Home page
    │   ├── layout.tsx          # Root layout
    │   ├── products/
    │   │   ├── page.tsx        # Products listing
    │   │   └── [id]/page.tsx   # Product detail
    │   ├── cart/page.tsx       # Shopping cart
    │   ├── checkout/page.tsx   # Checkout & order
    │   ├── admin/page.tsx      # Admin CRUD panel
    │   ├── about/page.tsx      # About page
    │   └── contact/page.tsx    # Contact page
    ├── components/
    │   ├── Navbar.tsx
    │   ├── TopBar.tsx
    │   ├── Footer.tsx
    │   └── ProductCard.tsx
    ├── context/
    │   └── CartContext.tsx     # Global cart state
    └── lib/
        └── api.ts              # Axios API calls
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (LTS)
- MongoDB Compass or MongoDB running locally
- VS Code

### 1. Clone Repository
```bash
git clone <your-github-repo-url>
cd Lab_12_MERN_Stack_Nextjs_Dynamic_App_Lab
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create .env file (already included):
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/rustikplank
npm start
# Backend runs on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# .env.local already configured:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm run dev
# Frontend runs on http://localhost:3000
```

### 4. Seed Database
Visit `http://localhost:3000/admin` and click **🌱 Seed Database** to populate with sample products.

---

## 📱 Pages & Features

### Frontend Pages
| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, hot deals, product tabs, collections |
| Products | `/products` | Filterable product grid |
| Product Detail | `/products/[id]` | Full product info + add to cart |
| Cart | `/cart` | Cart management with qty controls |
| Checkout | `/checkout` | Order form with confirmation |
| Admin | `/admin` | Full CRUD + order management |
| About | `/about` | Brand story |
| Contact | `/contact` | Contact form |

### Backend API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with filters) |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| POST | `/api/products/seed/all` | Seed database |
| GET | `/api/categories` | Get categories |
| GET | `/api/cart/:sessionId` | Get cart |
| POST | `/api/cart/:sessionId/add` | Add to cart |
| PUT | `/api/cart/:sessionId/update` | Update cart |
| DELETE | `/api/cart/:sessionId/remove/:id` | Remove item |
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Create order |
| PUT | `/api/orders/:id/status` | Update order status |

---

## ✅ Lab Requirements Checklist

- [x] **Next.js Frontend** - App Router with TypeScript
- [x] **Tailwind CSS** - Fully responsive design
- [x] **Node.js + Express Backend** - RESTful API
- [x] **MongoDB + Mongoose** - Database integration
- [x] **CRUD Functionality** - Create, Read, Update, Delete products
- [x] **Dynamic Data** - Products from database, not hardcoded
- [x] **Responsive Design** - Mobile, tablet, desktop
- [x] **Shopping Cart** - Add, update, remove items
- [x] **Order System** - Checkout with order creation
- [x] **Admin Panel** - Manage products and orders
- [x] **Multiple Pages** - Home, Products, Detail, Cart, Checkout, Admin, About, Contact
- [x] **Category Filtering** - Filter by Beds, Chairs, Tables, etc.
- [x] **Search** - Product name search
- [x] **Design Match** - Follows Rustik Plank mockup (orange theme, furniture layout)

---

## 🎨 Design Features

- **Color Theme**: Orange (#E87722) matching Rustik Plank brand
- **Typography**: Inter font, clean hierarchy
- **Components**: Reusable ProductCard, Navbar, Footer
- **Animations**: Hover effects on cards and buttons
- **Mobile First**: Hamburger menu, responsive grid

---

## 📸 Screenshots

*(Add screenshots here after running the project)*

## 🔗 GitHub Repository

`https://github.com/YOUR_USERNAME/Full-Stack-Programming-Lab`
