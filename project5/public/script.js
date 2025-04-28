window.onload = () => {
  console.log("script has loaded");

  let footer = document.createElement("footer");
  addElements(footer);
  document.body.append(footer);
  renderCharts();
  renderExploreCharts(); // Add this function to render the "Explore" section
  renderSearchChart();
};

async function renderSearchChart() {
  const dataFromUserSearch = posts;
  console.log(posts);
  const labelsSearch = dataFromUserSearch.map((item) => item.date);
  const dataPointsSearch = dataFromUserSearch.map((item) => item.price);
  // Render chart for user 'search'
  const ctxSearch = document
    .getElementById("searchStock")
    .getContext("2d");
  const personalStockChartSearch = new Chart(ctxSearch, {
    type: "line",
    data: {
      labels: labelsSearch,
      datasets: [
        {
          label: "User Search - Closing Price (USD)",
          data: dataPointsSearch,
          borderColor: "#ccc",
          backgroundColor: "rgba(0,0,0,0)",
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
          segment: {
            borderColor: (ctx) => {
              const i = ctx.p0DataIndex;
              const current = ctx.chart.data.datasets[0].data[i];
              const next = ctx.chart.data.datasets[0].data[i + 1];
              if (!next) return "#ccc";
              return next > current ? "green" : "red";
            },
          },
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: "Date", color: "#ccc" },
          ticks: { color: "#ccc" },
        },
        y: {
          title: { display: true, text: "Price (USD)", color: "#ccc" },
          ticks: { color: "#ccc" },
        },
      },
      plugins: {
        legend: { labels: { color: "#ccc" } },
      },
    },
  });
}


async function renderCharts() {


  try {
    const userResponse = await fetch("/selfstock");
    if (!userResponse.ok) {
      throw new Error(`HTTP error! status: ${userResponse.status}`);
    }
    const userStockData = await userResponse.json();

    const userLabels = userStockData.map((item) => item.date);
    const userDataPoints = userStockData.map((item) => item.price);

    // Render chart for user's personal stock
    const userCtx = document.getElementById("personalStockChart").getContext("2d");
    const userStockChart = new Chart(userCtx, {
      type: "line",
      data: {
        labels: userLabels,
        datasets: [
          {
            label: "User Stock - Closing Price (USD)",
            data: userDataPoints,
            borderColor: "#ccc",
            backgroundColor: "rgba(0,0,0,0)",
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
            segment: {
              borderColor: (ctx) => {
                const i = ctx.p0DataIndex;
                const current = ctx.chart.data.datasets[0].data[i];
                const next = ctx.chart.data.datasets[0].data[i + 1];
                if (!next) return "#ccc";
                return next > current ? "green" : "red";
              },
            },
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: { display: true, text: "Date", color: "#ccc" },
            ticks: { color: "#ccc" },
          },
          y: {
            title: { display: true, text: "Price (USD)", color: "#ccc" },
            ticks: { color: "#ccc" },
          },
        },
        plugins: {
          legend: { labels: { color: "#ccc" } },
        },
      },
    });
  } catch (error) {
    console.error("Error rendering user stock chart:", error);
  }
  // Fetch data for user 'f'
  const dataFromUserF = await fetch("/following-chart1").then((response) =>
    response.json()
  );
  const labelsF = dataFromUserF.map((item) => item.date);
  const dataPointsF = dataFromUserF.map((item) => item.price);

  // Render chart for user 'f'
  const ctxF = document
    .getElementById("personalStockChart5")
    .getContext("2d");
  const personalStockChartF = new Chart(ctxF, {
    type: "line",
    data: {
      labels: labelsF,
      datasets: [
        {
          label: "User F - Closing Price (USD)",
          data: dataPointsF,
          borderColor: "#ccc",
          backgroundColor: "rgba(0,0,0,0)",
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
          segment: {
            borderColor: (ctx) => {
              const i = ctx.p0DataIndex;
              const current = ctx.chart.data.datasets[0].data[i];
              const next = ctx.chart.data.datasets[0].data[i + 1];
              if (!next) return "#ccc";
              return next > current ? "green" : "red";
            },
          },
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: "Date", color: "#ccc" },
          ticks: { color: "#ccc" },
        },
        y: {
          title: { display: true, text: "Price (USD)", color: "#ccc" },
          ticks: { color: "#ccc" },
        },
      },
      plugins: {
        legend: { labels: { color: "#ccc" } },
      },
    },
  });

  // Fetch data for user 'v'
  const dataFromUserV = await fetch("/following-chart2").then((response) =>
    response.json()
  );
  const labelsV = dataFromUserV.map((item) => item.date);
  const dataPointsV = dataFromUserV.map((item) => item.price);

  // Render chart for user 'v'
  const ctxV = document
    .getElementById("personalStockChart2")
    .getContext("2d");
  const personalStockChartV = new Chart(ctxV, {
    type: "line",
    data: {
      labels: labelsV,
      datasets: [
        {
          label: "User V - Closing Price (USD)",
          data: dataPointsV,
          borderColor: "#ccc",
          backgroundColor: "rgba(0,0,0,0)",
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
          segment: {
            borderColor: (ctx) => {
              const i = ctx.p0DataIndex;
              const current = ctx.chart.data.datasets[0].data[i];
              const next = ctx.chart.data.datasets[0].data[i + 1];
              if (!next) return "#ccc";
              return next > current ? "green" : "red";
            },
          },
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: "Date", color: "#ccc" },
          ticks: { color: "#ccc" },
        },
        y: {
          title: { display: true, text: "Price (USD)", color: "#ccc" },
          ticks: { color: "#ccc" },
        },
      },
      plugins: {
        legend: { labels: { color: "#ccc" } },
      },
    },
  });
}

      const labels = [];
      const dataPoints = [];
    
      const ctx = document.getElementById('stockChart').getContext('2d');
      const stockChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Closing Price (USD)',
            data: dataPoints,
            borderColor: '#ccc',
            backgroundColor: 'rgba(0,0,0,0)',
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
            segment: {
              borderColor: ctx => {
                const i = ctx.p0DataIndex;
                const current = ctx.chart.data.datasets[0].data[i];
                const next = ctx.chart.data.datasets[0].data[i + 1];
                if (!next) return '#ccc';
                return next > current ? 'green' : 'red';
              }
            }
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: { title: { display: true, text: 'Date', color: '#ccc' }, ticks: { color: '#ccc' }},
            y: { title: { display: true, text: 'Price (USD)', color: '#ccc' }, ticks: { color: '#ccc' }}
          },
          plugins: {
            legend: { labels: { color: '#ccc' }}
          }
        }
      });
// $&Y#*GUEHFBJDHAUEYGEUTFVHDBJ CNSDAHUIFGYEVHDB NSJDSHIUGYFEHVB DNSJDAOIUHEFBGJD SNKJADIUHFEBJDV NSJDAUFHUBDSJV NJFHIUSD
// $&Y#*GUEHFBJDHAUEYGEUTFVHDBJ CNSDAHUIFGYEVHDB NSJDSHIUGYFEHVB DNSJDAOIUHEFBGJD SNKJADIUHFEBJDV NSJDAUFHUBDSJV NJFHIUSD
// $&Y#*GUEHFBJDHAUEYGEUTFVHDBJ CNSDAHUIFGYEVHDB NSJDSHIUGYFEHVB DNSJDAOIUHEFBGJD SNKJADIUHFEBJDV NSJDAUFHUBDSJV NJFHIUSD
// $&Y#*GUEHFBJDHAUEYGEUTFVHDBJ CNSDAHUIFGYEVHDB NSJDSHIUGYFEHVB DNSJDAOIUHEFBGJD SNKJADIUHFEBJDV NSJDAUFHUBDSJV NJFHIUSD
// $&Y#*GUEHFBJDHAUEYGEUTFVHDBJ CNSDAHUIFGYEVHDB NSJDSHIUGYFEHVB DNSJDAOIUHEFBGJD SNKJADIUHFEBJDV NSJDAUFHUBDSJV NJFHIUSD
// $&Y#*GUEHFBJDHAUEYGEUTFVHDBJ CNSDAHUIFGYEVHDB NSJDSHIUGYFEHVB DNSJDAOIUHEFBGJD SNKJADIUHFEBJDV NSJDAUFHUBDSJV NJFHIUSD
// SAM HELP ME PLEASE
      const searchResults = [];
      
// REMEMBER THAT YOU CAN"T FIND THE SEAERCH IN THE BODT
      async function searchU() {

        const input = document.getElementById('search').value;

        searchResults.push(input);
        await fetch('/searchUser' , {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({input})
        });
      }
      // TRYING TO DO THIS THE SAME WAY AS THE ADD DATA FUNCTION
// $&Y#*GUEHFBJDHAUEYGEUTFVHDBJ CNSDAHUIFGYEVHDB NSJDSHIUGYFEHVB DNSJDAOIUHEFBGJD SNKJADIUHFEBJDV NSJDAUFHUBDSJV NJFHIUSD
// $&Y#*GUEHFBJDHAUEYGEUTFVHDBJ CNSDAHUIFGYEVHDB NSJDSHIUGYFEHVB DNSJDAOIUHEFBGJD SNKJADIUHFEBJDV NSJDAUFHUBDSJV NJFHIUSD
// $&Y#*GUEHFBJDHAUEYGEUTFVHDBJ CNSDAHUIFGYEVHDB NSJDSHIUGYFEHVB DNSJDAOIUHEFBGJD SNKJADIUHFEBJDV NSJDAUFHUBDSJV NJFHIUSD
// $&Y#*GUEHFBJDHAUEYGEUTFVHDBJ CNSDAHUIFGYEVHDB NSJDSHIUGYFEHVB DNSJDAOIUHEFBGJD SNKJADIUHFEBJDV NSJDAUFHUBDSJV NJFHIUSD
// $&Y#*GUEHFBJDHAUEYGEUTFVHDBJ CNSDAHUIFGYEVHDB NSJDSHIUGYFEHVB DNSJDAOIUHEFBGJD SNKJADIUHFEBJDV NSJDAUFHUBDSJV NJFHIUSD
// $&Y#*GUEHFBJDHAUEYGEUTFVHDBJ CNSDAHUIFGYEVHDB NSJDSHIUGYFEHVB DNSJDAOIUHEFBGJD SNKJADIUHFEBJDV NSJDAUFHUBDSJV NJFHIUSD
// $&Y#*GUEHFBJDHAUEYGEUTFVHDBJ CNSDAHUIFGYEVHDB NSJDSHIUGYFEHVB DNSJDAOIUHEFBGJD SNKJADIUHFEBJDV NSJDAUFHUBDSJV NJFHIUSD

      async function addData() {
        // const currentDate = new Date().toISOString().split('T')[0];
        // const date = currentDate;
        const date = document.getElementById('date').value;
        const price = parseFloat(document.getElementById('price').value);
    
        if (!date || isNaN(price)) {
          alert("Please enter a valid date and price.");
          return;
        }
    
        labels.push(date);
        console.log(labels);
        dataPoints.push(price);
        console.log(dataPoints);
        stockChart.update();
    
        await fetch('/savestock' , {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date, price })
        });
       
      }
    
      function resetChart() {
        labels.length = 0;
        dataPoints.length = 0;
        stockChart.update();
      }


      async function followUser(userToFollow) {
        // Send a POST request to the server to follow the user
        await fetch("/follow", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userToFollow }),
        });
        alert(`You are now following ${userToFollow}!`);
      }



  async function addElements(e) {
  let data = await fetch("/savestock");
  let formatData = await data.json();
  console.log(formatData);
}
