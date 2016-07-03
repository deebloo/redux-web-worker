module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      //'node_modules/es6-promise/dist/es6-promise.js',
      'test/*.spec.ts'
    ],

    // web server port
    port: 14523,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,
    
    preprocessors: {
      '**/**/*.ts': ['typescript'],
    },

    typescriptPreprocessor: {
      // options passed to the typescript compiler 
      options: {
        "target": "es5",
        "module": "commonjs",
        "emitDecoratorMetadata": false,
        "experimentalDecorators": false,
        "noEmitHelpers": false
      },
      // transforming the filenames 
      transformPath: function(path) {
        return path.replace(/\.ts$/, '.js');
      }
    },

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    browsers: ['PhantomJS'],

    reporters: ['coverage', 'progress'],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};