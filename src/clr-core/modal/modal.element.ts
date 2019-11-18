/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { commonStringsService, KeyCodes, registerElementSafely } from '@clr/core/common';
import { ClarityIcons, userIcon } from '@clr/core/icon';
import { html, LitElement, property } from 'lit-element';

import { CwcModalActions } from './modal-actions.element';
import { CwcModalContent } from './modal-content.element';
import { CwcModalHeader } from './modal-header.element';
import { styles } from './modal.element.css';

// TODO: update to close
ClarityIcons.addIcon(userIcon);

/**
 * Modal
 *
 * @noInheritDoc
 * @element cwc-modal
 * @slot cwc-modal-header - Content slot for modal header
 * @slot cwc-modal-content - Content slot for modal content
 * @slot cwc-modal-actions - Content slot for modal actions
 * @event openChange - Notify when the modal has been opened or closed.
 * @attr {String} size - Sets max width of the modal (`default`, `sm`, `lg`, `xl`)
 */
// @dynamic
export class CwcModal extends LitElement {
  static get styles() {
    return styles;
  }

  get open() {
    return this._open;
  }

  /** Toggle if modal should be open or closed. */
  @property({ type: Boolean })
  set open(value) {
    if (value !== this._open) {
      const old = this._open;
      this._open = value;
      this.requestUpdate('open', old);
      this.openChange();

      if (this._open) {
        this.focusedElementBeforeOpen = document.activeElement as HTMLElement;
      } else {
        this.focusedElementBeforeOpen.focus();
      }
    }
  }

  /** Option to set if modal can be closed by clicking the X or backdrop */
  @property({ type: Boolean })
  closable = true;

  /** Option to set if modal can be closed by clicking the modal backdrop */
  @property({ type: Boolean })
  backdropClosable = false;

  private focusedElementBeforeOpen: HTMLElement;
  private _open = false;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.removeOnEscape);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.removeOnEscape);
  }

  render() {
    return html`
    ${
      this.open
        ? html`
        <div class="modal-wrapper">
          <div class="modal" role="dialog" aria-labelledby="modal-header">
            <header>
              <slot name="header" id="modal-header"></slot>
              ${
                this.closable
                  ? html`
              <button
                @click="${() => this.closeModal()}"
                type="button"
                aria-label="${commonStringsService.keys.close}"
              >
                <cwc-icon shape="close"></cwc-icon>
              </button>
              `
                  : ''
              }
            </header>
            <section>
              <slot></slot>
            </section>
            <footer>
              <slot name="actions"></slot>
            </footer>
          </div>
          <div @click="${() => this.backdropClose()}" class="modal-backdrop"></div>
        </div>
      `
        : ''
    }
    `;
  }

  private removeOnEscape = (event: KeyboardEvent) => {
    if ((event.key === KeyCodes.Escape || event.key === 'Esc') && this.open) {
      this.closeModal();
    }
    // tslint:disable-next-line: semicolon
  };

  private backdropClose() {
    if (this.backdropClosable && this.closable) {
      this.closeModal();
    }
  }

  private closeModal() {
    this.open = false;
  }

  private openChange() {
    this.dispatchEvent(new CustomEvent('openChange', { detail: this.open }));
  }
}

registerElementSafely('cwc-modal', CwcModal);
registerElementSafely('cwc-modal-header', CwcModalHeader);
registerElementSafely('cwc-modal-content', CwcModalContent);
registerElementSafely('cwc-modal-actions', CwcModalActions);

declare global {
  interface HTMLElementTagNameMap {
    'cwc-modal': CwcModal;
  }
}
