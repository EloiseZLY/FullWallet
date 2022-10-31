var mc = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
var dbName = "fullwallet";
//数据库连接方法
function connect(callback) {
  mc.connect(url, function (err, client) {
    if (err) {
      console.log("Database connection FAIL", err);
    } else {
      var db = client.db(dbName);
      console.log("Database connection SUCCESS");
      callback && callback(db);
    }
  });
}
module.exports = {
  connect,
};
