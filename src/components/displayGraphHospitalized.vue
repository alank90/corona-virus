<script>
import { Bar } from "vue-chartjs";
import createDates from "@/modules/createDates.js";
// Import the EventBus.
import { EventBus } from "../main.js";
import constructChartDataForHospitalizedCases from "../modules/constructChartDataForHospitalizedCases.js";

export default {
  name: "displayGraphHospitalized",
  extends: Bar,
  props: ["propsCoronaVirusFetchedUSATodayByState"],
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
  },
};
</script>
