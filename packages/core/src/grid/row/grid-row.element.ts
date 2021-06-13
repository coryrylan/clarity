import { LitElement, html } from 'lit';
import { baseStyles, property } from '@cds/core/internal';

import { CdsGridCell } from '../cell/grid-cell.element.js';
import styles from './grid-row.element.scss';

export class CdsGridRow extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  @property({ type: Boolean, reflect: true }) select = false;

  @property({
    type: Number,
    reflect: true,
    attribute: 'aria-rowindex',
    converter: {
      toAttribute: (value: number) => value + 1,
      fromAttribute: (value: string) => parseInt(value) - 1,
    },
  })
  row: number = null;

  get cells(): NodeListOf<CdsGridCell> {
    // Using @queryAssignedNodes causes the list to be empty on re-render
    return this.querySelectorAll('cds-grid-cell');
  }

  render() {
    return html`
      <div part="row" @slotchange=${this.updateCells}>
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'row');
  }

  private updateCells() {
    this.cells.forEach((c, i) => (c.col = i));
  }
}
