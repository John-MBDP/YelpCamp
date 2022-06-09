const express = require("express");
const passport = require("passport");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({
        email,
        username,
      });
      const registeredUser = await User.register(user, password);
      req.flash("success", "Welcome to Yelp Camp!");
      res.redirect("/campgrounds");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
  (req, res) => {
    req.flash("success", "Welcome Back!");
    res.redirect("/campgrounds");
  }
);

router.get("/logout", (req, res) => {
  req.logOut(req, (err) => {
    if (err) return next(new ExpressError("You must be signed in", 401));
    req.flash("success", "See you soon!");
    res.redirect("/campgrounds");
  });
});

module.exports = router;
