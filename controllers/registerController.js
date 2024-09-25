const pool = require("../config/db");


exports.addUserToDb = async (req, res) => {
    try {
        if (await pool.query("SELECT * FROM users WHERE userName = $1", [req.body.userName])) {
            res.status(400).send("User already exists");
        } else {
            await pool.query("INSERT INTO users (userName, password) VALUES ($1, $2)", [req.body.userName, req.body.password]);
            res.status(201).send("User added to database");
        }

    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).send("Server Error");
    }
}

module.exports = exports;