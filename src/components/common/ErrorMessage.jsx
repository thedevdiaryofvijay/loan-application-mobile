import React from 'react';

const ErrorMessage = ({ 
  message, 
  type = 'error', 
  onClose = null, 
  actions = null 
}) => {
  const getErrorClass = () => {
    switch (type) {
      case 'warning':
        return 'error-message warning';
      case 'info':
        return 'error-message info';
      case 'success':
        return 'error-message success';
      default:
        return 'error-message error';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✅';
      default:
        return '❌';
    }
  };

  return (
    <div className={getErrorClass()}>
      <div className="error-content">
        <span className="error-icon">{getIcon()}</span>
        <div className="error-text">
          <p>{message}</p>
          {actions && (
            <div className="error-actions">
              {actions}
            </div>
          )}
        </div>
        {onClose && (
          <button className="error-close" onClick={onClose}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;