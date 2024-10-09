const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

router.get("/", postsController.getPosts);

router.post("/", async (req, res) => {
  if (!req.session.passport.user) {
    return res.status(401).send("Unauthorized");
  }
  const userId = req.session.passport.user.id;
  await postsController.addPost(req.body.title, req.body.content, userId);

  res.redirect("/");
});

module.exports = router;
