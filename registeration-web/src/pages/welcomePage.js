import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import the same styling if you want a similar look
import './welcomePage.css';

const WelcomePage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch random message and show toast
  const fetchRandomMessage = async () => {
    try {
      // Example Node server endpoint
      const response = await axios.get('http://192.168.0.178:5001/random-message');
      const randomMessage = response.data.message || 'Hello from the server!';
      toast.success("Welcome!" ,{randomMessage}, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      toast.error('Error fetching random message', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchRandomMessage();
  }, []);

  return (
    <div className="welcome-container">
      <h1>Welcome!</h1>
      <p>You have successfully registered. Start exploring the app now.</p>

      <button className="btn primary-btn" onClick={() => navigate('/login')}>
        Go to Login
      </button>

      {/* Show error if any */}
      {error && <p className="error-text">{error}</p>}

      <ToastContainer />
    </div>
  );
};

export default WelcomePage;