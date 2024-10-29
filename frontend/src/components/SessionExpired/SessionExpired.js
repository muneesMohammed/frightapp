// src/components/SessionExpired.js
import React from 'react';
import './SessionExpired.css';
import { useNavigate } from 'react-router-dom';

const SessionExpired = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    // Redirect to login page or any other appropriate page
    navigate('/login');
  };

  return (
    <div className="session-expired">
      <h1>Session Expired</h1>
      <p>Your session has expired. Please log in again.</p>
      <button onClick={handleLoginRedirect}>Login</button>
    </div>
  );
};

export default SessionExpired;
