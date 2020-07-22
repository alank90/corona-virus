/* eslint-disable-next-line no-undef, no-unused-vars */
exports.handler = async (event, context, callback) => {
  /* eslint-disable-next-line no-undef */
  const newsAPIKey = process.env.news_app_api_key;
  const queryString = "coronavirus covid-19";
  const lastWeek = "20200716";
  const pageSize = 15;
  const domains =
    "nytimes.com,washingtonpost.com,cnn.com,cdc.gov,who.int,coronavirus.jhu.edu,vox.com";
  const excludeDomains = "foxnews.com,fox.com";

  const retrieveNewsFeedData = (body) => {
    callback(null, { statusCode: 200, body: JSON.stringify(body) });
  };

  try {
    console.log(queryString);
    let response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${queryString}&from=${lastWeek}&pageSize=${pageSize}&domains=${domains}&excludeDomains=${excludeDomains}&language=en&sortBy=publishedAt&apiKey=${newsAPIKey}`
    );

    let data = await response.json();
    await retrieveNewsFeedData(data);
  } catch (err) {
    let error = {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
    await retrieveNewsFeedData(error);
  }
};
