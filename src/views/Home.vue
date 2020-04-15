// ========== /src/Home.vue ================== //
<template>
  <div class="home">
    <ul @click="retrieveWorldWideTotals()">
      World Totals:
      <li>{{ totalWorldWideVirusStats.TotalConfirmed }}</li>
      <li>{{ totalWorldWideVirusStats.TotalDeaths }}</li>
      <li>{{ totalWorldWideVirusStats.TotalRecovered }}</li>
    </ul>
    <slideShow></slideShow>
  </div>
</template>

<script>
import slideShow from "../components/SlideShow.vue";

export default {
  name: "Home",
  components: {
    slideShow
  },
  data: function() {
    return {
      totalWorldWideVirusStats: {}
    };
  },
  methods: {
    retrieveWorldWideTotals: function() {
      fetch(`https://api.covid19api.com/world/total`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          this.totalWorldWideVirusStats = data;
        });
    }
  }
};
</script>

<style>
body {
  background: url("../assets/img/covid-7-lg.jpg") no-repeat fixed center
    center/cover;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
