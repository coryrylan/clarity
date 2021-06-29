/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement, css } from 'lit';
import { query } from 'lit/decorators/query.js';
import { queryAll } from 'lit/decorators/query-all.js';
import pipe from 'ramda/es/pipe.js';
import { baseStyles, registerElementSafely, state } from '@cds/core/internal';
import '@cds/core/pagination/register.js';
import '@cds/core/checkbox/register.js';
import '@cds/core/select/register.js';
import '@cds/core/radio/register.js';
import '@cds/core/grid/register.js';
import { ClarityIcons } from '@cds/core/icon/icon.service.js';
import { checkCircleIcon } from '@cds/core/icon/shapes/check-circle.js';
import { filterIcon } from '@cds/core/icon/shapes/filter.js';
import { exclamationTriangleIcon } from '@cds/core/icon/shapes/exclamation-triangle.js';
import { exclamationCircleIcon } from '@cds/core/icon/shapes/exclamation-circle.js';
import { disconnectIcon } from '@cds/core/icon/shapes/disconnect.js';
import { viewColumnsIcon } from '@cds/core/icon/shapes/view-columns.js';

import { getData, paginate, filter, sortStrings, sortList, sortNumbers, getVMData, TestVM, StatusDisplayType, StatusIconType, getVMOrderPreference } from './storybook.js';
import { GridKeyNavigationController, KeyGrid } from '../utils/key-navigation.controller.js';
import { DraggableListController } from '../utils/draggable-list.controller.js';

ClarityIcons.addIcons(checkCircleIcon, exclamationTriangleIcon, exclamationCircleIcon, disconnectIcon, filterIcon, viewColumnsIcon);

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function fixedRows() {
  return html`    
    <cds-grid style="--body-height: 360px">
      <cds-grid-column>Type</cds-grid-column>
      <cds-grid-column>Description</cds-grid-column>
      <cds-grid-column>Amount</cds-grid-column>
      <cds-grid-column>Balance</cds-grid-column>
      <cds-grid-row position="fixed">
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
  `;
}

export function basic() {
  return html`
    <cds-grid style="--body-height: 360px">
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
  `;
}

export function keyboard() {
  return html`
    <cds-grid style="--body-height: 360px">
      <cds-grid-column width="150">Key</cds-grid-column>
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

export function darkTheme() {
  return html`
    <cds-grid cds-theme="dark" style="--body-height: 360px">
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
  `;
}

export function staticColumnWidth() {
  return html`
    <cds-grid style="--body-height: 360px">
      <cds-grid-column resizable>Type</cds-grid-column>
      <cds-grid-column resizable>Description</cds-grid-column>
      <cds-grid-column resizable>Amount</cds-grid-column>
      <cds-grid-column resizable>Balance</cds-grid-column>

      <cds-grid-row>
        <cds-grid-cell>Deposit</cds-grid-cell>
        <cds-grid-cell>Item kh kasd alksdfjh kashjdf kalsjdf lkajsdfl</cds-grid-cell>
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
  `;
}

export function columnFlexWidth() {
  return html`
    <cds-grid column-layout="flex" style="--body-height: 360px">
      <cds-grid-column resizable>Type</cds-grid-column>
      <cds-grid-column resizable>Description</cds-grid-column>
      <cds-grid-column resizable>Amount</cds-grid-column>
      <cds-grid-column resizable>Balance</cds-grid-column>
      <cds-grid-row>
        <cds-grid-cell>Deposit</cds-grid-cell>
        <cds-grid-cell>Item kh kasd alksdfjh kashjdf kalsjdf lkajsdfl</cds-grid-cell>
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
  `;
}

export function fixedColumnWidth() {
  return html`
    <cds-grid style="--body-height: 360px">
      <cds-grid-column width="100">Type</cds-grid-column>
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
  `;
}

export function rtl() {
  class DemoRtl extends LitElement {
    @state() private data = getData();
    @state() private currentDetail: any = null;

    render() {
      return html`
        <cds-grid dir="rtl" style="--body-height: 360px">
          <cds-grid-column width="60"></cds-grid-column>
          <cds-grid-column>Stock</cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          ${this.data.map(
            entry => html`
              <cds-grid-row>
                <cds-grid-cell>
                  <cds-action-expand .expanded=${this.currentDetail?.id === entry.id} id="${entry.id}-detail-demo" @click=${() => this.showDetail(entry.id)}></cds-action-expand>
                </cds-grid-cell>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>$${entry.average}</cds-grid-cell>
                <cds-grid-cell>$${entry.value}</cds-grid-cell>
                <cds-grid-cell>${entry.about}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-footer></cds-grid-footer>
          <cds-grid-detail ?hidden=${!this.currentDetail} anchor="${this.currentDetail?.id}-detail-demo" @closeChange=${this.closeDetail} dir="rtl">
            <h2>${this.currentDetail?.id}</h2>
            <p>Average: $${this.currentDetail?.average}</p>
            <p>Current: $${this.currentDetail?.value}</p>
            <p>About: ${this.currentDetail?.about}</p>
          </cds-grid-detail>
        </cds-grid>
      `;
    }

    private showDetail(id: string) {
      this.currentDetail = id !== this.currentDetail?.id ? this.data.find(i => i.id === id) : null;
    }

    private closeDetail() {
      this.currentDetail = null;
    }
  }

  registerElementSafely('demo-grid-rtl', DemoRtl);
  return html`<demo-grid-rtl></demo-grid-rtl>`;
}

export function responsive() {
  return html`
    <cds-grid style="width: 400px">
      <cds-grid-column position="fixed" width="80">Type</cds-grid-column>
      <cds-grid-column width="200">Description</cds-grid-column>
      <cds-grid-column width="200">Amount</cds-grid-column>
      <cds-grid-column width="200">Balance</cds-grid-column>

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
  `;
}

export function placeholder() {
  return html`
    <cds-grid style="--body-height: 360px">
      <cds-grid-column>Type</cds-grid-column>
      <cds-grid-column>Description</cds-grid-column>
      <cds-grid-column>Amount</cds-grid-column>
      <cds-grid-column>Balance</cds-grid-column>
      <cds-grid-placeholder></cds-grid-placeholder>
      <cds-grid-footer></cds-grid-footer>
    </cds-grid>
  `;
}

export function kitchenSink() {
  enum ColumnTypes {
    Host = 1,
    Status = 2,
    CPU = 4,
    Memory = 8,
    All = ColumnTypes.Host | ColumnTypes.Status | ColumnTypes.CPU | ColumnTypes.Memory,
  }

  interface GridState {
    data: TestVM[];
    orderPreference: string[];
    currentDetail: string;
    sortType: 'none' | 'ascending' | 'descending',
    search: string,
    page: number,
    pageSize: number,
    idFilterDropdownVisible: boolean,
    columnsDropdownVisible: boolean,
    selectedColumns: ColumnTypes
  }

  const initialState: GridState = {
    data: getVMData(),
    orderPreference: getVMOrderPreference(),
    selectedColumns: ColumnTypes.All,
    currentDetail: null,
    sortType: 'none',
    pageSize: 10,
    search: '',
    page: 0,
    idFilterDropdownVisible: false,
    columnsDropdownVisible: false,
  };

  class DemoKitchenSink extends LitElement {
    @state() private state: GridState = initialState;

    render() {
      return html`
        <cds-grid @draggableChange=${this.reorderList} style="--body-height: 360px">
          <cds-grid-column width="40">
            <cds-checkbox>
              <input type="checkbox" .checked=${!this.state.data.find(i => !i.selected)} @change=${(e: any) => this.selectAll(e)} aria-label="select all" />
            </cds-checkbox>
          </cds-grid-column>
          <cds-grid-column width="55"></cds-grid-column>
          <cds-grid-column resizable width="260">
            Host
            <cds-action id="id-filter" @click=${() => (this.state = { ...this.state, idFilterDropdownVisible: true })} aria-label="column filter options" shape="filter"></cds-action>
            <cds-dropdown ?hidden=${!this.state.idFilterDropdownVisible} @hiddenChange=${() => (this.state = { ...this.state, idFilterDropdownVisible: false })} anchor="#id-filter">
              <cds-datalist>
                <input type="text" placeholder="Search" aria-label="search rows" .value=${this.state.search} @input=${(e: any) => this.search(e.target.value)} />
                <datalist>${this.state.data.map(entry => html`<option value="${entry.id}"></option>`)}</datalist>
              </cds-datalist>
            </cds-dropdown>
          </cds-grid-column>
          ${this.columnVisible(ColumnTypes.Status) ? html`
          <cds-grid-column resizable>
            Status
            <cds-action-sort .sort=${this.state.sortType} @sortChange=${(e: any) => this.setSortType(e.detail)}></cds-action-sort>
          </cds-grid-column>`: ''}
          ${this.columnVisible(ColumnTypes.CPU) ? html`<cds-grid-column resizable>CPU</cds-grid-column>`: ''}
          ${this.columnVisible(ColumnTypes.Memory) ? html`<cds-grid-column resizable>Memory</cds-grid-column>` : ''}
          ${this.currentPage.map(entry => html`
          <cds-grid-row .select=${entry.selected} id=${entry.id} .draggable=${this.state.sortType === 'none'}>
            <cds-grid-cell>
              <cds-checkbox cds-draggable="handle">
                <input type="checkbox" .checked=${entry.selected} value=${entry.id} @click=${(e: any) => this.select(entry, e.target.checked)} aria-label="Select ${entry.id}" />
              </cds-checkbox>
            </cds-grid-cell>
            <cds-grid-cell>
              <cds-action-expand .expanded=${this.currentDetail?.id === entry.id} id="${entry.id}-detail" @click=${() => this.showDetail(entry.id)}></cds-action-expand>
            </cds-grid-cell>
            <cds-grid-cell>
              ${entry.id}
            </cds-grid-cell>
            ${this.columnVisible(ColumnTypes.Status) ? html`
              <cds-grid-cell>
                <cds-tag status=${StatusDisplayType[entry.status]} readonly><cds-icon shape=${StatusIconType[entry.status]} inner-offset=${entry.status === 'deactivated' ? 0 : 3 }></cds-icon> ${entry.status}</cds-tag>
              </cds-grid-cell>` : ''}
            ${this.columnVisible(ColumnTypes.CPU) ? html`
              <cds-grid-cell> 
                <p cds-text="body">${entry.cpu}%</p>
              </cds-grid-cell>` : ''}
            ${this.columnVisible(ColumnTypes.Memory) ? html`<cds-grid-cell>${entry.memory}%</cds-grid-cell>` : ''}
          </cds-grid-row>`)}
          <cds-grid-placeholder draggable="false">&nbsp;</cds-grid-placeholder>
          <cds-grid-footer>
            <cds-action id="toggle-columns" @click=${() => (this.state = { ...this.state, columnsDropdownVisible: true })} aria-label="filter column" shape="view-columns"></cds-action>
            <cds-dropdown ?hidden=${!this.state.columnsDropdownVisible} @hiddenChange=${() => (this.state = { ...this.state, columnsDropdownVisible: false })} anchor="#toggle-columns" position="top">
              <cds-checkbox-group layout="vertical">
                <cds-checkbox>
                  <label>Status</label>
                  <input type="checkbox" value=${ColumnTypes.Status} @click=${this.selectColumns} .checked=${this.columnVisible(ColumnTypes.Status)} />
                </cds-checkbox>
                <cds-checkbox>
                  <label>CPU</label>
                  <input type="checkbox" value=${ColumnTypes.CPU} @click=${this.selectColumns} .checked=${this.columnVisible(ColumnTypes.CPU)} />
                </cds-checkbox>
                <cds-checkbox>
                  <label>Memory</label>
                  <input type="checkbox" value=${ColumnTypes.Memory} @click=${this.selectColumns} .checked=${this.columnVisible(ColumnTypes.Memory)} />
                </cds-checkbox>
              </cds-checkbox-group>
              ${this.state.selectedColumns}
              <cds-button action="flat" @click=${() => (this.state = { ...this.state, selectedColumns: ColumnTypes.All })} ?disabled=${this.columnVisible(ColumnTypes.All)}>Select All</cds-button>
            </cds-dropdown>
            <cds-pagination>
              <span style="margin-right: auto;">${this.state.data.filter(i => i.selected).length} selected</span>
              <cds-select control-width="shrink">
                <select .value=${this.state.pageSize} @input=${this.setPageSize} aria-label="per page">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                </select>
              </cds-select>
              <cds-pagination-button ?disabled=${this.state.page === 0} action="first" @click=${this.firstPage} aria-label="go to first"></cds-pagination-button>
              <cds-pagination-button ?disabled=${this.state.page === 0} action="prev" @click=${this.prevPage} aria-label="go to previous"></cds-pagination-button>
              <cds-input cds-pagination-number>
                <input type="number" value="1" aria-label="current page" @input=${this.setPage} value=${this.state.page + 1} min="1" max=${this.pageCount} />
                <cds-control-message>/ ${this.pageCount}</cds-control-message>
              </cds-input>
              <cds-pagination-button ?disabled=${this.state.page === this.pageCount - 1} action="next" @click=${this.nextPage} aria-label="go to next"></cds-pagination-button>
              <cds-pagination-button ?disabled=${this.state.page === this.pageCount - 1} action="last" @click=${this.lastPage} aria-label="go to last"></cds-pagination-button>
            </cds-pagination>
          </cds-grid-footer>
          <cds-grid-detail ?hidden=${!this.currentDetail} anchor="${this.currentDetail?.id}-detail" @closeChange=${this.closeDetail}>
            <section cds-layout="vertical gap:xxl">
              <div cds-layout="horizontal gap:md">
                <h2 cds-text="heading">${this.currentDetail?.id}</h2>
                <cds-tag status=${StatusDisplayType[this.currentDetail?.status]} readonly>
                  <cds-icon shape=${StatusIconType[this.currentDetail?.status]} size=${this.currentDetail?.status === 'deactivated' ? 15 : 16 } inner-offset=${this.currentDetail?.status === 'deactivated' ? 0 : 3 }></cds-icon>
                  ${this.currentDetail?.status}
                </cds-tag>
              </div>
              <div cds-layout="grid cols:6">
                <div cds-layout="vertical gap:md align:center">
                  <cds-progress-circle size="xxl" status=${StatusDisplayType[this.currentDetail?.status]} value=${this.currentDetail?.cpu}></cds-progress-circle>
                  <p cds-text="subsection">CPU: ${this.currentDetail?.cpu}%</p>
                </div>
                <div cds-layout="vertical gap:md align:center">
                  <cds-progress-circle size="xxl" status=${StatusDisplayType[this.currentDetail?.status]} value=${this.currentDetail?.memory}></cds-progress-circle>
                  <p cds-text="subsection">Memory: ${this.currentDetail?.memory}%</p>
                </div>
              </div>
            </section>
          </cds-grid-detail>
        </cds-grid>
        <br />
        <section cds-layout="vertical gap:lg">
          <cds-button action="outline" @click=${this.resetState}>clear local storage</cds-button>
          <pre>${JSON.stringify({ ...this.state, data: this.state.data.map(i => i.id).join(','), orderPreference: this.state.orderPreference.join(',') }, null, 2)}</pre>
        </section>
      `;
    }

    connectedCallback() {
      super.connectedCallback();
      this.state = JSON.parse(localStorage.getItem('CORE_KITCHEN_SINK_DEMO')) ?? this.state;
    }

    updated(props: Map<string, any>) {
      super.updated(props);
      localStorage.setItem('CORE_KITCHEN_SINK_DEMO', JSON.stringify({ ...this.state, idFilterDropdownVisible: false, columnsDropdownVisible: false }));
    }

    private get currentDetail() {
      return this.state.data.find(i => i.id === this.state.currentDetail);
    }

    private get pageCount() {
      return Math.ceil(this.state.data.length / this.state.pageSize);
    }

    private get currentPage() {
      return paginate<TestVM>(this.sortedData, this.state.pageSize)[this.state.page] ?? []
    }

    private get sortedData() {
      return pipe(
        (d: TestVM[]) => d.sort((a, b) => this.state.orderPreference.indexOf(a.id) > this.state.orderPreference.indexOf(b.id) ? 1 : -1),
        d => filter<TestVM>(d, 'id', this.state.search),
        d => sortStrings<TestVM>(d, 'status', this.state.sortType)
      )([...this.state.data]);
    }

    private setSortType(sortType: 'none' | 'ascending' | 'descending') {
      this.state = { ...this.state, sortType };
    }

    private search(value: string) {
      this.state = { ...this.state, search: value, page: 0 };
    }

    private showDetail(id: string) {
      this.state = { ...this.state, currentDetail: id !== this.state.currentDetail ? this.state.data.find(i => i.id === id).id : null };
    }

    private closeDetail() {
      this.state = { ...this.state, currentDetail: null };
    }

    private select(entry: any, checked: boolean) {
      this.state.data.find(i => i.id === entry.id).selected = checked;
      this.state = { ...this.state };
    }

    private selectAll(e: any) {
      this.state.data.forEach(i => (i.selected = e.target.checked));
      this.state = { ...this.state };
    }

    private resetState() {
      localStorage.removeItem('CORE_KITCHEN_SINK_DEMO');
      this.state = initialState;
    }

    private selectColumns() {
      this.state = {
        ...this.state,
        selectedColumns: Array.from(this.querySelectorAll<HTMLInputElement>('cds-checkbox-group input[type="checkbox"]'))
          .filter(c => c.checked)
          .map(c => parseInt(c.value))
          .reduce((p, n) => p + n, 1)
      };
    }

    private columnVisible(value: any) {
      return parseInt(value) === (this.state.selectedColumns & parseInt(value));
    }

    private reorderList(e: any) {
      this.state = { ...this.state, orderPreference: sortList<TestVM>(e.detail.target, e.detail.from, this.state.orderPreference.map(id => ({ id }))).map(i => i.id) };
    }

    private setPageSize(event: any) {
      this.state = { ...this.state, pageSize: parseInt(event.target.value) };
    }

    private setPage(event: any) {
      this.state = { ...this.state, page: parseInt(event.target.value) - 1 };
    }

    private nextPage() {
      if (this.state.page <= this.pageCount) {
        this.state = { ...this.state, page: this.state.page + 1 };
      }
    }

    private prevPage() {
      if (this.state.page > 0) {
        this.state = { ...this.state, page: this.state.page - 1 };
      }
    }

    private firstPage() {
      this.state = { ...this.state, page: 0 };
    }

    private lastPage() {
      this.state = { ...this.state, page: Math.ceil(this.state.data.length / this.state.pageSize) - 1 };
    }

    protected createRenderRoot() {
      return this;
    }
  }

  registerElementSafely('demo-grid-kitchen-sink', DemoKitchenSink);
  return html`<demo-grid-kitchen-sink></demo-grid-kitchen-sink>`;
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
        <cds-grid style="--body-height: 360px">
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
              <cds-select control-width="shrink">
                <select
                  @input=${(e: any) => (this.pageSize = e.target.value)}
                  style="width: 46px"
                  aria-label="per page"
                >
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

export function columnResize() {
  return html`
    <cds-grid style="--body-height: 360px">
      <cds-grid-column resizable>Type</cds-grid-column>
      <cds-grid-column resizable>Description</cds-grid-column>
      <cds-grid-column resizable>Amount</cds-grid-column>
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
  `;
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
        <cds-grid style="--body-height: 360px">
          <cds-grid-column>Stock</cds-grid-column>
          ${this.checked(ColumnTypes.Average) ? html`<cds-grid-column>Average</cds-grid-column>` : ''}
          ${this.checked(ColumnTypes.Current) ? html`<cds-grid-column>Current</cds-grid-column>` : ''}
          ${this.checked(ColumnTypes.About) ? html`<cds-grid-column>About</cds-grid-column>` : ''}
          ${this.data.map(entry => html`
            <cds-grid-row>
              <cds-grid-cell>${entry.id}</cds-grid-cell>
              ${this.checked(ColumnTypes.Average) ? html`<cds-grid-cell>$${entry.average}</cds-grid-cell>` : ''}
              ${this.checked(ColumnTypes.Current) ? html`<cds-grid-cell>$${entry.value}</cds-grid-cell>` : ''}
              ${this.checked(ColumnTypes.About) ? html`<cds-grid-cell>${entry.about}</cds-grid-cell>` : ''}
            </cds-grid-row>
          `)}
          <cds-grid-footer>
            <cds-action id="toggle-columns" @click=${() => (this.toggleColumns = true)} aria-label="filter column" shape="view-columns"></cds-action>
            <cds-dropdown ?hidden=${!this.toggleColumns} @hiddenChange=${() => (this.toggleColumns = false)} anchor="#toggle-columns" position="top">
              <cds-checkbox-group layout="vertical">
                <cds-checkbox>
                  <label>Average</label>
                  <input type="checkbox" value=${ColumnTypes.Average} @click=${this.selectColumns} .checked=${this.checked(ColumnTypes.Average)} />
                </cds-checkbox>
                <cds-checkbox>
                  <label>Current</label>
                  <input type="checkbox" value=${ColumnTypes.Current} @click=${this.selectColumns} .checked=${this.checked(ColumnTypes.Current)} />
                </cds-checkbox>
                <cds-checkbox>
                  <label>About</label>
                  <input type="checkbox" value=${ColumnTypes.About} @click=${this.selectColumns} .checked=${this.checked(ColumnTypes.About)} />
                </cds-checkbox>
              </cds-checkbox-group>
              <cds-button action="flat" @click=${this.selectAll} ?disabled=${this.checked(ColumnTypes.All)}>
                Select All
              </cds-button>
            </cds-dropdown>
          </cds-grid-footer>
        </cds-grid>
      `;
    }

    private selectColumns() {
      this.selectedColumns = Array.from(this.shadowRoot.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'))
        .filter(c => c.checked)
        .map(c => parseInt(c.value))
        .reduce((p, n) => p + n, 1);
    }

    private selectAll() {
      this.selectedColumns = ColumnTypes.All;
    }

    private checked(value: ColumnTypes) {
      return value === (this.selectedColumns & value);
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
        <cds-grid style="--body-height: 360px">
          <cds-grid-column width="50"></cds-grid-column>
          <cds-grid-column>Stock</cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          ${this.data.map(
            entry => html`
              <cds-grid-row>
                <cds-grid-cell>
                  <cds-action-expand .expanded=${this.currentDetail?.id === entry.id} id="${entry.id}-detail-demo" @click=${() => this.showDetail(entry.id)}></cds-action-expand>
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
            style="--width: 75%"
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
      this.currentDetail = id !== this.currentDetail?.id ? this.data.find(i => i.id === id) : null;
    }

    private closeDetail() {
      this.currentDetail = null;
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
        <cds-grid style="--body-height: 360px">
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
                    <input
                      type="radio"
                      name="grid-rows"
                      .checked=${entry.selected}
                      value=${entry.id}
                      aria-label="select ${entry.id}"
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
        <cds-grid style="--body-height: 360px">
          <cds-grid-column width="50">
            <cds-checkbox>
              <input
                type="checkbox"
                .checked=${this.allSelected}
                @change=${e => this.selectAll(e)}
                aria-label="select all"
              />
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
                    <input
                      type="checkbox"
                      .checked=${entry.selected}
                      value=${entry.id}
                      @click=${e => this.select(entry, e.target.checked)}
                      aria-label="select ${entry.id}"
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
        <cds-grid style="--body-height: 360px">
          <cds-grid-column width="50"></cds-grid-column>
          <cds-grid-column>Stock</cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>
          ${this.data.map(
            entry => html`
              <cds-grid-row .select=${entry.selected}>
                <cds-grid-cell action>
                  <cds-action
                    id="${entry.id}-action"
                    @click=${() => this.select(entry)}
                    aria-label="choose available stock options"
                  ></cds-action>
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
          @hiddenChange=${() => (this.selectedEntry = null) as any}
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
    @state() private openAction = false;
    @state() private get allSelected() {
      return !this.data.find(i => !i.selected);
    }

    render() {
      return html`
        <cds-grid style="--body-height: 360px">
          <cds-grid-column width="100">
            <cds-checkbox>
              <input
                type="checkbox"
                .checked=${this.allSelected}
                @change=${e => this.selectAll(e)}
                name="grid-rows"
                aria-label="choose action for selected stocks"
              />
            </cds-checkbox>
            <cds-action
              id="multi-action"
              @click=${() => (this.openAction = true)}
              aria-label="filter column"
            ></cds-action>
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
                    <input
                      type="checkbox"
                      .checked=${entry.selected}
                      value=${entry.id}
                      @click=${e => this.select(entry, e.target.checked)}
                      aria-label="select ${entry.id}"
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
    }

    private selectAll(e: any) {
      this.data.forEach(i => (i.selected = e.target.checked));
      this.data = [...this.data];
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
        <cds-grid style="--body-height: 360px">
          <cds-grid-column>
            Stock
            <cds-action-sort .sort=${this.sortType} @sortChange=${(e: any) => (this.sortType = e.detail)}></cds-action-sort>
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
      if (props.has('sortType') && props.get('sortType') !== this.sortType) {
        this.updateList();
      }
    }

    private updateList() {
      this.filteredList = sortStrings([...this.data], 'id', this.sortType);
    }
  }

  registerElementSafely('demo-grid-sortable-rows', DemoSortableRows);
  return html`<demo-grid-sortable-rows></demo-grid-sortable-rows>`;
}

export function multiSortableRows() {
  class DemoMultiSortRows extends LitElement {
    @state() private data = getData();
    @state() private filteredList: any[] = [];
    @state() private sortState: { [key: string]: 'none' | 'ascending' | 'descending' } = {
      id: 'none',
      average: 'none',
    };

    render() {
      return html`
        <cds-grid style="--body-height: 360px">
          <cds-grid-column>
            Stock
            <cds-action-sort .sort=${this.sortState.id} @sortChange=${(e: any) => (this.sortState = { ...this.sortState, id: e.detail })}></cds-action-sort>
          </cds-grid-column>
          <cds-grid-column>
            Average
            <cds-action-sort .sort=${this.sortState.average} @sortChange=${(e: any) => (this.sortState = { ...this.sortState, average: e.detail })}></cds-action-sort>
          </cds-grid-column>
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
      if (props.has('sortState')) {
        this.updateList();
      }
    }

    private updateList() {
      let list = [...this.data];
      list = sortStrings(list, 'id', this.sortState.id);
      list = sortNumbers(list, 'average', this.sortState.average);
      this.filteredList = list;
    }
  }

  registerElementSafely('demo-grid-multi-sort-rows', DemoMultiSortRows);
  return html`<demo-grid-multi-sort-rows></demo-grid-multi-sort-rows>`;
}

export function rowFiltering() {
  class DemoFiltering extends LitElement {
    @state() private data = getData();
    @state() private filteredList: any[] = [];
    @state() private search = '';
    @state() private idFilterOpen = false;

    render() {
      return html`
        <cds-grid style="--body-height: 360px">
          <cds-grid-column>
            Stock
            <cds-action id="id-filter-demo" @click=${() => (this.idFilterOpen = true)} shape="filter" aria-label="search available stocks"></cds-action>
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

export function multiCellFiltering() {
  class DemoFiltering extends LitElement {
    @state() private data = getData();
    @state() private filteredList: any[] = [];
    @state() private search = '';

    render() {
      return html`
        <section cds-layout="vertical gap:md">
          <cds-search control-width="shrink">
            <label>Search Grid</label>
            <input type="search" placeholder="Search" @input=${(e: any) => (this.search = e.target.value)} />
          </cds-search>
          <cds-grid style="--body-height: 360px">
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
        <cds-grid style="--body-height: 360px">
          <cds-grid-column width="200" resizable .position=${this.pinFirst ? 'fixed' : 'initial'}>
            Stock
            <cds-action @click=${() => (this.pinFirst = !this.pinFirst)} aria-label="pin column">
              <cds-icon shape="pin" ?solid=${this.pinFirst}></cds-icon>
            </cds-action>
          </cds-grid-column>
          <cds-grid-column width="400" resizable>Average</cds-grid-column>
          <cds-grid-column width="400" resizable>Current</cds-grid-column>
          <cds-grid-column width="200" resizable .position=${this.pinLast ? 'fixed' : 'initial'}>
            About
            <cds-action @click=${() => (this.pinLast = !this.pinLast)} aria-label="pin column">
              <cds-icon shape="pin" ?solid=${this.pinLast}></cds-icon>
            </cds-action>
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
        <cds-grid style="--body-height: 360px">
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
        <cds-grid style="--body-height: 360px">
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
                        <input
                          class="${entry.id}-input"
                          type="number"
                          .value=${entry.average}
                          @keyup=${(e: any) => this.updateEntry(e, entry)}
                          aria-label="${entry.id} Outstanding Value"
                        />
                        <cds-control-action action="prefix" readonly>$</cds-control-action>
                      </cds-input>`
                    : html`
                        <cds-action
                          class="${entry.id}-button"
                          @click=${() => this.editEntry(entry)}
                          aria-label="edit ${entry.id} outstanding value $${entry.average}"
                          shape="pencil"
                        ></cds-action>
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
        setTimeout(() => this.shadowRoot.querySelector<HTMLElement>(`.${entry.id}-button`).focus());
      }
    }

    private editEntry(entry: any) {
      entry.selected = true;
      this.data = [...this.data];
      setTimeout(() => this.shadowRoot.querySelector<HTMLElement>(`.${entry.id}-input`).focus());
    }
  }

  registerElementSafely('demo-grid-editable', DemoEditable);
  return html`<demo-grid-editable></demo-grid-editable>`;
}

export function optionalFooter() {
  return html`
    <cds-grid style="--body-height: 360px">
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

export function compact() {
  return html`<style>
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
    <cds-grid cds-theme="compact" style="--body-height: 360px">
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
    </cds-grid>`;
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
          ? html` <cds-grid ?hidden=${this.hide} style="--body-height: 360px; --row-height: 44px">
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
          section {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }

          cds-card {
            min-height: 120px;
          }

          [cds-draggable='target'] {
            box-shadow: -4px 0 0 0 var(--cds-alias-status-alt-tint);
          }

          [draggable='false'] {
            width: 100%;
            height: 100%;
            display: block;
          }
        `,
      ];
    }

    @state() private data = getData().slice(0, 11);

    protected draggableListController = new DraggableListController(this, { shadowRoot: true });

    render() {
      return html`
        <section @draggableChange=${this.sortList}>
          ${this.data.map(
            entry => html`
              <cds-card draggable="true" id=${entry.id}>
                <div cds-layout="horizontal">
                  <p>${entry.id}</p>
                  <cds-action-handle aria-label="sort ${entry.id} row" cds-layout="align:right"></cds-action-handle>
                </div>
              </cds-card>
            `
          )}
          <div draggable="false"></div>
        </section>
      `;
    }

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
        <cds-grid @draggableChange=${this.sortList} style="--body-height: 360px">
          <cds-grid-column width="60"></cds-grid-column>
          <cds-grid-column>Stock</cds-grid-column>
          <cds-grid-column>Average</cds-grid-column>
          <cds-grid-column>Current</cds-grid-column>
          <cds-grid-column>About</cds-grid-column>

          ${this.data.map(
            entry => html`
              <cds-grid-row draggable="true" id=${entry.id}>
                <cds-grid-cell>
                  <cds-action-handle aria-label="sort ${entry.id} row"></cds-action-handle>
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
    @state() private listOne = getVMData().slice(0, 3);

    @state() private listTwo = getVMData().slice(4, 7);

    @state() private selectedEntryId: string;

    render() {
      return html`
        <cds-grid @draggableChange=${this.sortOne} style="--body-height: 360px">
          <cds-grid-column width="60"></cds-grid-column>
          <cds-grid-column>Production Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>

          ${this.listOne.map(
            entry => html`
              <cds-grid-row id=${entry.id} draggable="true">
                <cds-grid-cell>
                  <cds-action-handle aria-label="sort ${entry.id} row" id="selected-${entry.id}-action" @click=${() => this.selectedEntryId = entry.id}></cds-action-handle>
                </cds-grid-cell>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>${entry.status}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-placeholder draggable="false">Production Environment</cds-grid-placeholder>
          <cds-grid-footer>List One: ${this.listOne.map(i => html`${i.id} `)}</cds-grid-footer>
        </cds-grid>

        <br />

        <cds-grid @draggableChange=${this.sortTwo} style="--body-height: 360px">
          <cds-grid-column width="60"></cds-grid-column>
          <cds-grid-column>Staging Host</cds-grid-column>
          <cds-grid-column>Status</cds-grid-column>
          ${this.listTwo.map(
            entry => html`
              <cds-grid-row id=${entry.id} draggable="true">
                <cds-grid-cell>
                  <cds-action-handle aria-label="sort ${entry.id} row" id="selected-${entry.id}-action" @click=${() => this.selectedEntryId = entry.id}></cds-action-handle>
                </cds-grid-cell>
                <cds-grid-cell>${entry.id}</cds-grid-cell>
                <cds-grid-cell>${entry.status}</cds-grid-cell>
              </cds-grid-row>
            `
          )}
          <cds-grid-placeholder draggable="false">Staging Environment</cds-grid-placeholder>
          <cds-grid-footer>List Two: ${this.listTwo.map((j, i) => html`${j.id} `)}</cds-grid-footer>
        </cds-grid>
        <cds-dropdown ?hidden=${!this.selectedEntryId} anchor="#selected-${this.selectedEntryId}-action" @hiddenChange=${() => (this.selectedEntryId = null) as any}>
          <cds-button @click=${this.appendToOtherGrid} block action="flat" size="sm">Move to <span>${this.listOne.find(i => i.id === this.selectedEntryId) ? 'Staging' : 'Production'}</span></cds-button>
        </cds-dropdown>
        
      `;
    }

    private appendToOtherGrid() {
      let item = this.listOne.find(i => i.id === this.selectedEntryId);

      if (item) {
        this.listOne.splice(this.listOne.indexOf(item), 1);
        this.listTwo.push(item);
      } else {
        item = this.listTwo.find(i => i.id === this.selectedEntryId);
        this.listTwo.splice(this.listTwo.indexOf(item), 1);
        this.listOne.push(item);
      }

      this.listOne = [...this.listOne];
      this.listTwo = [...this.listTwo];
      this.selectedEntryId = null;
      setTimeout(() => (this.shadowRoot.querySelector(`#selected-${item.id}-action`) as any).focus(), 0);
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
