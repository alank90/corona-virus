// ========== /src/Home.vue ================== //
<template>
  <div class="home">
    <h1>Home View</h1>
    <carousel></carousel>
  </div>
</template>

<script>
import carousel from "../components/Carousel.vue";

export default {
  name: "App",
  components: {
   carousel
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background: url("../assets/img/covid-7-lg.jpg") no-repeat fixed center
    center/cover;
}
</style>
