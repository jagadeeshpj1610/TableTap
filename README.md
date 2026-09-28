# TableTap

A QR-based restaurant ordering & management system. Customers scan a QR code at their table to browse the menu, order, track their food, call a waiter, and pay — while the restaurant runs its kitchen, waitstaff, and admin operations from three dedicated dashboards.

Built as a real MERN-stack project for a working restaurant, not a toy demo — the full flow (menu → cart → order → kitchen → served → paid) is wired end to end against a live backend.

---


Live Domains 
- 1.Frontend URL = https://tabletap.22022cm040.workers.dev/
- 2.Backend URL = https://tabletapbackend.onrender.com (No needed for you)
- 3.Restarunt Staff = https://tabletap.22022cm040.workers.dev/login

# Current status of the project is Almost done but there is some bugs and unnecassary api calls , Needs to fix and update , will fix & update soon 

## Interfaces

TableTap ships four separate experiences from one codebase:

| Interface | Route | Who uses it |
|---|---|---|
| **Customer App** | `/?table=<number>` | Diners, via the QR code on their table |
| **Kitchen Dashboard** | `/kitchen` | Kitchen staff — accept, prepare, and mark orders ready |
| **Waiter Dashboard** | `/waiter` | Waitstaff — waiter calls, table status, active orders |
| **Admin Dashboard** | `/admin` | Restaurant owner/manager — overview, orders, menu, tables/QR, payments |

Kitchen, Waiter, and Admin are protected behind role-based login. The Customer App is public — no login, since diners never authenticate.

---

## Features

**Customer App**
- Browse menu by category, search, veg/non-veg indicators
- Cart with quantity controls
- Place order, live status tracking (Received → Preparing → Ready → Served)
- Call Waiter
- View itemized bill (subtotal, tax, service charge, total)
- Pay via Cash, Card, or UPI (manual staff confirmation — see [Payments](#payments) below)

**Kitchen Dashboard**
- Live-polling queue of active orders, oldest first
- One-tap status progression: Accept → Preparing → Ready → Served
- Auto-removes served orders from view

**Waiter Dashboard**
- Live waiter-call notifications with resolve action
- Table status overview
- Active orders at a glance

**Admin Dashboard**
- Overview: today's orders, sales, pending count, average order value, recent orders
- Order management: filter by status, update status, view bill per order
- Menu management: add/edit/delete items, toggle availability
- Table & QR management: create tables, generate scannable QR codes per table
- Payment confirmations: mark Cash/UPI/Card payments as received

**Cross-cutting**
- Role-based JWT authentication (`admin`, `kitchen`, `waiter`)
- Toast feedback on every action
- Skeleton loading states on data-heavy screens

---

## Tech Stack

**Frontend:** React (Vite), React Router, Tailwind CSS, `react-hot-toast`, `react-icons`, `qrcode.react`
**Backend:** Node.js, Express, MongoDB (Mongoose), JSON Web Tokens
**Design:** Custom design system — warm off-white background, maroon accent, forest green for positive actions, Poppins typeface

---

## Project Structure

```
TableTap/
├── backend/
│   ├── controllers/       # Route handlers (menu, order, table, waiterCall, payment, auth)
│   ├── middleware/        # verifyToken, requireRole
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routers
│   └── server.js
└── frontend/
    └── src/
        ├── api/            # fetch wrappers per resource (menuApi, orderApi, etc.)
        ├── components/     # CustomerApp, KitchenDashboard, WaiterDashboard, AdminLayout + sections
        ├── utils/          # auth helpers (token/role storage)
        └── App.jsx         # route definitions
```

---

## Getting Started

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<a long random string>
ADMIN_PASSWORD=<password for the admin role>
KITCHEN_PASSWORD=<password for the kitchen role>
WAITER_PASSWORD=<password for the waiter role>
```

```bash
npm start
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

The customer app is served at `http://localhost:5173/`. Staff log in at `http://localhost:5173/login`.

---

## How a Table's QR Code Works

Each table has a QR code (generated in **Admin → Tables & QR**) encoding a URL like:

```
http://<your-domain>/?table=5
```

Scanning it opens the Customer App with that table number already set — it flows automatically into every order and waiter call placed from that session, no manual entry needed.

> During local development, QR codes point at `localhost`, which only resolves on the machine running the dev server. Update the encoded URL to your deployed domain before printing real QR codes for a table.

---

## Payments

Real payment gateway integration (Razorpay) requires business KYC and is intentionally out of scope for this version. Instead:

- **Cash / Card:** customer confirms intent to pay in-app; a `pending` payment record is created
- **UPI:** customer pays via their own UPI app to the restaurant's UPI ID, then confirms in-app
- **Admin** manually marks the payment `completed` once received, from **Admin → Orders → Pending Payment Confirmations**

This mirrors how many small restaurants actually operate today, and avoids blocking launch on gateway approval.

---

## Authentication

Kitchen, Waiter, and Admin roles log in with a shared per-role password (set via environment variables) and receive a JWT. The token is checked on the frontend (route guarding) and re-verified on the backend for every write action (creating/updating menu items, orders, tables, and payments). Read-only endpoints that customers rely on (placing orders, viewing bills, checking status) remain public by design, since customers never authenticate.

---

## Status

All four interfaces are feature-complete, including the manual payment flow and role-based auth. Remaining work before a production deploy: a form-validation pass, clearing test data, and pointing QR codes at a live domain.

