/* eslint-disable-next-line no-undef */
const fetch = require("node-fetch");

/* eslint-disable-next-line no-undef */
const newsAPIKey = process.env.news_app_api_key;
const queryString = "coronavirus covid-19";
const pageSize = 15;
const domains =
  "nytimes.com,washingtonpost.com,cnn.com,cdc.gov,who.int,coronavirus.jhu.edu,vox.com";
const excludeDomains = "foxnews.com,fox.com";

// This is the lambda callback function. It is run in a node.js environment as basically an http server.
// It will run some middleware (a fetch to the newsAPI site) and then return the response to Headline.vue
// as an http response. Note: The response body must be returned stringified.
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
