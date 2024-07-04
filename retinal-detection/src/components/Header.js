// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user }) => {
  return (
    <header className="header">
      <h1>Rukshanth Solutions Inc.</h1>
      <nav>
        {user ? (
          <span>Welcome, {user.email}</span>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
