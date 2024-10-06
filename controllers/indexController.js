const postsController = require("./postsController");

exports.index = async (req, res) => {
  try {
    const posts = await postsController.getPosts();
    res.render("index", {
      title: "social",
      data: posts || [],
      name: req.user?.username || "", //todo fix this and figure out how to pass name
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = exports;
