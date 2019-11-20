/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit-element';

import { registerElementSafely } from '@clr/core/common';

export class CwcModalHeader extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('slot', 'header');
  }

  protected render() {
    return html`
      <slot></slot>
    `;
  }
}

registerElementSafely('cwc-modal-header', CwcModalHeader);

declare global {
  interface HTMLElementTagNameMap {
    'cwc-modal-header': CwcModalHeader;
  }
}
