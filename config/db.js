const { Pool } = require("pg");
require("dotenv").config();

//todo create way to add posts
//todo create way to view posts
//todo create way to delete posts
//todo create way to update posts
//todo create way to view users
//todo create way to delete users
//todo create way to update users
//todo create way to view user posts
//todo add way login (passport.js)
//todo add way to logout
//todo only show names of users who created post on login
//todo encrypt passwords
//todo create passcode for membership status
//todo add admin status to allow for deleting and updating posts

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
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const insertUsersQuery = `
      INSERT INTO users (username, email, password)
      VALUES 
        ('user1', 'user1@example.com', 'password1'),
        ('user2', 'user2@example.com', 'password2'),
        ('user3', 'user3@example.com', 'password3')
      RETURNING userid
    `;
    const usersResult = await client.query(insertUsersQuery);

    const userIds = usersResult.rows.map((row) => row.userid);

    const insertPostsQuery = `
      INSERT INTO posts (userid, title, content)
      VALUES 
        (${userIds[0]}, 'Post Title 1', 'Content for post 1'),
        (${userIds[1]}, 'Post Title 2', 'Content for post 2'),
        (${userIds[2]}, 'Post Title 3', 'Content for post 3')
    `;
    await client.query(insertPostsQuery);

    await client.query("COMMIT");
    console.log("Database populated with sample data");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error populating database", err);
  } finally {
    client.release();
  }
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
