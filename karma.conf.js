module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'dist/scalardl-web-client-sdk.bundle.js',
      'scalardl-web-client-sdk.js',
      'scalar_pb.js',
      'scalar_grpc_web_pb.js',
      {pattern: 'test/**/*.js', watched: false},
    ],
    reporters: ['progress'],
    preprocessors: {
      'test/**/*.js': ['webpack'],
      '*.js': ['webpack'],
    },
    webpack: {
      node: {
        fs: 'empty',
      },
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
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
    // plugins: [
    //   require('karma-webpack'),
    //   ('karma-chai'),
    //   ('karma-mocha'),
    //   ('karma-chrome-launcher'),
    // ],
  });
};
