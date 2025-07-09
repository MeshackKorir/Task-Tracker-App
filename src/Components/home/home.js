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
      <div style={{
        background: '#e3f2fd',
        borderRadius: '8px',
        padding: '1.2rem',
        marginBottom: '2rem',
        textAlign: 'left'
      }}>
        <h3 style={{ color: '#1976d2', marginTop: 0 }}>Vibe With Code Progress</h3>
        <ol style={{ paddingLeft: '1.2rem', color: '#333', fontSize: '1rem' }}>
          <li><strong>Week 1:</strong> Introduction</li>
          <li><strong>Week 2:</strong> HTML and CSS</li>
          <li><strong>Week 3:</strong> JavaScript</li>
          <li><strong>Week 4:</strong> React</li>
        </ol>
      </div>
      <Link to="/tasks">
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
