# Ember-cli-yadda

This ember-cli addon facilitates writing acceptance tests in the Gherkin language and executing them against your Ember app.

This ember addon registers a preprocessor that parses `.feature` / `.spec` / `.specification` files using [yadda](https://github.com/acuminous/yadda) and generates a `-test.js` file in the acceptance test folder. It also adds a little loader helper ``/tests/helpers/yadda.js`` because yadda does not define an amd module.

The addon also adds a `/tests/acceptance/steps/steps` module you can extend in feature specific step definitions. Any shared step definitions should be moved to this file or included there. Feature specific step definitions reside in ``/tests/acceptance/steps/``. The generated feature test js file imports a ``/tests/acceptance/steps/[feature title]-steps`` module.

## Installation and usage

You can use ``ember g feature [feature title]`` to generate an feature file and a step definition.

For example:

`ember install ember-cli-yadda`
`ember g feature make-a-feature`

This adds yadda to your node modules and your bower plugins. It also adds the following files:

```
/tests/helpers/yadda.js
/tests/acceptance/steps/steps.js
/tests/acceptance/steps/make-a-feature-steps.js
/tests/acceptance/make-a-feature.feature
```
running `ember serve` should make the test results available at `http://localhost:4200/tests`

The preprocessor takes `/tests/acceptance/make-a-feature.feature` and generates `/app/tests/acceptance/make-a-feature-test.js` with the parsed feature and qunit test definition.

## Writing tests

All tests are asynchronous so when writing steps you should always call `next`. For example:

```gherkin
Feature: bananas rot

  Scenario: bananas rot faster when next to apples
    Given I have a bananas
    And it's next to an apples
    When left together for a while
    Then the banana rots
```

Because we probably have more features about bananas. We add the `Given I have bananas` to the global steps file: `/tests/acceptance/steps.js`

```js
import yadda from '../../helpers/yadda';

export default function(assert) {
  return yadda.localisation.English.library()
    .given("I have bananas", function(next) {
      visit("/bananas")
      andThen(() => next());
    });
}
```

Notice how I wrapped the call to next in an `andThen` this tells the yadda to continue to the next step when the application routed to the `/bananas` route. Then fact that it's next to apples is probably unique to this Feature so we'll add it to the feature specific step definitions in `/tests/acceptance/steps/bananas-rot-feature-steps.js`. That will look like this:

```js
import steps from './steps';

// step definitions that are shared between features should be moved to the
// tests/accptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
    .given('it\'s next to apples', function(next) {
      const apples = find('.apple');
      assert.ok(apples.length > 0)
    }
    .when('left toghether for a while', function(next) {
      // bananas rot really quickly next to apples.
      setTimeout(function() {
        assert.ok(true);
        next();
      }, 1000);
    })
    .then('the banana rots', function (next) {
      const banana = find('.banana');
      assert.ok(banana.hasClass('rotten'));
      next();
    });
});
