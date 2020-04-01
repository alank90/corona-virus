// ========== /src/App.vue ================== //
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span>&#124;</span>
      <router-link to="/covid19">Covid-19</router-link>
      <span>&#124;</span>
      <router-link to="/johnhopkins">John Hopkins</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld
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
  background: url("./assets/img/covid-7-lg.jpg") no-repeat fixed center
    center/cover;
}
</style>
