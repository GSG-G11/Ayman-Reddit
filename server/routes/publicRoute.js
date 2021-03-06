const publicRoute = require("express").Router();
const path = require("path");
const { isAuthProtected, isUserLogined } = require("../middleware");
const { logout, getUserData, addPost, getPosts, deletePost, updatePost, getUserPosts} = require("../controllers");
const getUserProfile = require("../controllers/getUserProfile");

publicRoute.get("/home", isAuthProtected, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "html", "reddit.html")
  );
});

publicRoute.get("/register", isUserLogined, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "html", "register.html")
  );
});
publicRoute.get("/login", isUserLogined, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "html", "login.html")
  );
});

publicRoute.get("/reddit", isAuthProtected, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "html", "reddit.html")
  );
});

publicRoute.get("/getPosts", getPosts);
publicRoute.get("/user", isAuthProtected, getUserData);
publicRoute.get("/userpost", isAuthProtected, getUserPosts);

publicRoute.post("/addPost", isAuthProtected, addPost);
publicRoute.get("/logout", logout);
publicRoute.delete('/deletePost/:id', deletePost);

publicRoute.post('/updatePost/:id', updatePost);
publicRoute.get('/profile/:id', getUserProfile);
publicRoute.get("/profile", isAuthProtected, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "html", "profile.html")
  );
});
module.exports = publicRoute;
