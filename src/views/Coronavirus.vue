<template>
  <div class="corona-virus">
    <h2>Query Database</h2>

    <label for="countries">
      Select A Country:
      <select class="select-css" v-model="selected" id="countries">
        <option value="USA" selected>United States</option>
        <option value="UK">United Kingdom</option>
        <option value="Canada">Canada</option>
        <option value="China">China</option>
        <option value="France">France</option>
        <option value="Germany">Germany</option>
        <option value="Greece">Greece</option>
        <option value="Hong-kong">Hong Kong</option>
        <option value="India">India</option>
        <option value="Italy">Italy</option>
        <option value="Japan">Japan</option>
        <option value="Mexico">Mexico</option>
        <option value="Russia">Russia</option>
        <option value="Spain">Spain</option>
        <option value="Sweden">Sweden</option>
      </select>
    </label>

    <button class="myButton" @click="retrieveDataCountryTotal">Get Case Summary</button>

    <div class="loading" v-show="loading">
      <i class="fa fa-spinner fa-spin" style="font-size:36px"></i>
    </div>
    <p v-if="networkTrouble">Sorry. Unable to retrieve data at this time.</p>
    <div
      v-if="Object.keys(coronaVirusFetchedData).length === 0"
      class="no-responses"
    >Sorry. No Results Available.</div>
    <display-query-results
      v-else-if="Object.keys(coronaVirusFetchedData).length > 0"
      v-show="dataRetrieved"
      :propsCoronaFetchedData="coronaVirusFetchedData"
    ></display-query-results>

    <h2
      @click="displayGraphs"
      v-show="dataRetrieved"
      class="display-graph"
      title="Click to Display Graph"
    >
      Display Graph
      <i class="fa fa-bar-chart" style="font-size:36px" aria-hidden="true"></i>

      <div v-show="showMessage">Sorry. Can't Draw Graph.</div>
      <div class="chart-container">
        <display-graph-totals
          v-if="coronaVirusFetchedData.length > 0"
          :propsCoronaVirusStatsTotal="coronaVirusFetchedData"
        ></display-graph-totals>
      </div>

      <div class="chart-container">
        <display-graph-confirmed
          v-if="coronaVirusStatsLastWeek.length > 0"
          :propsCoronaVirusStatsLastWeek="coronaVirusStatsLastWeek"
          :propsCoronaVirusStatsYesterday="coronaVirusFetchedData"
        ></display-graph-confirmed>
      </div>
    </h2>
  </div>
  <!-- ========== End .corona-virus ==================== -->
</template>

<script>
import DisplayQueryResults from "@/components/displayQueryResults.vue";
import DisplayGraphTotals from "@/components/displayGraphTotals.vue";
import DisplayGraphConfirmed from "@/components/displayGraphConfirmed.vue";
import createDates from "../modules/createDates.js";

// Import the EventBus.
import { EventBus } from "../main.js";

export default {
  name: "Coronavirus",
  components: {
    "display-query-results": DisplayQueryResults,
    "display-graph-totals": DisplayGraphTotals,
    "display-graph-confirmed": DisplayGraphConfirmed
  },
  data: function() {
    return {
      selected: { type: String, default: "" },
      coronaVirusFetchedData: { type: Object, default: null },
      coronaVirusStatsLastWeek: { type: Object, default: null },
      countryVirusStatsTotal: { type: Object, default: null },
      loading: false,
      dataRetrieved: false,
      networkTrouble: false,
      showMessage: false
    };
  },
  methods: {
    retrieveDataCountryTotal: function() {
      this.loading = true;
      if (this.dataRetrieved) this.dataRetrieved = false; // clear out previous results if there are any
      const { yesterday, lastWeek, today } = createDates();

      // Multiple fetches for stats yesterday and last week
      const rapid_api_key = process.env.VUE_APP_RAPID_API_KEY;

      Promise.all([
        fetch(
          `https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_iso_alpha_2.php?alpha2=${this.selected}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
              "x-rapidapi-key": rapid_api_key
            }
          }
        ).then(res => (res.ok && res.json()) || Promise.reject(res)),
        fetch(
          `https://coronavirus-monitor.p.rapidapi.com/coronavirus/history_by_particular_country_by_date.php?country=${this.selected}&date=${lastWeek}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
              "x-rapidapi-key": rapid_api_key
            }
          }
        ).then(res => (res.ok && res.json()) || Promise.reject(res))
      ])
        .then(data => {
          // handle data array here. First all data for yesterday put into FetchedData
          this.coronaVirusFetchedData = data[0].latest_stat_by_country[0];
          // Next, virus values for last week to be used to compare confirmed cases change from last week
          // to yesterday. This will be passed to display-graph-confirmed component as a prop.
          this.coronaVirusStatsLastWeek = data[1].stat_by_country[0];
          console.log(this.coronaVirusStatsLastWeek.total_deaths);
          // Need to sum up provinces.* values to get totals for USA
          /* this.countryVirusStatsTotal = this.calculateTotals(
            this.coronaVirusFetchedData
          ); */

          this.loading = false;
          this.dataRetrieved = true;
        })
        .catch(err => {
          console.error("There was problem retrieving data.", err);
          this.loading = false;
          this.networkTrouble = true;
        });
    },
    /* calculateTotals(apiDataArray) {
      const { provinces } = apiDataArray[0];

      // Initialize Object
      let cumulativeVirusStats = {
        active: 0,
        confirmed: 0,
        deaths: 0,
        recovered: 0
      };

      // Need to sum up all fields.
      provinces.forEach(element => {
        cumulativeVirusStats.active =
          cumulativeVirusStats.active + element.active;
        cumulativeVirusStats.confirmed =
          cumulativeVirusStats.confirmed + element.confirmed;
        cumulativeVirusStats.deaths =
          cumulativeVirusStats.deaths + element.deaths;
        cumulativeVirusStats.recovered =
          cumulativeVirusStats.recovered + element.recovered;
      });

      return cumulativeVirusStats;
    }, */
    displayGraphs: function() {
      EventBus.$emit("display-graphs", "clicked");
      if (this.coronaVirusFetchedData.length === 0) this.showMessage = true;
    }
  }
};
</script>

<style scoped>
.corona-virus {
  display: grid;
  justify-items: center;
}

h2 {
  margin: 10px auto;
  color: rgba(20, 1, 1, 0.788);
  font-size: 2rem;
  text-align: center;
}
h2.display-graph {
  cursor: pointer;
  width: 60vw;
  max-width: 1290px;
}
.no-responses {
  text-align: center;
  font-size: 1.4rem;
}
.chart-container {
  width: 1000px;
  height: 800px;
  margin-bottom: -30%;
}

label {
  color: #db090b;
  font-size: 1.4rem;
  font-weight: bold;
  margin: 20px auto;
  width: 60%;
}

.select-css {
  font-size: 16px;
  font-weight: 700;
  color: #444;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 40%;
  box-sizing: border-box;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
.select-css::-ms-expand {
  display: none;
}
.select-css:hover {
  border-color: #888;
}
.select-css:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}
.select-css option {
  font: 15px "Arial", monospace;
  font-weight: normal;
}

.myButton {
  box-shadow: 3px 4px 0px 0px #8a2a21;
  background: linear-gradient(to bottom, #b9090b 5%, #f24437 100%);
  background-color: #b9090b;
  border-radius: 18px;
  border: 1px solid #d02718;
  display: block;
  margin: 10px auto;
  cursor: pointer;
  color: #ffffff;
  font-size: 19px;
  padding: 10px 30px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #810e05;
}
.myButton:hover {
  background: linear-gradient(to bottom, #f24437 5%, #b9090b 100%);
  background-color: #f24437;
}
.myButton:active {
  position: relative;
  top: 1px;
}

.loading {
  width: 50px;
  margin: 0 auto;
}
</style>
