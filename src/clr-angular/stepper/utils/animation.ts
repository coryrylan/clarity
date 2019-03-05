/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { animate, style, transition, trigger } from '@angular/animations';

export const stepAnimation = [
  trigger('skipInitialRender', [transition(':enter', [])]),
  trigger('collapse', [
    transition('void => *', [
      style({ display: 'block', height: 0 }),
      animate('0.2s ease-in-out', style({ height: '*' })),
    ]),
    transition('* => void', [
      style({ display: 'block' }),
      animate('0.2s ease-in-out', style({ height: 0, display: 'none' })),
    ]),
  ]),
];
