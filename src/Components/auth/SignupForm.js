import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Passwords must match
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    // Get users from localStorage or empty array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Check if email already exists
    if (users.find(user => user.email === email)) {
      setError('Email already registered!');
      return;
    }
    // Add new user
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    setMessage('Good to login');
    setTimeout(() => {
      navigate('/login');
    }, 1500); // Wait 1.5 seconds before redirecting
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      minWidth: '300px'
    }}>
      <h2>Signup</h2>
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

      <label>Confirm Password:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        Signup
      </button>
      {message && (
        <div style={{ color: '#388e3c', marginTop: '1rem', fontWeight: 'bold' }}>
          {message}
        </div>
      )}
      {error && (
        <div style={{ color: '#d32f2f', marginTop: '1rem', fontWeight: 'bold' }}>
          {error}
        </div>
      )}
    </form>
  );
}

export default SignupForm;
