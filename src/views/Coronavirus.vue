<template>
  <div class="corona-virus">
    <h2>Query Database</h2>

    <label for="countries">
      Select A Country:
      <select class="select-css" v-model="selected" id="countries">
        <option value="united-states" selected>United States</option>
        <option value="united-kingdom">United Kingdom</option>
        <option value="canada">Canada</option>
        <option value="china">China</option>
        <option value="france">France</option>
        <option value="germany">Germany</option>
        <option value="greece">Greece</option>
        <option value="hong-kong">Hong Kong</option>
        <option value="india">India</option>
        <option value="italy">Italy</option>
        <option value="japan">Japan</option>
        <option value="mexico">Mexico</option>
        <option value="spain">Spain</option>
      </select>
    </label>

    <button class="myButton" @click="retrieveDataCountryTotal">Get Case Summary</button>

    <div class="loading" v-show="loading">
      <i class="fa fa-spinner fa-spin" style="font-size:36px"></i>
    </div>
    <display-query-results
      v-if="coronaVirusStatsTotal.length > 0"
      v-show="dataRetrieved"
      :propsCumulativeCoronaVirusStatsTotal="cumulativeVirusStatsTotal"
      :propsCoronaVirusStatsTotal="coronaVirusStatsTotal"
    ></display-query-results>

    <h2 @click="displayGraph" class="display-graph" title="Click to Display Graph">
      Display Graph
      <i class="fa fa-bar-chart" style="font-size:36px" aria-hidden="true"></i>
      <div class="chart-container">
        <display-graph
          v-if="coronaVirusStatsTotal.length > 0"
          :propsCoronaVirusStats="coronaVirusStatsTotal"
        ></display-graph>
      </div>

      <div class="chart-container">
        <display-graph
          v-if="coronaVirusStatsLastWeek.length > 0"
          :propsCoronaVirusStats="coronaVirusStatsLastWeek"
        ></display-graph>
      </div>
    </h2>
  </div>
  <!-- ========== End .corona-virus ==================== -->
</template>

<script>
import DisplayQueryResults from "@/components/displayQueryResults.vue";
import DisplayGraph from "@/components/displayGraph.vue";
import createDates from "../modules/createDates.js";

// Import the EventBus.
import { EventBus } from "../main.js";

export default {
  name: "Coronavirus",
  components: {
    "display-query-results": DisplayQueryResults,
    "display-graph": DisplayGraph
  },
  data: function() {
    return {
      selected: "",
      coronaVirusStatsTotal: { type: Object, default: null },
      coronaVirusStatsLastWeek: { type: Object, default: null },
      cumulativeVirusStatsTotal: { type: Object, default: null },
      loading: false,
      dataRetrieved: false
    };
  },
  methods: {
    retrieveDataCountryTotal: function() {
      this.loading = true;
      if (this.dataRetrieved) this.dataRetrieved = false; // clear out previous results if there
      const { yesterday, lastWeek } = createDates();

      // Multiple fetches
      Promise.all([
        fetch(
          `https://api.covid19api.com/live/country/${this.selected}/status/confirmed/date/${yesterday}`
        ).then(res => (res.ok && res.json()) || Promise.reject(res)),
        fetch(
          `https://api.covid19api.com/live/country/${this.selected}/status/confirmed/date/${lastWeek}`
        ).then(res => (res.ok && res.json()) || Promise.reject(res))
      ]).then(data => {
        // handle data array here
        this.coronaVirusStatsTotal = data[0];
        this.coronaVirusStatsLastWeek = data[1];

        this.cumulativeVirusStatsTotal = this.calculateTotals(
          this.coronaVirusStatsTotal
        );
        console.log(this.coronaVirusStatsLastWeek);
        this.loading = false;
        this.dataRetrieved = true;
      });
    },
    calculateTotals(apiDataArray) {
      // Initialize Object
      let cumulativeVirusStats = {
        Active: 0,
        Confirmed: 0,
        Date: "",
        Deaths: 0,
        Province: "",
        Recovered: 0
      };

      // Need to sum up all fields.
      apiDataArray.forEach(element => {
        cumulativeVirusStats.Active =
          cumulativeVirusStats.Active + element.Active;
        cumulativeVirusStats.Confirmed =
          cumulativeVirusStats.Confirmed + element.Confirmed;
        cumulativeVirusStats.Deaths =
          cumulativeVirusStats.Deaths + element.Deaths;
        cumulativeVirusStats.Recovered =
          cumulativeVirusStats.Recovered + element.Recovered;
      });

      return cumulativeVirusStats;
    },
    displayGraph: function() {
      EventBus.$emit("display-graph", "clicked");
    }
  }
};
</script>

<style scoped>
div.corona-virus {
  display: grid;
}

h2 {
  margin: 10px auto;
  color: rgba(20, 1, 1, 0.788);
  font-size: 2rem;
  text-align: center;
}
h2.display-graph {
  cursor: pointer;
  max-width: 60%;
}
.chart-container {
  width: 1000px;
  height: 800px;
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
