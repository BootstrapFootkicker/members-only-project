const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const dropDatabaseTables = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const dropPostsTableQuery = "DROP TABLE IF EXISTS posts";
    await client.query(dropPostsTableQuery);

    const dropUsersTableQuery = "DROP TABLE IF EXISTS users";
    await client.query(dropUsersTableQuery);

    await client.query("COMMIT");
    console.log("Tables dropped successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error dropping tables", err);
  } finally {
    client.release();
  }
};
const createDatabaseTables = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");


    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        userid SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;
    await client.query(createUsersTableQuery);

    const createPostsTableQuery = `
      CREATE TABLE IF NOT EXISTS posts (
        postid SERIAL PRIMARY KEY,
        userid INT REFERENCES users(userid),
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;
    await client.query(createPostsTableQuery);


    await client.query("COMMIT");
    console.log("Tables created successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error creating tables", err);
  } finally {
    client.release();
  }
};

const populateDB = async () => {
  // Populate the database with sample data
};

const initDB = async () => {
  try {
    //dropping for testing db changes locally
    await dropDatabaseTables();
    await createDatabaseTables();
    await populateDB();
  } catch (err) {
    console.error("Error initializing database", err);
  }
};

initDB().catch((err) => console.error("Unexpected error", err));

module.exports = pool;