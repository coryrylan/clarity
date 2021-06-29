import { LitElement, html } from 'lit';
import { baseStyles, property, state } from '@cds/core/internal';

import { CdsGridCell } from '../cell/grid-cell.element.js';
import styles from './grid-row.element.scss';

export class CdsGridRow extends LitElement {
  @property({ type: Boolean }) select = false;

  @property({ type: String }) position: 'fixed' = null;

  @state({ type: Number }) row: number = null;

  static styles = [baseStyles, styles];

  private _cells: NodeListOf<CdsGridCell> = null;
  get cells(): NodeListOf<CdsGridCell> {
    this._cells = this._cells ?? this.querySelectorAll('cds-grid-cell');
    return this._cells;
  }

  render() {
    return html`
      <div part="row" @slotchange=${this.updateCells}>
        <slot></slot>
      </div>
    `;
  }

  firstUpdated(props: Map<string, any>) {
    super.firstUpdated(props);
    this.setAttribute('role', 'row');
  }

  updated(props: Map<string, any>) {
    super.updated(props);
    if (props.has('position') && this.position !== props.get('position') && this.position === 'fixed') {
      this.parentElement.style.setProperty('--scroll-padding-top', 'calc(var(--row-height) * 2)');
    }

    if (props.has('row') && props.get('row') !== this.row) {
      this.setAttribute('aria-rowindex', `${this.row}`);
    }
  }

  private async updateCells() {
    await this.updateComplete;
    this._cells = null;
    this.cells.forEach((c, i) => (c.colIndex = i + 1));
  }
}
