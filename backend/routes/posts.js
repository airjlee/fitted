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

// routes to retrieve posts


module.exports = router;
