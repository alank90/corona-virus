<template>
  <div class="search">
    <form action>
      <input
        required
        @keypress.enter="submitSearch"
        type="search"
        class="search-input-box"
        id="search-input"
        name="q"
        placeholder="Search..."
        size="30"
        aria-label="Search through site content"
      />
      <span class="arrow">
        <input @click="submitSearch" type="button" class="button" value="Search" required />
      </span>
    </form>
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
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { articles, totalResults } = data;
          // Send the event on a channel (searchResults) with a payload (article object)
          let results = {};
          results.articles = articles;
          results.totalResults = totalResults;
          EventBus.$emit("searchResults", results);
        });
    }
  }
};
</script>

<style scoped>
.search {
  flex-basis: 25%;
  min-width: 200px;
}

form {
  width: 500px;
  margin: 50px auto;
}

.search-input-box {
  font-weight: 700;
  padding: 8px 15px;
  color: rgba(243, 226, 226, 0.527);
  width: 45%;
  box-sizing: border-box;
  border: 2px solid #aaa;
}

.search-input-box:hover {
  border: 2px solid rgba(161, 45, 45, 0.849);
}
.search-input-box:focus {
  border: 0px;
  box-shadow: 0 0 1px 3px rgba(143, 7, 7, 0.788);
  color: #222;
  background-color: rgba(248, 229, 223, 0.815);
  outline: none;
}

.button {
  position: relative;
  padding: 6px 15px;
  left: -8px;
  background-color: #ca3420;
  color: #fafafa;
}
.button:hover {
  background-color: #fafafa;
  color: #207cca;
}

.arrow {
  position: relative;
  left: -8px;
  background-color: #ca3420;
  padding: 7px 15px;
}
.arrow::after {
  right: 100%;
  top: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  border-color: rgba(32, 124, 202, 0);
  border-right-color: #ca3420;
  border-width: 10px;
  margin-top: -10px;
}

::-webkit-input-placeholder {
  /* For WebKit browsers */
  color: #dd3333;
  font-family: Helvetica Neue;
  font-weight: bold;
}
::-moz-placeholder {
  /* For Mozilla Firefox 19+ */
  color: #dd3333;
  font-family: Helvetica Neue;
  font-weight: bold;
}

:-ms-input-placeholder {
  /* For Internet Explorer 10+ */
  color: #dd3333;
  font-family: Helvetica Neue;
  font-weight: bold;
}
</style>
