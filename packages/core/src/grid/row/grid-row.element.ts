import { LitElement, html } from 'lit';
import { baseStyles, property, state } from '@cds/core/internal';

import { CdsGridCell } from '../cell/grid-cell.element.js';
import styles from './grid-row.element.scss';

export class CdsGridRow extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  @property({ type: Boolean, reflect: true }) select = false;

  @property({ type: String }) position: 'fixed' = null;

  @state({ type: Number, reflect: true, attribute: 'aria-rowindex' }) row: number = null;

  @state({ type: String, reflect: true, attribute: 'role' }) protected role = 'row';

  get cells(): NodeListOf<CdsGridCell> {
    return this.querySelectorAll('cds-grid-cell');
  }

  render() {
    return html`
      <div part="row" @slotchange=${this.updateCells}>
        <slot></slot>
      </div>
    `;
  }

  updated(props: Map<string, any>) {
    super.updated(props);
    if (props.has('position') && this.position !== props.get('position') && this.position === 'fixed') {
      this.parentElement.style.setProperty('--scroll-padding-top', 'calc(var(--row-height) * 2)');
    }
  }

  private updateCells() {
    this.cells.forEach((c, i) => (c.colIndex = i + 1));
  }
}
