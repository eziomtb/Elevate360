import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (userData: Partial<User>, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (requiredRole: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    // Check for saved auth in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse auth data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  const login = async (email: string, password: string): Promise<User> => {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email);
        
        if (foundUser && password === 'password') { // Simple password check for demo
          setUser(foundUser);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(foundUser));
          resolve(foundUser);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };
  
  const register = async (userData: Partial<User>, password: string): Promise<User> => {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === userData.email);
        
        if (existingUser) {
          reject(new Error('Email already exists'));
          return;
        }
        
        // Create new user
        const newUser: User = {
          id: `user-${Date.now()}`,
          username: userData.username || '',
          email: userData.email || '',
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          role: userData.role || 'employee',
          department: userData.department || 'General',
          position: userData.position || 'New Employee',
          level: 1,
          xp: 0,
          joinedAt: new Date().toISOString(),
          avatarUrl: userData.avatarUrl,
        };
        
        // In a real app, save to database
        mockUsers.push(newUser);
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve(newUser);
      }, 500);
    });
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    
    const roleHierarchy: Record<UserRole, number> = {
      'admin': 5,
      'hr-manager': 4,
      'team-lead': 3,
      'employee': 2,
      'intern': 1,
      'guest': 0
    };
    
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };
  
  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    hasPermission
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};