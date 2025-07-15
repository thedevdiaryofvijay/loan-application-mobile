import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validateRequired, validatePassword, validateConfirmPassword, validatePhone } from '../../utils/validation';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
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
    
    const firstNameError = validateRequired(formData.firstName, 'First Name');
    if (firstNameError) newErrors.firstName = firstNameError;
    
    const lastNameError = validateRequired(formData.lastName, 'Last Name');
    if (lastNameError) newErrors.lastName = lastNameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    const usernameError = validateRequired(formData.username, 'Username');
    if (usernameError) newErrors.username = usernameError;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = register(formData);
      
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
      <div className="auth-card signup-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join us and start your loan journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {errors.submit && (
            <div className="error-message">
              {errors.submit}
            </div>
          )}
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && (
                <span className="error-text">{errors.firstName}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && (
                <span className="error-text">{errors.lastName}</span>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter 10-digit phone number"
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && (
              <span className="error-text">{errors.phone}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Choose a username"
              className={errors.username ? 'error' : ''}
            />
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create password"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
              />
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
            {errors.agreeToTerms && (
              <span className="error-text">{errors.agreeToTerms}</span>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Already have an account? 
            <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;