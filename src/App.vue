<template>
  <div class="app">
    <header class="header">
      <h1 class="logo">
        <a href="#">Home for Corona Virus Information</a>
      </h1>

      <router-link class="router-link" to="/">Home</router-link>
      <router-link class="router-link" to="/coronavirus">Stats by Country</router-link>
      <router-link class="router-link" to="/headlines">Latest Headlines</router-link>
      <router-link class="router-link" to="/johnhopkins">John Hopkins</router-link>
    </header>

    <!-- ========== Views for App will be rendered here ========== -->
    <router-view />
  </div>
</template>

<style>
@import url('/src/assets/css/reset.css');
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
h1, h2, h3 {
  font-family: 'Libre Baskerville', serif;
}

p, li, a, ul, button, caption, input, label {
  font-family: 'Amiri', serif;
}

h1 {
  margin: 0 10px;
}
  h1 a {
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
  flex-basis: 60%;
  font-size: 1.45em;
}

.logo a {
  color: #a90302;
  padding: 10px 15px;
  text-transform: uppercase;
  font-weight: 700;
  cursor: none;
}

.header {
  display: flex;
  flex-direction: row;
  margin: 0 -10px;
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
  font-size: 1.3rem;
  font-weight: 600;
  color: #a90302;
  padding: 10px 15px;
  text-transform: uppercase;
  margin-top: 5px;
  transition: 0.8s;
}
.router-link:hover {
  -webkit-transform: rotateX(360deg);
  transform: rotateX(360deg);
  color: #ca0e0e5e;
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
