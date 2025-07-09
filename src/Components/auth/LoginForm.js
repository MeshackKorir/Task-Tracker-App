import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      navigate('/home');
    } else {
      setError('Invalid email or password');
    }
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
      {error && (
        <div style={{ color: '#d32f2f', marginTop: '1rem', fontWeight: 'bold' }}>
          {error}
        </div>
      )}
    </form>
  );
}

// export default LoginForm;
//         </div>
//       )}
//       {error && (
//         <div style={{ color: '#d32f2f', marginTop: '1rem', fontWeight: 'bold' }}>
//           {error}
//         </div>
//       )}
//     </form>
//   );
// }

export default LoginForm;
