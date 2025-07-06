import React from 'react';

function Home() {
  return (
    <div style={{
      background: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      minWidth: '300px',
      textAlign: 'center'
    }}>
      <h2>Welcome</h2>
      <p>You are logged in.</p>
    </div>
  );
}

export default Home;
