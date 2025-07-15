import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateRequired } from '../../utils/validation';
import { DEPARTMENTS } from '../../utils/constants';

const AgentLoginPage = () => {
  const [formData, setFormData] = useState({
    agentId: '',
    password: '',
    department: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    const agentIdError = validateRequired(formData.agentId, 'Agent ID');
    if (agentIdError) newErrors.agentId = agentIdError;
    
    const passwordError = validateRequired(formData.password, 'Password');
    if (passwordError) newErrors.password = passwordError;
    
    const departmentError = validateRequired(formData.department, 'Department');
    if (departmentError) newErrors.department = departmentError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = login(formData, 'agent');
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors({ submit: result.message });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-container agent-auth">
      <div className="auth-card agent-card">
        <div className="auth-header">
          <h1>Agent Portal</h1>
          <p>Authorized personnel only</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {errors.submit && (
            <div className="error-message">
              {errors.submit}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="agentId">Agent ID</label>
            <input
              type="text"
              id="agentId"
              name="agentId"
              value={formData.agentId}
              onChange={handleInputChange}
              placeholder="Enter your agent ID"
              className={errors.agentId ? 'error' : ''}
            />
            {errors.agentId && (
              <span className="error-text">{errors.agentId}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className={errors.department ? 'error' : ''}
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept.toLowerCase().replace(/\s+/g, '_')}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <span className="error-text">{errors.department}</span>
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
          
          <div className="security-notice">
            <p>⚠️ This is a secure area. All access is logged and monitored.</p>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-danger btn-full"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Access Portal'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Regular user? 
            <Link to="/login" className="auth-link">User Login</Link>
          </p>
          <p>
            Need help? Contact IT Support: 
            <a href="mailto:support@loanapp.com" className="auth-link">
              support@loanapp.com
            </a>
          </p>
        </div>
        
        <div className="demo-credentials">
          <h4>Demo Agent Credentials:</h4>
          <p><strong>Agent ID:</strong> agent001</p>
          <p><strong>Password:</strong> agent123</p>
        </div>
      </div>
    </div>
  );
};

export default AgentLoginPage;