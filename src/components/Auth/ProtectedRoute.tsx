import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole
}) => {
  const { isAuthenticated, hasPermission } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && !hasPermission(requiredRole)) {
    return <Navigate to="/" replace />; // Redirect to dashboard if insufficient permissions
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;