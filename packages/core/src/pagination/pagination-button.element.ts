/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { assignSlotNames, property } from '@cds/core/internal';
import { state } from 'lit/decorators/state.js';
import { CdsControlAction } from '@cds/core/control-action';

export enum CdsPaginationButtonAction {
  First = 'first',
  Previous = 'prev',
  Next = 'next',
  Last = 'last',
}

/**
 * Web component pagination button to be used inside pagination.
 *
 * ```typescript
 * import '@cds/core/pagination/register.js';
 * ```
 *
 * ```html
 * <cds-pagination>
 *   <cds-pagination-button action="first" disabled></cds-pagination-button>
 *   <cds-pagination-button action="prev" disabled></cds-pagination-button>
 *   <span aria-label="current page">1 / 3</span>
 *   <cds-pagination-button action="next"></cds-pagination-button>
 *   <cds-pagination-button action="last"></cds-pagination-button>
 * </cds-pagination>
 * ```
 *
 * @beta
 * @element cds-pagination-button
 * @slot
 * @slot cds-icon
 * @cssprop --background
 * @cssprop --padding
 * @cssprop --border-color
 * @cssprop --border-width
 * @cssprop --border-radius
 * @cssprop --box-shadow
 * @cssprop --min-height
 * @cssprop --min-width
 */

export class CdsPaginationButton extends CdsControlAction {
  /**
   * @type {first | prev | next | last}
   * Sets the action from a predefined list of actions
   */
  @property({ type: String, reflect: true }) action: CdsPaginationButtonAction;

  @state() direction: 'up' | 'right' | 'down' | 'left';

  get cdsIcon() {
    return this.shadowRoot.querySelector('cds-icon');
  }

  connectedCallback() {
    super.connectedCallback();
    this.type = 'button';
  }

  updated(props: Map<string, any>) {
    super.updated(props);

    assignSlotNames([this, false]);

    switch (this.action) {
      case CdsPaginationButtonAction.Next:
        this.shape = 'angle';
        this.direction = 'right';
        break;
      case CdsPaginationButtonAction.Last:
        this.shape = 'step-forward-2';
        this.direction = 'up';
        break;
      case CdsPaginationButtonAction.Previous:
        this.shape = 'angle';
        this.direction = 'left';
        break;
      case CdsPaginationButtonAction.First:
        this.shape = 'step-forward-2';
        this.direction = 'down';
        break;
      default:
    }

    if (this.cdsIcon) {
      this.cdsIcon.direction = this.direction;
    }
  }
}
