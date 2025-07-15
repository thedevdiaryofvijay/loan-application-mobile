import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Navigation from './components/layout/Navigation';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AvailableLoansPage from './components/loans/AvailableLoansPage';
import LoanApplicationPage from './components/loans/LoanApplicationPage';
import './styles/index.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Public Route component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <AuthProvider>
      <Router basename="/loan-application-mobile">
        <div className="App">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/available-loans" 
                element={
                  <ProtectedRoute>
                    <AvailableLoansPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/loan-application" 
                element={
                  <ProtectedRoute>
                    <LoanApplicationPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;