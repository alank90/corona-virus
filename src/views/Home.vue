// ========== /src/Home.vue ================== //
<template>
  <div class="home">
    <slideShow></slideShow>
  </div>
</template>

<script>
import slideShow from "../components/SlideShow.vue";

export default {
  name: "App",
  components: {
    slideShow
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
