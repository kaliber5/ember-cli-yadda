## v0.7.0 (2021-10-19)

#### :boom: Breaking Change
* [#246](https://github.com/kaliber5/ember-cli-yadda/pull/246) Update to ember-auto-import v2 ([@simonihmig](https://github.com/simonihmig))
* [#248](https://github.com/kaliber5/ember-cli-yadda/pull/248) Update Ember to 3.28, drop support for 3.16 ([@simonihmig](https://github.com/simonihmig))
* [#247](https://github.com/kaliber5/ember-cli-yadda/pull/247) Drop node 10 support ([@simonihmig](https://github.com/simonihmig))

#### :rocket: Enhancement
* [#246](https://github.com/kaliber5/ember-cli-yadda/pull/246) Update to ember-auto-import v2 ([@simonihmig](https://github.com/simonihmig))
* [#248](https://github.com/kaliber5/ember-cli-yadda/pull/248) Update Ember to 3.28, drop support for 3.16 ([@simonihmig](https://github.com/simonihmig))

#### Committers: 2
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v0.6.0 (2020-11-06)

#### :boom: Breaking Change
* [#86](https://github.com/kaliber5/ember-cli-yadda/pull/86) Avoid importing yadda from ember-cli-yadda ([@simonihmig](https://github.com/simonihmig))
* [#85](https://github.com/kaliber5/ember-cli-yadda/pull/85) Update dependencies, drop support for node < 10, Ember < 3.16 ([@simonihmig](https://github.com/simonihmig))

#### :rocket: Enhancement
* [#87](https://github.com/kaliber5/ember-cli-yadda/pull/87) Support Embroider ([@simonihmig](https://github.com/simonihmig))

#### :bug: Bug Fix
* [#86](https://github.com/kaliber5/ember-cli-yadda/pull/86) Avoid importing yadda from ember-cli-yadda ([@simonihmig](https://github.com/simonihmig))

#### :memo: Documentation
* [#81](https://github.com/kaliber5/ember-cli-yadda/pull/81) Readme: Fix link to Yadda docs ([@lolmaus](https://github.com/lolmaus))

#### :house: Internal
* [#90](https://github.com/kaliber5/ember-cli-yadda/pull/90) Setup dependabot ([@simonihmig](https://github.com/simonihmig))
* [#89](https://github.com/kaliber5/ember-cli-yadda/pull/89) Setup release-it ([@simonihmig](https://github.com/simonihmig))
* [#88](https://github.com/kaliber5/ember-cli-yadda/pull/88) Setup Github actions, use yarn ([@simonihmig](https://github.com/simonihmig))

#### Committers: 3
- Andrey Mikhaylov (lolmaus) ([@lolmaus](https://github.com/lolmaus))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

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