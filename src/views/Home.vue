// ========== /src/Home.vue ================== //
<template>
  <div class="home">
    <ul>
      Global:
      <li>Total {{ totalWorldWideVirusStats.TotalConfirmed }}</li>
      <li>Deaths {{ totalWorldWideVirusStats.TotalDeaths }}</li>
    </ul>
    <slideShow></slideShow>
  </div>
</template>

<script>
import slideShow from "../components/SlideShow.vue";

export default {
  name: "Home",
  components: {
    slideShow,
  },
  data: function() {
    return {
      totalWorldWideVirusStats: {},
    };
  },
  created: function retrieveWorldWideTotals() {
    fetch(`https://api.covid19api.com/world/total`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.totalWorldWideVirusStats = data;
      });
  },
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

ul,
li {
  font-family: Cambria, Cochin, Georgia;
  font-size: 1.6rem;
  color: #a90302;
}

ul {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  max-width: 40%;
  margin: 5px 25px;
  list-style-type: none;
  background-color: rgba(248, 240, 240, 0.698);
}

li {
  margin: 0 10px;
}
</style>
