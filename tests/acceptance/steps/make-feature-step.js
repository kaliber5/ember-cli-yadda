// import Ember from 'ember';
//import { assert } from 'qunit';
// import startApp from '/tests/helpers/start-app';
// import { localisation } from 'yadda';

const English = require('yadda').localisation.English;

export default function(assert) {
   return English.library()
    .given('(I type "Ember g feature make-feature")', function(step) {
      assert.ok(true, step);
    })
    .when('(I look in the folder)', function(step) {
      assert.ok(true, step);
    })
    .then('(I should find a file)', function(step) {
      assert.ok(false, step);
    });
  }
