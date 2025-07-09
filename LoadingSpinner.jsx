import React from 'react';

const LoadingSpinner = ({ type = 'spinner', className = '', active = false }) => {
  if (type === 'dots') {
    return (
      <div className={`dots-loader ${active ? 'active' : ''} ${className}`}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    );
  }

  if (type === 'pulse') {
    return (
      <div className={`pulse-loader ${active ? 'active' : ''} ${className}`}>
        <div className="pulse-ring"></div>
        <div className="pulse-ring"></div>
        <div className="pulse-ring"></div>
      </div>
    );
  }

  if (type === 'bars') {
    return (
      <div className={`bars-loader ${active ? 'active' : ''} ${className}`}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    );
  }

  // Default modern spinner
  return (
    <div className={`spinner ${active ? 'active' : ''} ${className}`}></div>
  );
};

export default LoadingSpinner;
