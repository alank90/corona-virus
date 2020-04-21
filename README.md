# corona-virus-app

Simple app that uses the corona virus API to get stats about
the virus

## Project setup

```
npm install
```

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
When using VueJS, Google Fonts Webpack Plugin is the way.

Here's the [plugin](https://www.npmjs.com/package/google-fonts-webpack-plugin), it's really easy to set it up and works like a charm.

`npm i google-fonts-webpack-plugin -D`

Go to your **/webpack.config.js** and add the following lines:

``` 
const GoogleFontsPlugin = require("google-fonts-webpack-plugin")

module.exports = {
    entry: './src/app.js',
    /* ... */
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

