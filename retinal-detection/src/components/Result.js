// src/components/Result.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Result.css';

const Result = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, result } = location.state || {};

  if (!image || !result) {
    navigate('/upload');
    return null;
  }

  const handleUploadAnother = () => {
    navigate('/upload', { state: { user } });
  };

  return (
    <div className="result-container">
      <h2>Classification Result</h2>
      <p>Signed in as: {user.email}</p>
      <img src={image} alt="Uploaded" className="uploaded-image" />
      <p>Prediction: {result.className}</p>
      <p>Confidence Score: {result.confidenceScore}</p>
      <button onClick={handleUploadAnother}>Upload Another Image</button>
    </div>
  );
};

export default Result;
