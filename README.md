# DevMatch

DevMatch is a full-stack developer networking platform that enables developers to create profiles, discover other developers, send connection requests, and build professional connections. The platform includes secure authentication, profile management, connection workflows, and email notifications powered by AWS SES.

---

# Live Demo

Frontend: https://www.devmatch.website

Explore the live application and create an account to experience the complete developer networking workflow.

---

# Features

## Authentication

* User Signup
* User Login
* User Logout
* JWT-based Authentication
* JWT stored in secure httpOnly cookies
* Protected Routes

## Password Management

* Email Verification
* Password Reset Flow
* Secure Password Update

## Profile Management

* View Profile
* Edit Profile
* Delete Profile

## Developer Feed

* Paginated Feed
* Excludes Current User
* Excludes Existing Connections
* Optimized Feed Retrieval

## Connection System

* Send Connection Requests
* Receive Pending Requests
* Accept Connection Requests
* Reject Connection Requests
* View Accepted Connections
* View Sent Pending Requests

## Email Notifications

* AWS SES Integration
* Automatic Email Notification when a Connection Request is Sent

---

# Tech Stack

## Frontend

* React.js
* TypeScript
* Vite
* Redux Toolkit
* Tailwind CSS
* DaisyUI

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie Parser

## Cloud & Deployment

* AWS EC2
* AWS SES
* Nginx

---

# Architecture

Client (React + TypeScript)

↓

Node.js + Express API

↓

MongoDB Database

↓

AWS SES (Email Service)

Authentication is handled using JWT stored in httpOnly cookies. All protected routes are secured using middleware-based authentication.

---

# Project Structure

```text
DevMatch/
│
├── backend/
│   ├── src/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── App.tsx
│
└── README.md
```

---

# Prerequisites

Before running the project locally, ensure you have:

* Node.js (LTS Version)
* MongoDB
* AWS Account
* AWS SES Enabled

---

# Environment Variables

## Backend (.env)

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

AWS_ACCESS_KEY=your_aws_access_key

AWS_SECRET_KEY=your_aws_secret_key
```

Notes:

* JWT_SECRET is used for token signing and verification.
* AWS SES is configured for email notifications.
* MongoDB stores user, profile, and connection data.

---

# Installation & Setup

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# API Overview

Base URL:

```text
http://localhost:8000
```

## Authentication APIs

```http
POST /auth/signup

POST /auth/login

POST /auth/email-verify

POST /auth/reset-password

POST /auth/logout
```

---

## User APIs

```http
GET /user/get-profile

PUT /user/edit-profile

DELETE /user/delete-profile

GET /user/feed
```

---

## Connection APIs

```http
POST /request/send/:userId

GET /request

POST /request/review/:requestId

GET /request/connections

GET /request/sent
```

All routes are protected using JWT authentication.

---

# Security Features

* JWT Authentication
* httpOnly Cookie Storage
* Protected API Routes
* Middleware-based Authorization
* Secure Password Handling
* CORS Configuration
* Authentication Validation

---

# Deployment

The application is deployed on AWS EC2 with Nginx configured as a reverse proxy.

Production Stack:

* AWS EC2
* Nginx
* Node.js
* React
* MongoDB
* AWS SES

---

# Future Enhancements

* Real-Time Chat System
* Profile Recommendations
* Notification Center
* Advanced Search & Filtering
* Premium Subscription Features

---

# Key Learning Outcomes

Through this project, I gained hands-on experience with:

* JWT Authentication
* Cookie-Based Security
* REST API Development
* MongoDB & Mongoose
* AWS SES Integration
* AWS EC2 Deployment
* Nginx Configuration
* Redux Toolkit State Management
* Full Stack Application Development

---

# License

Licensed under the MIT License.
