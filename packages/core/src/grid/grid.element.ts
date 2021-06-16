import { LitElement, html } from 'lit';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
import { eventOptions } from 'lit/decorators/event-options.js';
import { query } from 'lit/decorators/query.js';
import { baseStyles, createId, state } from '@cds/core/internal';

import { CdsGridRow } from './row/grid-row.element.js';
import { CdsGridCell } from './cell/grid-cell.element.js';
import { CdsGridColumn } from './column/grid-column.element.js';
import { DraggableListController } from './utils/draggable-list.controller.js';
import { GridKeyNavigationController, KeyGrid } from './utils/key-navigation.controller.js';
import styles from './grid.element.scss';

export class CdsGrid extends LitElement implements KeyGrid {
  static get styles() {
    return [baseStyles, styles];
  }

  /** @private */
  @queryAssignedNodes('columns', true, 'cds-grid-column') columns: NodeListOf<CdsGridColumn>;

  /** @private */
  @queryAssignedNodes('', true, 'cds-grid-row') rows: NodeListOf<CdsGridRow>;

  /** @private */
  @query('.grid-body') grid: HTMLElement;

  /** @private */
  @state({ type: String, reflect: true }) _id = createId();

  @state({ type: Number, reflect: true, attribute: 'aria-rowcount' }) rowCount = 0;

  /** @private */
  get cells(): CdsGridCell[] {
    return Array.from(this.rows)
      .map(r => (r.cells ? Array.from(r.cells) : []))
      .flat();
  }

  protected gridKeyNavigationController = new GridKeyNavigationController(this);

  protected draggableListController = new DraggableListController(this);

  render() {
    return html`
      <div class="private-host">
        <div class="grid" @scroll=${this.setRowVisibility}>
          <div role="rowgroup" class="column-row-group">
            <div
              role="row"
              class="column-row"
              @mousedown=${{ handleEvent: () => this.initializeColumnWidths(), once: true }}
            >
              <slot name="columns" @slotchange=${this.calculateGridColumns}></slot>
            </div>
          </div>
          <div class="grid-body" role="rowgroup"><slot></slot><slot name="placeholder"></slot></div>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
        <slot name="detail"></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'grid');
  }

  firstUpdated(props: Map<string, any>) {
    super.firstUpdated(props);
    this.listenForRowUpdates();
    this.listenColumnSort();
    this.listenForColumnHiddenChange();
    // this.addEventListener('positionChange', (e: any) => this.initializeColumnWidths());
  }

  @eventOptions({ once: true })
  private setRowVisibility() {
    // rows default to 'auto' for initial render, on scroll eager render to prevent overflow cliping
    this.style.setProperty('--row-content-visibility', 'visible');
  }

  private listenForRowUpdates() {
    this.shadowRoot.addEventListener('slotchange', (e: any) => {
      if (e.target.name === '') {
        this.rowCount = this.rows.length;
        this.rows.forEach((r, i) => (r.row = i));
        this.columns.forEach((c, i) => (c.col = i + 1));
        this.gridKeyNavigationController.initializeKeyGrid();
      }
    });
  }

  private listenForColumnHiddenChange() {
    this.addEventListener('hiddenChange', (e: any) => {
      if (e.target.tagName.toLowerCase() === 'cds-grid-column') {
        this.calculateGridColumns();
      }
    });
  }

  private listenColumnSort() {
    this.addEventListener('sortChange', (e: any) => {
      if (e.target.tagName.toLowerCase() === 'cds-grid-column') {
        this.gridKeyNavigationController.initializeKeyGrid();
      }
    });
  }

  private initializeColumnWidths() {
    Array.from(this.columns)
      .filter(column => !column.width && !column.hidden)
      .map(column => [column, parseInt(getComputedStyle(column).width)])
      .forEach(([column, width]: any) => {
        this.style.setProperty(`--col-${column.col}-width`, column.width ? `${column.width}px` : `${width}px`);
      });
  }

  private calculateGridColumns() {
    const colWidths = Array.from(this.columns)
      .filter(c => !c.hidden)
      .reduce((p, c) => `${p} ${`var(--col-${c.col}-width, ${c.width ? `${c.width}px` : '1fr'})`}`, '');
    this.style.setProperty('--grid-template-columns', colWidths);
  }
}
