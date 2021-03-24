module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'test/integration.test.js',
      'test/integration_auditor.test.js',
      'test/signature_validator.test.js',
      'test/client_service_with_indexeddb.test.js',
    ],
    reporters: ['progress'],
    preprocessors: {
      'test/*.test.js': ['webpack'],
    },
    webpack: {},
    htmlReporter: {
      outputFile: 'test/test-reports/integration-test.html',
    },
    listenAddress: '127.0.0.1',
    hostname: 'localhost',
    colors: true,
    logLevel: config.LOG_WARN,
    singleRun: true,
    browsers: ['ChromeHeadless'],
  });
};
