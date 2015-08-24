import Ember from 'ember';
let yadda = require('yadda');

export default function() {
  Ember.Test.registerHelper( 'yadda', function(context, library, scenario) {
     yadda.createInstance(library).run(scenario.steps);
  })
}
