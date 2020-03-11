/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit-html';
import * as tokenData from './generated/index.json';

export default {
  title: 'Experimental/Tokens/Stories',
  parameters: {
    options: { showPanel: true },
    a11y: { disable: true },
  },
};

function getTokens(category = ''): {}[] {
  return Object.keys((tokenData as any).props)
    .filter(tokenName => (tokenData as any).props[tokenName].private !== true)
    .filter(
      tokenName =>
        (tokenData as any).props[tokenName].category === category || (tokenData as any).props[tokenName].category === ''
    )
    .sort()
    .map(tokenName => {
      const token = (tokenData as any).props[tokenName];
      const value = token.base20Rem && !token['absolute-value'] ? `${token.base20Rem} (${token.value})` : token.value;
      return html`--cds-token-${token.category}-${token.name}: <span cds-text="code">${value}</span>;`;
    });
}

export const global = () => {
  return html`
    <div cds-layout="horizontal gap-md">
      ${getTokens('global').map(token => html`<p cds-text="subsection">${token}</p>`)}
    </div>
  `;
};

export const layout = () => {
  return html`
    <div cds-layout="horizontal gap-md">
      ${getTokens('layout').map(token => html`<p cds-text="subsection">${token}</p>`)}
    </div>
  `;
};

export const typography = () => {
  return html`
    <div cds-layout="horizontal gap-md">
      ${getTokens('typography').map(token => html`<p cds-text="subsection">${token}</p>`)}
    </div>
  `;
};

export const uncategorized = () => {
  return html`
    <div cds-layout="horizontal gap-md">
      ${getTokens('').map(token => html`<p cds-text="subsection">${token}</p>`)}
    </div>
  `;
};
