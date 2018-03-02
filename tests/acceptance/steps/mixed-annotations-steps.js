import steps from './steps';
import ENV from '../../../config/environment';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
  .given('this scenario has annotation @acceptance', function() {
    assert.ok(true, this.step);
  })
  .given('the config specifies the @$annotation annotation or none', function(annotation) {
    assert.ok(hasAnnotationOrNone(annotation), this.step);
  })
  .given('this scenario has annotation @smoke', function() {
    assert.ok(true, this.step);
  })
  .when('I look at the test results', function() {
    assert.ok(true, this.step);
  })
  .then('the assert in the given step should be shown as a success', function() {
    assert.ok(true, this.step);
  });
}

function hasAnnotationOrNone(annotation) {
  if (ENV.annotations && ENV.annotations.length >= 0) {
    return ENV.annotations.indexOf(annotation) >= 0;
  } else {
    return true;
  }
}
