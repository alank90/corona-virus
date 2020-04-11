<template>
  <div class="display-results">
    <div v-if="Object.keys(propsCumulativeCoronaVirusStats).length !== 0">
      <h2>
        {{ propsCoronaVirusStats[0].Country }} Corona Virus Stats as of
        {{ today }}
      </h2>
      <table id="corona-virus-table">
        <thead>
          <tr>
            <th>Active Cases</th>
            <th>Confirmed</th>
            <th>Deaths</th>
            <th>Recovered</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ propsCumulativeCoronaVirusStats.Active }}</td>
            <td>{{ propsCumulativeCoronaVirusStats.Confirmed }}</td>
            <td>{{ propsCumulativeCoronaVirusStats.Deaths }}</td>
            <td>{{ propsCumulativeCoronaVirusStats.Recovered }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="propsCumulativeCoronaVirusStats.Active === 0">
      No Active Cases
    </div>

    <!-- =========== Markup for the States Table ================ -->
    <div
      v-if="
        Object.keys(propsCumulativeCoronaVirusStats).length !== 0 &&
          propsCoronaVirusStats[0].CountryCode === 'US'
      "
    >
      <div
        @click="showStates"
        class="arrow"
        title="Click to See Breakdown by State"
      >
        &#187;
      </div>

      <div v-if="visibility">
        <table id="corona-virus-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Active Cases</th>
              <th>Confirmed</th>
              <th>Deaths</th>
              <th>Recovered</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="state in propsCoronaVirusStats" :key="state.Province">
              <td>{{ state.Province }}</td>
              <td>{{ state.Active }}</td>
              <td>{{ state.Confirmed }}</td>
              <td>{{ state.Deaths }}</td>
              <td>{{ state.Recovered }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- =========== End of Markup for the States Table =========== -->
  </div>
  <!-- ======= End .display-results ======== -->
</template>

<script>
export default {
  name: "DisplayQueryResults",
  props: ["propsCoronaVirusStats", "propsCumulativeCoronaVirusStats"],
  data: function() {
    return {
      visibility: false,
      degrees: 90
    };
  },
  computed: {
    today: function() {
      // create a date object using Date constructor
      let dateObj = new Date();
      dateObj = dateObj.toISOString().substring(0, 10);
      return dateObj;
    }
  },
  methods: {
    showStates: function() {
      this.visibility = !this.visibility;
      const el = document.querySelector(".arrow");
      if (this.visibility) {
        // Arrow needs to shift up
        el.style.transform = `rotate(${this.degrees}deg)`;
        el.style.paddingBottom = "20px";
        this.degrees -= 90;
      } else {
        // Shift arrow down and show table
        el.style.transform = `rotate(${this.degrees}deg)`;
        el.style.paddingBottom = "0";
        this.degrees += 90;
      }

      //this.degrees += 180; // need to add 180 degees
    }
  }
};
</script>

<style scoped>
h2 {
  color: rgba(49, 2, 2, 0.966);
  text-align: center;
  font-family: fantasy;
  font-size: 1.6rem;
  margin: 25px 5px 25px 5px;
}

table {
  font-family: "Open Sans", sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px auto;
}

table th {
  font-size: 1.3rem;
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  padding: 8px;
  min-width: 30px;
}

table th:not(:last-child) {
  border-right: solid 3px rgba(14, 0, 0, 0.459);
}

table td {
  text-align: left;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: rgba(241, 22, 22, 0.24);
}

p {
  font-size: 1.2rem;
  color: #005;
}

.arrow {
  width: 75px;
  color: #b9090b;
  margin: 10px auto;
  font-size: 4rem;
  font-weight: 700;
  text-shadow: 3px 3px 0px #810e05;
  cursor: pointer;
  transform-origin: center left;
  transition: all 0.5s;
}
.arrow:hover {
  color: #f24437;
}
</style>
