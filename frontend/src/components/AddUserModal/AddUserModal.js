import React, { useState, useEffect } from "react";
import "./AddUserModal.css"; // Make sure to set the z-index here
import axios from "axios";

function AddUserModal({ showModal, closeModal, handleAddUser, user, isEditMode }) {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      setServerError(""); // Reset server error message
      try {
        const response = await axios.get("http://localhost:5000/roles", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setRoles(response.data);
      } catch (err) {
        setServerError("Error fetching roles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (user && isEditMode) {
      // Prefill the form when editing a user
      setNewUser({
        username: user.username,
        password: "", // Optionally leave password blank
        email: user.email,
        role: user.roles[0] || "", // Assuming user has at least one role
      });
    }
  }, [user, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    setFormError(""); // Clear form error on input change
  };

  const validateForm = () => {
    if (!newUser.username || !newUser.email || !newUser.role) {
      setFormError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      setFormError("Please enter a valid email.");
      return false;
    }
    if (!isEditMode && !newUser.password) {
      setFormError("Password is required when adding a user.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setFormError("");
    setServerError("");
    setSuccess("");

    // Validate the form first
    if (!validateForm()) {
      return;
    }

    try {
      // Check if editing mode is on
      if (isEditMode) {
        // Update user by passing user data and id to handleAddUser
        await handleAddUser(newUser, user.id);
        setSuccess("User updated successfully");
      } else {
        // Add a new user
        await handleAddUser(newUser); // Add user
        setSuccess("User added successfully");
      }
      closeModal(); // Close modal after submission
    } catch (err) {
      // Error handling for both add and update operations
      if (err.response && err.response.data && err.response.data.msg) {
        setServerError(err.response.data.msg);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
      setSuccess(""); // Clear success message if there was an error
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{isEditMode ? "Edit User" : "Add User"}</h3>

        {formError && <p className="modal-error">{formError}</p>}
        {serverError && <p className="modal-error">{serverError}</p>}
        {success && <p className="modal-success">{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newUser.username}
            onChange={handleInputChange}
            className="modal-input"
            required
          />
          {!isEditMode && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleInputChange}
              className="modal-input"
              required // Require password when adding a user
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
            className="modal-input"
            required
          />
          <select
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            className="modal-input"
            required
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

          <div className="modal-actions">
            <button className="modal-buttons cancel" onClick={closeModal}>
              Cancel
            </button>
            <button
              type="submit"
              className="modal-buttons add"
              disabled={loading}
            >
              {loading ? "Loading..." : isEditMode ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserModal;
