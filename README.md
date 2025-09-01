# 🍔 Food Ordering Web App

A full-stack food ordering application built using **React.js** (frontend) and **Spring Boot** (backend), with secure **JWT-based authentication**, **Razorpay payment integration**, and **AWS S3 image storage**.

---

## Tech Stack

- **Frontend**: React.js, Axios, React Router
- **Backend**: Spring Boot, Spring Security, JWT
- **Payment Gateway**: Razorpay
- **Cloud Storage**: AWS S3 (for storing images)
- **Authentication**: Role-based access (User, Admin, Vendor)

---

## Features

- **User Authentication & Authorization**
  - Login & registration using JWT
  - Role-based access control (admin, customer)
  - Secure APIs with Spring Security

- **Admin Panel**
  - Manage restaurants, food items, and categories
  - Upload images for food items using AWS S3
  - Assign or update user roles

- **Customer Side**
  - Browse restaurants and menus
  - Add items to cart and place orders
  - Checkout with Razorpay payment gateway

- **Razorpay Integration**
  - Create orders from backend
  - Handle payment success/failure
  - Verify payment signatures on backend

- **Image Uploads with AWS S3**
  - Upload food item images via frontend form
  - Store and retrieve from AWS S3 bucket
  - Display stored images dynamically on frontend

---

##  Project Structure

### Backend (`/spring-boot-app`)
- `controllers/` – REST API endpoints
- `services/` – Business logic and service layer
- `security/` – JWT filter, user details, token provider
- `entity/` & `repositories/` – JPA entities and data access
- `config/` – AWS S3, Razorpay, security configuration
- `dto/request/` – Data Transfer Objects for requests and responses

### Frontend (`/react-app`)
- `components/` – Reusable UI elements (NavBar, Cards, Forms)
- `pages/` – Views for login, menu, cart, dashboard
- `services/` – API calls (auth, order, food, payment)
- `context/` – Auth and cart management (React Context API)
- `utils/` – Helper functions (JWT, protected routes)

---

##  How to Run

### Backend Setup
1. Update `application.properties` with:
   - Database URL and credentials
   - JWT secret and expiration
   - Razorpay API keys
   - AWS S3 credentials and bucket name
2. Run the Spring Boot server:
   ```bash
   mvn clean install
   mvn spring-boot:run
