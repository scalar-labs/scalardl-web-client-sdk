module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      // 'dist/scalardl-web-client-sdk.bundle.js',
      // '*.js',
      // {pattern: 'test/**/*.js', watched: false},

      {pattern: 'test/integration_test.js', watched: false},
      // 'test/foo.js',
    ],
    // reporters: ['progress'],
    preprocessors: {
      'test/integration_test.js': ['webpack'],
      // 'test/**/*.js': ['webpack'],
      // '*.js': ['webpack'],
    },
    webpack: {
      // node: {
      //   fs: 'empty',
      // },
    },
    webpackMiddleware: {
      stats: 'errors-only',
    },
    hostname: '127.0.0.1',
    singleRun: true,
    listenAddress: '127.0.0.1',
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    // autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    // concurrency: Infinity,
    plugins: [
      require('karma-chrome-launcher'),
      'karma-mocha',
      'karma-chai',
      'karma-webpack',
    ],
  });
};
