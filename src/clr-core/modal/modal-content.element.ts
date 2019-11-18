/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit-element';

export class CwcModalContent extends LitElement {
  protected render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cwc-modal-content': CwcModalContent;
  }
}
