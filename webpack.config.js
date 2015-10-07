var autoprefixer = require('autoprefixer');
var precss      = require('precss');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname,
        filename: "app.js"
    },
    module: {
        loaders: [
            {
              test: /\.css$/,
              loader: "style-loader!css-loader!postcss-loader"
            },
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel'
            }
        ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
    devtool: "#inline-source-map"
};
