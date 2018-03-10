import steps from './steps';
import ENV from '../../../config/environment';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
  .given('the feature this scenario belongs in does not have an annotation', function() {
    assert.ok(true, this.step);
  })
  .when('the config does not specify any annotations', function() {
    assert.ok(noAnnotations(), this.step);
  })
  .then('this test passes', function() {
    assert.ok(true, this.step);
  });
}

function noAnnotations() {
  return !(ENV.annotations && ENV.annotations.length >= 0);
}
