/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit-html';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Documentation|Typography(Alpha)',
  decorators: [withDesign],
  parameters: {
    options: { showPanel: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v2mkhzKQdhECXOx8BElgdA/Clarity-UI-Library---light-2.2.0?node-id=0%3A2677',
    },
  },
};

export const API = () => {
  return html`
    <cds-layout type="stack" gap="md" cds-body-text>
      <cds-heading level="1">Typography (Alpha)</cds-heading>

      <cds-text level="1">
        Clarity Core Typography System provides a flexible API to apply typography
        styles explicitly to elements. This gives full control of the styles of
        an element allowing the use of proper sematic HTML elements.
      </cds-text>

      <cds-text level="1">
        The default body font and text styles are applied by adding the
        cds-body-text attribute to the body element.
      </cds-text>

      <cds-card>
        <cds-layout type="stack" gap="md">
          <cds-heading level="2">Heading 2</cds-heading>
          <cds-heading level="3">Heading 3</cds-heading>
          <cds-heading level="4">Heading 4</cds-heading>
          <cds-heading level="5">Heading 5</cds-heading>
          <cds-heading level="6">Heading 6</cds-heading>
          <cds-divider></cds-divider>
          <h1 cds-heading="1">Heading 1</h1>
          <h2 cds-heading="2">Heading 2</h2>
          <h3 cds-heading="3">Heading 3</h3>
          <h4 cds-heading="4">Heading 4</h4>
          <h5 cds-heading="5">Heading 5</h5>
          <h6 cds-heading="6">Heading 6</h6>
        </cds-layout>
      </cds-card>

      <cds-card>
        <cds-layout type="stack" gap="md">
          <cds-heading level="2">Paragraphs</cds-heading>

          <cds-text level="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</cds-text>
          <cds-text level="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</cds-text>
          <cds-text level="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</cds-text>
          <cds-text level="4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</cds-text>
          <cds-text level="5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</cds-text>
          <cds-text level="6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</cds-text>
          <cds-text level="7">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</cds-text>
          <cds-text level="8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</cds-text>
          <cds-divider></cds-divider>
          <p cds-text="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p cds-text="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p cds-text="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p cds-text="4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p cds-text="5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p cds-text="6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p cds-text="7">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p cds-text="8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>  
        </cds-layout>
      </cds-card>
    </cds-layout>
  `;
};
