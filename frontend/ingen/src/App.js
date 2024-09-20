import LoginForm from './components/login/login';
import AddUser from './components/AddUserForm/AddUserForm';
import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App;
