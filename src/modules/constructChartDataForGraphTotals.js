/* This a native JS module that constructs the data and options object that is used in the
   vue-chart.js renderChart(data, options) call in the display-graph-totals component. */

export default function constructChartDataForGraphTotals(topRankedStates) {
  let labels = [];

  // Construct two objects for the options of the datasets
  let totalCurrentlyHospitalized = {
    label: "Total Currently Hospitalized",
    data: [],
    backgroundColor: "rgba(240, 255, 25, 0.6)",
    borderColor: "rgba(33, 5, 1, 1)",
    borderWidth: 1,
    yAxisID: "y-axis-hospitalized",
    maxBarThickness: 30,
  };

  let totalDeaths = {
    label: "Total # of Deaths",
    data: [],
    backgroundColor: "rgba(255, 35, 10, 0.6)",
    borderColor: "rgba(33, 5, 1, 1)",
    borderWidth: 1,
    yAxisID: "y-axis-deaths",
    maxBarThickness: 30,
  };

  // Construct two datasets from the topRankedStates array plus a labels array
  topRankedStates.forEach((item) => {
    labels.push(item.state);
    totalDeaths.data.push(item.death);
    totalCurrentlyHospitalized.data.push(item.hospitalizedCurrently);
  });

  // Create an object with values from above. This will be fed into the Chart.js
  // render function to create our chart
  let chartData = {
    labels: labels,
    datasets: [totalCurrentlyHospitalized, totalDeaths],
  };
  // This will also be fed into render function. It is a straight up object
  // using structure taken from Chart.js site. All property values were manually
  // entered.
  let options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        // This more specific font property overrides the global property
        fontSize: 24,
        fontStyle: "bold",
        fontColor: "black",
      },
    },
    scales: {
      yAxes: [
        {
          id: "y-axis-hospitalized",
          type: "linear",
          position: "left",
        },
        {
          id: "y-axis-deaths",
          type: "linear",
          position: "right",
        },
        {
          ticks: {
            beginAtZero: false,
            fontSize: 20,
          },
        },
      ],
      xAxes: [
        {
          barPercentage: 1,
          categoryPercentage: 0.6,
          ticks: {
            beginAtZero: true,
            fontSize: 18,
            fontColor: "rgb(97,89,1)",
          },
        },
      ],
    },
  };

  return { chartData: chartData, options: options };
}
