module.exports = function (config) {
  config.set({
    basePath: __dirname,
    frameworks: ['jasmine'],

    files: [
      //'node_modules/es6-promise/dist/es6-promise.js',
      './test/*.spec.ts'
    ],

    port: 14523,

    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    preprocessors: {
      './test/*.spec.ts': ['webpack'],
    },

    webpack: {
      resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js']
      },
      module: {
        loaders: [
          { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ }
        ]
      }
    },

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    browsers: ['PhantomJS'],

    reporters: ['progress'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};