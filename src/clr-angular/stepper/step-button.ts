/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, HostListener, HostBinding, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { StepperService } from './providers/stepper.service';

@Directive({
  selector: '[clrStepButton]',
  host: {
    '[class.clr-step-button]': 'true',
    '[class.btn]': 'true',
  },
})
export class ClrStepButton {
  @Input('clrStepButton') type = 'next';
  @HostBinding('class.btn-primary') lastButton = false;
  @HostBinding('type') buttonType = 'button';
  @HostBinding('style.display') display = 'block';
  subscriptions: Subscription[] = [];

  constructor(private stepperService: StepperService) {}

  ngOnInit() {
    this.initializeButtonTypes();
    this.subscriptions.push(this.listenForLastStepChanges());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  @HostListener('click')
  click() {
    this.stepperService.nextStep();
  }

  private initializeButtonTypes() {
    if (this.type === 'last') {
      this.buttonType = 'submit';
      this.lastButton = true;
    }

    if (this.type === 'next') {
      this.lastButton = false;
    }
  }

  private listenForLastStepChanges() {
    return this.stepperService.steps.subscribe(() => {
      const currentStep = this.stepperService.getCurrentStep();

      if (this.type === 'last' && currentStep && currentStep.isLastStep) {
        this.display = 'block';
      } else if (this.type === 'last') {
        this.display = 'none';
      }

      if (this.type === 'next' && currentStep && currentStep.isLastStep) {
        this.display = 'none';
      } else if (this.type === 'next') {
        this.display = 'block';
      }
    });
  }
}
