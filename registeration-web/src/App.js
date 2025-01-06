import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import all your pages:
import LoginPage from './pages/loginPage';
import ForgotPasswordPage from './pages/forgotPasswordPage';
import WelcomePage from './pages/welcomePage';
import RegistrationPage from './pages/registerPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* Define your routes here */}
          <Routes>
            {/* Root path ("/") goes to the Login page */}
            <Route path="/" element={<LoginPage />} />

            {/* Registration page */}
            <Route path="/register" element={<RegistrationPage />} />

            {/* Forgot password page */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Welcome page (shown after successful registration, etc.) */}
            <Route path="/welcome" element={<WelcomePage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
