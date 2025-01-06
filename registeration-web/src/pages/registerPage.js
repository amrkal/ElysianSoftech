import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate
import axios from 'axios';
import { FaUser, FaLock, FaPhone, FaEnvelope } from 'react-icons/fa'; // React Icons
import { ToastContainer, toast } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styling

// Import the CSS that gives it the same style as your LoginPage
import './registerPage.css';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Updated to useNavigate

  const handleRegister = async () => {
    // Input validation
    if (!name || !surname || !phone || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setError(''); // Clear previous error

    const userData = {
      name,
      surname,
      phone,
      email,
      password,
    };

    try {
      const response = await axios.post('/users/create', userData);
      if (response.status === 201) {
        navigate('/welcome'); // Navigate to WelcomePage on success
      } else {
        setError('Unexpected response from server');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Something went wrong');
      } else {
        setError('No response from server');
      }
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="registration-container">
      {/* Logo */}
      <div className="logo-container">
        <img src="/Logo.png" alt="Logo" className="logo" />
      </div>

      <h2 className="title">Register</h2>

      {/* Error Message */}
      {error && <p className="error-text">{error}</p>}

      {/* Name and Surname in Same Row */}
      <div className="row-container">
        <div className="input-container half-width">
          <FaUser className="icon" />
          <input
            type="text"
            className="input"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
          />
        </div>
        <div className="input-container half-width">
          <FaUser className="icon" />
          <input
            type="text"
            className="input"
            placeholder="Surname"
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
              setError('');
            }}
          />
        </div>
      </div>

      {/* Phone Number Input */}
      <div className="input-container">
        <FaPhone className="icon" />
        <input
          type="tel"
          className="input"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError('');
          }}
        />
      </div>

      {/* Email Input */}
      <div className="input-container">
        <FaEnvelope className="icon" />
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
        />
      </div>

      {/* Password Input */}
      <div className="input-container">
        <FaLock className="icon" />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
        />
      </div>

      {/* Confirm Password Input */}
      <div className="input-container">
        <FaLock className="icon" />
        <input
          type="password"
          className="input"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError('');
          }}
        />
      </div>

      {/* Register Button */}
      <button className="btn primary-btn" onClick={handleRegister}>
        Register
      </button>

      {/* Go Back to Login */}
      <div className="register-container">
        <p className="register-text">Already have an account?</p>
        <button onClick={() => navigate('/')} className="btn register-link">
          Log in
        </button>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default RegistrationPage;