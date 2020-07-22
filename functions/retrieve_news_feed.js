/* eslint-disable-next-line no-undef */
const newsAPIKey = process.env.news_app_api_key;

/* eslint-disable-next-line no-undef, no-unused-vars */
exports.handler = function(event, context, callback) {
  console.log(newsAPIKey);
};
