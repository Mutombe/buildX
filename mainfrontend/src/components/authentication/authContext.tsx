// AuthContext.js
import { createContext, useState } from 'react';
import { login, logout, signup } from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await login(username, password);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignup = async (username: string, email: string, password: string) => {
    try {
      await signup(username, email, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        signup: handleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};