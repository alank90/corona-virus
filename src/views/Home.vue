// ========== /src/Home.vue ================== //
<template>
  <div class="home">
    <ul>
      <li class="title">Global:</li>
      <li>Total {{ totalWorldWideVirusStats.confirmed }}</li>
      <li>Deaths {{ totalWorldWideVirusStats.deaths }}</li>
      <li class="title">United States:</li>
      <li>Total: {{ totalUSAVirusStats.confirmed }}</li>
      <li>Deaths: {{ totalUSAVirusStats.deaths }}</li>
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
    Promise.all([
      fetch("https://covid-19-data.p.rapidapi.com/totals?format=json", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "x-rapidapi-key": "9dec5a52c8msh3cacbb8feb21b54p18cf22jsn6f95168693d6"
        }
      }).then(res => (res.ok && res.json()) || Promise.reject(res)),
      fetch(
        "https://covid-19-data.p.rapidapi.com/country?format=json&name=usa",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "x-rapidapi-key":
              "9dec5a52c8msh3cacbb8feb21b54p18cf22jsn6f95168693d6"
          }
        }
      ).then(res => (res.ok && res.json()) || Promise.reject(res))
    ])
      .then(data => {
        // handle data array here from multiple fetches here.
        this.totalWorldWideVirusStats = data[0][0];
        this.totalUSAVirusStats = data[1][0];

        if (typeof Intl === "undefined" || !Intl.NumberFormat) {
          console.log("This browser doesn't support Intl.NumberFormat");
        } else {
          const nf = Intl.NumberFormat();
          this.totalWorldWideVirusStats.confirmed = nf.format(
            this.totalWorldWideVirusStats.confirmed
          );
          this.totalWorldWideVirusStats.deaths = nf.format(
            this.totalWorldWideVirusStats.deaths
          );

          this.totalUSAVirusStats.confirmed = nf.format(
            this.totalUSAVirusStats.confirmed
          );
          this.totalUSAVirusStats.deaths = nf.format(
            this.totalUSAVirusStats.deaths
          );
        }
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
