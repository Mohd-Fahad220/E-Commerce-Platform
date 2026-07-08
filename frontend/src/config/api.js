// Relative URLs are proxied by setupProxy.js in development.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
const ORDER_API_BASE_URL = process.env.REACT_APP_ORDER_API_BASE_URL || '';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/users/register`,

  // User endpoints
  GET_USER: (id) => `${API_BASE_URL}/users/id/${id}`,
  GET_ALL_USERS: `${API_BASE_URL}/users/allusers`,
  CREATE_USER: `${API_BASE_URL}/users/register`,
  GET_USER_BY_EMAIL: (email) => `${API_BASE_URL}/users/email/${email}`,
  UPDATE_USER: (id) => `${API_BASE_URL}/users/fullupdate/${id}`,
  DELETE_USER: (id) => `${API_BASE_URL}/users/delete/${id}`,

  // Order endpoints
  CREATE_ORDER: `${ORDER_API_BASE_URL}/orders`,
  GET_ORDER: (id) => `${ORDER_API_BASE_URL}/orders/${id}`,
  GET_USER_ORDERS: (userId) => `${ORDER_API_BASE_URL}/orders/user/${userId}`,
  CANCEL_ORDER: (id) => `${ORDER_API_BASE_URL}/orders/${id}`,
};

export const TOKEN_KEY = 'authToken';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const decodeTokenPayload = (token = getToken()) => {
  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    const json = decodeURIComponent(
      decoded
        .split('')
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );

    return JSON.parse(json);
  } catch (error) {
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};
