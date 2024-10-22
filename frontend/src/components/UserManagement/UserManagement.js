import React, { useEffect, useState } from 'react';
import './UserManagement.css';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import AddUserModal from '../AddUserModal/AddUserModal';
import Modal from 'react-modal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editRole, setEditRole] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = (user) => {
    setUsers([...users, user]);
    setShowModal(false); // Close modal after adding user
  };

  const handleRoleUpdate = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/users/${userId}/role`,
        { role: editRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      fetchUsers();
      setEditUserId(null);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const message = {
    name: 'User Management',
    subhead: 'Manage your team members and their account permissions here.',
  };

  const [sessionExpired, setSessionExpired] = useState(false);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 401) {
        setSessionExpired(true);
      }
    } catch (error) {
      console.error('Error checking session', error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleClose = () => {
    setSessionExpired(false);
    window.location.href = '/login';
  };

  const getRoleStyle = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return { color: '#ff5722',  border: '1px solid #ff56229d', backgroundColor: '#ff562221' }; // Red color for Admin role
      case 'operation':
        return { backgroundColor:'#4caf4f21', color: '#4caf50', border: '1px solid #4caf4f80' }; // Blue color for Editor role
      case 'accounts':
        return { backgroundColor: '#03a8f421', color: '#03a9f4', border: '1px solid #03a8f45e' }; // Green color for Viewer role
      default:
        return { color: 'black' }; // Default black color for other roles
    }
  };
  

  

  return (
    <div>
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <Header message={message} />
          <div className="user-management">
            <div className="controls">
              <div className="usercount">
                All users <span>{users.length}</span>
              </div>
              <div className="search-filters">
                <div className="search-icon">
                  <i className="fi fi-rr-search"></i>
                </div>
                <input type="text" className="search-bar" placeholder="Search" />
                <button className="filter-btn">
                  <i className="fi fi-rr-bars-filter"></i>&ensp;Filters
                </button>
                <button className="add-user-btn" onClick={() => setShowModal(true)}>
                  +&ensp;Add User
                </button>
              </div>
            </div>

            <div className="table">
              <table className="user-table">
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>User Name</th>
                    <th>Access</th>
                    <th>Last Updated</th>
                    <th>Created at</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td><input type="checkbox" /></td>
                      <td>{user.username}</td>
                      <td>
                        {user.roles.map((role, index) => (
                          <span className="badge" key={index} style={getRoleStyle(role)}>
                            {role}
                            {index < user.roles.length - 1 && ' '}
                          </span>
                        ))}
                      </td>
               
                      <td>{user.last_updated}</td>
                      <td>{user.created_at}</td>
                      <td><span className="more-options">...</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <AddUserModal
            showModal={showModal}
            closeModal={() => setShowModal(false)}
            handleAddUser={handleAddUser}
          />

          <Modal
            isOpen={sessionExpired}
            onRequestClose={handleClose}
            contentLabel="Session Expired"
            ariaHideApp={false}
          >
            <h2>Session Expired</h2>
            <p>Your session has expired. Please log in again.</p>
            <button onClick={handleClose}>Go to Login</button>
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
