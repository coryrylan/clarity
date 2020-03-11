/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit-html';
import * as tokenData from './tokens/index.json';

export default {
  title: 'Experimental/Design Tokens',
  parameters: {
    options: { showPanel: true },
    a11y: { disable: true },
  },
};

function getTokens(): {}[] {
  return Object.keys((tokenData as any).props)
    .filter(tokenName => (tokenData as any).props[tokenName].private !== true)
    .map(tokenName => {
      const token = (tokenData as any).props[tokenName];
      const value = token.base20Rem && !token['absolute-value'] ? `${token.base20Rem} (${token.value})` : token.value;
      return `--cds-token-${token.category}-${token.name}: ${value}`;
    })
    .sort();
}

export const tokens = () => {
  return html`
    <div cds-layout="horizontal gap-md">
      <h1 cds-text="h1">Design Tokens</h1>
      <p cds-text="p1">
        Design Tokens are global variables to configure the foundation of the
        design system. Tokens control values such as color, spacing and
        typography. Changes to a design token will propagate throughout the entire system.
      </p>
      ${getTokens().map(token => html`<p cds-text="h4"><span cds-text="code">${token}</span></p>`)}
    </div>
  `;
};
