# SmartMovers 🚚

A fullstack moving services platform built with Next.js, TypeScript, Tailwind CSS, and MySQL.

## 🌐 Live Demo
smart-movers-nextjs-migration-production.up.railway.app

## 📁 Repositry
https://github.com/daksharyan18aug/Smart-Movers-Next.js-migration

---

## 🚀 Features

- 🔐 Real user authentication (Signup & Login)
- 🗄️ MySQL database integration for users and orders
- 🔒 Secure password hashing with bcryptjs
- 🍪 JWT authentication via HTTP-only cookies
- 📦 Browse moving packages
- 🏢 Browse moving companies
- 📋 Book movers and manage orders
- 📊 User dashboard
- 📱 Fully responsive UI with Tailwind CSS
- ⚡ Built with Next.js App Router

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | MySQL (local) |
| Auth | JWT + bcryptjs + HTTP-only cookies |

---

## 🗂️ Project Structure

```
smart-movers-next/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── signup/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── me/route.ts
│   │   ├── orders/route.ts
│   │   ├── bookings/route.ts
│   │   └── companies/route.ts
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── dashboard/page.tsx
│   ├── packages/page.tsx
│   ├── companies/page.tsx
│   ├── book/page.tsx
│   ├── contact/page.tsx
│   ├── confirm-booking/page.tsx
│   ├── details/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   ├── BookingForm.tsx
│   ├── BookingTable.tsx
│   ├── Card.tsx
│   ├── CompanyCard.tsx
│   ├── PackageCard.tsx
│   ├── SectionHeading.tsx
│   └── Skeleton.tsx
├── lib/
│   └── db.ts
├── types/
│   └── index.ts
├── public/
├── .env.local
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/smart-movers-next.git
cd smart-movers-next
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup MySQL database

Make sure MySQL is running, then run:

```sql
CREATE DATABASE smartmoversnext;

USE smartmoversnext;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  from_address TEXT NOT NULL,
  to_address TEXT NOT NULL,
  package_type VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 4. Create `.env.local`

```bash
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=smartmoversnext
JWT_SECRET=your_secret_key
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Authentication Flow

1. User signs up → password is hashed with bcryptjs → stored in MySQL
2. User logs in → password verified → JWT token created
3. JWT stored in HTTP-only cookie (secure, not accessible via JavaScript)
4. Protected routes check cookie via `/api/auth/me`
5. Logout deletes the cookie

---

## 📌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/orders` | Get user orders |
| POST | `/api/orders` | Place new order |
