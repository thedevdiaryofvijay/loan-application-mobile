import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validateRequired } from '../../utils/validation';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    const usernameError = validateRequired(formData.username, 'Username');
    if (usernameError) newErrors.username = usernameError;
    
    const passwordError = validateRequired(formData.password, 'Password');
    if (passwordError) newErrors.password = passwordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = login(formData, 'user');
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors({ submit: result.message });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {errors.submit && (
            <div className="error-message">
              {errors.submit}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              className={errors.username ? 'error' : ''}
            />
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>
          
          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Don't have an account? 
            <Link to="/signup" className="auth-link">Sign up</Link>
          </p>
          <p>
            Are you an agent? 
            <Link to="/agent-login" className="auth-link">Agent Login</Link>
          </p>
        </div>
        
        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <p><strong>Username:</strong> kiran</p>
          <p><strong>Password:</strong> 123456789</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;