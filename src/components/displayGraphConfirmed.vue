<script>
import { Bar } from "vue-chartjs";
import createDates from "@/modules/createDates.js";
// Import the EventBus.
import { EventBus } from "../main.js";
import constructChartDataForConfirmedCases from "../modules/constructChartDataForConfirmedCases.js";

export default {
  name: "displayGraphConfirmed",
  extends: Bar,
  props: [
    "propsCoronaVirusFetchedUSALastWeekByState",
    "propsCoronaVirusFetchedUSATodayByState"
  ],
  data: function() {
    return {};
  },
  computed: {
    topTenHospitalizedToday: function() {
      // This property constructs an array of the Top Ten States by people hospitalized today
      const states = this.propsCoronaVirusFetchedUSATodayByState;

      // First, let's sort entries in the array by Hospitalized currently cases
      states.sort(function(a, b) {
        return (a.hospitalizedCurrently - b.hospitalizedCurrently) * -1; // sort descending
      });

      // And return top ten entries from the array
      return states.slice(0, 10);
    },
    topTenHospitalizedStatesLastWeek: function() {
      let topTenHospitalizedLastWeek = [];
      const states = this.propsCoronaVirusFetchedUSALastWeekByState;
      // Here we iterate thru the hospialized for today and find the
      // matching element in propsCoronaVirusStatsLastWeek array

      this.topTenHospitalizedToday.forEach(elementYesterday => {
        states.forEach(elementLastWeek => {
          // Check if yesterday's element is a match pair for last week's State Confirmed
          // cases and if so push onto our topTenHospitalizedLastWeek array
          if (elementLastWeek.state == elementYesterday.state) {
            topTenHospitalizedLastWeek.push(elementLastWeek);
          }
        });
      });
      return topTenHospitalizedStatesLastWeek;
    }
  },
  mounted: function() {
    // The eventbus carries notification to render chart
    // from its parent component Coronavirus.vue
    EventBus.$on("display-graphs", data => {
      const { chartData, options } = constructChartDataForConfirmedCases(
        this.topTenHospitalizedToday,
        this.topTenHospitalizedStatesLastWeek
      );

      this.renderChart(chartData, options);
    });
  },
  watch: {
    propsCoronaVirusFetchedUSATodayByState: function() {
      const { chartData, options } = constructChartDataForConfirmedCases(
        this.topTenHospitalizedToday,
        this.topTenHospitalizedStatesLastWeek
      );

      this.renderChart(chartData, options);
    }
  }
};
</script>
