// src/components/Upload.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

const Upload = ({ user }) => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('image', file);
    formData.append('email', user.email);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/result', { state: { image: URL.createObjectURL(file), result: response.data, user } });
    } catch (error) {
      console.error('Failed to upload image', error);
    }
  };

  return (
    <div className="upload-container">
      <h2>Diabetic Retinopathy Detection System</h2>
      <p>Signed in as: {user.email}</p>
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
};

export default Upload;
