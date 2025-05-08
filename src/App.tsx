import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PerformanceHub from './pages/Performance/PerformanceHub';
import LearningHub from './pages/Learning/LearningHub';
import EtiquetteHub from './pages/Etiquette/EtiquetteHub';
import Leaderboard from './pages/Gamification/Leaderboard';
import UserProfile from './pages/Profile/UserProfile';
import AdminPanel from './pages/Admin/AdminPanel';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Layout />}>
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/performance/*" 
                element={
                  <ProtectedRoute>
                    <PerformanceHub />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/learning/*" 
                element={
                  <ProtectedRoute>
                    <LearningHub />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/etiquette/*" 
                element={
                  <ProtectedRoute>
                    <EtiquetteHub />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/leaderboard" 
                element={
                  <ProtectedRoute>
                    <Leaderboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;