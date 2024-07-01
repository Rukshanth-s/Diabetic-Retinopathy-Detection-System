
// src/components/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import './Login.css';

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (response) => {
    console.log('Login successful, response:', response);
    try {
      const backendResponse = await fetch('http://localhost:5000/oauth-callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: response.code }),
      });

      const userData = await backendResponse.json();
      setUser(userData);
      console.log('Navigating to /upload');
      navigate('/upload');
    } catch (error) {
      console.error('Failed to authenticate:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginFailure,
    flow: 'auth-code',
  });

  return (
    <div className="login-container">
      <h1>Diabetic Retinopathy Detection System</h1>
      <button onClick={() => login()}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;

