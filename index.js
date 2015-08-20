/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-yadda',
  included: function(app) {
    this.__super.included(app);
    app.import('yadda');
  },
  includedCommands: function () {

  }
};
