[![Build Status](https://travis-ci.org/curit/ember-cli-yadda.svg)](https://travis-ci.org/curit/ember-cli-yadda)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-yadda.svg)](http://emberobserver.com/addons/ember-cli-yadda)
# Ember-cli-yadda

This ember-cli addon facilitates writing acceptance and unit tests in the Gherkin language and executing them against your Ember app.

## Installation

Installing ember-cli-yadda is a breeze. All you need to do is run the following command in your project directory.

```sh
ember install ember-cli-yadda
```

This adds yadda to your node modules and your bower plugins. It also adds the following files:

```
/tests/helpers/yadda.js
/tests/acceptance/steps/steps.js
/tests/unit/steps/steps.js
```

running `ember serve` will make the test results available at `http://localhost:4200/tests`

## Usage
This ember-cli addon provides you with two blueprints with which you can create feature files.

##### Acceptance tests
If you want to create acceptance tests, you can use ``ember g feature [feature title]`` which generates a feature file for your acceptance tests and a step definition.

For example:

```sh
ember g feature make-a-feature
```

This will generate the following files in your project directory:

```
/tests/acceptance/steps/make-a-feature-steps.js
/tests/acceptance/make-a-feature.feature
```

##### Unit tests
To create a unit test, you can use ``ember g feature-unit [feature title]`` which generates a feature and step definition file where you can write your unit tests.

For example:

```sh
ember g feature-unit make-a-feature
```

This will generate the following files in your project directory:

```
/tests/unit/steps/make-a-feature-steps.js
/tests/unit/make-a-feature.feature
```

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
```

## Important information
ember-cli-yadda passes the original scope down to each step definition. This means that you have access to the same Ember helpers, like `andThen()` and `find()`, as you did when writting a normal acceptance/unit test in mocha/qunit.

## Inner workings

This ember addon registers a preprocessor that parses `.feature` / `.spec` / `.specification` files using [yadda](https://github.com/acuminous/yadda) and generates a `-test.js` file in the acceptance test folder. It also adds a little loader helper ``/tests/helpers/yadda.js`` because yadda does not define an amd module.

The addon also adds two ES6 modules `/tests/acceptance/steps/steps`, `/tests/unit/steps/steps` you can extend in feature specific step definitions. Any shared step definitions should be moved to these file or included there, depending on the type of test you are running. Feature specific step definitions reside in ``/tests/acceptance/steps/`` and ``/tests/unit/steps``. The generated feature test js files import a ``/tests/[type]/steps/[feature title]-steps`` module, where type can either be `acceptance` or `unit`.
