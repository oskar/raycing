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
              loader: "style!css"
            },
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel'
            }
        ]
    },
    devtool: "#inline-source-map"
};
