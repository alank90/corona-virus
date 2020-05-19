<template>
  <div class="app">
    <header class="header">
      <h1 class="logo">The Coronavirus Pandemic Source</h1>
      <nav id="hamnav">
        <!-- [The Hamburger] -->
        <label for="hamburger">&#9776;</label>
        <input type="checkbox" id="hamburger" />
        <div id="hamitems">
          <router-link class="router-link" to="/">Home</router-link>
          <router-link class="router-link" to="/coronavirus">Stats by Country</router-link>
          <router-link class="router-link" to="/headlines">Latest Headlines</router-link>
          <router-link class="router-link" to="/resources">Resources</router-link>
        </div>
      </nav>
    </header>

    <!-- ========== Views for App will be rendered here ========== -->
    <router-view />
  </div>
</template>

<script>
import "@/assets/css/styles.css";
import "@/assets/css/ham-menu.css";
export default {};
</script>

<style>
body {
  background: url("assets/img/covid-7-lg.jpg") no-repeat fixed center
    center/cover;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* ========== Global Stylings ======= */
h1,
h2,
h3 {
  font-family: "Libre Baskerville", serif;
}

p,
li,
a,
ul,
button,
caption,
input,
label {
  font-family: "Amiri", serif;
}

h1 {
  margin: 0 10px;
  font-size: 1.6rem;
}

/* Navbar Stylings */
h2,
h3,
a {
  color: #34495e;
}

a {
  text-decoration: none;
}

.logo {
  flex-basis: 75%;
  font-size: 2.1rem;
  font-weight: 550;
  margin: 20px 0 0 35px;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  max-width: 100vw;
  margin: 0;
  justify-content: space-around;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: rgba(202, 202, 202, 0.6);
  -webkit-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.router-link {
  position: relative;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  color: #a90302;
  padding: 10px 15px;
  text-transform: uppercase;
  margin-top: 5px;
}
.router-link:hover {
  color: #ca0e0e5e;
}

.router-link:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 10px;
  left: 0;
  background-color: #000;
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out 0s;
}

.router-link:hover:before {
  visibility: visible;
  transform: scaleX(1);
}

@media (max-width: 769px) {
  .header,
  .main-nav {
    display: flex;
  }
  .header {
    flex-direction: column;
    align-items: center;
  }
}
</style>
