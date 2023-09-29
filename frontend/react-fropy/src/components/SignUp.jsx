import React, { useState } from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';

import registration from '../utils/registration';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', { email, password, username });
      setMessage(response.data.success);
      registration.login(username, password)
        .then(() => {
            window.location.href = '/';
        });
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className='login-wrapper'>
        <Card data-bs-theme="dark" className='login-form' key="login-form">
            <div className='login-container'>
              <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <br />
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <br />
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                
                <br />

                <div className='form-group'>
                    <button type="submit" className='btn btn-primary btn-block'>
                        <span>Sign Up</span>
                    </button>
                </div>
                <br />
                {message && (
                    <div className='form-group'>
                        <div className='alert alert-danger'>
                            {message}
                        </div>
                    </div>
                    )}
              </form>
            </div>
        </Card>
    </div>
  );
}

export default SignUp;

