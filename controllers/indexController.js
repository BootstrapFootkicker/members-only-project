const postsController = require("./postsController");
const passport = require("passport");

exports.index = async (req, res) => {
  try {
    const posts = await postsController.getPosts();
    console.log("Session data:", req.session);
    const userName = req.isAuthenticated()
      ? req.user.userName
      : "Not Logged in!";
    console.log("User name:", userName);
    res.render("index", {
      title: "social",
      data: posts || [],
      name: userName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = exports;
