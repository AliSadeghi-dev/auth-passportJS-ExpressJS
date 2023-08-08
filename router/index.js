const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index.ejs", { title: "home" });
});
router.get("/login", (req, res) => {
  res.render("login.ejs", { title: "login" });
});
router.get("/register", (req, res) => {
  res.render("register.ejs", { title: "register" });
});
router.get("/profile", (req, res) => {
  res.render("profile.ejs", { title: "profile" });
});

module.exports = router;
