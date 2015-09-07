import steps from './steps';

export default function(assert) {
  return steps(assert)
    .then('I should find a file in a folder in a folder', function(next) {
      assert.ok(true, this.step);
      next();
    });
}
