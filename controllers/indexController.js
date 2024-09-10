// controllers/indexController.js
const pool = require("../config/db");

exports.index = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.render("index", { title: "social", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};