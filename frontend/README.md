# Frontend Setup Guide

## Overview

This is a modern React frontend for the E-Commerce Microservices system with the following features:

- ✅ User Authentication (Login/Register)
- ✅ JWT Token Management
- ✅ User Management (CRUD Operations)
- ✅ Order Management (CRUD Operations)
- ✅ Dashboard with quick stats
- ✅ Responsive Design with Tailwind CSS
- ✅ Error Handling & Loading States
- ✅ Protected Routes

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update API configuration (if needed):
   - Open `src/config/api.js`
   - Adjust `API_BASE_URL` if your gateway runs on a different port

4. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Navigation bar
│   │   └── PrivateRoute.js     # Protected routes wrapper
│   ├── config/
│   │   └── api.js             # API endpoints & token management
│   ├── context/
│   │   └── AuthContext.js      # Authentication state management
│   ├── pages/
│   │   ├── Dashboard.js        # Main dashboard
│   │   ├── Login.js            # Login page
│   │   ├── Register.js         # Registration page
│   │   ├── Users.js            # User management (CRUD)
│   │   └── Orders.js           # Order management (CRUD)
│   ├── services/
│   │   └── apiClient.js        # Axios API client with interceptors
│   ├── App.js                  # Main app component
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── package.json
└── README.md
```

## Features in Detail

### 1. Authentication (Login/Register)
- Users can register with firstName, lastName, email, and password
- Secure login that returns a JWT token
- Token is stored in localStorage
- Automatic logout on 401 (Unauthorized) response

### 2. User Management
- **View All Users**: Paginated list of all users (admin only)
- **Add User**: Form to create new users
- **Edit User**: Update user information
- **Delete User**: Remove users from the system

### 3. Order Management
- **Create Order**: Form to create orders with userId, productName, and quantity
- **View Orders**: Display orders in card layout
- **View Details**: Modal to view detailed order information
- **Cancel Order**: Delete/cancel orders

### 4. Dashboard
- Quick stats cards
- System status monitoring
- Quick action buttons
- Recent activity section

## API Integration

The frontend communicates with the API Gateway via the following endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /users/register` - User registration

### Users (Protected)
- `GET /users/id/{id}` - Get user by ID
- `GET /users/allusers` - Get all users (admin only)
- `GET /users/email/{email}` - Get user by email
- `PUT /users/fullupdate/{id}` - Update user
- `DELETE /users/delete/{id}` - Delete user

### Orders (Protected)
- `POST /orders` - Create order
- `GET /orders/{id}` - Get order by ID
- `GET /orders/user/{userId}` - Get user's orders
- `DELETE /orders/{id}` - Cancel order

## Authentication Flow

1. User logs in with email/password
2. Backend returns JWT token
3. Token is stored in localStorage
4. Token is automatically included in all API requests via axios interceptor
5. If token expires (401), user is redirected to login

## Styling

The app uses **Tailwind CSS** (loaded from CDN) for styling. All components use utility classes for consistent, modern UI.

## Error Handling

- API errors are caught and displayed to users
- Network errors are handled gracefully
- Validation errors are shown on forms
- Session expiration redirects to login

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests (if configured)
npm test

# Eject configuration (not recommended)
npm eject
```

## Important Notes

- The API Gateway should be running on `http://localhost:8080`
- All services should be registered with Eureka before making API calls
- JWT tokens expire based on backend configuration
- CORS must be enabled on the backend for frontend to work

## Troubleshooting

### Can't connect to API
- Ensure all microservices are running
- Check if API Gateway is accessible at `http://localhost:8080`
- Check browser console for CORS errors

### Login fails
- Verify credentials in the backend database
- Check if User Service is running
- Check API Gateway logs

### Blank page on startup
- Check if `http://localhost:3000` is loading
- Open browser DevTools console for errors
- Ensure Node.js and npm are properly installed

## Future Enhancements

- Add pagination for users list
- Add search and filter functionality
- Add real-time notifications
- Add charts/analytics dashboard
- Add product catalog management
- Add shopping cart functionality
- Add payment integration
