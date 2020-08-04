/* eslint-disable-next-line no-undef */
const fetch = require("node-fetch");

/* eslint-disable-next-line no-undef */
const newsAPIKey = process.env.news_app_api_key;
const queryString = "coronavirus covid-19";
const pageSize = 15;
const domains =
  "nytimes.com,washingtonpost.com,cnn.com,cdc.gov,who.int,coronavirus.jhu.edu,vox.com";
const excludeDomains = "foxnews.com,fox.com";

/* if (response.status === 426) {
  this.show = true;
} else return response.json(); */

// This is the lambda callback function. The callback will be what your Netlify function will return
// when you run it. This is where you handle success/failure and any response that you might need.
// In this instance it is called in the try/catch and returns the NewsAPI data. The data will be stringified
// and returned to our program.
/* eslint-disable-next-line no-undef, no-unused-vars */
exports.handler = async (event, context) => {
  const lastWeekDate = event.queryStringParameters; // grab lastweek's date from the lambda query string
  const URL = `https://newsapi.org/v2/everything?q=${queryString}&from=${lastWeekDate}&pageSize=${pageSize}&domains=${domains}&excludeDomains=${excludeDomains}&language=en&sortBy=publishedAt&apiKey=${newsAPIKey}`;

  return fetch(URL, {
    headers: { Accept: "application/json", Origin: "localhost" },
  })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify(data),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
