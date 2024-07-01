// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import Upload from './components/Upload';
import Result from './components/Result';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('google_access_token'); // Clear the token if stored in local storage
  };

  useEffect(() => {
    console.log('Current User:', user);
  }, [user]);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/upload" element={user ? <Upload user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/result" element={user ? <Result user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
