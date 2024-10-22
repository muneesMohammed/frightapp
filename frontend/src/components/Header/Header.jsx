

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Header.css';
import userImage from '../../Assets/images/userImage.png';

function Header({ message }) {
  // const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(''); // State for storing the username
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          // const roles = decodedToken.sub.role; // Access roles from sub
          // setUserRole(roles.length > 0 ? roles[0] : null); // Set the first role or null
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
  return (
    <div>       
    <div className="main-header">
        <div className="breadcrumbs">
            <span>MunnasLogistics</span> &gt; <span className="breadcrumbsactive">{ message.name }</span>
        </div>
        <div className="user-info">
      
           
        
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          
       
            <img src={userImage} alt="User Avatar" className="user-avatar"/>
            <span>{username}</span>
        </div>
    </div>

    <div className="content-header">
        <h2>{ message.name }</h2>
        <p>{ message.subhead }</p>
    </div></div>
  )
}

export default Header