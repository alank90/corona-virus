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
    return {
      topHospitalizedStates: [],
      topTenHospitalizedLastWeek: { type: Object, default: null }
    };
  },
  computed: {
    topTenHospitalizedToday: function() {
      // This property constructs an array of objects of the Top Ten States by people hospitalized today
      const states = this.propsCoronaVirusFetchedUSATodayByState;

      // First, let's sort entries in the array by Hospitalized current cases
      states.sort(function(a, b) {
        return (a.hospitalizedCurrently - b.hospitalizedCurrently) * -1; // sort descending
      });

      // And return top ten entries from the array
      return states.slice(0, 10);
    }
  },
  created() {
    // Need a promise.all to fetch the top ten hospitalized states from a week ago.
    // This is based on the states in the array topTenHospitalizedToday object.
    // We grab the data from endpoint covidtracking.com/api/v1/states/{state}/{date}.json

    let { lastWeek } = createDates();
    lastWeek = lastWeek.replace(/-/g, ""); // remove hyphens in date for endpoint
    let requests = [];

    // Create an array of the top ten state abbreviations
    this.topTenHospitalizedToday.forEach(item => {
      this.topHospitalizedStates.push(item.state);
    });

    // Create an array of fetch() commands for the Promise.all statement
    this.topHospitalizedStates.forEach(state => {
      state = state.toLowerCase();
      requests.push(
        fetch(
          `https://covidtracking.com/api/v1/states/${state}/${lastWeek}.json`
        )
      );
    });

    // Send the array requests[] off to covidtracking.com via Promise.all
    // to get data from last week
    Promise.all(requests)
      // map array of responses into an array of response.json() to read their content
      .then(responses => Promise.all(responses.map(r => r.json())))
      // all JSON answers are parsed: data is the array of fetched responses
      .then(data => {
        // store data in vue property
        this.topTenHospitalizedLastWeek = data;
      })
      .catch(err => {
        console.error("There was problem retrieving data.", err);
      });
  },
  mounted() {
    // The "display-graphs" event alerts this component to run the
    // the constructChartDataForGraphTotals method to render the chart
    EventBus.$on("display-graphs", data => {
      const { chartData, options } = constructChartDataForHospitalizedCases(
        this.topTenHospitalizedToday,
        this.topTenHospitalizedLastWeek
      );

      this.renderChart(chartData, options);
    });
  }
};
</script>
