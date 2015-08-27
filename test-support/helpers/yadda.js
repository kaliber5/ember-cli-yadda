import Ember from 'ember';
//let yadda = require('yadda');
import { createInstance } from 'yadda';

export default function() {
  Ember.Test.registerHelper( 'runScenario', function(context, library, scenario) {
    createInstance(library).run(scenario.steps);
  })
}
