var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//引入session进app.js
var session = require("express-session");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
//session 配置， cookie：写有效期（用户登录多久有效）
app.use(
  session({
    secret: "zly_project",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 6 * 5 }, //set up effective time period = 5 mins
  })
);
//login interception登录拦截:
app.get("*", function (req, res, next) {
  var username = req.session.username;
  var path = req.path;
  console.log("session", username);
  //user without login, cannot enter homepage
  //if not login, register page, if there is no login name, redirect to login page
  if (path != "/login" && path != "/register") {
    if (!username) {
      console.log("redirect login");
      res.redirect("/login");
    }
  }

  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
