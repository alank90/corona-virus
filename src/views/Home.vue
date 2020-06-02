// ========== /src/Home.vue ================== //
<template>
  <div class="home">
    <ul>
      <li class="title">Global:</li>
      <li>Total {{ totalWorldWideVirusStats.total_cases }}</li>
      <li>Deaths {{ totalWorldWideVirusStats.total_deaths }}</li>
      <li class="title">United States:</li>
      <li>Total: {{ totalUSAVirusStats.total_cases }}</li>
      <li>Deaths: {{ totalUSAVirusStats.total_deaths }}</li>
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
      totalWorldWideVirusStats: {},
      totalUSAVirusStats: {}
    };
  },
  created: function retrieveWorldWideTotals() {
    // Multiple fetches for stats for World & USA
    const rapid_api_key = process.env.VUE_APP_RAPID_API_KEY;
    
    Promise.all([
      fetch(
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": rapid_api_key
          }
        }
      ).then(res => (res.ok && res.json()) || Promise.reject(res)),
      fetch(
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_iso_alpha_2.php?alpha2=usa",
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
        // handle data array here from multiple fetches here.
        this.totalWorldWideVirusStats = data[0];
        this.totalUSAVirusStats = data[1].latest_stat_by_country[0];
      })
      .catch(err => {
        console.error("There was problem retrieving data.", err);
        this.loading = false;
        this.networkTrouble = true;
      });
  }
};
</script>

<style scoped>
ul {
  display: flex;
  font-size: 1.8rem;
  flex-wrap: nowrap;
  justify-content: space-around;
  margin: 5px 25px;
  padding: 5px 15px;
  list-style-type: none;
  background-color: rgba(255, 255, 255, 1);
}
.title {
  color: #000;
  font-size: 1.2rem;
  font-weight: 600;
}

li {
  font-size: 1.4rem;
  color: #a90302;
  margin: 0 10px;
}

@media screen and (max-width: 768px) {
  .title {
    font-size: 0.6rem;
  }

  li {
    font-size: 0.8rem;
  }
}
</style>
