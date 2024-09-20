import React, { useState } from 'react';

function AddUserForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username,
            password,
            email,
            role
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/add_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("User added successfully!");
            } else {
                setMessage(result.msg || "Error adding user");
            }

        } catch (error) {
            console.error('Error:', error);
            setMessage("Error connecting to the server");
        }
    };

    return (
        <div>
            <h2>Add New User</h2>
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
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <input 
                        type="text" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Add User</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default AddUserForm;
