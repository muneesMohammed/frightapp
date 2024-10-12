import React, { useEffect, useState } from 'react';
import './Dashboard.css'; 
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';




const Dashboard = () => {
  const message =  {name: 'Dashboard',subhead:'Stay updated with real-time visibility into your cargo status and operations.'}

  return (
 
      <div className="dashboard-container">
        
         <div className="container">

         
          <Sidebar  />
          <main className="main-content">
          <Header message={message} />
          </main>
      {/* <main className="main-content">
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
      </main> */}
    </div>
    </div>
  );
};

export default Dashboard;
