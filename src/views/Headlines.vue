<template>
  <h1>
    <span class="text-shadow underline">Latest News Headlines</span>
  </h1>
</template>

<script>
export default {
  name: "Headlines",
  created: function retrieveHeadlines() {
    let today = new Date();
    today.setHours(today.getHours() - 4);
    today = today.toISOString().substring(0, 10);
   
    const url = `http://newsapi.org/v2/everything?q=coronavirus&from=${today}&sortBy=popularity&apiKey=b7fb08c9f94f4898ae24c81664e9ae7c`;
    // Just a little way of implementing fetch()
    const req = new Request(url);
    fetch(req)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      });
  }
};
</script>

<style scoped>
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
</style>