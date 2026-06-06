# 🏢 Nexus CRM — Air University Final Term Project
**Subject:** Full Stack Programming Lab (SE483) | BSSE VI-B  
**Stack:** MERN + Next.js | MongoDB + Express + React + Node.js

---

## 📁 Project Structure

```
Final_Term_Project_CRM/
├── backend/                  # Node.js + Express API
│   ├── models/               # Mongoose schemas
│   │   ├── User.js
│   │   ├── Customer.js
│   │   └── Invoice.js
│   ├── routes/               # API route handlers
│   │   ├── auth.js
│   │   ├── customers.js
│   │   └── invoices.js
│   ├── middleware/
│   │   └── auth.js           # JWT middleware
│   ├── server.js             # Entry point
│   ├── .env                  # Environment variables
│   └── package.json
│
└── frontend/                 # Next.js 14 App
    └── src/
        ├── app/              # App Router pages
        │   ├── page.js       # Root redirect
        │   ├── login/
        │   ├── register/
        │   ├── dashboard/
        │   ├── customers/    # List + Add + [id] edit
        │   └── invoices/
        ├── components/
        │   ├── layout/       # Sidebar, DashboardLayout
        │   └── chatbot/      # Chatbot widget
        └── lib/              # api.js, auth.js
```

---

## ⚡ Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local installation)
- Git

### Step 1: Install MongoDB Locally

**Windows:**
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer (Complete setup)
3. MongoDB installs as a Windows Service (auto-starts)
4. Verify: Open Command Prompt → `mongod --version`

**Or use MongoDB as a service:**
```bash
# Start MongoDB service (Windows)
net start MongoDB

# Or run manually
mongod --dbpath "C:\data\db"
```

### Step 2: Backend Setup

```bash
cd backend
npm install
# .env is already configured for local MongoDB
npm run dev
```

The backend will:
- Connect to `mongodb://localhost:27017/crm_system`
- Auto-seed 15 customers on first run
- Run on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## 🔑 Usage

1. Open http://localhost:3000
2. Click "Create one" to register a new account
3. Login and explore the dashboard

---

## ✅ Features Implemented

| Feature | Status |
|---------|--------|
| JWT Authentication (Register/Login/Logout) | ✅ |
| Password Hashing (bcrypt) | ✅ |
| Protected Routes | ✅ |
| Customer CRUD (Add/View/Edit/Delete) | ✅ |
| 15 Pre-seeded Customers | ✅ |
| Search by Name/Email/Company | ✅ |
| Filter by Status (Lead/Active/Inactive) | ✅ |
| Dynamic results (no page reload) | ✅ |
| Next.js Frontend (SSR + CSR) | ✅ |
| Invoice Generation | ✅ |
| PDF Download (PDFKit) | ✅ |
| Toast Notifications | ✅ |
| Chatbot (rule-based) | ✅ |
| Responsive UI | ✅ |
| MongoDB Data Persistence | ✅ |

---

## 🤖 Chatbot Commands

Type these in the chatbot widget (bottom-right 🤖 button):

| Command | Action |
|---------|--------|
| `help` | Show all commands |
| `customers` | View recent customer list |
| `add customer` | Navigate to add customer page |
| `invoices` | Open invoice module |
| `stats` | Show CRM statistics |
| `active` | Show active customers |
| `leads` | Show lead customers |

---

## 🛠 API Endpoints

### Auth
- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Get current user

### Customers
- `GET /api/customers` — List (with search & filter)
- `GET /api/customers/stats` — Dashboard stats
- `GET /api/customers/:id` — Single customer
- `POST /api/customers` — Create
- `PUT /api/customers/:id` — Update
- `DELETE /api/customers/:id` — Delete

### Invoices
- `GET /api/invoices` — List all
- `POST /api/invoices` — Create invoice
- `GET /api/invoices/:id/pdf` — Download PDF
- `DELETE /api/invoices/:id` — Delete

---

## 🎨 Tech Stack Details

- **Frontend:** Next.js 14, React 18, Tailwind CSS, react-hot-toast
- **Backend:** Node.js, Express.js, Mongoose, JWT, bcryptjs, PDFKit
- **Database:** MongoDB (Local)
- **Auth:** JSON Web Tokens (JWT)
