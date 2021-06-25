/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import '@cds/core/icon/register.js';
import '@cds/core/control-action/register.js';
import { registerElementSafely } from '@cds/core/internal';
import { CdsControl } from './control/control.element.js';
import { CdsInternalControlGroup } from './control-group/control-group.element.js';
import { CdsInternalControlInline } from './control-inline/control-inline.element.js';
import { CdsInternalControlLabel } from './control-label/control-label.element.js';
import { CdsControlMessage } from './control-message/control-message.element.js';
import { CdsFormGroup } from './form-group/form-group.element.js';

registerElementSafely('cds-control', CdsControl);
registerElementSafely('cds-internal-control-group', CdsInternalControlGroup);
registerElementSafely('cds-internal-control-inline', CdsInternalControlInline);
registerElementSafely('cds-internal-control-label', CdsInternalControlLabel);
registerElementSafely('cds-control-message', CdsControlMessage);
registerElementSafely('cds-form-group', CdsFormGroup);

declare global {
  interface HTMLElementTagNameMap {
    'cds-control': CdsControl;
    'cds-internal-control-group': CdsInternalControlGroup;
    'cds-internal-control-inline': CdsInternalControlInline;
    'cds-internal-control-label': CdsInternalControlLabel;
    'cds-control-message': CdsControlMessage;
    'cds-form-group': CdsFormGroup;
  }
}
