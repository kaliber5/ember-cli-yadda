import yadda from '../../helpers/yadda';

export default function() {
  return yadda.localisation.English.library()
    .given('I type "Ember g feature make-feature"', function(next) {
      visit('/');
      // Add your own assert library
      andThen(() => next());
    })
    .when('I look in the folder', function(next) {
      // Add your own assert library
      next();
    });
}
