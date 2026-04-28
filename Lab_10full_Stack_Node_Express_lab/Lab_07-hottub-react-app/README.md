# 🛁 HotSpring Portable Spas — React JS Website

**Full Stack Programming — BSSE-VI | Assignment 01**
Air University, Islamabad

---

## 📌 Project Overview

This is a fully functional **e-commerce website** for HotSpring Portable Spas, built using:
- **React JS** (v18) — component-based frontend framework
- **React Router DOM** (v6) — client-side routing
- **React Context API** — global cart state management
- **HTML5 & CSS3** — semantic markup and responsive design
- **JavaScript (ES6+)** — form validation, interactivity, animations

The project converts the original HTML/CSS/jQuery static website into a modern **React single-page application (SPA)**.

---

## 🗂️ Project Structure

```
hotspring-react/
├── public/
│   └── index.html
├── src/
│   ├── context/
│   │   └── CartContext.js       # Global cart state (React Context API)
│   ├── components/
│   │   └── Layout.js            # TopBar, Header, Nav, SearchBar, Footer, Carousel
│   ├── pages/
│   │   ├── Home.js              # Homepage with Hero Slider + Featured Products
│   │   ├── Products.js          # Product listing with sidebar filter & sorting
│   │   ├── ProductDetail.js     # Product page with tabs, gallery, add to cart
│   │   ├── Cart.js              # Shopping cart with qty update & remove
│   │   ├── Checkout.js          # 3-step checkout with form validation
│   │   ├── Login.js             # Login form with validation
│   │   ├── Register.js          # Registration form with validation
│   │   ├── Contact.js           # Contact form with validation
│   │   ├── About.js             # About us page
│   │   └── Account.js           # My Account + Forgot Password
│   ├── styles.css               # Global stylesheet (responsive)
│   ├── App.js                   # Router and route definitions
│   └── index.js                 # React DOM entry point
├── package.json
└── README.md
```

---

## ✅ Features Implemented

### Pages (11 total)
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero slider, featured products, banners |
| Products | `/products` | Filter by brand/type, sort, search |
| Product Detail | `/products/:id` | Gallery, tabs (description/specs/reviews), add to cart |
| Cart | `/cart` | Qty update, remove items, total calculation |
| Checkout | `/checkout` | 3-step: shipping → payment → review |
| Login | `/login` | Email/password validation |
| Register | `/register` | Full registration with password confirmation |
| My Account | `/my-account` | Orders, account details, address book |
| Contact | `/contact` | Contact form with validation |
| About | `/about` | Company info, stats |
| Forgot Password | `/forgot-password` | Email reset flow |

### React Concepts Used
- `useState` — form state, UI toggles, slider index, carousel position
- `useEffect` — auto-advancing hero slider
- `useContext` — cart shared across all components
- `useNavigate` — programmatic routing after form submission
- `useParams` — reading product ID from URL
- `useLocation` — active nav link highlighting
- `useSearchParams` — reading search query from URL
- Custom Hooks — `useCart()` encapsulates cart logic

### JavaScript Features
- Form validation (all forms: login, register, checkout, contact, forgot password)
- Error state display with CSS class toggling
- Hero slider with auto-advance and dot navigation
- Product carousel with prev/next controls
- Cart quantity update and item removal
- Sort & filter products
- Multi-step checkout with step validation
- Newsletter subscription feedback

### Responsive Design
- CSS Grid and Flexbox layouts
- Mobile breakpoints at 768px and 480px
- Collapsing multi-column layouts on small screens

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm (v8+)

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/Full-stack-programming-lab.git

# 2. Navigate to the project folder
cd Full-stack-programming-lab/FullStackProgramming_Assignment_01/hotspring-react

# 3. Install dependencies
npm install

# 4. Start development server
npm start
```

The app will open at **http://localhost:3000**

---

## 📤 GitHub Setup (Lab Task Instructions)

```bash
# 1. Create repo named: Full-stack-programming-lab (on GitHub)

# 2. Clone to local machine
git clone https://github.com/YOUR_USERNAME/Full-stack-programming-lab.git

# 3. Create assignment folder
cd Full-stack-programming-lab
mkdir FullStackProgramming_Assignment_01
cd FullStackProgramming_Assignment_01

# 4. Copy project files here

# 5. Add, commit, push
git add .
git commit -m "Add Assignment 01 - HotSpring React Website"
git push origin main
```

---

## 👥 Group Members

| Name | Roll No |
|------|---------|
| [Member 1] | [Roll No] |
| [Member 2] | [Roll No] |
| [Member 3] | [Roll No] |

**GitHub Repo URL:** `https://github.com/YOUR_USERNAME/Full-stack-programming-lab`

---

## 📸 Screenshots

> Add screenshots of each page here before GCR submission.

---

*Air University — Department of Software Engineering — BSSE-VI — Full Stack Programming*
