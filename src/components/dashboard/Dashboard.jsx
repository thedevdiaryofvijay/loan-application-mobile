import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import { mockUserData } from '../../data/mockData';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setUserData(mockUserData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getCurrentDateTime = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const quickActions = [
    {
      title: 'Apply for New Loan',
      description: 'Start a new loan application',
      icon: '💰',
      action: () => navigate('/loan-application'),
      color: '#667eea'
    },
    {
      title: 'View Available Loans',
      description: 'Browse loan products',
      icon: '📋',
      action: () => navigate('/available-loans'),
      color: '#28a745'
    },
    {
      title: 'Check Application Status',
      description: 'Track your applications',
      icon: '📊',
      action: () => navigate('/application-status'),
      color: '#ffc107'
    },
    {
      title: 'Contact Support',
      description: 'Get help from our team',
      icon: '📞',
      action: () => navigate('/contact'),
      color: '#dc3545'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      icon: '📝',
      title: 'Loan Application Submitted',
      description: 'Personal loan application for ₹3,00,000 submitted successfully',
      time: '2 hours ago',
      type: 'success'
    },
    {
      id: 2,
      icon: '✅',
      title: 'Document Verification Complete',
      description: 'All required documents have been verified and approved',
      time: '1 day ago',
      type: 'info'
    },
    {
      id: 3,
      icon: '🏦',
      title: 'Loan Disbursed',
      description: 'Home loan of ₹5,00,000 successfully disbursed to your account',
      time: '3 days ago',
      type: 'success'
    },
    {
      id: 4,
      icon: '📋',
      title: 'Application Under Review',
      description: 'Your car loan application is being reviewed by our team',
      time: '5 days ago',
      type: 'warning'
    }
  ];

  if (loading) {
    return <LoadingSpinner message="Loading your dashboard..." />;
  }

  return (
    <div className="dashboard-container">
      {/* User Menu Button */}
      <button 
        className="user-menu-toggle"
        onClick={() => setShowUserMenu(!showUserMenu)}
        aria-label="User menu"
      >
        <div className="user-avatar">
          {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
        </div>
      </button>

      {/* User Menu Dropdown */}
      {showUserMenu && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <div className="user-avatar-large">
              {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
            </div>
            <div className="user-details">
              <h4>{user.name}</h4>
              <p>{user.role === 'agent' ? 'Agent' : 'Customer'}</p>
              <small>{user.email}</small>
            </div>
          </div>
          <div className="user-menu-actions">
            <button 
              className="menu-item"
              onClick={() => {
                navigate('/profile');
                setShowUserMenu(false);
              }}
            >
              <span className="menu-icon">👤</span>
              Profile Settings
            </button>
            <button 
              className="menu-item"
              onClick={() => {
                navigate('/help');
                setShowUserMenu(false);
              }}
            >
              <span className="menu-icon">❓</span>
              Help & Support
            </button>
            <button 
              className="menu-item"
              onClick={() => {
                navigate('/notifications');
                setShowUserMenu(false);
              }}
            >
              <span className="menu-icon">🔔</span>
              Notifications
            </button>
            <button 
              className="menu-item logout"
              onClick={handleLogout}
            >
              <span className="menu-icon">🚪</span>
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Overlay for user menu */}
      {showUserMenu && (
        <div 
          className="user-menu-overlay"
          onClick={() => setShowUserMenu(false)}
        />
      )}

      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>{getTimeGreeting()}, {user.name}!</h1>
          <p>Here's your loan application overview for today, {getCurrentDateTime()}</p>
          
          <button 
            className="cta-button"
            onClick={() => navigate('/loan-application')}
          >
            Apply for New Loan
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <h3>Active Applications</h3>
              <div className="stat-number">
                {userData?.applications?.active || 2}
              </div>
              <p>Currently processing</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Approved Loans</h3>
              <div className="stat-number">
                {userData?.loans?.approved || 1}
              </div>
              <p>Ready for disbursal</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Total Disbursed</h3>
              <div className="stat-number">
                ₹{userData?.loans?.totalDisbursed || '5,00,000'}
              </div>
              <p>Amount received</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <h3>Credit Score</h3>
              <div className="stat-number">
                {userData?.creditScore || 750}
              </div>
              <p>Excellent rating</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="action-card"
                onClick={action.action}
                style={{ borderLeftColor: action.color }}
              >
                <div className="action-icon" style={{ backgroundColor: `${action.color}15` }}>
                  {action.icon}
                </div>
                <div className="action-content">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
                <div className="action-arrow">→</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className={`activity-item ${activity.type}`}>
                <div className="activity-icon">
                  {activity.icon}
                </div>
                <div className="activity-content">
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                  <small>{activity.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="app-info">
          <p>Last updated: {new Date().toLocaleString()}</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;