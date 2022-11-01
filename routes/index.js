var express = require("express");
var router = express.Router();
var path = require("path");

router.get("/register", function (req, res, next) {
  res.sendFile("register.html", {
    root: path.join(__dirname, "../public"),
  });
});

router.get("/login", function (req, res, next) {
  res.sendFile("login.html", {
    root: path.join(__dirname, "../public"),
  });
});

// handle dashboard page
router.get("/", function (req, res, next) {
  res.sendFile("dashboard.html", {
    root: path.join(__dirname, "../public"),
  });
});

router.get("/edit", function (req, res, next) {
  res.sendFile("edit_profile.html", {
    root: path.join(__dirname, "../public"),
  });
});

router.get("/transaction", function (req, res, next) {
  res.sendFile("transaction.html", {
    root: path.join(__dirname, "../public"),
  });
});

router.get("/logout", function (req, res, next) {
  res.sendFile("logout.html", {
    root: path.join(__dirname, "../public"),
  });
});

module.exports = router;
