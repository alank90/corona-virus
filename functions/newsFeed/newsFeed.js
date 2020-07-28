const fetch = require("node-fetch");

/* eslint-disable-next-line no-undef */
const newsAPIKey = process.env.news_app_api_key;
const queryString = "coronavirus covid-19";
const lastWeek = "20200720";
const pageSize = 15;
const domains =
  "nytimes.com,washingtonpost.com,cnn.com,cdc.gov,who.int,coronavirus.jhu.edu,vox.com";
const excludeDomains = "foxnews.com,fox.com";

//const url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${queryString}&from=${lastWeek}&pageSize=${pageSize}&domains=${domains}&excludeDomains=${excludeDomains}&language=en&sortBy=publishedAt&apiKey=${newsAPIKey}`;
const url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${queryString}&from=${lastWeek}&pageSize=${pageSize}&domains=${domains}&excludeDomains=${excludeDomains}&language=en&sortBy=publishedAt&apiKey=${newsAPIKey}`;
/* eslint-disable-next-line no-undef, no-unused-vars */
exports.handler = async (event, context, callback) => {
  // This is the lambda callback function. The callback will be what your Netlify function will return
  // when you run it. This is where you handle success/failure and any response that you might need.
  // In this instance it is called in the try/catch and returns the NewsAPI data. The data will be stringified
  // and returned to our program.
  fetch("https://jsonplaceholder.typicode.com/posts/3")
    .then((response) => response.json())
    .then((json) => {
      callback(null, {
        statusCode: 200,
        body: console.log(json),
      });
    })
    .catch((error) => ({ statusCode: 422, body: String(error) }));

  /* fetch(url, { headers: { Origin: "localhost" } })
    .then((response) => response.json())
    .then((res) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res.data),
      });
    }) */
};