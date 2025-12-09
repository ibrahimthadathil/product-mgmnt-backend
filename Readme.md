# 🛠 Product Management Backend (Express + MongoDB)

This backend powers the Product Management System built as part of the Full Stack Developer Machine Test (v2).  
It supports secure authentication, product CRUD operations, cart management, image uploads, and deployment using AWS EC2 with NGINX and SSL.

---

## 🚀 Live API

🔗 **Base URL:** https://api-product.luxbid.shop  
All requests should be prefixed with `/api`.

---

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| Language | TypeScript |
| Framework | Express.js |
| Auth | NextAuth-compatible JWT |
| Database | MongoDB (Dockerized) |
| File Upload | Multer + AWS S3 |
| Deployment | AWS EC2 + PM2 + NGINX + Certbot SSL |
| Architecture | Repository Pattern + SOLID Principles |

---

## 🏗 Architecture

The backend follows:

* **Monolithic** Code Structure
* **Repository Pattern**
* **Service Layer**
* **Controller-Based** Routing
* **SOLID Principles**
* Maintainable, testable **separation of concerns**

## 📂 Folder Structure

src/
├── config/
├── controllers/
├── repositories/
├── services/
├── models/
├── middlewares/
├── routes/
├── utils/
└── server.ts

Monolithic architecture following **Repository + Service + Controller** layer separation.

---

## 🏗 Installation & Setup

```bash
git clone <repo-url>
cd backend
npm install

## 🔐 Environment Variables
Create a .env file based on the following:

Variable Name	Description	Example Value
PORT	The port the server will run on	5000
MONGO_URI	Connection string for MongoDB	mongodb://localhost:27017/db
JWT_SECRET	Secret key for JWT signing	YOUR_SUPER_SECRET_KEY
AWS_BUCKET	Name of the AWS S3 bucket	product-images-bucket
AWS_REGION	AWS region for the bucket	us-east-1
AWS_ACCESS_KEY	AWS Access Key ID	AKIA...
AWS_SECRET_KEY	AWS Secret Access Key	wJalrXU...

## 🧪 API Endpoints
🛍 Product Routes (Authenticated)

Method,Route,Description
GET,/products,Get all products
POST,/products,Create product
PUT,/products/:id,Update product
DELETE,/products/:id,Delete product

## 🛒 Cart Routes (Authenticated)
Method,Route,Description
GET,/cart,Get cart contents for the user
POST,/cart/add,Add product to cart
POST,/cart/update,Update item quantity in cart
POST,/cart/remove,Remove item from cart

## 🖼 Image Upload

Uses Multer for parsing form data

Minimum 3 images required per product

Files are stored securely in AWS S3

🔐 Authentication
JWT (JSON Web Tokens) based authentication

Integrated token model supporting NextAuth structure

All sensitive routes are protected using an authentication middleware

🚀 Deployment
Backend is deployed on AWS EC2

NGINX is configured as a reverse-proxy

SSL is enabled via Certbot for secure connections

MongoDB runs in a dedicated Docker container

🏆 Bonus Features Completed
Repository Pattern + SOLID principles applied

Design is Pagination-ready for scalable data retrieval

Clean, structured dependency handling

Secure production configuration (PM2, NGINX)