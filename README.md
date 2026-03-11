# E-Commerce Microservices System

A **Spring Boot Microservices based E-Commerce backend system** demonstrating modern backend architecture using **Spring Cloud, API Gateway, Service Discovery, JWT Security, and REST APIs**.

This project is built to understand **microservices architecture and secure communication between services**.

---

## 🚀 Project Architecture

The system is divided into multiple microservices:

* **API Gateway**

  * Central entry point for all client requests
  * Handles routing and security

* **Eureka Discovery Server**

  * Service registry where all microservices register themselves
  * Enables dynamic service discovery

* **User Service**

  * Handles user registration and authentication
  * Implements **JWT based security**

* **Order Service**

  * Handles order related APIs
  * Communicates through service discovery

---

## 🧱 Microservices Structure

```
Ecommerce-Microservices-System
│
├── Api-Gateway
├── Eureka-Server
├── Order-Service
└── User-Service
```

---

## 🛠️ Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Cloud
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate

### Microservices Tools

* API Gateway
* Eureka Service Discovery
* REST APIs
* DTO Architecture

### Database

* MySQL / Oracle (configurable)

### Build Tool

* Maven

---

## 🔐 Security Implementation

The project implements **JWT based authentication**:

* User login generates a **JWT Token**
* Token is validated by **Spring Security Filter**
* Only authenticated users can access protected APIs

Key components:

```
SecurityConfig
JwtFilter
JwtUtil
CustomUserDetailsService
```

---

## 📦 Features

✔ Microservices architecture
✔ API Gateway routing
✔ Service Discovery using Eureka
✔ JWT Authentication & Authorization
✔ DTO based API design
✔ Global Exception Handling
✔ Layered Architecture (Controller → Service → Repository)

---

## 📡 Example APIs

### User APIs

```
POST /auth/register
POST /auth/login
GET  /users/{id}
GET  /users
```

### Order APIs

```
POST /orders
GET  /orders/{id}
GET  /orders
```

---

## ⚙️ How to Run the Project

### 1️⃣ Start Eureka Server

```
cd Eureka-Server
mvn spring-boot:run
```

Runs on:

```
http://localhost:8761
```

---

### 2️⃣ Start User Service

```
cd User-Service
mvn spring-boot:run
```

---

### 3️⃣ Start Order Service

```
cd Order-Service
mvn spring-boot:run
```

---

### 4️⃣ Start API Gateway

```
cd Api-Gateway
mvn spring-boot:run
```

---

## 🧑‍💻 Author

**MOHD FAHAD ANSARI**

Aspiring **Full Stack Java Developer**

📍 Hyderabad, India

GitHub:
https://github.com/Mohd-Fahad220

---

## ⭐ Future Improvements

* Add **Inventory Service**
* Implement **Kafka for async communication**
* Add **Docker containers**
* Deploy on **AWS / Kubernetes**
