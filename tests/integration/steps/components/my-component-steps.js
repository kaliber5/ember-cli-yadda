import steps from './steps';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function (assert) {
  return steps(assert).when(
    'I render the component with "$text"',
    async function (text) {
      this.set('content', text);
      await render(hbs`
      {{#my-component}}
        {{content}}
      {{/my-component}}
    `);
    }
  );
}
