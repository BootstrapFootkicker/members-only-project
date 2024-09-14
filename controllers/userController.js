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
