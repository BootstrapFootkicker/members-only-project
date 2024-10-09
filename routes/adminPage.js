const express = require("express");
const router = express.Router();
const adminPageController = require("../controllers/adminPageController");
const checkAuth = require("../scripts/auth");
router.get("/", checkAuth, (req, res) => {
  res.render("adminPage", {
    title: "Admin Page",
    error_msg: req.flash("error_msg"),
  });
});

router.post("/", (req, res) => {
  adminPageController.grantAccess(req.body.answer, req.user.userName, res, req);
});

module.exports = router;
