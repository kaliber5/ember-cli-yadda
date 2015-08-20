import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '/tests/helpers/start-app';
import { localisation } from 'yadda';

const Nederlands = localisation.English;

export default English.library()
  .given('I type "Ember g feature make feature"', function(next) {
    next();
  })
  .when('I look in the folder', function(next) {
    next();
  })
  .then('I should find a file', function(next) {
    next();
  })
