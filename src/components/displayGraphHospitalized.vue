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
    topTenHospitalizedStatesLastWeek: function() {
      // This function constructs an array of topTenHospitalized last week from the
      // topTenHospitalizedToday computed property
      let topTenHospitalizedLastWeek = [];
      //const states = this.propsCoronaVirusFetchedUSALastWeekByState;

      this.topTenHospitalizedToday.forEach(item => {
        topTenHospitalizedLastWeek.push(item.state);
      });
      // Here we iterate thru the hospialized for today and find the
      // matching element in propsCoronaVirusStatsLastWeek array
      /* this.topTenHospitalizedToday.forEach(elementYesterday => {
        states.forEach(elementLastWeek => {
          // Check if yesterday's element is a match pair for last week's State Confirmed
          // cases and if so push onto our topTenHospitalizedLastWeek array
          if (elementLastWeek.state == elementYesterday.state) {
            topTenHospitalizedLastWeek.push(elementLastWeek);
          }
        });
      }); */
      return topTenHospitalizedLastWeek;
    }
  },
  created() {
    // Need a promise.all to fetch the top ten hospitalized states from a week ago 
    // from endpoint covidtracking.com/api/v1/states/{state}/{date}.json
    console.log('propertyComputed will update, as this.property is now reactive.')
  }
};


/* ,
  mounted: function() {
    // The eventbus carries notification to render chart
    // from its parent component Coronavirus.vue
    EventBus.$on("display-graphs", data => {
      const { chartData, options } = constructChartDataForHospitalizedCases(
        this.topTenHospitalizedToday,
        this.topTenHospitalizedStatesLastWeek
      );

      this.renderChart(chartData, options); 
    });
  },
  watch: {
    propsCoronaVirusFetchedUSATodayByState: function() {
      const { chartData, options } = constructChartDataForHospitalizedCases(
        this.topTenHospitalizedToday,
        this.topTenHospitalizedStatesLastWeek
      );

      this.renderChart(chartData, options);
    }
  } */
</script>
   

