[![Build Status](https://travis-ci.org/curit/ember-cli-yadda.svg)](https://travis-ci.org/curit/ember-cli-yadda)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-yadda.svg)](http://emberobserver.com/addons/ember-cli-yadda)
# Ember-cli-yadda

This ember-cli addon facilitates writing acceptance and unit tests in the Gherkin language and executing them against your Ember app.

[@mschinis (Micheal Schinis)](https://github.com/mschinis) Did a great talk at @emberlondon [BDD approach with ember using `ember-cli-yadda`](https://vimeo.com/146828818).

## Installation

Installing ember-cli-yadda is a breeze. All you need to do is run the following command in your project directory.

```sh
ember install ember-cli-yadda
```

##### Versions >= 0.2.0

This adds the latest version of yadda to your node modules, along with [ember-browserify](https://www.npmjs.com/package/ember-browserify) (to allow yadda to run in the browser). It also adds the following files:

```
/tests/acceptance/steps/steps.js
/tests/unit/steps/steps.js
```

You may specify the version of yadda by changing it in package.json and running `npm install`.

##### Versions <= 0.1.0

ember-browserify is not used.  Instead, yadda is also added to your bower dependencies.  The files listed above are also added.

After installation the addon will have added the most recent yadda version to your bower dependencies. As it comes with all yadda releases in its dist folder, you can specify which yadda version to include in your ember-cli build:

```js
// ember-cli-build.js

    var app = new EmberApp({
        'ember-cli-yadda': {
            'yaddaVersion': '0.17.6'
        }
    });

```

Running `ember serve` will make the test results available at `http://localhost:4200/tests`.

##### Upgrading from <= 0.1.0 to >= 0.2.0
1. Un-install yadda from your bower dependencies: `bower uninstall yadda --save`.
2. Install ember-cli-yadda: `ember install ember-cli-yadda`.
3. If a specific version of yadda is being used:
    * Remove the code from ember-cli-build.js that specifies the version.
    * Un-install the latest version of yadda from npm: `npm uninstall yadda --save-dev`.
    * Install the desired version of yadda: `npm install yadda@<desired version> --save-dev`.


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

When using Mocha as your test framework, you have the option to run each scenario's step as a separate test, with all steps grouped within a Mocha `describe` block. If a step is failing, all following steps of that scenario will then be marked as pending. This way you get a much clearer picture on where (which step) a possible failure is happening. To opt in into that mode, use the `separateSteps` config option. 
 
 ```js
 // ember-cli-build.js
 
     var app = new EmberApp({
         'ember-cli-yadda': {
             'separateSteps': true
         }
     });
 
 ```
 
 *Note that this mode is currently not available when you are using QUnit as your test framework!*

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
    })
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
}
```
**NOTE:** If you are creating a unit test, you need to use `<unit type>/<file name>` when using the generator. This allows ember-cli-yadda to automatically find and import the component, where it will run the tests against.

For example, creating a feature file for a component named `form-select`, you would use `ember g feature-unit components/form-select`

You can skip tests by adding the `@ignore` annotation above the Scenario or Feature. 

## Important information
##### Scope and helpers
ember-cli-yadda passes the original scope down to each step definition. This means that you have access to the same Ember helpers, like `andThen()` and `find()`, as you did when writing a normal acceptance/unit test in mocha/qunit.

##### Sharing variables between steps
You can easily share variables between your steps, by either creating a new variable outside your step chain, or by storing the values in `this.ctx` in each step.

For Example:
```js
  import steps from './steps';

  // Variable outside step chain
  let something = '';

  export default function(assert) {
    return steps(assert)
      .given('I add something to the context', function(next) {
        // Assign 'hello' to the variable outside the step chain
        something = 'hello';
        // Assign 'there' to a new variable in `this.ctx`
        this.ctx.something = 'there';
        assert.ok(true, this.step);
        next();
      })
      .then('it should be there in the next step', function(next) {
        // Do an assertion to check that 'there' has been passed correctly
        // to the next step
        assert.equal(this.ctx.something, 'there', this.step);
        next();
      })
      .then('external variable should be there in the next step', function(next){
        // Assert that the external variable still holds the information
        // we set in the first step
        assert.equal(something,'hello',this.step);
      });
  }
```
##### Testing components that depend on other components
If you need to test a component, that depends on other components, you can use the `@needs` gherkin decorator to specify what this component depends on.

For example:
```gherkin
  @needs=component:ember-selectize
  Feature: Component form-select

    Scenario: Check if component renders
      Given I initialize the component
      When I render it
      Then it should be rendered
```

## Inner workings

This ember addon registers a preprocessor that parses `.feature` / `.spec` / `.specification` files using [yadda](https://github.com/acuminous/yadda) and generates a `-test.js` file in the acceptance test folder. It also adds a little loader helper ``/tests/helpers/yadda.js`` because yadda does not define an amd module.

The addon also adds two ES6 modules `/tests/acceptance/steps/steps`, `/tests/unit/steps/steps` you can extend in feature specific step definitions. Any shared step definitions should be moved to these file or included there, depending on the type of test you are running. Feature specific step definitions reside in ``/tests/acceptance/steps/`` and ``/tests/unit/steps``. The generated feature test js files import a ``/tests/[type]/steps/[feature title]-steps`` module, where type can either be `acceptance` or `unit`.
