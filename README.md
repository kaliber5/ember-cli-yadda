[![Build Status](https://travis-ci.org/albertjan/ember-cli-yadda.svg)](https://travis-ci.org/curit/ember-cli-yadda)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-yadda.svg)](http://emberobserver.com/addons/ember-cli-yadda)
# Ember-cli-yadda

This Ember CLI addon facilitates writing BDD tests in the Gherkin language and executing them against your Ember app.

[@mschinis (Micheal Schinis)](https://github.com/mschinis) Did a great talk at @emberlondon [BDD approach with ember using `ember-cli-yadda`](https://vimeo.com/146828818).

It uses the [yadda](https://github.com/acuminous/yadda) library to parse and run your feature files, and integrates into
your Ember test setup using either [ember-qunit](https://github.com/emberjs/ember-qunit) or
[ember-mocha](https://github.com/emberjs/ember-mocha).

The following describes the use of ember-cli-yadda >= v0.4.0 which works only with the latest modern
Ember testing APIs, as laid out in the RFCs
[232](https://github.com/emberjs/rfcs/blob/master/text/0232-simplify-qunit-testing-api.md)
and
[268](https://github.com/emberjs/rfcs/blob/master/text/0268-acceptance-testing-refactor.md).

For the older APIs use v0.3.x and have a look at our [Legacy Guide](docs/legacy.md).

## Installation

Installing ember-cli-yadda is a breeze. All you need to do is run the following command in your project directory.

```sh
ember install ember-cli-yadda
```

This adds the following files:

```
/tests/acceptance/steps/steps.js
/tests/integration/steps/steps.js
/tests/unit/steps/steps.js
/tests/helpers/yadda-annotations.js
```

You may specify the version of yadda by adding it in package.json and running `npm install`.

## Upgrading

See the [Release Notes](https://github.com/albertjan/ember-cli-yadda/releases).

## Usage

The following describes the specific features and Ember integration points of ember-cli-yadda. For general documentation
on how to write yadda-based tests please consult the [Yadda User Guide](https://acuminous.gitbooks.io/yadda-user-guide/en/).

### Creating feature files

This ember-cli addon provides you with a blueprint with which you can create feature files:

```sh
ember g feature [feature title] --type=[acceptance|integration|unit]
```

#### Acceptance tests

For acceptance tests you can omit the `--type`  option. So you can use `ember g feature [feature title]` which generates
a feature file for your acceptance tests and a step definition.

For example:

```sh
ember g feature make-a-feature
```

This will generate the following files in your project directory:

```
/tests/acceptance/steps/make-a-feature-steps.js
/tests/acceptance/make-a-feature.feature
```

#### Integration or unit tests

To create an integration or unit test, you can use `ember g feature [feature title] --type=integration` for an
integration test, or `--type=unit` for a unit test. This generates a feature and step definition file where you can
write your tests.

For example:

```sh
ember g feature make-a-feature --type=unit
```

This will generate the following files in your project directory:

```
/tests/unit/steps/make-a-feature-steps.js
/tests/unit/make-a-feature.feature
```

### Writing tests

Let's take this example of an acceptance test feature:

```gherkin
@setupApplicationTest
Feature: bananas rot

  Scenario: bananas rot faster when next to apples
    Given I have a bananas
    And it's next to an apples
    When left together for a while
    Then the banana rots
```

The `@setupApplicationTest` annotation will setup all scenarios of this feature as application tests, using the
`setupApplicationTest()` function provided by either `ember-qunit` or `ember-mocha`. See the [Annotations](#annotations)
section below for more information on how to setup your tests.

Because we probably have more features about bananas, we add the `Given I have bananas` to the global steps file:
`/tests/acceptance/steps.js`

```js
import { yadda } from 'ember-cli-yadda';
import { visit } from '@ember/test-helpers';

export default function(assert) {
  return yadda.localisation.default.library()
    .given("I have bananas", async function() {
      await visit("/bananas");
    });
}
```

*Notice that the preferable way to handle asynchronous steps like the one above is to use `async`/ `await`. But you can
also explicitly return a promise or use a `next()` [callback](https://acuminous.gitbooks.io/yadda-user-guide/en/usage/step-libraries.html).*

The fact that "it's next to apples" is probably unique to this Feature so we'll add it to the feature specific step definitions in `/tests/acceptance/steps/bananas-rot-feature-steps.js`. That will look like this:

```js
import steps from './steps';

// step definitions that are shared between features should be moved to the
// tests/accptance/steps/steps.js file

export default function(assert) {
  return steps(assert)
    .given('it\'s next to apples', function() {
      let apples = this.element.querySelectorAll('.apple');
      assert.ok(apples.length > 0)
    })
    .when('left together for a while', function(next) {
      // bananas rot really quickly next to apples.
      setTimeout(next, 1000);
    })
    .then('the banana rots', function () {
      let banana = this.element.querySelector('.banana');
      assert.ok(banana.classList.contains('rotten'));
    });
}
```

#### Important information

##### Scope and helpers

ember-cli-yadda passes the original scope down to each step definition. This means that you have access to the same
context (like `this.element` or `this.owner`) and helpers from `@ember/test-helpers` (like `click()`), as you did when
writing a normal test in QUnit/Mocha.

##### Sharing variables between steps

You can easily share variables between your steps, by either creating a new variable outside your step chain, or by storing the values in `this.ctx` in each step.

For Example:
```js
  import steps from './steps';

  // Variable outside step chain
  let something = '';

  export default function(assert) {
    return steps(assert)
      .given('I add something to the context', function() {
        // Assign 'hello' to the variable outside the step chain
        something = 'hello';
        // Assign 'there' to a new variable in `this.ctx`
        this.ctx.something = 'there';
        assert.ok(true, this.step);
      })
      .then('it should be there in the next step', function() {
        // Do an assertion to check that 'there' has been passed correctly
        // to the next step
        assert.equal(this.ctx.something, 'there', this.step);
      })
      .then('external variable should be there in the next step', function(){
        // Assert that the external variable still holds the information
        // we set in the first step
        assert.equal(something,'hello',this.step);
      });
  }
```

### Annotations

You already saw the use of the `@setupApplicationTest` annotation in the example feature file above.
Yadda's [support for annotations](https://acuminous.gitbooks.io/yadda-user-guide/en/feature-specs/annotations.html`) can
be used to customize the way tests are run.

The implementation for the way certain annotations affect your tests lives in the `tests/yadda-annotations.js` file.
The addon installs this file with a default implementation as described below, but you can freely customize it at your
will.

#### Skipping tests

You can skip tests by adding the `@ignore` annotation above the Scenario or Feature.

#### Test suites

You can set `ENV.annotations` to an array of annotations (either statically or e.g. by assigning them from an
environment variable like `process.env.ANNOTATIONS`). This will then run only those Features or Scenarios that have one
of these annotations assigned.

#### Setup tests

For each of the setup functions already known from `ember-qunit` or `ember-mocha`, there exists a corresponding
annotation to setup your Feature/Scenario accordingly:

- `@setupTest` for (unit) tests requiring the DI container of Ember to be set up
- `@setupRenderingTest` for (integration) tests allowing you to call `render`, e.g. for component tests
- `@setupApplicationTest` for (acceptance) tests requiring the whole application to be booted

#### Customization

You can customize how annotations are handled in your app's `tests/yadda-annotations.js` file, e.g. to add support for
additional annotations, or extend the existing ones. This module has to export these hooks, that are called by this
addon's test runner:

- `runFeature`: called for each feature. If you return a function, this will be called to run the feature, instead of
  the default implementation.
- `runScenario`: similar to `runFeature`, but called for each scenario.
- `setupFeature`: called for each feature to setup the test environment. You can call QUnit's or Mocha's `beforeEach`
  and `afterEach` functions here to add custom setup/teardown work.
- `setupScenario`: similar to `setupFeature`, but called for each scenario.

Have a look at the existing implementation and the comments present in your `tests/yadda-annotations.js` file!

Here is an example to extend the defaul implementation of the `@setupApplicationTest` annotation to also call the
`setupMirage()` function provided by `ember-cli-mirage` to setup the Mirage server:

```js
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

// your existing tests/yadda-annotations.js file...

function setupYaddaTest(annotations) {
  if (annotations.setupapplicationtest) { // lower case!
    return function(hooks) {
      setupApplicationTest(hooks);
      setupMirage(hooks);
    }
  }
  // ...
}
```

### Yadda Configuration
If you need to set Yadda configuration, add the following to `ember-cli-build.js`:

```javascript
module.exports = function(defaults) {
  let app = new EmberApp(defaults, {

    'ember-cli-yadda': {
      yaddaOptions: { // passed through to yadda parseFeature()
        language: 'Polish', // converted to Yadda.localisation.Polish
        leftPlaceholderChar: '<',
        rightPlaceholderChar: '>'
      }

    }
  });
```
See [yadda FeatureParser](https://github.com/acuminous/yadda/blob/master/lib/parsers/FeatureParser.js#L8) for yadda options.

## Inner workings

This ember addon registers a preprocessor that parses `.feature` / `.spec` / `.specification` files using [yadda](https://github.com/acuminous/yadda) and generates a `-test.js` file in the apropriate test folder. It also adds a little loader helper ``/tests/helpers/yadda.js`` because yadda does not define an amd module.

The addon also adds ES6 modules `/tests/[type]/steps/steps` you can extend in feature specific step definitions. Any shared step definitions should be moved to these file or included there, depending on the type of test you are running. Feature specific step definitions reside in ``/tests/[type]/steps/``. The generated feature test js files import a ``/tests/[type]/steps/[feature title]-steps`` module, where type can either be `acceptance`, `integration` or `unit`.
