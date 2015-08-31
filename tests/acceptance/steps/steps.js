import { localisation } from 'yadda';

export default function(assert) {
   return localisation.English.library()
    .given('I type "Ember g feature make-feature"', function() {
      assert.ok(true, this.step);
    })
    .when('I look in the folder', function() {
      assert.ok(true, this.step);
    })
    .then('I should not find a file', function() {
      assert.ok(false, this.step);
    });
}
