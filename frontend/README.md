# ⚡ Full-Stack EV Charging Station Management App

A full-stack web application to manage Electric Vehicle (EV) charging stations. Built using **Node.js**, **Express**, **MySQL**, and **JWT authentication** for the backend, and **Vue.js (Vite)** for the frontend.

## 📁 Project Structure

/charging-app
├── backend/ # Node.js + Express API (CRUD + Auth)
├── frontend/ # Vue.js + Vite UI

markdown
Copy
Edit

## 🧪 Features

### ✅ Backend (Node.js + Express)
- User authentication (JWT): Register & Login
- Protected CRUD APIs for charging stations
- Charging Station model includes:
  - Name
  - Location (Latitude, Longitude)
  - Status (Active/Inactive)
  - Power Output (kW)
  - Connector Type

### ✅ Frontend (Vue.js + Vite)
- Login page with token-based auth
- Dashboard with:
  - Charger listing table (filter by status, power output, connector)
  - Add/Edit/Delete chargers
- Google Maps integration to show charger markers

## 🛠️ Technologies Used

- **Frontend:** Vue 3, Vite, Tailwind CSS, Axios, Vue Router
- **Backend:** Node.js, Express, MySQL, JWT, Sequelize ORM
- **Deployment:** Vercel (frontend), Render (backend)

## 🚀 Live URLs

- 🔗 **Frontend (Vue App):** https://your-frontend.vercel.app
- 🔗 **Backend API (Render):** https://your-backend.onrender.com

## ⚙️ Setup Instructions

### 📌 Prerequisites
- Node.js & npm
- MySQL
- Git

### 🔧 Backend Setup

```bash
cd backend
npm install
Create a .env file inside the backend/ folder:

env
Copy
Edit
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ev_charging
JWT_SECRET=myjwtsecret
Run backend:

bash
Copy
Edit
node index.js
💻 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
Create a .env file inside the frontend/ folder:

env
Copy
Edit
VITE_API_URL=https://your-backend.onrender.com
Run frontend:

bash
Copy
Edit
npm run dev
📬 API Endpoints
🔐 Auth
POST /api/auth/register

POST /api/auth/login → returns JWT token

⚡ Charging Stations (protected routes)
GET /api/chargers

POST /api/chargers

PUT /api/chargers/:id

DELETE /api/chargers/:id

Use Bearer token in Authorization header:

makefile
Copy
Edit
Authorization: Bearer <your-jwt-token>
📦 Deployment Notes
Frontend on Vercel
Project root: frontend/

Set env var: VITE_API_URL=https://your-backend.onrender.com

Backend on Render
Project root: backend/

Add env vars: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET

👨‍💻 Author
Made with ❤️ by [Shubh]

vbnet
Copy
Edit