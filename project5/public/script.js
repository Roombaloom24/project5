window.onload = () => {
  console.log("script has loaded");


  let footer = document.createElement("footer");
  addElements(footer);
  document.body.append(footer);
  renderCharts();
  specificSearch();
  dataNames();
  
  getAllUsernames();

  fetchAllUsersData();

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
async function fetchAllUsersData() {
  try {
    const response = await fetch('/all-users');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const groupedData = await response.json();
    console.log("Grouped Data by User:", groupedData);

    // Iterate over each user in the grouped data
    Object.keys(groupedData).forEach((user) => {
      const userData = groupedData[user];

      // Dynamically create a wrapper div for each chart and button
      const wrapper = document.createElement('div');
      wrapper.className = 'chart-wrapper';

      // Create a link that wraps the canvas element
      const link = document.createElement('a');
      link.href = `/specificstock?user=${encodeURIComponent(user)}`; // Link to the specific stock page for the user
      link.title = `View ${user}'s stock details`;

      // Dynamically create a canvas element for each user
      const canvasId = `personalStockChart_${user}`;
      const canvasElement = document.createElement('canvas');
      canvasElement.id = canvasId;
      canvasElement.width = 400;
      canvasElement.height = 200;

      // Append the canvas to the link
      link.appendChild(canvasElement);

      // Create a "Follow" button for the user
      const followButton = document.createElement('button');
      followButton.textContent = `Follow ${user}`;
      followButton.onclick = () => followUser(user); // Attach the followUser function

      // Add a title for the chart
      const userTitle = document.createElement('h3');
      userTitle.textContent = `Chart for ${user}`;

      // Append the title, link (with canvas), and button to the wrapper
      wrapper.appendChild(userTitle);
      wrapper.appendChild(link);
      wrapper.appendChild(followButton);

      // Append the wrapper to the chartsContainer div
      const container = document.getElementById('chartsContainer');
      if (container) {
        container.appendChild(wrapper);
      }

      // Generate a chart for the user
      generateChart(canvasId, userData);
    });
  } catch (error) {
    console.error("Failed to fetch all users' data:", error);
  }
}

// Call the function


// Example usag
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
function followUserFromSearch() {
  // Get the username from the search input field
  const username = document.getElementById('search').value.trim();

  if (!username) {
    alert('Please enter a valid username to follow.');
    return;
  }

  // Call the existing followUser function with the username
  followUser(username);
}

      async function followUser(username) {
        console.log(`Attempting to follow user: ${username}`); // Debugging log
        try {
          const response = await fetch('/follow-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Ensure the Content-Type is set to JSON
            },
            body: JSON.stringify({ username }), // Send the username in the request body
          });
      
          if (!response.ok) {
            throw new Error(`Failed to follow user: ${response.status}`);
          }
      
          const result = await response.json();
          console.log(`Successfully followed ${username}:`, result);
      
          alert(`You are now following ${username}!`);
        } catch (error) {
          console.error(`Error following user ${username}:`, error);
          alert(`Failed to follow ${username}. Please try again.`);
        }
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
