import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LoginForm from "../src/Components/auth/LoginForm";
import SignupForm from "../src/Components/auth/SignupForm";
import Home from "../src/Components/home/home";
import Footer from "./Components/footer/footer";
import Signout from "./Components/auth/signout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handler to set authentication state
  const handleLogin = () => setIsAuthenticated(true);
  const handleSignout = () => setIsAuthenticated(false);

  return (
    <Router>
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
          {isAuthenticated && (
            <>
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
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signout" element={<Signout onSignout={handleSignout} />} />
          </Routes>
        </div>
        <Footer 
          name="Kimwetich"
          email="kaps.email@example.com"
          linkedin="https://www.linkedin.com/in/yourprofile"
        />
      </div>
    </Router>
  );
}

export default App;
