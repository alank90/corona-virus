<template>
  <div class="container">
    <header class="header">
      <h1 class="logo">
        <a href="#">Corona Virus Updates</a>
      </h1>

      <router-link class="router-link" to="/">Home</router-link>
      <router-link class="router-link" to="/covid19">Covid-19</router-link>
      <router-link class="router-link" to="/johnhopkins">John Hopkins</router-link>
    </header>

    <!-- ========== Views for App will be rendered here ========== -->
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
  padding: 10px 15px;
  text-transform: uppercase;
  font-weight: 700;
}

.header {
  display: flex;
  flex-direction: row;
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
  color: #34495e;
  padding: 10px 15px;
  text-transform: uppercase;
  margin-top: 5px;
}
.router-link:hover {
  color: #03111ffd;
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
