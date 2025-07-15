import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Navigation = () => {
  const { user } = useAuth();

  // Don't render navigation at all for mobile-first approach
  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>🏦 LoanApp</h2>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;