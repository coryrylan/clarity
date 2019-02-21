/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { FormGroupDirective, FormGroupName } from '@angular/forms';
import { Observable } from 'rxjs';

import { StepperService } from './providers/stepper.service';
import { StepStatus } from './enums/step-status.enum';
import { Step } from './models/step.model';

@Component({
  selector: 'clr-step',
  templateUrl: './step.html',
  host: { '[class.clr-step]': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrStep {
  id: number;
  step: Observable<Step>;
  buttonsTemplateRef: TemplateRef<any>;
  readonly StepStatus = StepStatus;

  constructor(
    private formGroup: FormGroupDirective,
    private formGroupName: FormGroupName,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    const group = this.formGroup.form.controls[this.formGroupName.name];
    this.id = this.stepperService.addStep(group);
    this.step = this.stepperService.getStepChanges(this.id);
    this.buttonsTemplateRef = this.stepperService.stepButtons;
  }

  selectStep() {
    this.stepperService.setActiveStep(this.id);
  }
}
