/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { registerElementSafely } from '@clr/core/common';
import { html, LitElement } from 'lit-element';

import { styles } from './modal.element.css';

/**
 * Modal
 *
 * @noInheritDoc
 * @element cwc-modal
 * @slot default - Content slot for modal content
 */
// @dynamic
export class CwcModal extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`
      <div class="modal">
        <slot></slot>
      </div>
    `;
  }
}

registerElementSafely('cwc-modal', CwcModal);
