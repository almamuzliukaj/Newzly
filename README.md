# 📰 Newzly

## Project Description

Newzly is a full-stack news aggregation platform built using the **MERN** stack (MongoDB, Express.js, React, Node.js). It provides authenticated users with personalized access to the latest news from various categories and countries. The application supports user registration, JWT-based authentication, category-based and country-based filtering, pagination, and responsive UI.

---

## Team Members

* **Alma Muzliukaj** – UI Design & Frontend Development
* **Rinesa Bislimi** – API Integration & Backend Development

Both members were actively involved in design, testing, and collaboration across the full stack.

---

## ⚙️ How to Set Up

Follow the steps below to run the Newzly project locally on your machine:

### 📦 Prerequisites

* [Node.js](https://nodejs.org/) (v18+ recommended)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB
* News API Key from [https://newsapi.org](https://newsapi.org)

### 🗂️ 1. Clone the repository

```bash
git clone https://github.com/username/newzly.git
cd newzly
```

### 🔧 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
NEWS_API_KEY=your_newsapi_key
JWT_SECRET=your_jwt_secret
```

Run the backend:

```bash
node server.js
```

### 💻 3. Frontend Setup

```bash
cd frontend
npm install
```

Run the frontend:

```bash
npm run dev
```

App will start on: [http://localhost:5173](http://localhost:5173)

### 📜 Notes

* News content is fetched from **NewsAPI** and cached in MongoDB to ensure availability if the API becomes temporarily unreachable.
* Authentication uses JWT and includes features like **"Remember Me"**, **Forgot Password**, and **Email Confirmation**.
* The UI includes pages for: All News, Country-based News, Category Filters, and a Preferences page.
* All pages are fully **responsive** and tested across multiple screen sizes.

---

## Project Timeline

| Week   | Activities                       |
| ------ | -------------------------------- |
| Week 5 | Project setup                    |
| Week 6 | Registration/Login UI + Backend  |
| Week 7 | Category & Country Filtering     |
| Week 8 | API integration, MongoDB caching |
| Week 9 | Preferences page, final testing  |

---

## Features

* 🔐 User registration and login with JWT authentication
* 🗂️ Browse latest news by category
* 🌍 Browse news by country
* 📚 View all news with pagination
* 🧱 Select preferences (UI-only)
* ⚠️ Error handling and offline fallback
* 📱 Responsive design

---

> This README includes all setup instructions and project details. For further improvements or deployment guides, additional documentation may be provided.
