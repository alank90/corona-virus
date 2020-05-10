<template>
  <div class="headlines">
    <h1>
      <span class="headlines">Latest News Headlines</span>
      <search></search>
    </h1>

    <ul>
      <li v-for="article in articles" :key="article.url">
        <span class="source">{{ article.source.name }}</span>
        {{ article.title }}
        <img :src="article.urlToImage" alt="Article Photo" />
        <a :href="article.url" target="_blank">{{ article.url }}</a>
      </li>
    </ul>

    <!-- ======= Pagination Markup ===== -->
    <div class="pagination">
      <div
        class="number"
        v-for="i in num_pages()"
        v-bind:class="[i == currentPage ? 'active' : '']"
        @click="changePage(i)"
        :key="i"
      >{{ i }}</div>
    </div>
    <!-- === End Pagination === -->
  </div>
</template>

<script>
import search from "../components/Search";
// Import the EventBus.
import { EventBus } from "../main.js";

export default {
  name: "Headlines",
  components: {
    search
  },
  data: function() {
    return {
      articles: {},
      currentPage: 1,
      totalResults: 0,
      pageSize: 15
    };
  },
  created: function retrieveHeadlines() {
    const queryString = "corona virus";
    const api_key = process.env.VUE_APP_NEWS_API_KEY;
    const domains =
      "nytimes.com,washingtonpost.com,cnn.com,cdc.gov,who.int,coronavirus.jhu.edu,vox.com";
    const excludeDomains = "foxnews.com,fox.com";

    const url = `http://newsapi.org/v2/everything?q=${queryString}&pageSize=${this.pageSize}&domains=${domains}&excludeDomains=${excludeDomains}&language=en&sortBy=publishedAt&apiKey=${api_key}`;
    // Just a little  different way of implementing fetch()
    const req = new Request(url);
    fetch(req)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { articles, totalResults } = data;
        this.articles = articles;
        this.totalResults = totalResults;
      });
  },
  mounted: function manualSearchEvent() {
    // The eventbus carries manual search data from Search.vue
    // back to its parent component Headlines.vue
    EventBus.$on("searchResults", manualSearch => {
      this.articles = manualSearch.articles;
      this.totalResults = manualSearch.totalResults;
    });
  },
  methods: {
    num_pages: function() {
      return Math.ceil(this.totalResults / this.pageSize);
    },
    changePage: function(page) {
      this.currentPage = page;
      const queryString = "corona virus";
      const domains =
        "nytimes.com,washingtonpost.com,cnn.com,cdc.gov,who.int,coronavirus.jhu.edu,vox.com";
      const excludeDomains = "foxnews.com,fox.com";

      const url = `http://newsapi.org/v2/everything?q=${queryString}&page=${page}&pageSize=${this.pageSize}&domains=${domains}&excludeDomains=${excludeDomains}&language=en&sortBy=publishedAt&apiKey=b7fb08c9f94f4898ae24c81664e9ae7c`;
      // Just a little  different way of implementing fetch()
      const req = new Request(url);
      fetch(req)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { articles, totalResults } = data;
          this.articles = articles;
        });
    }
  }
};
</script>

<style scoped>
.headlines {
  width: 90vw;
  height: auto;
}

h1 {
  display: flex;
  font-size: 1.9rem;
  justify-content: flex-end;
  text-align: center;
  color: #a90302;
  margin: 5px 15px;
}

span.headlines {
  flex-basis: 50%;
  height: 2.5rem;
  background-size: 1px 1em;
  box-shadow: inset 0 -0.175em #a90302, inset 0 -0.2em #000;
  display: inline-block;
  text-shadow: -2px -2px rgb(235, 214, 214), -2px 2px rgb(235, 214, 214),
    2px -2px rgb(235, 214, 214), 2px 2px rgb(235, 214, 214);
}

ul {
  display: flex; /* establish flex container */
  flex-direction: column; /* make main axis vertical */
  margin: 5px auto;
  max-width: 70%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
}

li {
  font-size: 20px;
  line-height: 1.3;
  color: #6e5670;
  margin: 5px;
  list-style-type: none;
}

li a {
  display: block;
  color: #1a3ad7;
  line-height: 1.58;
  word-wrap: break-word;
}
li a:hover {
  text-decoration: underline 2.5px;
}

li span {
  display: block;
  color: rgb(37, 33, 33);
  line-height: 1.6;
  text-decoration: black underline 2px;
}

img {
  float: right;
  max-width: 10%;
  height: auto;
}

/* Pagination Stylings */
.pagination {
  text-align: right;
  width: 750px;
  padding: 8px;
}
.number {
  display: inline-block;
  padding: 4px 10px;
  color: #fff;
  border-radius: 4px;
  background: #44475c;
  margin: 0px 5px;
  cursor: pointer;
}
.number:hover,
.number.active {
  background: #717699;
}

/* End Pagination Stylings */
</style>
