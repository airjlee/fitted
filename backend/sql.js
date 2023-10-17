const { Client } = require('pg');

const db_params = {
  user: 'airjlee',
  host: 'localhost',
  database: 'airjlee',
  port: 5433, // Replace with the port number your PostgreSQL server is running on
};

// Create a new PostgreSQL client
const client = new Client(db_params);

async function createTables() {
  try {
    // Connect to the PostgreSQL server
    await client.connect();

    // Query to create a database table for user credentials
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS user (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password_hash VARCHAR(100) NOT NULL,
        full_name VARCHAR(100),
        bio TEXT,
        profile_picture_url VARCHAR(255)
    );
      );
    `;

    // Query to create a database table for user friends
    const createPostsTable = `
      CREATE TABLE IF NOT EXISTS Posts (
        post_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(user_id),
        caption TEXT,
        image_url VARCHAR(255),
        creation_date TIMESTAMP DEFAULT current_timestamp
    );
`;

    // Query to create a database table for user photos
    const createTableQuery3 = `
      CREATE TABLE IF NOT EXISTS user_photos (
        photoid serial PRIMARY KEY,
        user_id INTEGER,
        dateAccepted DATE,
        image_data BYTEA,
        FOREIGN KEY (user_id) REFERENCES user_credentials (userid)
      );
    `;

    // Execute the table creation queries
    await client.query(createUsersTable);
    await client.query(createPostsTable);
    await client.query(createTableQuery3);

    console.log('Tables have been created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    // Disconnect from the PostgreSQL server
    await client.end();
  }
}

// Call the createTables function to create the tables
createTables();


/*
// Function to insert a new user into the user_credentials table
async function insertUser() {
  const client = new Client(db_params);
  try {
    // Connect to the PostgreSQL server
    await client.connect();

    // SQL query to insert a new user
    const insertUserQuery = `
      INSERT INTO user_credentials (username, password) VALUES ($1, $2) RETURNING userid;
    `;

    // The user data you want to insert
    const username = 'hemkesh';
    const password = 'bandi';

    // Execute the query with the user data
    const result = await client.query(insertUserQuery, [username, password]);

    // Retrieve the user ID of the newly inserted user
    const userId = result.rows[0].userid;

    console.log('User inserted with ID:', userId);
  } catch (error) {
    console.error('Error inserting user:', error);
  } finally {
    // Disconnect from the PostgreSQL server
    await client.end();
  }
}

// Call the insertUser function to insert a new user
insertUser();

*/






/*
const query = `INSERT INTO user_credentials (username, password) VALUES ($1, $2)`;
client.query(query, ["hemkesh", "bandi"], (err, results) => {
  if(err) {
      console.error('error insert', err);
      return;
  }
  console.log('data inserted');
  
}); */
