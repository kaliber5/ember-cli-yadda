import steps from './steps';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
    .then('I should find a file', function(next) {
      assert.ok(true, this.step);
      next();
    })
    .then('It should not run that scenario', function(next) {
      assert.ok(false, this.step);
      next();
    });
}
