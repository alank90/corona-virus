<template>
  <div class="search">
    <label for="search-input" id="search">
      Search:
      <input
        @keypress.enter.prevent="submitSearch"
        type="search"
        class="input-css"
        id="search-input"
        name="q"
        placeholder="Search Corona Virus..."
        size="30"
        aria-label="Search through site content"
      />
    </label>
  </div>
</template>

<script>
// Import the EventBus.
import { EventBus } from "../main.js";

export default {
  name: "search",
  methods: {
    submitSearch: function() {
      const el = document.getElementById("search-input");
      const queryString = el.value;

      const domains =
        "nytimes.com,washingtonpost.com,cnn.com,cdc.gov,who.int,coronavirus.jhu.edu,vox.com";
      const excludeDomains = "foxnews.com,fox.com";

      const url = `http://newsapi.org/v2/everything?q=${queryString}&pageSize=${this.pageSize}&domains=${domains}&excludeDomains=${excludeDomains}&language=en&sortBy=publishedAt&apiKey=b7fb08c9f94f4898ae24c81664e9ae7c`;
      // Just a little  different way of implementing fetch()
      const req = new Request(url);
      fetch(req)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { articles, totalResults } = data;
          // Send the event on a channel (searchResults) with a payload (article object)
          let results = {};
          results.articles = articles;
          results.totalResults = totalResults;
          EventBus.$emit("searchResults", results);
        });
    },
  },
};
</script>

<style scoped>
.search {
  flex-basis: 25%;
  min-width: 200px;
}

label {
  color: #444;
  font-weight: 600;
  text-shadow: 4px 4px 3px rgba(255, 14, 40, 1);
  font-size: 1.4rem;
  font-weight: bold;
}

.input-css {
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.1;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 45%;
  max-height: 30px;
  box-sizing: border-box;
  border: 2px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: #fff;
}

.input-css:hover {
  border: 2px solid rgba(161, 45, 45, 0.849);
}
.input-css:focus {
  border: 0px;
  box-shadow: 0 0 1px 3px rgba(143, 7, 7, 0.788);
  color: #222;
  outline: none;
}
</style>
