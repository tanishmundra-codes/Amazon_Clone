<div align="center">
  <h1>🛒 Amazon Clone Full-Stack Project</h1>
  <p>A full-stack e-commerce application inspired by Amazon, providing a seamless shopping experience.</p>
  
  <div>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </div>

  <br />

  <a href="#live-demo">Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#local-setup-instructions">Setup</a> •
  <a href="#api-documentation">API Docs</a>
</div>

---

## 🌐 Live Demo & Repository
- **Live Demo (Frontend):** *https://amazonclone-demo.vercel.app/*
- **Live Backend API:** *https://amazonclone.up.railway.app/*
- **GitHub Repository:** *https://github.com/tanishmundra-codes/Amazon_Clone*

---

## 📸 Demo

<div align="center">
  <img src="./assets/demo.png" alt="Amazon Clone Homepage" width="800" />
</div>


## ✨ Features
### Core Features
- **User Authentication:** Secure JWT-based registration and login system.
- **Product Catalog:** Browse products across various categories with filtering capabilities.
- **Product Details & Reviews:** View rich product descriptions, pricing, and user reviews.
- **Shopping Cart Management:** Add items, update quantities, remove products, and seamlessly merge guest carts upon login.
- **Checkout Process:** Comprehensive checkout flow capturing shipping information and calculating totals.
- **Order History & Confirmation:** Track past orders and view detailed order confirmation pages.

### Bonus / Advanced Features
- **Responsive UI:** Pixel-perfect and fully responsive interface built with modern CSS properties using Tailwind CSS v4.
- **Server-Side Rendering:** Improved SEO and fast initial page loads thanks to Next.js App Router architecture.
- **Relational Integrity:** Highly structured schema with foreign-key constraints cascading deletes using Prisma.
- **Secure Sessions:** HTTP-Only cookie-based JWT storage reducing XSS vulnerability risks.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js (React)
  - *Why:* Provides excellent Developer Experience (DX), built-in routing (App Router), Server-Side Rendering (SSR) for fast page loads and SEO optimization.
- **Styling:** Tailwind CSS v4
  - *Why:* Utility-first CSS allows for rapid UI development, consistent theming, and zero context-switching between markup and stylesheets.

### Backend
- **Runtime & Framework:** Node.js with Express.js
  - *Why:* Fast and non-blocking architecture, allows sharing Javascript knowledge across the full stack, and offers a massive middleware ecosystem.
- **Authentication:** JWT (JSON Web Tokens) + bcryptjs
  - *Why:* Stateless authentication mechanism that scales well across servers; bcryptjs safely hashes user passwords.

### Database & ORM
- **Database:** PostgreSQL
  - *Why:* An enterprise-grade open-source relational database that ensures strict data integrity—crucial for financial and e-commerce records.
- **ORM:** Prisma
  - *Why:* Type-safe database queries, intuitive schema definition, and automated migration management, significantly reducing chances of runtime database errors.

---

## 📁 Folder Structure

```text
amazon-clone/
├── backend/                  # Node.js & Express API
│   ├── controllers/          # Request handlers
│   ├── lib/                  # Utility functions
│   ├── middleware/           # Express middleware (auth, etc.)
│   ├── prisma/               # Database schema and migrations
│   ├── routes/               # API route definitions
│   ├── .env                  # Environment variables
│   └── server.js             # API entry point
└── frontend/                 # Next.js Application
    ├── app/                  # App Router pages and layouts
    │   ├── (landing)/        # Homepage
    │   ├── auth/             # Login & Registration
    │   ├── cart/             # Shopping cart
    │   ├── checkout/         # Checkout flow
    │   ├── order/            # Order confirmation
    │   ├── orders/           # User order history
    │   └── product/          # Product details
    ├── components/           # Reusable UI components
    ├── context/              # React Context (Auth, Cart)
    ├── lib/                  # Frontend utilities and API clients
    ├── public/               # Static assets
    └── .env.local            # Environment variables
```

---

## 🚀 Local Setup Instructions

### Prerequisites
1. **Node.js**: v18 or newer installed on your machine.
2. **PostgreSQL**: Running locally or via a cloud provider (e.g., Supabase, Neon, Railway).
3. **Git**: To clone the repository.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/amazon-clone.git
cd amazon-clone
```

### 2. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   Create a `.env` file in the `backend/` folder and add the following:
   ```env
   # Backend Environment Variables (.env)
   DATABASE_URL="postgresql://user:password@localhost:5432/amazon_clone" # Replace with your real DB URL
   PORT=5000
   JWT_SECRET="super_secret_key_change_in_production"
   FRONTEND_URL="http://localhost:3000"
   ```
4. Run Prisma database migrations to create tables:
   ```bash
   npm run db:migrate
   ```
5. Seed the database with initial categories and products (Optional but recommended):
   ```bash
   npm run db:seed
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
   *The backend will now be running on `http://localhost:5000`.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   Create a `.env.local` file in the `frontend/` folder and add:
   ```env
   # Frontend Environment Variables (.env.local)
   NEXT_PUBLIC_API_URL="http://localhost:5000/api"
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend will now be running on `http://localhost:3000`.*

---

## 🗄 Database Schema Overview

The database uses a robust relational model designed with Prisma:
- **`User`**: Manages authentication (`email`, `password`) and roles (`ADMIN`, `CUSTOMER`). Has relations to `Orders`, `CartItems`, and `Reviews`.
- **`Category`**: Groupings for products (`slug`, `name`).
- **`Product`**: Details products for sale (`price`, `stock`, `rating`, `images`). Relates to a `Category`.
- **`Review`**: User-generated ratings and comments mapped to a `Product` and `User`.
- **`CartItem`**: Transient basket items mapped between a `User` and `Product`.
- **`Order` & `OrderItem`**: Persistent records of purchases, tracking `totalAmount`, `status` (PENDING, DELIVERED), `shippingAddress`, and linking purchased items.

---

## 📡 API Endpoints Documentation

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | :---: |
| **Auth** |
| POST | `/api/auth/register` | Register a new user account | ❌ |
| POST | `/api/auth/login` | Authenticate user and receive JWT cookie | ❌ |
| POST | `/api/auth/logout` | Clear JWT authentication cookie | ❌ |
| GET | `/api/auth/me` | Get current logged-in user profile | ✅ (Optional) |
| **Products & Categories** |
| GET | `/api/categories` | Retrieve all product categories | ❌ |
| GET | `/api/products` | Retrieve all products (supports filtering) | ❌ |
| GET | `/api/products/:id` | Retrieve single product specific details with reviews | ❌ |
| **Cart** |
| GET | `/api/cart` | Retrieve user's active shopping cart | ✅ |
| POST | `/api/cart` | Add a new item to the cart | ✅ |
| POST | `/api/cart/merge` | Merge guest cart with authenticated user cart | ✅ |
| PUT | `/api/cart/:id` | Update quantity of a specific cart item | ✅ |
| DELETE | `/api/cart/:id` | Remove a product from the shopping cart | ✅ |
| **Orders** |
| POST | `/api/orders` | Checkout cart and place a new order | ✅ |
| GET | `/api/orders` | Retrieve order history for the logged-in user | ✅ |
| GET | `/api/orders/:id` | Retrieve specifics of an order confirmation | ✅ |

*(Note: API prefix is `http://localhost:5000` in dev. Authenticated routes expect an HTTP-Only JWT Cookie).*

---

## 🤔 Assumptions Made
- **Payment Gateway:** The system currently simulates payments via Cash On Delivery (COD) as a default mechanism. Live integrations with Stripe or similar gateways are mocked.
- **Image Hosting:** Product images and avatars are currently handled as plain URLs in the database, expecting external hosting or placeholder image integration.
- **Admin Control:** While an `ADMIN` role exists within the database schema, a dedicated admin dashboard UI is out-of-scope for the initial MVP.

---

## 🔮 Future Improvements
1. **Payment Integration:** Implement Stripe API or Razorpay to process real credit card payments securely.
2. **Admin Dashboard:** Build a restricted-access UI for administrators to easily create/edit products, manage categories, and oversee order statuses.
3. **Advanced Search & Filtering:** Integrate Algolia or full-text Postgres search for scalable, typo-tolerant product queries.
4. **Email Notifications:** Trigger automated emails for successful registration, order placements, and shipping updates using Resend or SendGrid.
5. **Wishlist Feature:** Allow users to save items for later without adding them directly to the cart.
6. **Improved Caching:** Implement Redis to cache the product catalog and categories, reducing Postgres DB latency under high loads.

---

<div align="center">
  <i>Developed with ❤️</i>
</div>
