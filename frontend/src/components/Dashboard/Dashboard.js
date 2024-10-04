import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Dashboard.css'; 
import userImage from '../../Assets/images/userImage.png';

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(''); // State for storing the username
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const roles = decodedToken.sub.role; // Access roles from sub
        setUserRole(roles.length > 0 ? roles[0] : null); // Set the first role or null
        setUsername(decodedToken.sub.username); // Extract the username from the token
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page
  };

  // List of services based on user roles
  const services = [
    { name: 'Add New Job' },
    { name: 'Track Shipment' },
    { name: 'Invoice Management' },
    { name: 'Report Generation' },
    { name: 'Accounts' },
    ...(userRole === 'admin' ? [{ name: 'User Management' }] : []), // Add User Management if admin
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Freight Management</h2>
        <ul className="services-list">
          {services.map((service, index) => (
            <li key={index}>{service.name}</li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="user-info">
            <img src={userImage} alt="User" className="user-image" />
            <span>
              Welcome, {username ? `${username.charAt(0).toUpperCase() + username.slice(1)}` : 'User'} 
              {userRole && ` (${userRole.charAt(0).toUpperCase() + userRole.slice(1)})`}
            </span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <section className="charts">
          <h2>Dashboard Analytics</h2>
          <div className="chart">
            <p>Chart Placeholder 1</p>
          </div>
          <div className="chart">
            <p>Chart Placeholder 2</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
