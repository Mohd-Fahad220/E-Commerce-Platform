import axios from 'axios';
import { getToken, removeToken, API_ENDPOINTS } from '../config/api';

const api = axios.create();

// Add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (email, password) =>
    api.post(API_ENDPOINTS.LOGIN, { email, password }),

  register: (userData) =>
    api.post(API_ENDPOINTS.REGISTER, userData),
};

// User API calls
export const userAPI = {
  createUser: (userData) =>
    api.post(API_ENDPOINTS.CREATE_USER, userData),

  getUserById: (id) =>
    api.get(API_ENDPOINTS.GET_USER(id)),

  getAllUsers: (page = 0, size = 10, sortBy = 'id', direction = 'asc') =>
    api.get(API_ENDPOINTS.GET_ALL_USERS, {
      params: { page, size, sortBy, direction },
    }),

  getUserByEmail: (email) =>
    api.get(API_ENDPOINTS.GET_USER_BY_EMAIL(email)),

  updateUser: (id, userData) =>
    api.put(API_ENDPOINTS.UPDATE_USER(id), userData),

  deleteUser: (id) =>
    api.delete(API_ENDPOINTS.DELETE_USER(id)),
};

// Order API calls
export const orderAPI = {
  createOrder: (orderData) =>
    api.post(API_ENDPOINTS.CREATE_ORDER, orderData),

  getOrderById: (id) =>
    api.get(API_ENDPOINTS.GET_ORDER(id)),

  getUserOrders: (userId) =>
    api.get(API_ENDPOINTS.GET_USER_ORDERS(userId)),

  cancelOrder: (id) =>
    api.delete(API_ENDPOINTS.CANCEL_ORDER(id)),
};

export default api;
