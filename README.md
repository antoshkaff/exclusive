# Exclusive Store — Next.js App (Stripe + Prisma/Postgres)

A fully interactive and mobile-friendly e-commerce app built with **Next.js (App Router)**.
It features **end-to-end auth with JWT cookies**, **Stripe Checkout** with webhook → **Prisma/Postgres** order persistence, products from **dummyjson.com**, and careful work on **performance, SEO, and accessibility**. Cart & wishlist are persisted via **localStorage**.

> Live stack highlights: Next.js App Router • TypeScript • Prisma • PostgreSQL • Stripe • SCSS Modules • Framer Motion • DummyJSON

---

## ✨ Features

* **SEO-ready**: per-page `metadata`, clean routes, optimized images (`next/image`), and semantic structure.
* **Auth (JWT + cookies)**: register/login/logout via `/api/auth/*` with server-side validation and middleware-protected pages.
* **Products API**: server-side fetched from **[https://dummyjson.com](https://dummyjson.com)** with caching (`revalidate: 600`) and infinite lists.
* **Cart & Wishlist**: client state + **localStorage** persistence (`CartContext`, `WishlistContext`).
* **Stripe Checkout**: secure session creation, **status polling**, and **webhook** that finalizes orders in DB.
* **Orders**: private route `/orders` protected by middleware; fetches user orders from `/api/orders`.
* **A11y & UX**: keyboard-friendly inputs, ARIA where applicable, animated modals & transitions (Framer Motion).
* **Mobile-first UI**: responsive layout, optimized imagery, careful tap targets.
* **Clean architecture**: typed services, modular feature folders, clear config for routes & nav.

---

## 🧱 Tech Stack

* **Frontend**: Next.js, TypeScript, SCSS Modules, Framer Motion
* **Backend**: Next.js Route Handlers (`/app/api/*`), Prisma ORM, PostgreSQL
* **Payments**: Stripe Checkout + Webhook
* **Auth**: `jose` for JWT, HttpOnly cookies, middleware guards
* **Data**: DummyJSON for products
* **State**: React Contexts for Auth, Cart, Wishlist, Modal

---

## 📡 API Endpoints (overview)

* `POST /api/auth/register` — create user → sets JWT cookie
* `POST /api/auth/login` — login → sets JWT cookie
* `POST /api/auth/logout` — clears cookie
* `POST /api/checkout` — creates Stripe session (body: `ICartItem[]`)
* `GET  /api/checkout/status?sessionId=` — returns `{ paid, status, orderId? }`
* `POST /api/checkout/webhook` — Stripe → DB write (order finalize)
* `GET  /api/orders?take=&skip=` — list orders for current user (protected)

---

## 🖼 UI & Live Demo
### 🏠 Home Page

![Home Page UI](https://img001.prntscr.com/file/img001/no_KOx_bTd2wPughLQ0NWg.png)
A clean landing with featured products, navigation, and responsive hero section.

### 🛒 Shop Page

![Cart Page UI](https://img001.prntscr.com/file/img001/Hy2Y0sEXTUqQGHaHFl_bDg.png)
A infinite product grid fetched from DummyJSON

### 🛒 Cart Page

![Cart Page UI](https://img001.prntscr.com/file/img001/N3XnJXoaQq-oDjUCaDrsGQ.png)
Interactive cart with quantity controls, totals, and Stripe checkout integration.

### 📦 Order History

![Order History Page UI](https://img001.prntscr.com/file/img001/mvYuYkjFQS6K7QQU3lDm1g.png)
Displays the authenticated user’s orders saved via Stripe Webhook → Prisma/Postgres.

---

### 🚀 Live Demo

[**🔗 Click here to view the live demo**](https://exclusive-sandy.vercel.app)

---
