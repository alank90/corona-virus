
<script>
import { Bar } from "vue-chartjs";
// Import the EventBus.
import { EventBus } from "../main.js";
import constructChartData from "../modules/constructChartData.js";

export default {
  name: "displayGraph",
  extends: Bar,
  props: ["propsCoronaVirusStats"],
  data: function() {
    return {};
  },
  computed: {
    topRankedStates_Provinces: function() {
      this.propsCoronaVirusStats.sort(function(a, b) {
        return (a.Deaths - b.Deaths) * -1; // sorts descending
      });

      return this.propsCoronaVirusStats.slice(0, 10);
    }
  },

  mounted: function() {
    // The eventbus carries manual search data from Search.vue
    // back to its parent component Headlines.vue
    EventBus.$on("display-graph", data => {
      const { chartData, options } = constructChartData(
        this.topRankedStates_Provinces
      );

      this.renderChart(chartData, options);
    });
  }
};
</script>

