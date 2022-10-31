var express = require("express");
var router = express.Router();
var path = require("path");

// 渲染register页面
router.get("/register", function (req, res, next) {
  res.sendFile("register.html", {
    root: path.join(__dirname, "../public"),
  });
});

// 渲染login页面
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
module.exports = router;
