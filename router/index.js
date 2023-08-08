const { hashSync } = require("bcrypt");
const { userModel } = require("../model/user.model");

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
router.post("/register", async (req, res) => {
  try {
    const { fullname: fullName, username, password } = req.body;
    const hashPassword = hashSync(password, 10);
    const user = await userModel.findOne({ username });
    if (user) {
      const referrer = req?.header("Referrer") ?? req.headers.referer;
      req.flash("error", "این نام کاربری قبلا استفاده شده است");
      return res.redirect(referrer ?? "/register");
    }
    await userModel.create({
      fullName,
      username,
      password: hashPassword,
    });
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
