'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'dummy',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.APP.autoboot = false;

    // these are read by tests/helpers/yadda-annotations.js
    // when ENV.annotations is not set, the test should run as it used to

    if (process.env.ANNOTATIONS) {
      ENV['annotations'] = process.env.ANNOTATIONS.split(',');
    }

    // only feature/scenarios that have @acceptance will run
    // ENV['annotations'] = ['acceptance'];

    // only feature/scenarios that have either @acceptance or @smoke will run
    // ENV['annotations'] = ['acceptance','smoke'];
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
