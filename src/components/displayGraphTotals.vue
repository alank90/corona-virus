
<script>
import { Bar } from "vue-chartjs";
import createDates from "@/modules/createDates.js";
// Import the EventBus.
import { EventBus } from "../main.js";
import constructChartDataForGraphTotals from "../modules/constructChartDataForGraphTotals.js";

export default {
  name: "displayGraphTotals",
  extends: Bar,
  props: ["propscoronaVirusFetchedUSATodayByState"],
  data: function() {
    return {};
  },
  computed: {
    // First, create a computed property of the top ten ranked states by deaths
    // from the propscoronaVirusFetchedUSATodayByState array
    topRankedStates: function() {
      const states = this.propscoronaVirusFetchedUSATodayByState;
      states.sort(function(a, b) {
        return (a.death - b.death) * -1; // sorts descending
      });
      // Take Top 10 Entries
      return states.slice(0, 10);
    }
  },
  mounted: function() {
    const { today, lastWeek } = createDates();

    // The eventbus carries manual search data from Search.vue
    // back to its parent component Headlines.vue
    EventBus.$on("display-graphs", data => {
      const { chartData, options } = constructChartDataForGraphTotals(
        this.topRankedStates
      );

      this.renderChart(chartData, options);
    });
  },
  watch: {
    propscoronaVirusFetchedUSATodayByState: function(newProps, oldProps) {
      const { chartData, options } = constructChartDataForGraphTotals(
        this.topRankedStates
      );

      this.renderChart(chartData, options);
    }
  }
};
</script>

