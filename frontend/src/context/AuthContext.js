import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI, userAPI } from '../services/apiClient';
import { setToken, removeToken, getToken, decodeTokenPayload } from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      const token = getToken();

      if (!token) {
        if (isMounted) {
          setLoading(false);
        }
        return;
      }

      const email = decodeTokenPayload(token)?.sub;
      const sessionUser = { authenticated: true, email };

      try {
        if (email) {
          const response = await userAPI.getUserByEmail(email);
          if (isMounted) {
            setUser({ ...sessionUser, ...response.data });
          }
        } else if (isMounted) {
          setUser(sessionUser);
        }
      } catch (error) {
        if (isMounted) {
          setUser(sessionUser);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const getTokenFromResponse = (data) => {
    if (typeof data === 'string') {
      return data;
    }

    return data?.token || data?.accessToken || data?.jwt;
  };

  const loadUserProfile = async (email) => {
    const sessionUser = { authenticated: true, email };

    try {
      const response = await userAPI.getUserByEmail(email);
      return { ...sessionUser, ...response.data };
    } catch (error) {
      return sessionUser;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      const token = getTokenFromResponse(response.data);

      if (!token) {
        return { success: false, error: 'Login response did not include a token' };
      }

      setToken(token);
      setUser(await loadUserProfile(email));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
