import React, { useContext } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import LoginForm from "../src/Components/auth/LoginForm";
import SignupForm from "../src/Components/auth/SignupForm";
import Home from "../src/Components/home/home";
import Footer from "./Components/footer/footer";
import Signout from "./Components/auth/signout";
import TaskManager from "./Components/tasks/TaskManager";
import { AuthContext } from './context/AuthContext';

function App() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (userObj) => {
    setUser(userObj);
    navigate('/home');
  };
  const handleSignout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <nav style={{
        background: '#1976d2',
        padding: '1rem',
        textAlign: 'center',
        marginBottom: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        {!isAuthenticated && (
          <>
            <Link to="/login" style={{
              color: '#fff',
              textDecoration: 'none',
              margin: '0 1rem',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}>Login</Link>
            <span style={{ color: '#fff' }}>|</span>
            <Link to="/signup" style={{
              color: '#fff',
              textDecoration: 'none',
              margin: '0 1rem',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}>Signup</Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link to="/tasks" style={{
              color: '#fff',
              textDecoration: 'none',
              margin: '0 1rem',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}>Tasks</Link>
            <span style={{ color: '#fff' }}>|</span>
            <Link to="/signout" style={{
              color: '#fff',
              textDecoration: 'none',
              margin: '0 1rem',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}>Signout</Link>
          </>
        )}
      </nav>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <LoginForm onLogin={handleLogin} />} />
          <Route path="/tasks" element={isAuthenticated ? <TaskManager /> : <LoginForm onLogin={handleLogin} />} />
          <Route path="/signout" element={<Signout onSignout={handleSignout} />} />
        </Routes>
      </div>
      <Footer 
        name="Kimwetich"
        email="kaps.email@example.com"
        linkedin="https://www.linkedin.com/in/yourprofile"
      />
    </div>
  );
}

export default App;
