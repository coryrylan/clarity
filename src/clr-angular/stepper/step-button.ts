/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, HostListener, HostBinding, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { StepperService } from './providers/stepper.service';

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
  @HostBinding('style.display') display = 'block';
  subscriptions: Subscription[] = [];

  constructor(private stepperService: StepperService) {}

  ngOnInit() {
    this.lastButton = this.type === ClrStepButtonType.Last;
    this.subscriptions.push(this.listenForLastStepChanges());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  @HostListener('click')
  click() {
    this.stepperService.nextStep();
  }

  private listenForLastStepChanges() {
    return this.stepperService.steps.subscribe(() => {
      this.setSubmitButtonDisplay();
      this.setNextButtonDisplay();
    });
  }

  private setSubmitButtonDisplay() {
    if (this.type === ClrStepButtonType.Last) {
      this.display = this.currentActiveStepIsLastStep() ? 'block' : 'none';
    }
  }

  private setNextButtonDisplay() {
    if (this.type === ClrStepButtonType.Next) {
      this.display = this.currentActiveStepIsLastStep() ? 'none' : 'block';
    }
  }

  private currentActiveStepIsLastStep() {
    const currentStep = this.stepperService.getCurrentStep();
    return currentStep && currentStep.isLastStep;
  }
}
