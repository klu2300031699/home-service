import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [error, setError] = useState('');

  // Predefined credentials
  const VALID_EMAIL = 'gnanesh@gmail.com';
  const VALID_PASSWORD = 'Gnanesh';
  const ADMIN_EMAIL = '2300031699@gmail.com';
  const ADMIN_PASSWORD = 'gncgncgnc';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Admin login check
      if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
        console.log('Admin login successful!');
        const adminName = formData.email.split('@')[0]; // Extract name from email
        onLoginSuccess('admin', adminName, formData.email);
      }
      // Regular user login check
      else if (formData.email === VALID_EMAIL && formData.password === VALID_PASSWORD) {
        console.log('Login successful!');
        onLoginSuccess('user', 'Gnanesh', formData.email);
      } else {
        setError('Invalid credentials! Only registered accounts can login. Please register first or use valid credentials.');
      }
    } else {
      // Register logic
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match!');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      console.log('Register:', formData);
      alert('Registration successful! You can now login.');
      setIsLogin(true);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    });
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="auth-content">
          <h2 className="auth-title">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Login to access our home services' 
              : 'Register to get started with our services'}
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                minLength="6"
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  minLength="6"
                />
              </div>
            )}

            {isLogin && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          <p className="toggle-mode">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleMode} className="toggle-btn">
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
