# E-Commerce Platform

A full-stack E-Commerce application developed using Spring Boot Microservices Architecture and React.

The system follows distributed architecture principles with independent services, centralized API Gateway, JWT-based authentication, and service discovery.

---

## Features

- Microservices Architecture
- JWT Authentication & Authorization
- Secure REST APIs
- API Gateway Routing
- Eureka Service Discovery
- User Management
- Order Management
- React Frontend Integration

---

## Microservices


### API Gateway Service

Central entry point for all client requests.

Features:
- Request routing
- JWT token validation
- Authentication filtering


### Service Registry

Netflix Eureka based service discovery.

Features:
- Dynamic service registration
- Service discovery


### User Service

Responsible for user management and authentication.

Features:

- User Registration
- User Login
- Password Encryption
- JWT Token Generation
- Role Based Authorization


### Order Service

Responsible for order processing.

Features:

- Create Orders
- Fetch User Orders
- Protected Endpoints


---

## Security

Implemented using Spring Security and JWT.

Authentication Flow:


User Login

      |
      v

User Service validates credentials

      |
      v

JWT Token Generated

      |
      v

Client sends JWT Token

      |
      v

API Gateway validates token

      |
      v

Request forwarded to Microservices


---

## Tech Stack

Backend:
- Java
- Spring Boot
- Spring Security
- JWT
- Spring Cloud Gateway
- Eureka Discovery Server
- Spring Data JPA
- MySQL
- Maven


Frontend:
- React
- JavaScript
- Axios


Testing Tools:
- Postman


Version Control:
- Git
- GitHub


---

## Future Enhancements

- Product Service
- Payment Service
- Cart Service
- Kafka Event Driven Communication
- Docker Containerization
- Kubernetes Deployment
- CI/CD Pipeline