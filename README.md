# 💼 WalletX Server -- Digital Wallet API

Welcome to the Digital Wallet API, secure and modular backend system built with **Node.js**, **Express.js**, and **Mongoose**, inspired by services like **Bkash** and **Nagad**. This API enables the creation of a robust digital wallet solution with support for **users**, **agents**, and **administrators**.

---

## 🚀 Overview

This API provides a scalable foundation for a digital wallet system. It includes:

- Secure authentication & authorization
- Role-based access control
- Wallet creation and management
- Transaction tracking and processing
- Modular, maintainable architecture with TypeScript

---

## ✨ Features

### 🔐 Core System

- **JWT Authentication** with access & refresh tokens
- **Password Security** via bcrypt hashing
- **Role-Based Access Control**: User, Agent, Admin
- **Auto Wallet Creation**: Wallet initialized with 50 credits upon registration
- **Transaction Logging**: Full traceability for all operations

### 👤 User Features

- **User Profile Management**: Get user details, update profile, and change password
- **Add Money**: Top-up wallet (e.g., from bank or card)
- **Withdraw Money**: Transfer to external accounts (e.g., ATM, bank)
- **Send Money**: Transfer funds to another user via phone number
- **View Transactions**: Paginated, filterable history (including by date range)

### 🧾 Agent Features

- **Cash-In**: Add funds to a user’s wallet
- **Cash-Out**: Withdraw from a user’s wallet

### 🛠️ Admin Features

- **Full Visibility**: Monitor users, agents, wallets, and transactions
- **Account Control**: Block/unblock wallets, approve/suspend agents
- **Financial Monitoring**: Filter and sort transactions, wallets, users
- **Transaction Oversight**: Review and update statuses

---
