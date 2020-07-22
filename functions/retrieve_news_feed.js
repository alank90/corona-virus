/* eslint-disable-next-line no-undef, no-unused-vars */
exports.handler = (event) => {
  /* eslint-disable-next-line no-undef */
  const newsAPIKey = process.env.news_app_api_key;

  return {
    statusCode: 200,
    body: `The API key is: test,,,`,
  };
};
