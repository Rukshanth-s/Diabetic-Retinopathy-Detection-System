
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const mysql = require('mysql2');
const fileUpload = require('express-fileupload'); 
const jwt = require('jsonwebtoken');
const FormData = require('form-data')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// OAuth callback endpoint
app.post('/oauth-callback', async (req, res) => {
  const { code } = req.body;
  console.log('OAuth callback received with code:', code);
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code',
        code: code,
      },
    });

    // Decode JWT token
    const decodedToken = jwt.decode(response.data.id_token);
    console.log('Decoded token:', decodedToken);

    // Send user data back to the frontend
    res.json(decodedToken);
  } catch (error) {
    console.error('Error exchanging code for token:', error.response ? error.response.data : error.message);
    res.status(500).send('Failed to exchange code for token');
  }
});


app.post('/upload', async (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).send('No image uploaded');
  }

  const { email } = req.body; // Assuming the email is sent from the frontend
  const image = req.files.image;

  const formData = new FormData();
  formData.append('image', image.data, image.name);

  try {
    // First, get or create the user
    const getUserQuery = 'SELECT id FROM users WHERE email = ?';
    const [userRows] = await db.promise().query(getUserQuery, [email]);

    let userId;
    if (userRows.length > 0) {
      userId = userRows[0].id;
    } else {
      const insertUserQuery = 'INSERT INTO users (email) VALUES (?)';
      const [result] = await db.promise().query(insertUserQuery, [email]);
      userId = result.insertId;
    }

    // Classify the image
    const response = await axios.post('http://localhost:5001/classify', formData, {
      headers: formData.getHeaders(),
    });

    const { className, confidenceScore } = response.data;

    // Insert the image data
    const query = 'INSERT INTO images (user_id, image, analysis_result) VALUES (?, ?, ?)';
    await db.promise().query(query, [userId, image.data, className]);

    res.json({ className, confidenceScore });
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).send('Failed to process upload');
  }
});
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
