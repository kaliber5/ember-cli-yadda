import { localisation } from 'yadda';

export default function(assert) {
   return localisation.English.library()
    .given('(I type "Ember g feature make-feature")', function(step) {
      assert.ok(true, step);
    })
    .when('(I look in the folder)', function(step) {
      assert.ok(true, step);
    })
    .then('(I should find a file)', function(step) {
      assert.ok(false, step);
    });
  }
