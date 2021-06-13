/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement, css } from 'lit';
import { query } from 'lit/decorators/query.js';
import { queryAll } from 'lit/decorators/query-all.js';
import { baseStyles, registerElementSafely, state } from '@cds/core/internal';
import '@cds/core/pagination/register.js';
import '@cds/core/checkbox/register.js';
import '@cds/core/select/register.js';
import '@cds/core/radio/register.js';
import '@cds/core/grid/register.js';

import { getData, paginate, filter, sort, sortList } from '../utils/storybook.js';
import { GridKeyNavigationController, KeyGrid } from '../utils/key-navigation.controller.js';
import { DraggableListController } from '../utils/draggable-list.controller.js';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function basic() {
  return html`
    <button>start</button>
    <cds-grid>
      <cds-grid-column>Type</cds-grid-column>
      <cds-grid-column>Description</cds-grid-column>
      <cds-grid-column>Amount</cds-grid-column>
      <cds-grid-column>Balance</cds-grid-column>

      <cds-grid-row>
        <cds-grid-cell>Deposit</cds-grid-cell>
        <cds-grid-cell>Item</cds-grid-cell>
        <cds-grid-cell>$1,000,000.00</cds-grid-cell>
        <cds-grid-cell>$1,000,000.00</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Credit</cds-grid-cell>
        <cds-grid-cell>Billing</cds-grid-cell>
        <cds-grid-cell>$250.00</cds-grid-cell>
        <cds-grid-cell>$523,750.00</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Debit</cds-grid-cell>
        <cds-grid-cell>Renewal</cds-grid-cell>
        <cds-grid-cell>$9.00</cds-grid-cell>
        <cds-grid-cell>$163,262.00</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Credit</cds-grid-cell>
        <cds-grid-cell>Subscription</cds-grid-cell>
        <cds-grid-cell>$53.00</cds-grid-cell>
        <cds-grid-cell>$347,423.00</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Deposit</cds-grid-cell>
        <cds-grid-cell>Subscription</cds-grid-cell>
        <cds-grid-cell>$1239.00</cds-grid-cell>
        <cds-grid-cell>$564,772.00</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Deposit</cds-grid-cell>
        <cds-grid-cell>Service Fee</cds-grid-cell>
        <cds-grid-cell>$49.00</cds-grid-cell>
        <cds-grid-cell>$977,527.00</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Debit</cds-grid-cell>
        <cds-grid-cell>Account Transfer</cds-grid-cell>
        <cds-grid-cell>$2300.00</cds-grid-cell>
        <cds-grid-cell>$423,236.00</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Credit</cds-grid-cell>
        <cds-grid-cell>Payment</cds-grid-cell>
        <cds-grid-cell>$9.00</cds-grid-cell>
        <cds-grid-cell>$199,282.00</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Debit</cds-grid-cell>
        <cds-grid-cell>Unknown</cds-grid-cell>
        <cds-grid-cell>$9.00</cds-grid-cell>
        <cds-grid-cell>$929,741.00</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Debit</cds-grid-cell>
        <cds-grid-cell>Provider</cds-grid-cell>
        <cds-grid-cell>$9203.00</cds-grid-cell>
        <cds-grid-cell>$239,120.00</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-footer></cds-grid-footer>
    </cds-grid>
    <button>end</button>
  `;
}

export function keyboard() {
  return html`
    <cds-grid style="--body-height: 320px">
      <cds-grid-column width="150" resizable="false">Key</cds-grid-column>
      <cds-grid-column>Function</cds-grid-column>
      <cds-grid-row>
        <cds-grid-cell>Right Arrow</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus one cell to the right.</li>
            <li>If focus is on the right-most cell in the row, focus does not move.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Left Arrow</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus one cell to the left.</li>
            <li>If focus is on the left-most cell in the row, focus does not move.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Down Arrow</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus one cell down.</li>
            <li>If focus is on the bottom cell in the column, focus does not move.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Up Arrow</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus one cell Up.</li>
            <li>If focus is on the top cell in the column, focus does not move.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Page Down</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>
              Moves focus down five rows, scrolling so the bottom row in the currently visible set of rows becomes the
              first visible row.
            </li>
            <li>If focus is in the last row, focus does not move.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Page Up</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>
              Moves focus up 5 rows, scrolling so the top row in the currently visible set of rows becomes the last
              visible row.
            </li>
            <li>If focus is in the first row of the grid, focus does not move.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Home</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus to the first cell in the row that contains focus.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>End</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus to the last cell in the row that contains focus.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Control + Home</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus to the first cell in the first row.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>Control + End</cds-grid-cell>
        <cds-grid-cell>
          <ul cds-list>
            <li>Moves focus to the last cell in the last row.</li>
          </ul>
        </cds-grid-cell>
      </cds-grid-row>
      <cds-grid-footer>
        <a
          cds-text="subsection link"
          href="https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html#kbd_label"
          >spec</a
        >
      </cds-grid-footer>
    </cds-grid>
  `;
}

export function kitchenSink() {
  return html``;
}

export function pagination() {
  class DemoPagination extends LitElement {
    @state() private data = getData();
    @state() private filteredList: any[] = [];
    @state() private search = '';
    @state() private currentPage = 0;
    @state() private pageSize = 10;
    @state() private pageCount = 1;

    render() {
      return html`
        <cds-grid style="--body-height: 320px">
          <cds-grid-column>Stock</cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          ${this.filteredList.map(
            entry => html`
              <cds-grid-row>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>$${entry.average}</cds-grid-cell>
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-footer>
            <cds-pagination aria-label="pagination">
              <cds-select control-width="shrink" responsive="false">
                <label cds-layout="display:screen-reader-only">per page</label>
                <select @input=${(e: any) => (this.pageSize = e.target.value)} style="width: 46px">
                  <option value="5">5</option>
                  <option value="10" selected>10</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                </select>
              </cds-select>
              <cds-pagination-button
                aria-label="go to first"
                ?disabled=${this.currentPage === 0}
                action="first"
                @click=${this.firstPage}
              ></cds-pagination-button>
              <cds-pagination-button
                aria-label="go to previous"
                ?disabled=${this.currentPage === 0}
                action="prev"
                @click=${this.prevPage}
              ></cds-pagination-button>
              <cds-input cds-pagination-number>
                <input
                  type="number"
                  value="1"
                  size="1"
                  aria-label="current page"
                  @input=${this.setPage}
                  .value=${this.currentPage + 1}
                  min="1"
                  max=${this.pageCount}
                />
                <cds-control-message>/ ${this.pageCount}</cds-control-message>
              </cds-input>
              <cds-pagination-button
                aria-label="go to next"
                ?disabled=${this.currentPage === this.pageCount - 1}
                action="next"
                @click=${this.nextPage}
              ></cds-pagination-button>
              <cds-pagination-button
                aria-label="go to last"
                ?disabled=${this.currentPage === this.pageCount - 1}
                action="last"
                @click=${this.lastPage}
              ></cds-pagination-button>
            </cds-pagination>
          </cds-grid-footer>
        </cds-grid>
      `;
    }

    connectedCallback() {
      super.connectedCallback();
      this.updateList();
    }

    updated(props: Map<string, any>) {
      super.updated(props);
      if (
        (props.has('currentPage') && props.get('currentPage') !== this.currentPage) ||
        (props.has('search') && props.get('search') !== this.search) ||
        (props.has('pageSize') && props.get('pageSize') !== this.pageSize)
      ) {
        this.updateList();
      }

      if (props.has('search') && props.get('search') !== this.search) {
        this.firstPage();
      }
    }

    private updateList() {
      let list = filter([...this.data], 'id', this.search);
      this.pageCount = Math.ceil(list.length / this.pageSize);
      this.filteredList = paginate(list, this.pageSize)[this.currentPage] ?? [];
    }

    private setPage(event: any) {
      this.currentPage = parseInt(event.target.value) - 1;
    }

    private nextPage() {
      if (this.currentPage <= this.pageCount) {
        this.currentPage++;
      }
    }

    private prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    }

    private firstPage() {
      this.currentPage = 0;
    }

    private lastPage() {
      this.currentPage = Math.ceil(this.data.length / this.pageSize) - 1;
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-pagination', DemoPagination);
  return html`<demo-grid-pagination></demo-grid-pagination>`;
}

export function columnVisibility() {
  enum ColumnTypes {
    Stock = 1,
    Average = 2,
    Current = 4,
    About = 8,
    All = ColumnTypes.Stock | ColumnTypes.Average | ColumnTypes.Current | ColumnTypes.About,
  }

  class DemoColumnVisibility extends LitElement {
    @state() private data = getData();
    @state() private toggleColumns = false;
    @state() private selectedColumns = ColumnTypes.All;

    render() {
      return html`
        <cds-grid style="--body-height: 320px">
          <cds-grid-column>Stock</cds-grid-column>
          ${this.checked(ColumnTypes.Average) ? html`<cds-grid-column>Average</cds-grid-column>` : ''}
          <cds-grid-column ?hidden=${!this.checked(ColumnTypes.Current)}>Current</cds-grid-column>
          <cds-grid-column ?hidden=${!this.checked(ColumnTypes.About)}>About</cds-grid-column>
          ${this.data.map(
            entry => html`
              <cds-grid-row>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                ${this.checked(ColumnTypes.Average) ? html`<cds-grid-cell>$${entry.average}</cds-grid-cell>` : ''}
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-footer>
            <cds-action-button
              id="toggle-columns"
              @click=${() => (this.toggleColumns = true)}
              aria-label="filter column"
            >
              <cds-icon shape="view-columns"></cds-icon>
            </cds-action-button>
            <cds-dropdown
              ?hidden=${!this.toggleColumns}
              @hiddenChange=${() => (this.toggleColumns = false)}
              anchor="#toggle-columns"
              position="top"
            >
              <cds-checkbox-group layout="vertical">
                <cds-checkbox>
                  <label>Average</label>
                  <input
                    type="checkbox"
                    value="${ColumnTypes.Average}"
                    @click=${this.selectColumns}
                    .checked=${this.checked(ColumnTypes.Average)}
                  />
                </cds-checkbox>
                <cds-checkbox>
                  <label>Current</label>
                  <input
                    type="checkbox"
                    value="${ColumnTypes.Current}"
                    @click=${this.selectColumns}
                    .checked=${this.checked(ColumnTypes.Current)}
                  />
                </cds-checkbox>
                <cds-checkbox>
                  <label>About</label>
                  <input
                    type="checkbox"
                    value="${ColumnTypes.About}"
                    @click=${this.selectColumns}
                    .checked=${this.checked(ColumnTypes.About)}
                  />
                </cds-checkbox>
              </cds-checkbox-group>
              <cds-button action="flat" @click=${this.selectAll} ?disabled=${this.checked(ColumnTypes.All)}
                >Select All</cds-button
              >
            </cds-dropdown>
          </cds-grid-footer>
        </cds-grid>
      `;
    }

    private selectColumns() {
      this.selectedColumns = Array.from(this.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'))
        .filter(c => c.checked)
        .map(c => parseInt(c.value))
        .reduce((p, n) => p + n, 0);
    }

    private selectAll() {
      this.selectedColumns = this.checked(ColumnTypes.All) ? 0 : ColumnTypes.All;
    }

    private checked(value: ColumnTypes) {
      return value === (this.selectedColumns & value);
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-column-visibility', DemoColumnVisibility);
  return html`<demo-grid-column-visibility></demo-grid-column-visibility>`;
}

export function detailView() {
  class DemoDetailView extends LitElement {
    @state() private data = getData();
    @state() private currentDetail: any = null;

    render() {
      return html`
        <cds-grid style="--body-height: 320px">
          <cds-grid-column width="44"></cds-grid-column>
          <cds-grid-column>Stock</cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          ${this.data.map(
            entry => html`
              <cds-grid-row>
                <cds-grid-cell>
                  <cds-action-button
                    id="${entry.id}-detail-demo"
                    aria-label="view ${entry.id} details"
                    @click=${() => this.showDetail(entry.id)}
                    style="margin-right: 8px"
                  >
                    <cds-icon shape="angle" direction="right"></cds-icon>
                  </cds-action-button>
                </cds-grid-cell>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>$${entry.average}</cds-grid-cell>
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-footer></cds-grid-footer>
          <cds-grid-detail
            ?hidden=${!this.currentDetail}
            anchor="${this.currentDetail?.id}-detail-demo"
            @closeChange=${this.closeDetail}
          >
            <h2>${this.currentDetail?.id}</h2>
            <p>Average: $${this.currentDetail?.average}</p>
            <p>Current: $${this.currentDetail?.value}</p>
            <p>About: ${this.currentDetail?.about}</p>
          </cds-grid-detail>
        </cds-grid>
      `;
    }

    private showDetail(id: string) {
      this.currentDetail = this.data.find(i => i.id === id);
    }

    private closeDetail() {
      this.currentDetail = null;
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-detail-view', DemoDetailView);
  return html`<demo-grid-detail-view></demo-grid-detail-view>`;
}

export function singleSelect() {
  const selectableData = getData().map(i => {
    i.selected = false;
    return i;
  });

  selectableData[1].selected = true;

  class DemoSingleSelect extends LitElement {
    @state() private data = selectableData;

    @state() private selectedItem = selectableData[1];

    render() {
      return html`
        <button>start</button>
        <cds-grid style="--body-height: 320px">
          <cds-grid-column width="50"></cds-grid-column>
          <cds-grid-column>Stock</cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          ${this.data.map(
            entry => html`
              <cds-grid-row .select=${entry.selected}>
                <cds-grid-cell>
                  <cds-radio>
                    <label><span style="display: none">select ${entry.id}</span></label>
                    <input
                      type="radio"
                      name="grid-rows"
                      .checked=${entry.selected}
                      value=${entry.id}
                      aria-label=""
                      @click=${(e: any) => this.select(entry, e.target.checked)}
                    />
                  </cds-radio>
                </cds-grid-cell>
                <cds-grid-cell>
                  ${entry.id}
                </cds-grid-cell>
                <cds-grid-cell>$${entry.average}</cds-grid-cell>
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-footer>
            Selected: ${this.selectedItem.id}
          </cds-grid-footer>
        </cds-grid>
        <button>end</button>
      `;
    }

    private select(entry: any, checked: boolean) {
      this.data.forEach(i => (i.selected = false));
      this.selectedItem = this.data.find(i => i.id === entry.id);
      this.selectedItem.selected = checked;
      this.data = [...this.data];
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-single-select', DemoSingleSelect);
  return html`<demo-grid-single-select></demo-grid-single-select>`;
}

export function multiSelect() {
  const selectableData = getData().map(i => {
    i.selected = false;
    return i;
  });

  selectableData[1].selected = true;
  selectableData[3].selected = true;

  class DemoMultiSelect extends LitElement {
    @state() private data = selectableData;
    @state() private allSelected = false;

    render() {
      return html`
        <cds-grid style="--body-height: 320px">
          <cds-grid-column width="50">
            <cds-checkbox>
              <label><span style="display: none">select all</span></label>
              <input type="checkbox" .checked=${this.allSelected} @change=${e => this.selectAll(e)} />
            </cds-checkbox>
          </cds-grid-column>
          <cds-grid-column>Stock</cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          ${this.data.map(
            entry => html`
              <cds-grid-row .select=${entry.selected}>
                <cds-grid-cell>
                  <cds-checkbox>
                    <label><span style="display: none">select ${entry.id}</span></label>
                    <input
                      type="checkbox"
                      .checked=${entry.selected}
                      value=${entry.id}
                      @click=${e => this.select(entry, e.target.checked)}
                    />
                  </cds-checkbox>
                </cds-grid-cell>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>$${entry.average}</cds-grid-cell>
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}

          <cds-grid-footer>${this.data.filter(i => i.selected).length} selected</cds-grid-footer>
        </cds-grid>
      `;
    }

    private select(entry: any, checked: boolean) {
      this.data.find(i => i.id === entry.id).selected = checked;
      this.allSelected = !this.data.find(i => !i.selected);
      this.data = [...this.data];
    }

    private selectAll(e: any) {
      this.allSelected = e.target.checked;
      this.data.forEach(i => (i.selected = e.target.checked));
      this.data = [...this.data];
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-multi-select', DemoMultiSelect);
  return html`<demo-grid-multi-select></demo-grid-multi-select>`;
}

export function singleAction() {
  const selectableData = getData().map(i => {
    i.selected = false;
    return i;
  });

  class DemoSingleAction extends LitElement {
    @state() private data = selectableData;
    @state() private selectedEntry: any = null;
    @state() private selectedEntryId: number = null;

    render() {
      return html`
        <cds-grid style="--body-height: 320px">
          <cds-grid-column width="42"></cds-grid-column>
          <cds-grid-column>Stock</cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          ${this.data.map(
            entry => html`
              <cds-grid-row .select=${entry.selected}>
                <cds-grid-cell action>
                  <cds-action-button
                    shape="ellipsis-vertical"
                    id="${entry.id}-action"
                    @click=${() => this.select(entry)}
                    aria-label="choose available stock options"
                  ></cds-action-button>
                </cds-grid-cell>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>$${entry.average}</cds-grid-cell>
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        <cds-dropdown
          ?hidden=${!this.selectedEntry}
          anchor="#${this.selectedEntryId}-action"
          @hiddenChange=${() => (this.selectedEntry = null)}
        >
          <cds-button @click=${() => this.buy(this.selectedEntry)} block action="flat" size="sm"
            >Buy ${this.selectedEntry?.id}</cds-button
          >
          <cds-button @click=${() => this.sell(this.selectedEntry)} block action="flat" size="sm"
            >Sell ${this.selectedEntry?.id}</cds-button
          >
        </cds-dropdown>
      `;
    }

    private select(entry: any) {
      this.selectedEntry = entry;
      this.selectedEntryId = entry.id;
    }

    private buy(entry: any) {
      alert(`Bought: ${entry.id}`);
      this.selectedEntry = null;
    }

    private sell(entry: any) {
      alert(`Sold: ${entry.id}`);
      this.selectedEntry = null;
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-single-action', DemoSingleAction);
  return html`<demo-grid-single-action></demo-grid-single-action>`;
}

export function multiAction() {
  const selectableData = getData().map(i => {
    i.selected = false;
    return i;
  });

  class DemoMultiAction extends LitElement {
    @state() private data = selectableData;
    @state() private allSelected = false;
    @state() private openAction = false;

    render() {
      return html`
        <cds-grid style="--body-height: 320px">
          <cds-grid-column width="50">
            <cds-checkbox>
              <label><span style="display: none">choose action for selected stocks</span></label>
              <input type="checkbox" .checked=${this.allSelected} @change=${e => this.selectAll(e)} name="grid-rows" />
            </cds-checkbox>
            <cds-action-button
              shape="ellipsis-vertical"
              id="multi-action"
              @click=${() => (this.openAction = true)}
              aria-label="filter column"
            ></cds-action-button>
            <cds-dropdown
              ?hidden=${!this.openAction}
              anchor="#multi-action"
              @hiddenChange=${() => (this.openAction = false)}
            >
              <cds-button action="flat" block size="sm" @click=${() => this.action('Purchased')}
                >Buy Selected</cds-button
              ><br />
              <cds-button action="flat" block size="sm" @click=${() => this.action('Sold')}>Sell Selected</cds-button>
            </cds-dropdown>
          </cds-grid-column>
          <cds-grid-column>Stock</cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          ${this.data.map(
            entry => html`
              <cds-grid-row .select=${entry.selected}>
                <cds-grid-cell>
                  <cds-checkbox>
                    <label><span style="display: none">select all</span></label>
                    <input
                      type="checkbox"
                      .checked=${entry.selected}
                      value=${entry.id}
                      @click=${e => this.select(entry, e.target.checked)}
                    />
                  </cds-checkbox>
                </cds-grid-cell>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>$${entry.average}</cds-grid-cell>
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
      `;
    }

    private select(entry: any, checked: boolean) {
      this.data.find(i => i.id === entry.id).selected = checked;
      this.data = [...this.data];
      this.allSelected = !this.data.find(i => !i.selected);
    }

    private selectAll(e: any) {
      this.allSelected = e.target.checked;
      this.data.forEach(i => (i.selected = e.target.checked));
    }

    private action(name: string) {
      alert(
        `${name}: ${this.data
          .filter(i => i.selected)
          .map(i => i.id)
          .reduce((p, n) => `${p} ${n}`, '')}`
      );
      this.openAction = false;
      this.data.forEach(i => (i.selected = false));
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-multi-action', DemoMultiAction);
  return html`<demo-grid-multi-action></demo-grid-multi-action>`;
}

export function sortableRows() {
  class DemoSortableRows extends LitElement {
    @state() private data = getData();
    @state() private filteredList: any[] = [];
    @state() private sortType: 'none' | 'ascending' | 'descending' = 'none';

    render() {
      return html`
        <cds-grid style="--body-height: 320px">
          <cds-grid-column .sort=${this.sortType} @sortChange=${(e: any) => (this.sortType = e.detail)}>
            Stock
          </cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          ${this.filteredList.map(
            entry => html`
              <cds-grid-row>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>$${entry.average}</cds-grid-cell>
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
      `;
    }

    connectedCallback() {
      super.connectedCallback();
      this.updateList();
    }

    updated(props: Map<string, any>) {
      super.updated(props);
      if (props.has('sortType') && props.get('sortType') !== this.sortType) {
        this.updateList();
      }
    }

    private updateList() {
      this.filteredList = sort([...this.data], 'id', this.sortType);
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-sortable-rows', DemoSortableRows);
  return html`<demo-grid-sortable-rows></demo-grid-sortable-rows>`;
}

export function rowFiltering() {
  class DemoFiltering extends LitElement {
    @state() private data = getData();
    @state() private filteredList: any[] = [];
    @state() private search = '';
    @state() private idFilterOpen = false;

    render() {
      return html`
        <cds-grid style="--body-height: 320px">
          <cds-grid-column>
            Stock
            <cds-action-button
              id="id-filter-demo"
              @click=${() => (this.idFilterOpen = true)}
              aria-label="filter column"
              cds-layout="align:right"
            >
              <cds-icon shape="filter"></cds-icon>
            </cds-action-button>
            <cds-dropdown
              ?hidden=${!this.idFilterOpen}
              @hiddenChange=${() => (this.idFilterOpen = false)}
              anchor="#id-filter-demo"
            >
              <cds-datalist>
                <input
                  type="search"
                  aria-label="search"
                  placeholder="Search"
                  @input=${(e: any) => (this.search = e.target.value)}
                />
                <datalist>
                  ${this.data.map(entry => html`<option value="${entry.id}"></option>`)}
                </datalist>
              </cds-datalist>
            </cds-dropdown>
          </cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          ${this.filteredList.map(
            entry => html`
              <cds-grid-row>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>$${entry.average}</cds-grid-cell>
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
      `;
    }

    updated(props: Map<string, any>) {
      super.updated(props);
      if (props.has('search') && props.get('search') !== this.search) {
        this.filteredList = filter([...this.data], 'id', this.search);
      }
    }
  }

  registerElementSafely('demo-grid-row-filtering', DemoFiltering);
  return html`<demo-grid-row-filtering></demo-grid-row-filtering>`;
}

export function gridFiltering() {
  class DemoFiltering extends LitElement {
    @state() private data = getData();
    @state() private filteredList: any[] = [];
    @state() private search = '';

    render() {
      return html`
        <section cds-layout="vertical gap:lg">
          <cds-search control-width="shrink">
            <label>Search Grid</label>
            <input type="search" placeholder="Search" @input=${(e: any) => (this.search = e.target.value)} />
          </cds-search>
          <cds-grid style="--body-height: 320px">
            <cds-grid-column>Stock</cds-grid-column>
            <cds-grid-column>Average</cds-grid-column>
            <cds-grid-column>Current</cds-grid-column>
            <cds-grid-column>About</cds-grid-column>
            ${this.filteredList.map(
              entry => html`
                <cds-grid-row>
                  <cds-grid-cell>${entry.id}</cds-grid-cell>
                  <cds-grid-cell>$${entry.average}</cds-grid-cell>
                  <cds-grid-cell>$${entry.value}</cds-grid-cell>
                  <cds-grid-cell>${entry.about}</cds-grid-cell>
                </cds-grid-row>
              `
            )}
            <cds-grid-footer></cds-grid-footer>
          </cds-grid>
        </section>
      `;
    }

    updated(props: Map<string, any>) {
      super.updated(props);
      if (props.has('search') && props.get('search') !== this.search) {
        this.filteredList = [...this.data].filter(i =>
          Object.keys(i)
            .map(k => i[k])
            .reduce((p, n) => `${p} ${n}`)
            .toLocaleLowerCase()
            .includes(this.search.trim().toLocaleLowerCase())
        );
      }
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-filter', DemoFiltering);
  return html`<demo-grid-filter></demo-grid-filter>`;
}

export function fixedColumns() {
  class DemoColFixed extends LitElement {
    @state() private data = getData();
    @state() private pinFirst = true;
    @state() private pinLast = true;

    render() {
      return html`
        <cds-grid style="--body-height: 320px">
          <cds-grid-column .position=${this.pinFirst ? 'fixed' : 'initial'}>
            Stock
            <cds-action-button
              @click=${() => (this.pinFirst = !this.pinFirst)}
              aria-label="pin column"
              cds-layout="align:right"
            >
              <cds-icon shape="pin" ?solid=${this.pinFirst}></cds-icon>
            </cds-action-button>
          </cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column .position=${this.pinLast ? 'fixed' : 'initial'}>
            About
            <cds-action-button
              @click=${() => (this.pinLast = !this.pinLast)}
              aria-label="pin column"
              cds-layout="align:right"
            >
              <cds-icon shape="pin" ?solid=${this.pinLast}></cds-icon>
            </cds-action-button>
          </cds-grid-column>
          ${this.data.map(
            entry => html`
              <cds-grid-row>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>$${entry.average}</cds-grid-cell>
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
      `;
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-col-fixed', DemoColFixed);
  return html`<demo-grid-col-fixed></demo-grid-col-fixed>`;
}

export function stickyColumns() {
  class DemoColSticky extends LitElement {
    @state() private data = getData();

    render() {
      return html`
        <cds-grid style="--body-height: 320px">
          <cds-grid-column width="120">Stock</cds-grid-column>
          <cds-grid-column width="120" position="sticky">Average</cds-grid-column>
          <cds-grid-column width="500">Current</cds-grid-column>
          <cds-grid-column width="500">About</cds-grid-column>
          ${this.data.map(
            entry => html`
              <cds-grid-row>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>$${entry.average}</cds-grid-cell>
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
      `;
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-col-sticky', DemoColSticky);
  return html`<demo-grid-col-sticky></demo-grid-col-sticky>`;
}

export function editableCell() {
  const selectableData = getData().map(i => {
    i.selected = false;
    return i;
  });

  class DemoEditable extends LitElement {
    @state() private data = selectableData;

    render() {
      return html`
        <cds-grid style="--body-height: 320px">
          <cds-grid-column>Account</cds-grid-column>
          <cds-grid-column>Outstanding</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          ${this.data.map(
            entry => html`
              <cds-grid-row>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>
                  ${entry.selected
                    ? html` <cds-input>
                        <label cds-layout="display:screen-reader-only">${entry.id} Outstanding Value</label>
                        <input
                          class="${entry.id}-input"
                          type="number"
                          .value=${entry.average}
                          @keyup=${(e: any) => this.updateEntry(e, entry)}
                        />
                        <cds-control-action action="prefix" readonly>$&nbsp;</cds-control-action>
                      </cds-input>`
                    : html`
                        <cds-action-button
                          class="${entry.id}-button"
                          @click=${() => this.editEntry(entry)}
                          aria-label="edit ${entry.id}"
                          ><cds-icon shape="pencil" solid></cds-icon
                        ></cds-action-button>
                        <span>$${entry.average}</span>
                      `}
                </cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
      `;
    }

    private updateEntry(e: any, entry: any) {
      if (e.code === 'Enter' || e.code === 'Escape') {
        entry.average = e.target.value;
        entry.selected = false;
        this.data = [...this.data];
        setTimeout(() => this.querySelector<HTMLElement>(`.${entry.id}-button`).focus());
      }
    }

    private editEntry(entry: any) {
      entry.selected = true;
      this.data = [...this.data];
      setTimeout(() => this.querySelector<HTMLElement>(`.${entry.id}-input`).focus());
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-editable', DemoEditable);
  return html`<demo-grid-editable></demo-grid-editable>`;
}

export function optionalFooter() {
  class DemoOptionalFooter extends LitElement {
    render() {
      return html`
        <cds-grid style="--body-height: 320px">
          <cds-grid-column>Type</cds-grid-column>
          <cds-grid-column>Description</cds-grid-column>
          <cds-grid-column>Amount</cds-grid-column>
          <cds-grid-column>Balance</cds-grid-column>

          <cds-grid-row>
            <cds-grid-cell>Deposit</cds-grid-cell>
            <cds-grid-cell>Item</cds-grid-cell>
            <cds-grid-cell>$1,000,000.00</cds-grid-cell>
            <cds-grid-cell>$1,000,000.00</cds-grid-cell>
          </cds-grid-row>
          <cds-grid-row>
            <cds-grid-cell>Credit</cds-grid-cell>
            <cds-grid-cell>Billing</cds-grid-cell>
            <cds-grid-cell>$250.00</cds-grid-cell>
            <cds-grid-cell>$523,750.00</cds-grid-cell>
          </cds-grid-row>
          <cds-grid-row>
            <cds-grid-cell>Debit</cds-grid-cell>
            <cds-grid-cell>Renewal</cds-grid-cell>
            <cds-grid-cell>$9.00</cds-grid-cell>
            <cds-grid-cell>$163,262.00</cds-grid-cell>
          </cds-grid-row>
          <cds-grid-row>
            <cds-grid-cell>Credit</cds-grid-cell>
            <cds-grid-cell>Subscription</cds-grid-cell>
            <cds-grid-cell>$53.00</cds-grid-cell>
            <cds-grid-cell>$347,423.00</cds-grid-cell>
          </cds-grid-row>
          <cds-grid-row>
            <cds-grid-cell>Deposit</cds-grid-cell>
            <cds-grid-cell>Subscription</cds-grid-cell>
            <cds-grid-cell>$1239.00</cds-grid-cell>
            <cds-grid-cell>$564,772.00</cds-grid-cell>
          </cds-grid-row>
          <cds-grid-row>
            <cds-grid-cell>Deposit</cds-grid-cell>
            <cds-grid-cell>Service Fee</cds-grid-cell>
            <cds-grid-cell>$49.00</cds-grid-cell>
            <cds-grid-cell>$977,527.00</cds-grid-cell>
          </cds-grid-row>
          <cds-grid-row>
            <cds-grid-cell>Debit</cds-grid-cell>
            <cds-grid-cell>Account Transfer</cds-grid-cell>
            <cds-grid-cell>$2300.00</cds-grid-cell>
            <cds-grid-cell>$423,236.00</cds-grid-cell>
          </cds-grid-row>
          <cds-grid-row>
            <cds-grid-cell>Credit</cds-grid-cell>
            <cds-grid-cell>Payment</cds-grid-cell>
            <cds-grid-cell>$9.00</cds-grid-cell>
            <cds-grid-cell>$199,282.00</cds-grid-cell>
          </cds-grid-row>
          <cds-grid-row>
            <cds-grid-cell>Debit</cds-grid-cell>
            <cds-grid-cell>Unknown</cds-grid-cell>
            <cds-grid-cell>$9.00</cds-grid-cell>
            <cds-grid-cell>$929,741.00</cds-grid-cell>
          </cds-grid-row>
          <cds-grid-row>
            <cds-grid-cell>Debit</cds-grid-cell>
            <cds-grid-cell>Provider</cds-grid-cell>
            <cds-grid-cell>$9203.00</cds-grid-cell>
            <cds-grid-cell>$239,120.00</cds-grid-cell>
          </cds-grid-row>
        </cds-grid>
      `;
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-optional-footer', DemoOptionalFooter);
  return html`<demo-grid-optional-footer></demo-grid-optional-footer>`;
}

export function compact() {
  class DemoGridCompact extends LitElement {
    @state() private data = getData();

    render() {
      return html`
        <cds-grid cds-theme="compact" style="--body-height: 320px">
          <cds-grid-column>Stock</cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          ${this.data.map(
            entry => html`
              <cds-grid-row>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>$${entry.average}</cds-grid-cell>
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>...</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
      `;
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-compact', DemoGridCompact);
  return html` <style>
      [cds-theme*='compact'] {
        --cds-global-space-0: 0;
        --cds-global-space-1: 1px;
        --cds-global-space-2: 2px;
        --cds-global-space-3: 3px;
        --cds-global-space-4: 4.5px;
        --cds-global-space-5: 6px;
        --cds-global-space-6: 9px;
        --cds-global-space-7: 12px;
        --cds-global-space-8: 13.5px;
        --cds-global-space-9: 18px;
        --cds-global-space-10: 24px;
        --cds-global-space-11: 27px;
        --cds-global-space-12: 36px;
        --cds-global-space-13: 54px;
      }
    </style>
    <demo-grid-compact></demo-grid-compact>`;
}

export function performance() {
  let data: any[] = [];

  for (let i = 0; i < 50; i++) {
    data.push(
      ...getData().map(e => {
        e.id = `${e.id}${i === 0 ? '' : `-${i}`}`;
        return e;
      })
    );
  }

  class DemoPerformance extends LitElement {
    @state() private showParseAndRender = false;
    @state() private hide = false;

    static get styles() {
      return [
        css`
          .small-cell {
            width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `,
      ];
    }

    render() {
      return html`
        <cds-button
          action="outline"
          size="sm"
          @click=${() => {
            this.showParseAndRender = !this.showParseAndRender;
            this.hide = !this.showParseAndRender;
          }}
          >Render Large Grid</cds-button
        >
        <cds-button
          action="outline"
          size="sm"
          ?hidden=${!this.showParseAndRender}
          @click=${() => (this.hide = !this.hide)}
          >hidden</cds-button
        >
        <br />
        ${this.showParseAndRender
          ? html` <cds-grid ?hidden=${this.hide} style="--body-height: 320px; --row-height: 36px">
              <cds-grid-column>Stock</cds-grid-column>
              <cds-grid-column>Average</cds-grid-column>
              <cds-grid-column>Current</cds-grid-column>
              <cds-grid-column>About</cds-grid-column>
              ${data.map(
                entry => html`
                  <cds-grid-row>
                    <cds-grid-cell>${entry.id}</cds-grid-cell>
                    <cds-grid-cell>$${entry.average}</cds-grid-cell>
                    <cds-grid-cell>$${entry.value}</cds-grid-cell>
                    <cds-grid-cell><div class="small-cell">${entry.about}</div></cds-grid-cell>
                  </cds-grid-row>
                `
              )}
              <cds-grid-footer>
                <p style="margin: 0; line-height: 0">${data.length} Rows ${data.length * 4} Cells</p>
              </cds-grid-footer>
            </cds-grid>`
          : ''}
      `;
    }
  }

  registerElementSafely('demo-grid-performance', DemoPerformance);
  return html`<demo-grid-performance></demo-grid-performance>`;
}

export function draggableListController() {
  class DemoDraggableListController extends LitElement {
    static get styles() {
      return [
        baseStyles,
        css`
          ol {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          li {
            margin: 0;
            padding: 12px;
            background: #fff;
            box-shadow: 0 -1px 0 var(--cds-alias-object-border-color);
          }

          li[cds-draggable='target'] {
            box-shadow: 0 -2px 0 var(--cds-alias-status-alt-tint);
          }

          li[draggable='false'] {
            background: none;
            height: 100px;
          }
        `,
      ];
    }

    @state() private data = getData().slice(0, 5);

    protected draggableListController = new DraggableListController(this, { shadowRoot: true });

    render() {
      return html`
        <ol @draggableChange=${this.sortList}>
          ${this.data.map(
            entry => html`
              <li draggable="true" id=${entry.id} cds-layout="horizontal gap:md align:vertical-center">
                <cds-action-button
                  cds-draggable="handle"
                  shape="drag-handle"
                  aria-label="sort ${entry.id} row"
                ></cds-action-button>
                <p>${entry.id}</p>
              </li>
            `
          )}
          <li draggable="false"></li>
        </ol>
      `;
    }

    // connectedCallback() {
    //   super.connectedCallback();
    //   this.addEventListener('draggableChange', e => this.sortList(e));
    // }

    private sortList(e: any) {
      this.data = sortList(e.detail.target, e.detail.from, this.data);
      e.preventDefault();
    }
  }

  registerElementSafely('demo-draggable-list-controller', DemoDraggableListController);
  return html`<demo-draggable-list-controller></demo-draggable-list-controller>`;
}

export function draggableRows() {
  class DemoDraggableRows extends LitElement {
    @state() private data = getData();

    render() {
      return html`
        <cds-grid @draggableChange=${this.sortList} style="--body-height: 320px">
          <cds-grid-column width="45"></cds-grid-column>
          <cds-grid-column>Stock</cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>

          ${this.data.map(
            entry => html`
              <cds-grid-row draggable="true" id=${entry.id}>
                <cds-grid-cell>
                  <cds-action-button
                    cds-draggable="handle"
                    shape="drag-handle"
                    aria-label="sort ${entry.id} row"
                  ></cds-action-button>
                </cds-grid-cell>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>$${entry.average}</cds-grid-cell>
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-placeholder draggable="false"></cds-grid-placeholder>
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>

        <ol>
          ${this.data.map(entry => html`<li>${entry.id}</li>`)}
        </ol>
      `;
    }

    private sortList(e: any) {
      this.data = sortList(e.detail.target, e.detail.from, this.data);
    }
  }

  registerElementSafely('demo-grid-draggable-rows', DemoDraggableRows);
  return html`<demo-grid-draggable-rows></demo-grid-draggable-rows>`;
}

export function swappableRows() {
  class DemoSwappableRows extends LitElement {
    @state() private listOne = [{ id: '1' }, { id: '2' }, { id: '3' }];

    @state() private listTwo = [{ id: '4' }, { id: '5' }, { id: '6' }];

    render() {
      return html`
        <cds-grid @draggableChange=${this.sortOne} style="--body-height: 320px">
          <cds-grid-column width="45"></cds-grid-column>
          <cds-grid-column>id</cds-grid-column>
          <cds-grid-column>description</cds-grid-column>

          ${this.listOne.map(
            entry => html`
              <cds-grid-row id=${entry.id} draggable="true">
                <cds-grid-cell>
                  <cds-action-button shape="drag-handle" aria-label="sort ${entry.id} row"></cds-action-button>
                </cds-grid-cell>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>...</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-placeholder draggable="false">
            Move a row to the second grid.
          </cds-grid-placeholder>
          <cds-grid-footer>
            List One: ${this.listOne.map(i => html`${i.id} `)}
          </cds-grid-footer>
        </cds-grid>

        <br /><br />

        <cds-grid @draggableChange=${this.sortTwo}>
          <cds-grid-column width="50"></cds-grid-column>
          <cds-grid-column>id</cds-grid-column>
          <cds-grid-column>description</cds-grid-column>

          ${this.listTwo.map(
            entry => html`
              <cds-grid-row id=${entry.id} draggable="true">
                <cds-grid-cell>
                  <cds-action-button shape="drag-handle" aria-label="sort ${entry.id} row"></cds-action-button>
                </cds-grid-cell>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>...</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-placeholder draggable="false">
            Move a row to the first grid.
          </cds-grid-placeholder>
          <cds-grid-footer>
            List Two: ${this.listTwo.map((j, i) => html`${j.id} `)}
          </cds-grid-footer>
        </cds-grid>
      `;
    }

    private sortOne(e: any) {
      if (this.listOne.find(i => i.id === e.detail.from.id)) {
        this.listOne = sortList(e.detail.target, e.detail.from, this.listOne);
      } else {
        const { fromList, targetList } = this.swap(this.listOne, this.listTwo, e.detail);
        this.listOne = targetList;
        this.listTwo = fromList;
      }
    }

    private sortTwo(e: any) {
      if (this.listTwo.find(i => i.id === e.detail.from.id)) {
        this.listTwo = sortList(e.detail.target, e.detail.from, this.listTwo);
      } else {
        const { fromList, targetList } = this.swap(this.listTwo, this.listOne, e.detail);
        this.listTwo = targetList;
        this.listOne = fromList;
      }
    }

    private swap(targetList: any, fromList: any, detail: any) {
      const item = fromList.splice(fromList.indexOf(fromList.find(i => i.id === detail.from.id)), 1)[0];
      const targetIndex = targetList.indexOf(targetList.find(i => i.id === detail.target.id));
      targetIndex === -1 ? targetList.push(item) : targetList.splice(targetIndex, 0, item);
      return { targetList: [...targetList], fromList: [...fromList] };
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-swappable-rows', DemoSwappableRows);
  return html`<demo-grid-swappable-rows></demo-grid-swappable-rows>`;
}

export function noScroll() {
  class DemoNoScroll extends LitElement {
    @state() private data = getData();

    render() {
      return html`
        <cds-grid>
          <cds-grid-column>Stock</cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          ${this.data.map(
            entry => html`
              <cds-grid-row>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>$${entry.average}</cds-grid-cell>
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
      `;
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-no-scroll', DemoNoScroll);
  return html`<demo-grid-no-scroll></demo-grid-no-scroll>`;
}

export function gridKeyNavigation() {
  class DemoGridKeyNavigation extends LitElement implements KeyGrid {
    protected gridKeyNavigationController = new GridKeyNavigationController(this);

    static get styles() {
      return [
        baseStyles,
        css`
          section {
            display: grid;
            gap: 2px;
            grid-template-columns: repeat(10, 50px);
          }

          [selected] {
            background: var(--cds-alias-status-success);
            color: var(--cds-global-color-white);
          }

          section > div {
            display: contents;
          }

          section button {
            width: 100%;
            height: 30px;
            display: block;
          }

          button[tabindex='0']:focus {
            outline: 5px auto Highlight;
            outline: 5px auto -webkit-focus-ring-color;
          }
        `,
      ];
    }

    @query('section') grid: HTMLElement;
    @queryAll('section button') cells: NodeListOf<HTMLElement>;
    @queryAll('section div') rows: NodeListOf<HTMLElement>;

    @state() private items = Array.from(Array(10).keys()).map(() => Array.from(Array(10).keys()));
    @state() private selected = '0,0';
    @state() private active = '';
    @state() private code = '';

    render() {
      return html`???
        <div cds-layout="vertical gap:md">
          <p cds-text="body">Selected: ${this.selected}</p>
          <p cds-text="body">Active: ${this.active}</p>
          <p cds-text="body">Key Code: ${this.code}</p>
          <section class="grid-body">
            ${this.items.map(
              (r, ri) => html`
                <div class="grid-row">
                  ${r.map(
                    c => html`<button class="grid-item" @click=${(e: any) => this.setActive(e)}>${ri}-${c}</button>`
                  )}
                </div>
              `
            )}
          </section>
        </div> `;
    }

    firstUpdated(props: Map<string, any>) {
      super.firstUpdated(props);

      this.addEventListener('cdsKeyChange', (e: any) => {
        this.code = e.detail.code;
        this.active = e.detail.activeItem.textContent;
      });
    }

    private setActive(e: any) {
      this.shadowRoot.querySelector('[selected]')?.removeAttribute('selected');
      e.target.setAttribute('selected', '');
      this.selected = e.target.innerText;
    }
  }

  registerElementSafely('demo-grid-key-navigation', DemoGridKeyNavigation);
  return html`<demo-grid-key-navigation></demo-grid-key-navigation>`;
}
