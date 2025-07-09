import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  // Login function
  const login = async (email, password) => {
    const res = await axios.get('http://localhost:5000/users', {
      params: { email, password }
    });
    if (res.data.length > 0) {
      setUser(res.data[0]);
      return true;
    }
    return false;
  };

  // Register function
  const register = async (name, email, password) => {
    // Check if user exists
    const exists = await axios.get('http://localhost:5000/users', { params: { email } });
    if (exists.data.length > 0) {
      throw new Error('Email already registered');
    }
    const res = await axios.post('http://localhost:5000/users', { name, email, password });
    setUser(res.data);
    return true;
  };

  // Logout function
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
