/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, HostListener, HostBinding, Input } from '@angular/core';

import { StepperService } from './providers/stepper.service';
import { ClrStep } from './step';

export enum ClrStepButtonType {
  Next = 'next',
  Last = 'last',
}

@Directive({
  selector: '[clrStepButton]',
  host: {
    '[class.clr-step-button]': 'true',
    '[class.btn]': 'true',
    '[type]': "'button'",
  },
})
export class ClrStepButton {
  @Input('clrStepButton') type: ClrStepButtonType | string = ClrStepButtonType.Next;
  @HostBinding('class.btn-primary') lastButton = false;

  constructor(private clrStep: ClrStep, private stepperService: StepperService) {}

  ngOnInit() {
    this.lastButton = this.type === ClrStepButtonType.Last;
  }

  @HostListener('click')
  click() {
    this.stepperService.setNextStep(this.clrStep.id);
  }
}
