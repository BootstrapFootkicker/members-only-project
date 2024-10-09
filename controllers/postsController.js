const pool = require("../config/db");

exports.getPosts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT posts.*, users.userName 
       FROM posts 
       JOIN users ON posts.userId = users.userId`,
    );
    return result.rows;
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).send("Server Error");
  }
};

exports.addPost = async (title, content, userId) => {
  try {
    await pool.query(
      `INSERT INTO posts (title, content, userId) 
         VALUES ($1, $2, $3)`,
      [title, content, userId],
    );
    console.log("Post added");
  } catch (err) {
    console.error("Database query error:", err);
  }
};
module.exports = exports;
