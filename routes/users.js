var express = require("express");
var router = express.Router();
var model = require("../model");

//注册接口：
router.post("/register", function (req, res, next) {
  var data = {
    username: req.body.username,
    password: req.body.password,
    password2: req.body.password2,
  };
  //数据验证：
  model.connect(function (db) {
    db.collection("users").insertOne(data, function (err, ret) {
      if (err) {
        console.log("Register Fails!!");
        res.redirect("/register");
      } else {
        res.redirect("/login");
      }
    });
  });
  // res.send(data);
});

//login接口
router.post("/login", function (req, res, next) {
  var query = {
    username: req.body.username,
    password: req.body.password,
  };
  //login logic: if err, go to login page, else: if docs>0(不是空的，记录里有用户名，密码)，go to home page， else：login page again
  model.connect(function (db) {
    db.collection("users")
      .find(query)
      .toArray(function (err, docs) {
        if (err) {
          res.redirect("/login");
        } else {
          if (docs.length > 0) {
            //login successfully, use session to store user's data
            req.session.username = query.username;
            res.redirect("/");
          } else {
            res.redirect("/login");
          }
        }
      });
  });
  console.log("User Login", query);
});

// get budget
router.get("/budget", function (req, res, next) {
  var username = req.session.username;
  var query = {
    username: username,
  };
  console.log("Username", username);
  model.connect(function (db) {
    db.collection("users").findOne(query, function (err, result) {
      if (err) {
        // return 0 dollar in case front end shows nothing
        res.send("{}");
      } else {
        res.send(
          '{"budget":' + result.budget + ',"goal":"' + result.goal + '"}'
        );
        console.log("User document", result);
      }
    });
  });
});

module.exports = router;
