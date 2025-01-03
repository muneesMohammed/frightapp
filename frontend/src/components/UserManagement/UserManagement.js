import React, { useEffect, useState } from "react";
import "./UserManagement.css";

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import AddUserModal from "../AddUserModal/AddUserModal";
import api from '../../utils/axios';
import TimeConverter from "../Timestamp/Timestamp";
// import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [serverError, setServerError] = useState(""); // For API error messages
  const [successMessage, setSuccessMessage] = useState(""); // For success messages

  const fetchUsers = async () => {
    setLoading(true);
    setServerError(""); // Reset error message
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setServerError("Error fetching users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (newUser, userId = null) => {
    const token = localStorage.getItem("token");
    setServerError(""); // Reset error message
    setSuccessMessage(""); // Reset success message
    try {
      if (isEditMode && userId) {
        // Update the user
        await api.put(`/users/${userId}`, newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setSuccessMessage("User updated successfully!");
      } else {
        // Add a new user
        await api.post("/register", newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setSuccessMessage("User added successfully!");
      }
      fetchUsers(); // Refresh user list after add/update
      setShowModal(false);
    } catch (error) {
      console.error("Error saving user:", error);
      setServerError("Error saving user. Please try again.");
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteUser = async (userId) => {
    setServerError(""); // Reset error message
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setServerError("Error deleting user. Please try again.");
    }
  };

  const message = {
    name: "User Management",
    subhead: "Manage your team members and their account permissions here.",
  };

  const getRoleStyle = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return {
          color: "#ff5722",
          border: "1px solid #ff56229d",
          backgroundColor: "#ff562221",
        }; // Red color for Admin role
      case "operation":
        return {
          backgroundColor: "#4caf4f21",
          color: "#4caf50",
          border: "1px solid #4caf4f80",
        }; // Green color for Operation role
      case "accounts":
        return {
          backgroundColor: "#03a8f421",
          color: "#03a9f4",
          border: "1px solid #03a8f45e",
        }; // Blue color for Accounts role
      default:
        return { color: "black" }; // Default black color for other roles
    }
  };

  const handleToggleDropdown = (userId) => {
    setOpenDropdownId(openDropdownId === userId ? null : userId);
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
                <button
                  className="add-user-btn"
                  onClick={() => setShowModal(true)}
                >
                  +&ensp;Add User
                </button>
              </div>
            </div>

            {serverError && <p className="error-message">{serverError}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="table">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>User Name</th>
                    <th>Access</th>
                    <th>Last Updated</th>
                    <th>Created at</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>Loading...</td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{user.username}</td>
                        <td>
                          {user.roles.map((role, index) => (
                            <span
                              className="badge"
                              key={index}
                              style={getRoleStyle(role)}
                            >
                              {role}
                              {index < user.roles.length - 1 && " "}
                            </span>
                          ))}
                        </td>
                        <td>
                          <TimeConverter utcTime={user.last_updated} />
                        </td>
                        <td>
                          <TimeConverter utcTime={user.created_at} />
                        </td>
                        <td>
                          <span className="more-options">
                            <div className="dropdown-container">
                              <button
                                onClick={() => handleToggleDropdown(user.id)}
                                className="dropdown-toggle"
                              >
                                ⋮ {/* Three dots menu */}
                              </button>
                              {openDropdownId === user.id && (
                                <ul className="dropdown-menu">
                                  <li
                                    className="dropdown-item"
                                    onClick={() => handleEditUser(user)}
                                  >
                                    Update
                                  </li>
                                  <li
                                    className="dropdown-item delete"
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    Delete
                                  </li>
                                </ul>
                              )}
                            </div>
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <AddUserModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        handleAddUser={handleAddUser}
        user={selectedUser} // Pass the selected user to the modal
        isEditMode={isEditMode} // Pass the edit mode flag
        ariaHideApp={false}
      />
    </div>
  );
};

export default UserManagement;
