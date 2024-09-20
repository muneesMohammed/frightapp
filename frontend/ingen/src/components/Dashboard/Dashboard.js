import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
// import jwtDecode from 'jwt-decode';



const Dashboard = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);  // Assuming role is part of the token payload
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleAddUser = () => {
    navigate('/add-user');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      {/* Conditionally show the Add User button only if the user is an admin */}
      {role === 'admin' && (
        <button onClick={handleAddUser}>Add User</button>
      )}
    </div>
  );
};

export default Dashboard;



