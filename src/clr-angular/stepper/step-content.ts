/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'clr-step-content',
  template: `<ng-content></ng-content>`,
  host: { '[class.clr-step-content]': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrStepContent {}
