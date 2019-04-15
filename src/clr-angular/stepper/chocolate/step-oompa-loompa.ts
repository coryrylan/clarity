/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Directive, Optional } from '@angular/core';

import { OompaLoompa } from '../../utils/chocolate/oompa-loompa';
import { StepperWillyWonka } from './stepper-willy-wonka';
import { Expand } from '../../utils/expand/providers/expand';

@Directive({ selector: 'clr-step-content, [clrStepButton]' })
export class StepOompaLoompa extends OompaLoompa {
  private expand: Expand;

  constructor(cdr: ChangeDetectorRef, @Optional() willyWonka: StepperWillyWonka, expand: Expand) {
    if (!willyWonka) {
      throw new Error('clr-step should only be used inside of a clr-stepper');
    }
    super(cdr, willyWonka);
    this.expand = expand;
  }

  get flavor() {
    return this.expand.expanded;
  }
}
