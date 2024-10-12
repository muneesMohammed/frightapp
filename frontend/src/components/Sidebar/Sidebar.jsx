
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Sidebar.css'; 
// import userImage from '../../Assets/images/userImage.png';
// Importing Flaticon UIcons in your React app
import '@flaticon/flaticon-uicons/css/all/all.css';  // All icons



function  Sidebar ()  {
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


      const handleUserManagement = () => {
        navigate('/UserManagement');
      };
  // List of services based on user roles
  const services = [
    { name: 'Dashboard', icon:"fi fi-rr-dashboard-panel"},
    { name: 'Finance', icon:"fi fi-rr-usd-circle" },
    { name: 'CRM', icon:"fi fi-rr-target-audience" },
    { name: 'Air', icon:"fi fi-rr-plane-departure" },
    { name: 'Ocean',icon:"fi fi-rr-ship" },
    { name: 'Land',icon:"fi fi-rr-truck-check" },
    { name: 'Sales',icon:"fi fi-rr-benefit-porcent" },
    { name: 'Notifications',icon:"fi fi-rr-envelope-dot",badge:"notification-count",count:40 },
    { name: 'Security & Access',icon:"fi fi-rr-user-key" },
    { name: 'Payments',icon:"fi fi-rr-payroll-check" },
    { name: 'Import Data',icon:"fi fi-rr-cloud-download" },
    { name: 'Export Data',icon:"fi fi-rr-cloud-upload" },
    { name: 'Database',icon:"fi fi-rr-back-up" },
    ...(userRole === 'admin' ? [{ name: 'User Management',icon:"fi fi-rr-users-gear", onClick: handleUserManagement }] : []), // Add User Management if admin
  ];

  return (
 

         <div>
        {/* Sidebar  */}
       
      <aside className="sidebar">
            <div className="sidebar-header">
                <h1 className="app-name">Freight Management</h1>
                <span className="version">v4.0</span>
            </div>
            <nav className="sidebar-menu">
                <ul className="services-list">
                  {services.map((service, index) => (
                    <li 
                      key={index} 
                      onClick={service.onClick ? service.onClick : null} // Add onClick if available
                      className={service.onClick ? 'clickable' : ''} // Add class for styling clickable items
                      >
                     <i className={service.icon}></i>
                     {service.name}
                      <span className={service.badge}>{service.count}</span>
                    </li>
                  ))}   
                </ul>
            </nav>
            <div className="sidebar-footer">
                <div><i className="fi fi-rr-settings"></i><a href="#">Settings</a></div>
                <div><i className="fi fi-rr-document-signed"></i><a href="#">Documentation</a></div>
            </div>
        </aside>
        
    </div>
    
  );
};

export default Sidebar
