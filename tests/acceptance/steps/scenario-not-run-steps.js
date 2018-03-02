import steps from './steps';
import ENV from '../../../config/environment';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
  .given('this scenario will not be run', function() {
    assert.ok(false, this.step);
  })
  .given('this scenario does not have an annotation', function() {
    assert.ok(true, this.step);
  })
  .given('this scenario has annotation @$annotation', function() {
    assert.ok(true, this.step);
  })
  .given('the config specifies the @acceptance annotation', function() {
    assert.ok(true, this.step);
  })
  .when('I look at the test results', function() {
    assert.ok(true, this.step);
  })
  .then('the assert in the given step should not be shown as a failure', function() {
    // if ENV.annotations has acceptance, this should fail
    assert.ok(!hasAnnotation('acceptance'), this.step);
  })
  .then('the assert in the given step should be shown as a success', function() {
    assert.ok(true, this.step);
  });
}

function hasAnnotation(annotation) {
  if (ENV.annotations && ENV.annotations.length >= 0) {
    return ENV.annotations.indexOf(annotation) >= 0;
  } else {
    return false;
  }
}