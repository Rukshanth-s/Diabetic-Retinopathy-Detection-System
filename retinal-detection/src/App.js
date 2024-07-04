// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Upload from './components/Upload';
import Result from './components/Result';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('Current User:', user);
  }, [user]);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <Header user={user} />
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/upload" element={user ? <Upload user={user} /> : <Navigate to="/login" />} />
          <Route path="/result" element={<Result user={user} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
