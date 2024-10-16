import React, { useEffect, useState } from 'react';
import './UserManagement.css';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', email: '', role: 'admin' });
  const [editUserId, setEditUserId] = useState(null);
  const [editRole, setEditRole] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/UserManagement', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setUsers([...users, response.data]);
      setNewUser({ username: '', password: '', email: '', role: 'admin' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleRoleUpdate = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/${userId}/role`, { role: editRole }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
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
          Authorization: `Bearer ${token}`
        }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };



  
  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.email}) - Roles: {user.roles.join(', ')}
          </li>
        ))}
      </ul>

      <div className="add-user-form">
        <h3>Add New User</h3>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <select name="role" value={newUser.role} onChange={handleInputChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="operation">Operation</option>
        </select>
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
       
              <td>
                {editUserId === user.id ? (
                  <select value={editRole} onChange={(e) => setEditRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="operation">Operation</option>
                  </select>
                ) : (
                  // Ensure that user.roles is an array before calling .join
                  user.roles && Array.isArray(user.roles) && user.roles.length > 0 ? user.roles.join(', ') : 'No Roles'
                )}
              </td>



              <td>
                {editUserId === user.id ? (
                  <button onClick={() => handleRoleUpdate(user.id)}>Save</button>
                ) : (
                  <>
                   {/* <button onClick={() => { setEditUserId(user.id); setEditRole(user.roles[0]); }}>Edit Role</button> */}
                    <button onClick={() => { setEditUserId(user.id); setEditRole(user.roles && user.roles.length > 0 ? user.roles[0] : 'user'); }}>Edit Role</button>

                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
  );
};

export default UserManagement;







