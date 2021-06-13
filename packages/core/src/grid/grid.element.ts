import { LitElement, html } from 'lit';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
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

  @queryAssignedNodes('columns', true, 'cds-grid-column') columns: NodeListOf<CdsGridColumn>;

  @queryAssignedNodes('', true, 'cds-grid-row') rows: NodeListOf<CdsGridRow>;

  @query('.grid-body') grid: HTMLElement;

  @state({ type: String, reflect: true }) _id = createId();

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
        <div class="grid">
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

  private listenForRowUpdates() {
    this.shadowRoot.addEventListener('slotchange', (e: any) => {
      if (e.target.name === '') {
        this.rows.forEach((r, i) => (r.row = i));
        this.setAttribute('aria-rowcount', `${this.rows.length}`);
        this.columns.forEach((c, i) => (c.col = i));
        this.gridKeyNavigationController.initializeKeyGrid();
      }
    });
  }

  private listenForColumnHiddenChange() {
    this.addEventListener('hiddenChange', (e: any) => {
      if (e.target.tagName.toLowerCase() === 'cds-grid-column') {
        this.cells
          .filter(c => c.col === e.target.col)
          .forEach(cell => (e.target.hidden ? cell.setAttribute('hidden', '') : cell.removeAttribute('hidden')));
        this.calculateGridColumns();
      }
    });
  }

  private listenColumnSort() {
    this.columns.forEach(col => {
      col.addEventListener('sortChange', (event: any) => {
        this.shadowRoot.querySelector(`#${event.target._id}`)?.setAttribute('aria-sort', event.detail); // todo move to column
        this.gridKeyNavigationController.initializeKeyGrid();
      });
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
      .reduce(
        (prev, column) => `${prev} ${`var(--col-${column.col}-width, ${column.width ? `${column.width}px` : '1fr'})`}`,
        ''
      );

    this.style.setProperty('--grid-template-columns', colWidths);
  }
}
