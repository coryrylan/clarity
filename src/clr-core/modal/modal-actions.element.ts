/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit-element';

import { registerElementSafely } from '@clr/core/common';

export class CwcModalActions extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('slot', 'actions');
  }

  protected render() {
    return html`
      <slot></slot>
    `;
  }
}

registerElementSafely('cwc-modal-actions', CwcModalActions);

declare global {
  interface HTMLElementTagNameMap {
    'cwc-modal-actions': CwcModalActions;
  }
}
