/* This a native JS module that constructs the data and options object that used in the
   vue-chart.js renderChart(data, options) call in the display-graph-confirmed component.  */

export default function constructChartDataForConfirmedCases(
  topTenConfirmedStatesYesterday,
  topTenConfirmedStatesLastWeek
) {
  let labels = [];

  // Construct two objects for the options of the datasets used by Chart.js to
  // construct the chart. See Chart.js for documentation on options for the object.
  let topConfirmedCasesYesterday = {
    label: "Total Confirmed Cases Yesterday",
    data: [],
    backgroundColor: "rgba(25, 25, 240, 0.6)",
    borderColor: "rgba(33, 5, 1, 1)",
    borderWidth: 1,
  };

  let topConfirmedCasesLastWeek = {
    label: "Total Confirmed Cases Last Week",
    data: [],
    backgroundColor: "rgba(100, 240, 25, 0.6)",
    borderColor: "rgba(33, 5, 1, 1)",
    borderWidth: 1,
  };

  // Construct two datasets from the topTenConfirmedStatesYesterday & topTenConfirmedStatesLastWeek array's
  // that were passed into the module
  topTenConfirmedStatesYesterday.forEach((item) => {
    labels.push(item.province);
    topConfirmedCasesYesterday.data.push(item.confirmed);
  });

  topTenConfirmedStatesLastWeek.forEach((item) => {
    topConfirmedCasesLastWeek.data.push(item.confirmed);
  });

  // Create an object for use Chart.js using values from above object's we created.
  // This will be fed into the Chart.js render function to create our chart.
  let chartData = {
    labels: labels,
    datasets: [topConfirmedCasesYesterday, topConfirmedCasesLastWeek],
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
            fontColor: "rgb(255,255,20)",
          },
        },
      ],
    },
  };

  return { chartData: chartData, options: options };
}
