<script>
import { Bar } from "vue-chartjs";
import createDates from "@/modules/createDates.js";
// Import the EventBus.
import { EventBus } from "../main.js";
import constructChartDataForConfirmedCases from "../modules/constructChartDataForConfirmedCases.js";

export default {
  name: "displayGraphConfirmed",
  extends: Bar,
  props: ["propsCoronaVirusStatsLastWeek", "propsCoronaVirusStatsYesterday"],
  data: function() {
    return {};
  },
  computed: {
    topTenConfirmedStates_ProvincesYesterday: function() {
      // This property constructs an array of the Top Ten States of confirmed cases from yesterday
      const provinces = this.propsCoronaVirusStatsYesterday[0].provinces;

      // First, let's sort entries in the array by confirmed cases
      provinces.sort(function(a, b) {
        return (a.confirmed - b.confirmed) * -1; // sort descending
      });

      // And return top ten entries from the array
      return provinces.slice(0, 10);
    },
    topTenConfirmedStates_ProvincesLastWeek: function() {
      let topTenConfirmedCasesLastWeek = [];
      const provinces = this.propsCoronaVirusStatsLastWeek[0].provinces;
      // Here we iterate thru the confirmed cases for yesterday and find the
      // matching element in propsCoronaVirusStatsLastWeek[0].provinces array

      this.topTenConfirmedStates_ProvincesYesterday.forEach(
        elementYesterday => {
          provinces.forEach(elementLastWeek => {
            // Check if yesterday's element is a match pair for last week's State Confirmed
            // cases and if so push onto our topTenConfirmedLastWeek array
            if (elementLastWeek.province == elementYesterday.province) {
              topTenConfirmedCasesLastWeek.push(elementLastWeek);
            }
          });
        }
      );
      return topTenConfirmedCasesLastWeek;
    }
  },
  mounted: function() {
    // The eventbus carries notification that Display
    // back to its parent component Headlines.vue
    EventBus.$on("display-graphs", data => {
      const { chartData, options } = constructChartDataForConfirmedCases(
        this.topTenConfirmedStates_ProvincesYesterday,
        this.topTenConfirmedStates_ProvincesLastWeek
      );

      this.renderChart(chartData, options);
    });
  },
  watch: {
    propsCoronaVirusStatsYesterday: function() {
      const { chartData, options } = constructChartDataForConfirmedCases(
        this.topTenConfirmedStates_ProvincesYesterday,
        this.topTenConfirmedStates_ProvincesLastWeek
      );

      this.renderChart(chartData, options);
    }
  }
};
</script>
