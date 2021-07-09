import { LitElement, html } from 'lit';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
import { eventOptions } from 'lit/decorators/event-options.js';
import { query } from 'lit/decorators/query.js';
import { baseStyles, createId, state, property } from '@cds/core/internal';
import { CdsGridRow } from './row/grid-row.element.js';
import { CdsGridCell } from './cell/grid-cell.element.js';
import { CdsGridColumn } from './column/grid-column.element.js';
import { DraggableListController } from './utils/draggable-list.controller.js';
import { GridKeyNavigationController, KeyGrid } from './utils/key-navigation.controller.js';
import { GridColumnGroupSizeController } from './utils/grid-column-group-size.controller.js';
import styles from './grid.element.scss';

export class CdsGrid extends LitElement implements KeyGrid {
  @property({ type: String }) columnLayout: 'fixed' | 'flex' = 'fixed';

  @state({ type: String, reflect: true }) protected _id = createId();

  @state({ type: Number, reflect: true, attribute: 'aria-rowcount' }) protected rowCount = 0;

  @state({ type: String, reflect: true, attribute: 'role' }) protected role = 'grid';

  /** @private */
  @queryAssignedNodes('columns', true, 'cds-grid-column') columns: NodeListOf<CdsGridColumn>;

  /** @private */
  @queryAssignedNodes('', true, 'cds-grid-row') rows: NodeListOf<CdsGridRow>;

  /** @private */
  @query('.grid-body') grid: HTMLElement;

  protected gridKeyNavigationController = new GridKeyNavigationController(this);
  
  protected gridColumnGroupSizeController = new GridColumnGroupSizeController(this);

  protected draggableColumnController = new DraggableListController(this, { axis: 'main', itemScope: 'cds-grid-column', zoneScope: 'cds-grid-column' });

  protected draggableListController = new DraggableListController(this, { axis: 'cross', itemScope: 'cds-grid-row', zoneScope: 'cds-grid-placeholder' });

  static styles = [baseStyles, styles];

  /** @private */
  get cells(): CdsGridCell[] {
    return Array.from(this.rows)
      .map(r => (r.cells ? Array.from(r.cells) : []))
      .flat();
  }

  render() {
    return html`
      <div class="private-host">
        <div class="grid" @scroll=${this.setContentVisibitity}>
          <div role="rowgroup" class="column-row-group">
            <div role="row" @mousedown=${this.initializeColumnWidths} @keydown=${this.initializeColumnWidths}>
              <slot name="columns" @slotchange=${this.calculateColWidths}></slot>
            </div>
          </div>
          <div class="grid-body" role="rowgroup">
            <slot @slotchange=${this.updateRows}></slot><slot name="placeholder"></slot>
          </div>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
        <slot name="detail"></slot>
      </div>
    `;
  }

  private async updateRows() {
    this.rowCount = this.rows.length;
    this.rows.forEach((r, i) => (r.row = i + 1));
    this.columns.forEach((c, i) => (c.colIndex = i + 1));
    await this.updateComplete;
    this.gridKeyNavigationController.initializeKeyGrid();
  }

  @eventOptions({ once: true })
  private setContentVisibitity() {
    this.style.setProperty('--row-content-visibility', 'visible'); // rows default to 'auto' for initial render, on scroll eager render to prevent cliping
  }

  @eventOptions({ once: true })
  private initializeColumnWidths() {
    this.gridColumnGroupSizeController.initializeColumnWidths();
  }

  private calculateColWidths() {
    this.gridColumnGroupSizeController.calculateGridColumnWidths();
  }
}
