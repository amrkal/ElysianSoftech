import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './forgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validate email format
  const isValidEmail = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val);
  };

  // Handle sending the reset email
  const handleSendEmail = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await axios.post('/users/forgot-password', { email });
      setLoading(false);
      alert("A password reset link has been sent to" ,{email});
      navigate('/login');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Something went wrong');
      console.error('Error occurred:', err);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="logo-container">
        <img src="/Logo.png" alt="Logo" className="logo" />
      </div>

      <h2 className="title">Forgot Password</h2>

      <div className="input-container">
        <input
          type="email"
          className="input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <button
        className="btn primary-btn"
        onClick={handleSendEmail}
        disabled={loading}
      >
        {loading ? <span>Loading...</span> : 'Send Reset Link'}
      </button>

      <div className="register-container">
        <p>Remembered your password?</p>
        <button onClick={() => navigate('/login')} className="btn register-link">
          Log in
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;