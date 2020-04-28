
<script>
import { Bar } from "vue-chartjs";
import createDates from "@/modules/createDates.js";
// Import the EventBus.
import { EventBus } from "../main.js";
import constructChartData from "../modules/constructChartData.js";

export default {
  name: "displayGraph",
  extends: Bar,
  props: ["propsCoronaVirusStats"],
  data: function() {
    return {
      activeCases: []
    };
  },
  computed: {
    topRankedStates_Provinces: function() {
      this.propsCoronaVirusStats.sort(function(a, b) {
        return (a.Deaths - b.Deaths) * -1; // sorts descending
      });
      // Take Top 10 Entries
      return this.propsCoronaVirusStats.slice(0, 10);
    },

    activeCaseGrowth: function() {
      const { today } = createDates();
      let today1 = today.slice(0, 10);
      console.log(today1);
      this.propsCoronaVirusStats.forEach(element => {
        element.Date = element.Date.slice(0, 10);
        console.log(element.Date);
        if (element.Date == today1) {
          console.log(`In if ${element}`);
          this.activeCases.push(element);
        }
      });
      return this.activeCases
      // return this.activeCases.slice(0, 10);
    }
  },

  mounted: function() {
    const { today, lastWeek } = createDates();

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

