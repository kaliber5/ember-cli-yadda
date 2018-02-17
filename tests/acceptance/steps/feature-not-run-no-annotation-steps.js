import steps from './steps';
import ENV from '../../../config/environment';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
  .given('the feature this scenario belongs in does not have an annotation', function(next) {
    assert.ok(true, this.step);
    next();
  })
  .when('the config does not specify any annotations', function(next) {
    assert.ok(noAnnotations(), this.step);
    next();
  })
  .then('this test passes', function(next) {
    assert.ok(true, this.step);
    next();
  });
}

function noAnnotations() {
  if (ENV.annotations && ENV.annotations.length >= 0) {
    return false;
  } else {
    return true;
  }
}
