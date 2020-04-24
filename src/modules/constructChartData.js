/* This a native JS module that constructs the data and options object that used in the
   vue-chart.js renderChart(data, options) call in the display-graph component.  */

export default function constructChartData(topRankedStates_Provinces) {
  let labels = [];
  let data = [];

  console.log(`${topRankedStates_Provinces}`);

  topRankedStates_Provinces.forEach((item) => {
    labels.push(item.Province);
    data.push(item.Deaths);
  });
  console.log(labels);

  let options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  let chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total # of Deaths",
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 80, 155, 0.6)",
          "rgba(55, 102, 255, 0.6)",
          "rgba(99, 102, 255, 0.6)",
          "rgba(153, 22, 255, 0.6)",
          "rgba(14, 99, 255, 0.6)",
          "rgba(255, 0, 0, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return { chartData: chartData, options: options };
}
