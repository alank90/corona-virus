
<script>
import { Bar } from "vue-chartjs";
import createDates from "@/modules/createDates.js";
// Import the EventBus.
import { EventBus } from "../main.js";
import constructChartDataForGraphTotals from "../modules/constructChartDataForGraphTotals.js";

export default {
  name: "displayGraphTotals",
  extends: Bar,
  props: ["propsCoronaVirusFetchedUSATodayByState"],
  data: function() {
    return {};
  },
  computed: {
    // First, create a computed property of the top ten ranked states by deaths
    // from the propsCoronaVirusFetchedUSATodayByState array
    topRankedStates: function() {
      const states = this.propsCoronaVirusFetchedUSATodayByState;
      states.sort(function(a, b) {
        return (a.death - b.death) * -1; // sorts descending
      });
      // Take Top 10 Entries
      return states.slice(0, 10);
    }
  },
  mounted: function() {
    const { today, lastWeek } = createDates();

    // The "display-graphs" event alerts this component to run the
    // the constructChartDataForGraphTotals method to render the chart
    EventBus.$on("display-graphs", data => {
      const { chartData, options } = constructChartDataForGraphTotals(
        this.topRankedStates
      );

      this.renderChart(chartData, options);
    });
  }
};
</script>

