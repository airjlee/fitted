const express = require('express');
const router = express.Router();
const { Client } = require('pg');

// Database connection parameters
const db_params = {
  user: 'airjlee',
  host: 'localhost',
  database: 'airjlee',
  port: 5433, // Replace with the port number your PostgreSQL server is running on
};

// Route to retrieve user credentials
router.get('/user', async (req, res) => {
  const client = new Client(db_params);
  try {
    await client.connect();
    const query = 'SELECT * FROM user_credentials';
    const result = await client.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving user credentials:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.end(); // Disconnect from the PostgreSQL server
  }
});

// Route to retrieve user friends
router.get('/user-friends', async (req, res) => {
  try {
    const query = 'SELECT * FROM user_friends';
    const result = await client.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving user friends:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to retrieve user photos
router.get('/user-photos', async (req, res) => {
  try {
    const query = 'SELECT * FROM user_photos';
    const result = await client.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving user photos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.put('/outfits/:outfitId', async (req, res) => {
  const outfitId = req.params.outfitId; // Get the outfit ID from the request URL parameters
  const { updatedField1, updatedField2 } = req.body; // Get the updated data from the request body

  try {
    // Your SQL query to update outfit information in the 'user_outfits' table
    const query = `
      UPDATE user_outfits
      SET field1 = $1, field2 = $2
      WHERE outfit_id = $3
    `;

    // Execute the query with the updated data and outfit ID
    const result = await client.query(query, [updatedField1, updatedField2, outfitId]);

    // Check if any rows were affected (if an outfit with the specified ID exists)
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Outfit not found' });
    } else {
      res.json({ message: 'Outfit updated successfully' });
    }
  } catch (error) {
    console.error('Error updating outfit:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.put('/user/:userId', async (req, res) => {
  const client = new Client(db_params);
  const userId = req.params.userId; // Get the user ID from the request URL parameters
  const { username, password } = req.body; // Get the updated data from the request body

  try {
    await client.connect();
    // SQL query to update user credentials in the 'user_credentials' table
    const query = `
      UPDATE user_credentials
      SET username = $1, password = $2
      WHERE userid = $3
    `;

    // Execute the query with the updated data and user ID
    const result = await client.query(query, [username, password, userId]);

    // Check if any rows were affected (if the user with the specified ID exists)
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User credentials updated successfully' });
    }
  } catch (error) {
    console.error('Error updating user credentials:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.end(); // Disconnect from the PostgreSQL server
  }
});

router.post('/user', async (req, res) => {
  const client = new Client(db_params); // Create a new client for this request

  try {
    await client.connect(); // Connect to the PostgreSQL server

    const { username, password } = req.body;

    // Validate the request body
    if (!username || !password) {
      res.status(400).json({ message: 'Both username and password are required' });
      return;
    }

    // SQL query to insert a new user into the 'user_credentials' table
    const insertQuery = `
      INSERT INTO user_credentials (username, password)
      VALUES ($1, $2)
      RETURNING userid, username;
    `;

    // Execute the query with the provided data
    const result = await client.query(insertQuery, [username, password]);

    // Check if the insertion was successful
    if (result.rowCount === 1) {
      const newUser = result.rows[0];
      res.status(201).json(newUser);
    } else {
      res.status(500).json({ message: 'Failed to insert user' });
    }
  } catch (error) {
    console.error('Error adding a new user:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.end(); // Disconnesct from the PostgreSQL server
  }
});


module.exports = router;
