import React, { useState, useEffect } from 'react';
import './AddUserModal.css';
import axios from 'axios';

function AddUserModal({ showModal, closeModal, handleAddUser }) {
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/roles', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setRoles(response.data);
      } catch (err) {
        setServerError('Error fetching roles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const validateForm = () => {
    if (!newUser.username || !newUser.password || !newUser.email || !newUser.role) {
      setFormError('All fields are required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      setFormError('Please enter a valid email.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setFormError('');
    setServerError('');

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/UserManagement',
        newUser,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      handleAddUser(response.data);
      setSuccess('User added successfully');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setServerError(err.response.data.msg);
      } else {
        setServerError('Something went wrong. Please try again.');
      }
      setSuccess(null);
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Add New User</h3>

        {formError && <p className="modal-error">{formError}</p>}
        {serverError && <p className="modal-error">{serverError}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange}
          className="modal-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
          className="modal-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
          className="modal-input"
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
          className="modal-input"
        >
          <option value="" disabled>
            Select Role
          </option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>

        <div className="modal-buttons">
          <button className="btn-cancel" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn-submit" onClick={handleSubmit}>
            Add User
          </button>
        </div>

        {success && <p className="modal-success">{success}</p>}
      </div>
    </div>
  );
}

export default AddUserModal;
