var express = require("express");
var router = express.Router();
var model = require("../model");

router.post("/register", function (req, res, next) {
  var data = {
    username: req.body.username,
    password: req.body.password,
    password2: req.body.password2,
  };

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
  model.connect(function (db) {
    db.collection("users").findOne(query, function (err, result) {
      if (err) {
        // return 0 dollar in case front end shows nothing
        res.send("{}");
      } else {
        payload = {};
        payload["name"] = result.username;
        payload["budget"] = result.budget;
        payload["goal"] = result.goal;
        res.send(JSON.stringify(payload));
      }
    });
  });
});

// get transactions
router.get("/transactions", function (req, res, next) {
  var username = req.session.username;
  var query = {
    username: username,
  };

  model.connect(function (db) {
    db.collection("users").findOne(query, function (err, result) {
      if (err) {
        res.send("{}");
      } else {
        payload = {};
        db.collection("transactions")
          .find(query)
          .toArray(function (err, docs) {
            if (err) {
              res.send("{}");
            } else {
              console.log(docs);
              if (docs.length > 0) {
                categories = {};
                dates = {};
                total = 0;
                for (var i = 0; i < docs.length; i++) {
                  if (!(docs[i].category in categories)) {
                    categories[docs[i].category] = 0;
                  }
                  categories[docs[i].category] += docs[i].amount;
                  if (!(docs[i].date in dates)) {
                    dates[docs[i].date] = 0;
                  }
                  dates[docs[i].date] += docs[i].amount;
                  total = total + docs[i].amount;
                }
                payload["categories"] = categories;
                payload["dates"] = dates;
                payload["total"] = total;
                console.log(payload);
                res.send(JSON.stringify(payload));
              }
            }
          });
      }
    });
  });
});

module.exports = router;
