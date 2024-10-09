const postsController = require("./postsController");
const passport = require("passport");
const userController = require("./userController");
exports.index = async (req, res) => {
  try {
    const posts = await postsController.getPosts();
    console.log("Session data:", req.session);
    const userName = req.isAuthenticated() ? req.user.userName : "Guest";
    let isAdmin = false;
    if (await userController.isAdmin(userName)) {
      isAdmin = true;
    }
    console.log("Is Admin:", isAdmin);
    console.log("User name:", userName);
    res.render("index", {
      title: "social",
      data: posts || [],
      name: userName,
      isAdmin: isAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = exports;
