import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/user';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass?: string) => Promise<void>;
  signUp: (email: string, pass: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isVIP: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((usr) => setUser(usr))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, pass?: string) => {
    setLoading(true);
    try {
      const usr = await authService.loginWithEmail(email, pass);
      setUser(usr);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, pass: string, fullName: string) => {
    setLoading(true);
    try {
      const usr = await authService.signUp(email, pass, fullName);
      setUser(usr);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signUp,
    logout,
    isAdmin: user?.role === 'admin',
    isVIP: user?.role === 'vip' || user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
