// src/components/Result.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Result.css';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, result } = location.state || {};

  if (!image || !result) {
    navigate('/upload');
    return null;
  }

  return (
    <div className="result-container">
      <h2>Classification Result</h2>
      <img src={image} alt="Uploaded" className="uploaded-image" />
      <p>Prediction: {result.className}</p>
      <p>Confidence Score: {result.confidenceScore}</p>
    </div>
  );
};

export default Result;
