<script>
import { Bar } from "vue-chartjs";
import createDates from "@/modules/createDates.js";
const { yesterday, lastWeek } = createDates();
export default {
  name: "displayGraphConfirmed",
  extends: Bar,
  props: ["propscoronaVirusStatsLastWeek"],
  data: function() {
    return {
      topTenConfirmedCasesToday: []
    };
  },
  computed: {
    topTenConfirmedStates_ProvincesLastWeek: function() {
      // This property constructs an array of the Top Ten States of confirmed cases from yesterday
      const provinces = this.propscoronaVirusStatsLastWeek[0].provinces;

      // First, let's sort top ten entires in the array
      provinces.sort(function(a, b) {
        return (a.confirmed - b.confirmed) * -1; // sort descending
      });

      // And return top ten entries from the array
      return provinces.slice(0, 10);
    }
  },
  mounted: function topTenConfirmedYesterday() {
    // let lastWeekCopy = lastWeek.slice(0, 10);
    // lastWeekSliced needs one day added to it because of
    // pecularity in Covid API. When you ask for a from specific
    // date the API returns one less day. i.e. a from date of 4-22 will return
    // dates starting at 4-23. Crazy right!
    lastWeekCopy = Date.parse(lastWeekCopy);
    let lastWeekSliced = new Date(lastWeekCopy);
    lastWeekSliced.setDate(lastWeekSliced.getDate() + 1);
    lastWeekSliced = lastWeekSliced.toISOString().slice(0, 10);

    // Here we iterate thru the confirmed cases for today and find the
    // matching element in propscoronaVirusStatsLastWeek
    this.topConfirmedStates_Provinces.forEach(elementToday => {
      this.propscoronaVirusStatsLastWeek.forEach(elementInPropsConfirmed => {
        // Check if today's element is a match pair for last week's State Confirmed
        // cases and if so push onto our topTenConfirmedLastWeek array

        if (
          elementInPropsConfirmed.Province == elementToday.Province &&
          elementInPropsConfirmed.Date.slice(0, 10) == lastWeekSliced
        ) {
          // this.topConfirmedCasesLastWeek.push(elementInPropsConfirmed);
        }
      });
    });
  }
};
</script>