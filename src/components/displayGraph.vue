
<script>
import { Bar } from "vue-chartjs";
// Import the EventBus.
import { EventBus } from "../main.js";

export default {
  name: "displayGraph",
  extends: Bar,
  props: ["propsChartData"],
  data: function() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },
      chartData: {
        labels: ["New York", "New Jersey", "Florida", "Michigan", "California"],
        datasets: [
          {
            label: "# of Deaths",
            data: [4655, 3344, 1255, 988, 782],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)"
            ],
            borderWidth: 1
          }
        ]
      }
    };
  },
  computed: {
    topRankedStates_Provinces: function() {
      this.propsChartData.sort(function(a, b) {
        return (a.Deaths - b.Deaths) * -1; // sorts descending
      });

      return this.propsChartData.slice(0, 5);
    }
  },

  mounted: function() {
    // The eventbus carries manual search data from Search.vue
    // back to its parent component Headlines.vue
    EventBus.$on("display-graph", data => {
      this.renderChart(this.chartData, this.options);
    });
  }
};
</script>

