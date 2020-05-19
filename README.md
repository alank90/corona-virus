# corona-virus-app

Simple app that uses a coronavirus API to get stats about
the virus

## Project setup

```
npm install
```
You will also need to add an .env file in the root of the project and add your API keys. Seeing as we use vue-cli3 no need for dotenv, just add api keys to .env in the format:
```
VUE_APP_SOME_KEY_FOR_NEWS=MY_API_KEY
VUE_APP_SOME_OTHER_KEY_FOR_STATS=MY_OTHER_KEY
```
[See Vue-cli3 page on Environment Variables](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables)

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

## Notes

To use Google Fonts:
When using VueJS, either just add a link in head section of /public/index.html or you can import the font with Google Fonts Webpack Plugin this way:

Here's the [plugin](https://www.npmjs.com/package/google-fonts-webpack-plugin), it's really easy to set it up and works like a charm.

`npm i google-fonts-webpack-plugin -D`

Go to your **/vue.config.js** and add the following lines:

```
const GoogleFontsPlugin = require("google-fonts-webpack-plugin")

module.exports = {
    entry: './src/app.js',
    /* ... */
    configureWebPack: {
    plugins: [
        new GoogleFontsPlugin({
            fonts: [
                { family: "Libre Baskerville" },
                { family: "Roboto", variants: [ "400", "700italic" ] }
            ]
        })
    ]
}
```

Now you can use Google Fonts anywhere inside your VueJS project e.g.

p {
font-family: 'Libre Baskerville'
}

To apply stylings globally put css rules in **App.js** :)

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
