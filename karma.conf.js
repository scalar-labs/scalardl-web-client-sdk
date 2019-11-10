module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'test/integration.test.js',
    ],
    reporters: ['progress'],
    preprocessors: {
      'test/integration.test.js': ['webpack'],
    },
    webpack: {},
    webpackMiddleware: {
      stats: 'errors-only',
    },
    listenAddress: '127.0.0.1',
    hostname: 'localhost',
    colors: true,
    logLevel: config.LOG_WARN,
    singleRun: true,
    browsers: ['Chrome'],
  });
};
