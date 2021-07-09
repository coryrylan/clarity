/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { registerElementSafely } from '@cds/core/internal';
import '@cds/core/actions/register.js';
import '@cds/core/button/register.js';
import '@cds/core/icon/register.js';

import { ClarityIcons } from '@cds/core/icon/icon.service.js';
import { searchIcon } from '@cds/core/icon/shapes/search.js';
import { pencilIcon } from '@cds/core/icon/shapes/pencil.js';
import { angleDoubleIcon } from '@cds/core/icon/shapes/angle-double.js';
import { filterIcon } from '@cds/core/icon/shapes/filter.js';
import { viewColumnsIcon } from '@cds/core/icon/shapes/view-columns.js';
import { timesIcon } from '@cds/core/icon/shapes/times.js';
import { pinIcon } from '@cds/core/icon/shapes/pin.js';
import { minusIcon } from '@cds/core/icon/shapes/minus.js';

import { CdsGrid } from './grid.element.js';
import { CdsGridRow } from './row/grid-row.element.js';
import { CdsGridCell } from './cell/grid-cell.element.js';
import { CdsGridColumn } from './column/grid-column.element.js';
import { CdsGridDetail } from './detail/grid-detail.element.js';
import { CdsGridFooter } from './footer/grid-footer.element.js';
import { CdsGridPlaceholder } from './placeholder/grid-placeholder.element.js';
import { CdsDropdown } from './utils/dropdown.element.js';

ClarityIcons.addIcons(
  searchIcon,
  pencilIcon,
  angleDoubleIcon,
  filterIcon,
  viewColumnsIcon,
  timesIcon,
  pinIcon,
  minusIcon
);

registerElementSafely('cds-grid', CdsGrid);
registerElementSafely('cds-grid-row', CdsGridRow);
registerElementSafely('cds-grid-cell', CdsGridCell);
registerElementSafely('cds-grid-column', CdsGridColumn);
registerElementSafely('cds-grid-detail', CdsGridDetail);
registerElementSafely('cds-grid-footer', CdsGridFooter);
registerElementSafely('cds-grid-placeholder', CdsGridPlaceholder);
registerElementSafely('cds-dropdown', CdsDropdown);

declare global {
  interface HTMLElementTagNameMap {
    'cds-grid': CdsGrid;
    'cds-grid-row': CdsGridRow;
    'cds-grid-cell': CdsGridCell;
    'cds-grid-column': CdsGridColumn;
    'cds-grid-detail': CdsGridDetail;
    'cds-grid-footer': CdsGridFooter;
    'cds-grid-placeholder': CdsGridPlaceholder;
    'cds-dropdown': CdsDropdown;
  }
}