import React, { useState } from 'react';
import './Welcome.css';
import Auth from './Auth';

const Welcome = ({ onLoginSuccess }) => {
  const [showAuth, setShowAuth] = useState(false);

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  const handleLogin = (role, name, email) => {
    setShowAuth(false);
    onLoginSuccess(role, name, email);
  };

  return (
    <>
      <div className="welcome-container">
        <div className="welcome-overlay">
          <div className="welcome-content">
            <h1 className="welcome-title">
              Welcome to <span className="brand-name">HomeServe</span>
            </h1>
            <p className="welcome-subtitle">
              Your Trusted Partner for Professional Home Services
            </p>
            <p className="welcome-description">
              From plumbing to electrical work, cleaning to repairs - 
              we bring quality service right to your doorstep
            </p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
              <span className="btn-arrow">→</span>
            </button>
            <div className="welcome-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Verified Professionals</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>24/7 Support</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Best Prices</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showAuth && <Auth onClose={handleCloseAuth} onLoginSuccess={handleLogin} />}
    </>
  );
};

export default Welcome;
