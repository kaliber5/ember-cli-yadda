# Ember-cli-yadda

This ember-cli addon facilitates writing acceptance tests in the Gherkin language and executing them against your Ember app.

This ember addon registers a preprocessor that parses .feature / .spec / .specification files using [yadda](https://github.com/acuminous/yadda) and generates a -test.js file in the acceptance test folder. It also adds a little loader helper ``/tests/helpers/yadda.js`` because yadda does not define an amd module.

The addon also adds a ``/tests/acceptance/steps/steps`` module you can extend in feature specific step definitions. Any shared step definitions should be moved to this file or included there. Feature specific step definitions reside in ``/tests/acceptance/steps/``. The generated feature test js file imports a ``/tests/acceptance/steps/[feature title]-steps`` module.

You can use ``ember g feature [feature title]`` to generate an feature file and a step definition.

For example:

``ember install ember-cli-yadda``
``ember g feature make-a-feature``

This adds yadda to your node modules and your bower plugins. It also adds the following files:

````
/tests/helpers/yadda.js
/tests/acceptance/steps/steps.js
/tests/acceptance/steps/make-a-feature-steps.js
/tests/acceptance/make-a-feature.feature
````
running ``ember serve`` should make the test results available at ``http://localhost:4200/tests``

The preprocessor takes ``/tests/acceptance/make-a-feature.feature`` and generates ``/app/tests/acceptance/make-a-feature-test.js`` with the parsed feature and qunit test definition.
