const updatepostDB = require('../database/queries');

const updatePost = (req, res) => {
  const postId = req.params.id;

  updatepostDB(postId);
  res.redirect(req.get('referer'));
};

module.exports = updatePost;
