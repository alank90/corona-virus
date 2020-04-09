<template>
  <div class="display-results">
    <div v-if="Object.keys(propsCumulativeCoronaVirusStats).length !== 0">
      <h2>
        {{propsCoronaVirusStats[0].Country}} Corona Virus Stats
        as of {{today}}
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
            <td>{{propsCumulativeCoronaVirusStats.Active}}</td>
            <td>{{propsCumulativeCoronaVirusStats.Confirmed}}</td>
            <td>{{propsCumulativeCoronaVirusStats.Deaths}}</td>
            <td>{{propsCumulativeCoronaVirusStats.Recovered}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="propsCumulativeCoronaVirusStats.Active === 0">No Active Cases</div>

    <div v-if="propsCoronaVirusStats[0].CountryCode === 'US'">
      <button class="button">Click to Query States</button>
    </div>
  </div>
  <!-- ======= End .display-results ======== -->
</template>


<script>
export default {
  name: "DisplayQueryResults",
  props: ["propsCoronaVirusStats", "propsCumulativeCoronaVirusStats"],
  computed: {
    today: function() {
      // create a date object using Date constructor
      let dateObj = new Date();
      dateObj = dateObj.toISOString().substring(0, 10);
      return dateObj;
    }
  }
};
</script>

<style scoped>
h2 {
  color: #fff;
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

.button {
  box-shadow: 3px 4px 0px 0px #8a2a21;
  background: linear-gradient(to bottom, #b9090b 5%, #f24437 100%);
  background-color: #b9090b;
  border-radius: 18px;
  border: 1px solid #d02718;
  display: block;
  margin: 10px auto;
  cursor: pointer;
  color: #ffffff;
  font-family: Trebuchet MS;
  font-size: 15px;
  padding: 10px 30px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #810e05;
}
.button:hover {
  background: linear-gradient(to bottom, #f24437 5%, #b9090b 100%);
  background-color: #f24437;
}
.button:active {
  position: relative;
  top: 1px;
}
</style>