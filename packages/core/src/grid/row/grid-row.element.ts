import { LitElement, html } from 'lit';
import { baseStyles, property, propUpdated, state } from '@cds/core/internal';

import { GridRowA11yController } from './grid-row-a11y.controller.js';
import { CdsGridCell } from '../cell/grid-cell.element.js';
import styles from './grid-row.element.scss';

export class CdsGridRow extends LitElement {
  @property({ type: Boolean }) select = false;

  @property({ type: String }) position: 'fixed' = null;

  @state({ type: Number }) row: number = null;

  protected gridRowA11yController = new GridRowA11yController(this);

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

  updated(props: Map<string, any>) {
    super.updated(props);
    if (propUpdated(this, props, 'position') && this.position === 'fixed') {
      this.parentElement.style.setProperty('--scroll-padding-top', 'calc(var(--row-height) * 2)');
    }
  }

  private async updateCells() {
    await this.updateComplete;
    this._cells = null;
    this.cells.forEach((c, i) => (c.colIndex = i + 1));
  }
}
