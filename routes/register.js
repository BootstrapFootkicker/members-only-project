const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

router.get("/", (req, res) => {
  res.render("register", { title: "Register" });
});

router.post("/", (req, res) => {
  registerController.addUserToDb(req, res);
});

module.exports = router;
