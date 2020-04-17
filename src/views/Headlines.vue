<template>
  <div class="headlines">
    <h1>
      <span class="text-shadow underline">Latest News Headlines</span>
    </h1>

    <ul>
      <li v-for="article in articles" :key="article.url">
        <span>{{ article.source.name }}</span>
        {{ article.title }}
        <a :href="article.url" target="_blank">{{ article.url }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Headlines",
  data: function() {
    return {
      articles: {}
    };
  },
  created: function retrieveHeadlines() {
    const queryString = "corona virus";
    const domains =
      "www.nytimes.com,washingtonpost.com,cnn.com,cdc.gov,who.int,coronavirus.jhu.edu,vox.com";
    const excludeDomains = "foxnews.com,fox.com";

    const url = `http://newsapi.org/v2/everything?q=${queryString}&domains=${domains}&excludeDomains=${excludeDomains}&language=en&sortBy=publishedAt&apiKey=b7fb08c9f94f4898ae24c81664e9ae7c`;
    // Just a little  different way of implementing fetch()
    const req = new Request(url);
    fetch(req)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { articles } = data;
        this.articles = articles;
        console.log(articles);
      });
  }
};
</script>

<style scoped>
.headlines {
  width: 90vw;
  height: auto;
}
h1 {
  font-size: 1.9rem;

  text-align: center;
  color: #a90302;
  margin: 5px 15px;
}

.text-shadow {
  text-shadow: -2px -2px white, -2px 2px white, 2px -2px white, 2px 2px white;
}

.underline {
  background-size: 1px 1em;
  box-shadow: inset 0 -0.175em #a90302, inset 0 -0.2em #000;
  display: inline;
}

ul {
  display: flex; /* establish flex container */
  flex-direction: column; /* make main axis vertical */
  margin: 5px auto;
  max-width: 70%;
}

li {
  font-size: 20px;
  line-height: 1.3;
  color: #6e5670;
  margin: 5px;
  list-style-type: none;
}

li a {
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
  text-decoration: black underline 2px;
}
</style>