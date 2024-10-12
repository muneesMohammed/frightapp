import React, { useState } from 'react';
import './login.css'; // Assuming your CSS is in the same folder
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Assuming you use React Router





function LoginForm() {
  const [username, setUsername] = useState('');
  const [password_hash, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {username, password_hash });
  
      const token = response.data.access_token;
      localStorage.setItem('token', token);  // Save JWT to local storage
      // Redirect to dashboard page
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid credentials or error occurred');
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='log'>
      <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password_hash}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
  );
}



export default LoginForm;





