async function getDashBoard() {
  var budget_amount = 0;
  const response = await fetch("/users/budget", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    result = await response.json();
    const welcome = document.getElementById("welcome");
    const wallet = document.getElementById("wallet");
    const goal = document.getElementById("goal");
    const budget = document.getElementById("budget");

    budget_amount = result.budget;
    welcome.innerHTML = result.name.toString() + ", welcome!";
    wallet.innerHTML = result.name.toString() + "'s wallet";
    goal.innerHTML = result.goal.toString();
    budget.innerHTML = "$" + budget_amount.toString();
  }

  const response2 = await fetch("/users/transactions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response2.status === 200) {
    result = await response2.json();
    const remains = document.getElementById("remains");
    remaining_amount = budget_amount - result.total;
    remains.innerHTML = "$" + remaining_amount.toString() + " left";

    categories = [];
    category_amounts = [];
    for (const category in result.categories) {
      categories.push(category.toString());
      category_amounts.push(result.categories[category]);
    }

    // ---------- CHARTS ----------
    // category pie chart
    var options = {
      series: category_amounts,
      chart: {
        width: 380,
        type: "pie",
      },
      labels: categories,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
    var chart = new ApexCharts(document.querySelector("#pie-chart"), options);
    chart.render();

    // AREA CHART
    date_pairs = [];
    dates = [];
    date_amounts = [];
    for (const date in result.dates) {
      date_pairs.push([date, result.dates[date]]);
    }
    date_pairs.sort(function (a, b) {
      return a[0].localeCompare(b[0]);
    });
    for (var i = 0; i < date_pairs.length; i++) {
      dates.push(date_pairs[i][0]);
      date_amounts.push(date_pairs[i][1]);
    }
    var areaChartOptions = {
      series: [
        {
          data: date_amounts,
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#4f35a1"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [2, 0],
      },
      labels: dates,
      markers: {
        size: 0,
      },
      yaxis: [
        {
          title: {
            text: "Daily Expense",
          },
        },
        {
          opposite: true,
        },
      ],
    };

    var areaChart = new ApexCharts(
      document.querySelector("#area-chart"),
      areaChartOptions
    );
    areaChart.render();
  }
}

window.onload = getDashBoard;
