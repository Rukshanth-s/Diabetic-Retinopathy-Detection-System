# Diabetic Retinopathy Detection System

## Overview
This project is a web-based system for detecting diabetic retinopathy from retinal images. Users can upload retinal images and receive an analysis identifying markers related to diabetic retinopathy.

## Features
- **User Authentication**: Secure sign-in using Google OAuth.
- **Image Upload**: Upload retinal images in JPEG or PNG formats.
- **Machine Learning**: Integration with a pre-trained machine learning model to analyze images.
- **Result Display**: Display classification results and confidence scores.
- **User Interface**: User-friendly interface with options to upload images, view results, and manage profile.

## System Architecture
- **Frontend**: Built with React.js, handles user interaction and UI.
- **Backend**: Built with Node.js/Express.js, handles API requests and user management.
- **ML Model Server**: Flask server running a pre-trained TensorFlow model for image classification.
- **Database**: MySQL for storing user data and analysis results.

## Setup Instructions

### Prerequisites
- Node.js
- Python
- MySQL

### Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2. Copy `.env.example` to `.env` and update the environment variables:
    ```plaintext
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=qwerty123
    DB_NAME=full_retina
    CLIENT_ID=your_google_client_id
    CLIENT_SECRET=your_google_client_secret
    REDIRECT_URI=http://localhost:3000/oauth-callback
    ```
3. Install the dependencies and start the server:
    ```sh
    npm install
    npm start
    ```

### Flask Server

1. Navigate to the `flask-server` directory:
    ```sh
    cd flask-server
    ```
2. Create a virtual environment and activate it:
    ```sh
    python -m venv full_retina_app
    full_retina_app\Scripts\activate
    ```
3. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```
4. Start the Flask server:
    ```sh
    python app.py
    ```

### Frontend

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2. Create a `.env` file with your Google Client ID:
    ```
    REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
    REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:3000
    ```
3. Install the dependencies and start the development server:
    ```
    npm install
    npm start
    ```

### Database Setup

1. Ensure MySQL is installed and running.
2. Navigate to the `backend/db` directory:
    ```sh
    cd backend/db
    ```
3. Execute the `schema.sql` file to create the necessary database and tables:
    ```sh
    mysql -u root -p full_retina < schema.sql
    ```
    Enter your MySQL root password when prompted.

## Usage

1. Open the frontend URL (usually `http://localhost:3000`).
2. Sign in with Google.
3. Upload a retinal image and get the analysis results.

