const pool = require("../config/db");

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).send("Server Error");
  }
};

exports.getUserByName = async (username) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return result.rows[0]; // Assuming you want a single user object
  } catch (err) {
    console.error("Database query error:", err);
    throw err;
  }
};
exports.getUserByUserId = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT userName FROM users WHERE userId = $1",
      [req.params.userId],
    );
    return result.rows;
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).send("Server Error");
  }
};

module.exports = exports;
