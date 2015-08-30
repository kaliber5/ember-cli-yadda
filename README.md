# Ember-cli-yadda

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## design

In general the idea is to be able to use the yadda library to parse specifications written in natural language and match the steps outlined in the specs to test function. In practice this usually means a gherkin file and step definitions. The step definitions can provide a further abstraction between the tests and the system under test so that you do not have to change all tests when a class-name on a button in the application changes.

There will be a list of files containing the specification. There will be a list of files containing the steps (or perhaps one file). There will need to be a way to load the yadda library, a way to glue all together, a test runner and an assertion library.

Ember-cli provides a standard structure and test runner. I makes sense to stick the features in the /tests/acceptance folder and to stick the step definitions in the /tests/helpers/steps folder. To be able to recognize the step definitions they will have a [name]-step.js extension. The feature files will need to be parsed and the scenario steps followed calling an assertion library.

This plugin uses the qunit assert and test runner in conjunction with the yadda.run (or yadda.yadda as its author would have it ) function. The feature file parsing and matching is handled be a preprocessor that converts the files to more or less standard ember-cli test that rely on a helper combining all stepdefinitions together. The application specific calls are imported via another addon.
