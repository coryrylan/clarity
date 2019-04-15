/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ChangeDetectionStrategy, Optional } from '@angular/core';
import { FormGroupName, NgModelGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { StepperService } from './providers/stepper.service';
import { StepStatus } from './enums/step-status.enum';
import { Step } from './models/step.model';
import { stepAnimation } from './utils/animation';
import { Expand } from './../utils/expand/providers/expand';
import { triggerAllFormControlValidation } from '../utils/forms/validation';

@Component({
  selector: 'clr-step',
  templateUrl: './step.html',
  host: { '[class.clr-step]': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: stepAnimation,
  providers: [Expand],
})
export class ClrStep {
  step: Observable<Step>;
  readonly StepStatus = StepStatus;

  get formGroup() {
    return this.formGroupName ? this.formGroupName.control : this.ngModelGroup.control;
  }

  get name() {
    return this.formGroupName ? this.formGroupName.name : this.ngModelGroup.name;
  }

  constructor(
    @Optional() private formGroupName: FormGroupName,
    @Optional() private ngModelGroup: NgModelGroup,
    private stepperService: StepperService,
    private expand: Expand
  ) {}

  ngOnInit() {
    this.stepperService.addStep(this.name);
    this.step = this.stepperService
      .getStepChanges(this.name)
      .pipe(tap(step => this.expandStep(step)), tap(step => this.triggerAllFormControlValidationIfError(step)));
  }

  selectStep() {
    this.stepperService.navigateToPreviouslyCompletedStep(this.name);
  }

  collapseStep(step: Step) {
    if (!step.open) {
      this.expand.expanded = false;
    }
  }

  private triggerAllFormControlValidationIfError(step: Step) {
    if (step.status === StepStatus.Error) {
      triggerAllFormControlValidation(this.formGroup);
    }
  }

  private expandStep(step: Step) {
    if (step.open) {
      this.expand.expanded = true;
    }
  }
}
