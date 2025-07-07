import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      background: '#fff',
      padding: '2.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(25, 118, 210, 0.10)',
      minWidth: '340px',
      textAlign: 'center',
      maxWidth: '420px'
    }}>
      <h1 style={{ color: '#1976d2', marginBottom: '1rem' }}>Welcome to our simple app</h1>
      <p style={{ color: '#333', fontSize: '1.1rem', marginBottom: '2rem' }}>
        This app allows you to Signup and Login to track your progress.
      </p>
      <Link to="/login">
        <button style={{
          background: 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)',
          color: '#fff',
          border: 'none',
          padding: '0.9rem 2.2rem',
          borderRadius: '6px',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)'
        }}>
          Get Started
        </button>
      </Link>
    </div>
  );
}

export default Home;
