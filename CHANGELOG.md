### Version 0.0.5

  - adds support for mocha (thanks @adamjmcgrath)

### Version 0.0.4

  - adds a context object ``this.ctx`` that is share between steps in a scenario
  - bumps yadda to 0.15.4 which includes a library for dutch

### Version 0.0.3

  - fixes a bug with the build order ember-cli-yadda needs to go __before__ babel
  - fixes a bug with top level features the path to the root steps in the
    accompanying steps file was wrong.

### Version 0.1.0

  - fix context in mocha https://github.com/curit/ember-cli-yadda/pull/23
  - don't hide this with arrow functions in generated example steps https://github.com/curit/ember-cli-yadda/pull/26
  - remove `expect` calls from test https://github.com/curit/ember-cli-yadda/pull/28
  - import destroyApp from consuming app https://github.com/curit/ember-cli-yadda/pull/31