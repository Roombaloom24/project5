window.onload = () => {
  console.log("script has loaded");


  let footer = document.createElement("footer");
  addElements(footer);
  document.body.append(footer);
  renderCharts();
  specificSearch();
  dataNames();
  



};

// do the same thign you did with the search where you look for the url and populate it with that.
// MAKE THE NAV BUTTON POPULATE THE QUERY 
async function renderCharts() {



  const dataFromUser = await fetch("/selfstock").then((response) =>
    response.json()
  );
  await generateChart("personalStockChart", dataFromUser);
  
  
  const dataFromUserFollow1 = await fetch("/following-chart1").then((response) =>
    response.json()
  );
  
  await generateChart("personalStockChart5", dataFromUserFollow1);



  
  const dataFromUserFollow2 = await fetch("/following-chart2").then((response) =>
    response.json()
  );

  await generateChart("personalStockChart2", dataFromUserFollow2);

    
  const dataFromUserFollow3 = await fetch("/following-chart3").then((response) =>
    response.json()
  );

  await generateChart("personalStockChart3", dataFromUserFollow3);
console.log(dataFromUserFollow3);

const dataFromUserFollow4 = await fetch("/following-chart4").then((response) =>
  response.json()
);

await generateChart("personalStockChart4", dataFromUserFollow4);
console.log(dataFromUserFollow4);


}

async function specificSearch() {

  const search = document.URL;
  const searchParam = search.includes('=') ? search.split('=')[1] : null;

  if (!searchParam) {
    console.error("Invalid URL: Missing search parameter.");
    return;
  }

  const url = '/searchUser?search=' + searchParam;
  const url2 = '/searchfollows?search=' + searchParam;
  const url3 = '/searchfollows2?search=' + searchParam;
  const url4 = '/searchfollows3?search=' + searchParam;
  const url5 = '/searchfollows4?search=' + searchParam;

  const dataFromUserS = await fetch(url).then((response) =>
    response.json() 
  );
  await generateChart("specificChart", dataFromUserS);



  const dataFromUserF = await fetch(url2).then((response) =>
    response.json() 
  );
  await generateChart("specificChartF", dataFromUserF);


  const dataFromUserF1 = await fetch(url3).then((response) =>
    response.json() 
  );
  await generateChart("specificChartF1", dataFromUserF1);


  const dataFromUserF2 = await fetch(url4).then((response) =>
    response.json() 
  );
  await generateChart("specificChartF2", dataFromUserF2);


  const dataFromUserF3 = await fetch(url5).then((response) =>
    response.json() 
  );
  await generateChart("specificChartF3", dataFromUserF3);
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


async function personal(){
    user = 
    // Redirect the user to /personalstock
    window.location.href = '/personalstock' ;

}







async function searchU() {
        document.getElementById('followButton').style.display = 'block';

        if(Chart.getChart("searchStock")) {
      Chart.getChart("searchStock")?.destroy()
        }

        const input = document.getElementById('search').value;
        const search = new URLSearchParams({ search: input });

        const url = '/searchUser?' + search;
        console.log(url);
        let name = input.split('=').pop(); // Set the chart name to the value after '='
        document.getElementById('chartLink').href = '/specificstock/' + search;


        const url2 = '/searchfollows?' + search;
        console.log(url);
        let name2 = input.split('=').pop(); // Set the chart name to the value after '='



        const dataFromUserV = await fetch(url).then((response) =>
          response.json()
        );

        const labelsV = dataFromUserV.map((item) => item.date);
        const dataPointsV = dataFromUserV.map((item) => item.price);
      
        // Render chart for user 'v'
        const ctxV = document
          .getElementById("searchStock")
          .getContext("2d");
        const personalStockChartV = new Chart(ctxV, {
          type: "line",
          data: {
            labels: labelsV,
            datasets: [
              {
                label: name +  " - Closing Price (USD)",
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


      async function followUser() {

        const search = document.URL
        const url = '/searchUser?search=' + search.split('=')[1];
        const name = search.split('=')[1];
        // Send a POST request to the server to follow the user
        await fetch("/follow", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        alert(`You are now following ${name}!`);
      }



  async function addElements(e) {
  let data = await fetch("/savestock");
  let formatData = await data.json();
  console.log(formatData);
}

async function generateChart(chartId, data) {

  const labels = data.map((item) => item.date);
  const dataPoints = data.map((item) => item.price);

  // Render chart for the given chartId
  const ctx = document.getElementById(chartId).getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Closing Price (USD)",
          data: dataPoints,
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

  return chart;
}
