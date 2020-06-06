<template>
  <div class="resources-view">
    <h1>List of Coronavirus Resources</h1>
    <ul>
      <li>
        <a href="https://coronavirus.jhu.edu/map.html" target="_blank">John Hopkins Resource Center</a>
      </li>
      <li>
        <a
          href="https://www.nytimes.com/news-event/coronavirus"
          target="_blank"
        >NY Times Coronavirus Coverage</a>
      </li>
      <li>
        <a
          href="https://www.washingtonpost.com/coronavirus/"
          target="_blank"
        >Washington Post Coronavirus Coverage</a>
      </li>
      <li>
        <a
          href="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
          target="_blank"
        >CDC Covid-19 Home</a>
      </li>
      <li>
        <a
          href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/events-as-they-happen"
          target="_blank"
        >WHO Covid-19 Updates</a>
      </li>
      <li>
        <a href="https://coronavirus.health.ny.gov/home" target="_blank">NYS Corona Virus Update</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  color: #34495e;
  margin: 10px 0 10px;
}

ul {
  display: flex; /* establish flex container */
  flex-direction: column; /* make main axis vertical */
  align-items: center;
  margin: 5px auto;
  max-width: 800px;
}

li {
  line-height: 1.3;
  color: #6e5670;
  margin: 5px;
  list-style-type: symbols(U+2219);
}

li a {
  font-size: 1.6rem;
  color: #010413d0;
  line-height: 1.58;
  word-wrap: break-word;
}
li a:hover {
  text-decoration: underline 2.5px;
}
</style>