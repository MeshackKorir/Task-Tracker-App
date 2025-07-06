import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in:', { email, password });
    // If credentials are good:
    setMessage('Login successful!');
    setTimeout(() => {
      if (onLogin) onLogin();
      navigate('/home');
    }, 1200); // Wait 1.2 seconds before redirecting
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      minWidth: '300px'
    }}>
      <h2>Login</h2>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" style={{
        background: '#1976d2',
        color: '#fff',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '1rem'
      }}>
        Login
      </button>
      {message && (
        <div style={{ color: '#388e3c', marginTop: '1rem', fontWeight: 'bold' }}>
          {message}
        </div>
      )}
    </form>
  );
}

export default LoginForm;
