'use strict';

module.exports = {
  name: 'ember-cli-yadda',
  description: 'ember-cli-yadda',
  normalizeEntityName() {
  },
  afterInstall() {
    return this.addAddonToProject('ember-browserify');
  }
};
