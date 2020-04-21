// vue.config.js
const GoogleFontsPlugin = require("google-fonts-webpack-plugin");
module.exports = {
  entry: './src/App.vue',
  plugins: [
    new GoogleFontsPlugin({
      fonts: [
        { family: "Roboto" },
        { family: "Libre Baskerville" }
      ],
      /* ...options */
    }),
  ],
};
