🍽️ Restaurant Admin Dashboard

A full-stack Restaurant Admin Dashboard to manage menu items, orders, and analytics efficiently.
Built with React + Vite (Frontend) and Node.js + Express + MongoDB (Backend) and deployed on Netlify & Render.

🚀 Live Demo
https://restaurant-admin-dashboard-client.onrender.com



🛠 Tech Stack
Frontend

React (Vite)

Tailwind CSS v4

Axios

React Router

Backend

Node.js

Express.js

MongoDB + Mongoose

REST API

JWT-ready structure

Aggregation pipelines

Deployment

Frontend: Netlify

Backend: Render

Database: MongoDB Atlas

📂 Project Structure
restaurant-admin-dashboard/
│
├── client/                # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
├── server/                # Backend (Node + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   └── package.json
│
├── netlify.toml
└── README.md

✨ Features
✅ Menu Management

Add, update, delete menu items

Toggle item availability

Search menu items

Filter by category, price, availability

✅ Order Management

Create orders

Update order status

View order details

Pagination support

✅ Analytics

Top-selling items

Order aggregation using MongoDB pipeline

✅ Production Ready

Centralized error handling

Async handler middleware

Clean API responses

Environment-based configuration

🔌 API Endpoints
Menu
GET    /api/menu
GET    /api/menu/search?q=
GET    /api/menu/:id
POST   /api/menu
PUT    /api/menu/:id
DELETE /api/menu/:id
PATCH  /api/menu/:id/availability

Orders
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PATCH  /api/orders/:id/status

Analytics
GET /api/analytics/top-sellers

⚙️ Environment Variables
Backend (server/.env)
PORT=5000
MONGODB_URI=your_mongodb_atlas_url
CORS_ORIGIN=https://your-netlify-site.netlify.app
NODE_ENV=production

Frontend (client/.env)
VITE_API_BASE_URL=https://your-backend.onrender.com/api

🧪 Local Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/Restaurant-Admin-Dashboard.git
cd Restaurant-Admin-Dashboard

2️⃣ Backend setup
cd server
npm install
npm run dev

3️⃣ Frontend setup
cd client
npm install
npm run dev

🏗 Build for Production (Frontend)
cd client
npm run build


Output will be generated in:

client/build

🌐 Netlify Configuration (Vite)

netlify.toml

[build]
  base = "client"
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

📈 Backend & Frontend Completion Status

Backend: ~95% complete ✅

Frontend: ~80% complete 🚧

Deployment: Completed ✅

🧠 Future Enhancements

Authentication & roles (Admin / Staff)

Dashboard charts (Recharts)

Order notifications

Payment integration

User activity logs

👨‍💻 Author

Balaram

GitHub: https://github.com/balarammukhi245-create
