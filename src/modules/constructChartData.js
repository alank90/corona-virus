/* This a native JS module that constructs the data and options object that used in the
   vue-chart.js renderChart(data, options) call in the display-graph component.  */

export default function constructChartData(topRankedStates_Provinces) {
  let labels = [];

  let totalActive = {
    label: "Total Active Cases",
    data: [],
    backgroundColor: "rgba(240, 255, 25, 0.6)",
    borderColor: "rgba(33, 5, 1, 1)",
    borderWidth: 1,
    yAxisID: "y-axis-active",
  };

  let totalDeaths = {
    label: "Total # of Deaths",
    data: [],
    backgroundColor: "rgba(255, 35, 10, 0.6)",
    borderColor: "rgba(33, 5, 1, 1)",
    borderWidth: 1,
    yAxisID: "y-axis-deaths",
  };

  topRankedStates_Provinces.forEach((item) => {
    labels.push(item.Province);
    totalDeaths.data.push(item.Deaths);
    totalActive.data.push(item.Active);
  });

  let chartData = {
    labels: labels,
    datasets: [totalActive, totalDeaths],
  };

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
          id: "y-axis-active",
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
            fontColor: "rgb(77,255,77)",
          },
        },
      ],
    },
  };

  return { chartData: chartData, options: options };
}
