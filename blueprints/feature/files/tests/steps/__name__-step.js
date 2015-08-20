import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '/tests/helpers/start-app';
import { localisation } from 'yadda';

let Nederlands = localisation.Nederlands;

module('make feature', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('Scenario generate', function(assert) {
  Nederlands.
});
