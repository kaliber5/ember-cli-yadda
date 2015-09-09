import steps from '<%= foldersUp %>steps';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
    .then('I should find a file', function(next) {
      assert.ok(true, this.step);
      next();
    });
}
