/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit';
import { property, baseStyles, CdsBaseButton, LogService, assignSlotNames } from '@cds/core/internal';
import styles from './control-action.element.scss';

/**
 * Control Action Button
 *
 * ```typescript
 * import '@cds/core/button/register.js';
 * ```
 *
 * ```html
 * <cds-control-action>
 *
 * </cds-control-action>
 * ```
 * @internal
 * @element cds-control-action
 * @slot - For projecting text content or cds-icon
 */
export class CdsControlAction extends CdsBaseButton {
  @property({ type: String }) shape: string;

  @property({ type: String }) ariaLabel?: string;

  /** Set the action type placement within the supporting input control */
  @property({ type: String, reflect: true }) action: 'label' | 'prefix' | 'suffix' | string;

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`
      <div class="private-host">
        ${this.shape ? html`<cds-icon .shape=${this.shape}></cds-icon>` : html`<slot></slot>`}
      </div>
    `;
  }

  updated(props: Map<string, any>) {
    super.updated(props);

    if (!this.ariaLabel && !this.readonly) {
      LogService.warn('A aria-label is required for interactive cds-control-actions', this);
    }

    if (props.has('action')) {
      assignSlotNames([this, this.action ?? false]);
    }
  }
}
