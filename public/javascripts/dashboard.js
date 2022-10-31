var budget = document.getElementById("budget");
var goal = document.getElementById("goal");

var request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (request.status === 200) {
    console.log(request.responseText);
    result = JSON.parse(request.responseText);
    budget.innerHTML = "$" + result["budget"];
    goal.innerHTML = result["goal"];
  }
};

request.open("GET", "/users/budget");
request.send();
