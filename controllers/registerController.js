const pool = require("../config/db");

exports.addUserToDb = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE userName = $1", [
      req.body.userName,
    ]);
    if (result.rows.length > 0) {
      res.status(400).send("User already exists");
    } else {
      await pool.query(
        "INSERT INTO users (userName,email, password) VALUES ($1, $2, $3)",
        [req.body.userName, req.body.email, req.body.password],
      );
      console.log(`User ${req.body.userName} added to db`);
      res.redirect("/");
    }
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).send("Server Error");
  }
};

module.exports = exports;
