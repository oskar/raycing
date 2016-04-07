var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '', // base path that will be used to resolve all patterns (eg. files, exclude)
    frameworks: ['jasmine'], // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    files: ['cordova/www/src/**/*.test.js'], // list of files / patterns to load in the browser
    exclude: [], // list of files to exclude
    preprocessors: {'cordova/www/src/**/*.test.js': ['webpack']}, // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    webpack: webpackConfig,
    webpackMiddleware: {noInfo: true}, // webpack-dev-middleware configuration
    reporters: ['progress'], // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN, // LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG
    autoWatch: false, // enable / disable watching file and executing tests whenever any file changes
    browsers: ['PhantomJS'], // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    singleRun: true // Continuous Integration mode if true, Karma captures browsers, runs the tests and exits
  })
}
