const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Import the database client
const { Client } = require('pg');
const connectionString = 'postgresql://username:password@localhost:5432/ootd_app';
const client = new Client({ connectionString });

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Define API endpoints

// User Registration
router.post('/register', async (req, res) => {
  // Registration code...
  const { username, email, password } = req.body;
  try {
    // Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id';
    const result = await client.query(query, [username, email, hashedPassword]);
    const userId = result.rows[0].user_id;

    const token = jwt.sign({ userId, username, email }, 'your-secret-key'); // Replace 'your-secret-key' with a strong, secret key
    res.status(201).json({ userId, username, email, token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const query = 'SELECT user_id, username, email, password FROM users WHERE username = $1';
      const result = await client.query(query, [username]);
  
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      const token = jwt.sign({ userId: user.user_id, username: user.username, email: user.email }, 'your-secret-key'); // Replace 'your-secret-key' with the same secret key used for registration
      res.status(200).json({ userId: user.user_id, username: user.username, email: user.email, token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Other API endpoints for outfits, likes, comments, etc.

// Example endpoint to retrieve all outfits
router.get('/outfits', async (req, res) => {
    try {
      const query = 'SELECT * FROM outfits';
      const result = await client.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching outfits:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Example endpoint to create an outfit
  router.post('/outfits', async (req, res) => {
    const { title, description, image } = req.body;
    try {
      const query = 'INSERT INTO outfits (title, description, image) VALUES ($1, $2, $3) RETURNING *';
      const result = await client.query(query, [title, description, image]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error creating outfit:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// ... Add more API endpoints for other operations

module.exports = router;
