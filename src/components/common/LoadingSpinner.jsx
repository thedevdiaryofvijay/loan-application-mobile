import React from 'react';

const LoadingSpinner = ({ 
  message = 'Loading...', 
  size = 'medium',
  color = '#667eea',
  fullScreen = false 
}) => {
  const getSpinnerSize = () => {
    switch (size) {
      case 'small':
        return '20px';
      case 'large':
        return '60px';
      default:
        return '40px';
    }
  };

  const spinnerStyle = {
    width: getSpinnerSize(),
    height: getSpinnerSize(),
    border: `4px solid #f3f3f3`,
    borderTop: `4px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px'
  };

  const containerClass = fullScreen ? 'loading-container full-screen' : 'loading-container';

  return (
    <div className={containerClass}>
      <div className="loading-spinner">
        <div style={spinnerStyle}></div>
        <p className="loading-text">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;