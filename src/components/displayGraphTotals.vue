
<script>
import { Bar } from "vue-chartjs";
import createDates from "@/modules/createDates.js";
// Import the EventBus.
import { EventBus } from "../main.js";
import constructChartData from "../modules/constructChartData.js";

export default {
  name: "displayGraphTotals",
  extends: Bar,
  props: ["propsCoronaVirusStatsTotal"],
  data: function() {
    return {};
  },
  computed: {
    topRankedStates_Provinces: function() {
      this.propsCoronaVirusStatsTotal.sort(function(a, b) {
        return (a.Deaths - b.Deaths) * -1; // sorts descending
      });
      // Take Top 10 Entries
      return this.propsCoronaVirusStatsTotal.slice(0, 10);
    } /* ,
    topRankedWeekToWeekComparison: function() {
      const topConfirmedCasesToday = [];
      const { today, lastWeek } = createDates();
      let todaySliced = today.slice(0, 10);
      let lastWeekCopy = lastWeek.slice(0, 10);
      // lastWeekSliced needs one day added to it because of
      // pecularity in Covid API. When you ask for a from specific
      // date the API returns one less day. i.e. a from date of 4-22 will return
      // dates starting at 4-23. Crazy right!
      lastWeekCopy = Date.parse(lastWeekCopy);
      let lastWeekSliced = new Date(lastWeekCopy);
      lastWeekSliced.setDate(lastWeekSliced.getDate() + 1);
      lastWeekSliced = lastWeekSliced.toISOString().slice(0, 10);

      this.propsCoronaVirusStatsTotal.forEach(element => {
        element.Date = element.Date.slice(0, 10);
        if (element.Date == todaySliced || element.Date == lastWeekSliced) {
          topConfirmedCasesToday.push(element);
        }
      });
      return topConfirmedCasesToday;
    } */
  },

  mounted: function() {
    const { today, lastWeek } = createDates();

    // The eventbus carries manual search data from Search.vue
    // back to its parent component Headlines.vue
    EventBus.$on("display-graph-totals", data => {
      const { chartData, options } = constructChartData(
        this.topRankedStates_Provinces
      );

      this.renderChart(chartData, options);
    });
  }
};
</script>

