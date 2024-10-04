const postsController = require("./postsController");

exports.index = async (req, res) => {
  try {
    const posts = await postsController.getPosts();
    res.render("index", { title: "social", data: posts || [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = exports;
