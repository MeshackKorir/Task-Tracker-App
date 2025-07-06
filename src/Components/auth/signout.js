import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Signout({ onSignout }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session or token here if stored
    // localStorage.removeItem('userToken');
    if (onSignout) onSignout();
    setTimeout(() => {
      navigate('/login');
    }, 1200); // Wait 1.2 seconds before redirecting
  }, [navigate, onSignout]);

  return (
    <div style={{
      background: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      minWidth: '300px',
      textAlign: 'center',
      margin: '2rem auto'
    }}>
      <h2 style={{ color: '#1976d2' }}>Signing out...</h2>
      <p style={{ color: '#388e3c' }}>You have been signed out. Redirecting to login...</p>
    </div>
  );
}

export default Signout;
