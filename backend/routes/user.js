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
router.get('/user-credentials', async (req, res) => {
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


router.put('/user-credentials/:userId', async (req, res) => {
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

router.post('/user-credentials', async (req, res) => {
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

router.delete('/user-credentials/:userId', async (req, res) => {
  const client = new Client(db_params);
  const userId = req.params.userId; // Get the user ID from the request URL parameters

  try {
    await client.connect();
    // SQL query to delete user credentials by user ID
    const query = `
      DELETE FROM user_credentials
      WHERE userid = $1
    `;

    // Execute the query with the user ID
    const result = await client.query(query, [userId]);

    // Check if any rows were affected (if the user with the specified ID exists)
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User credentials deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting user credentials:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.end(); // Disconnesct from the PostgreSQL server
  }
});

router.get('/user-credentials/:userId', async (req, res) => {
  const client = new Client(db_params);
  const userId = req.params.userId; // Get the user ID from the request URL parameters

  try {
    await client.connect();
    // SQL query to retrieve user credentials by user ID
    const query = `
      SELECT * FROM user_credentials
      WHERE userid = $1
    `;

    // Execute the query with the user ID
    const result = await client.query(query, [userId]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(result.rows[0]); // Assuming the user ID is unique, so we return the first row
    }
  } catch (error) {
    console.error('Error fetching user credentials:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.end(); // Disconnesct from the PostgreSQL server
  }
});

module.exports = router;
