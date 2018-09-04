import { yadda } from 'ember-cli-yadda';

export default function(assert) {
  return yadda.localisation.default.library()
    .when('I have no annotations', function() {
    })
    .then('the test context should have "$name"', function(property) {
      assert.ok(this[property], this.step);
    });
}
