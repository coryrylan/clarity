/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ChangeDetectionStrategy, TemplateRef, Optional } from '@angular/core';
import { FormGroupDirective, FormGroupName, NgModelGroup, NgForm } from '@angular/forms';
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
  readonly StepStatus = StepStatus;

  constructor(
    @Optional() private formGroup: FormGroupDirective,
    @Optional() private formGroupName: FormGroupName,
    @Optional() private ngForm: NgForm,
    @Optional() private ngModelGroup: NgModelGroup,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    if (this.isUsingReactiveForms()) {
      this.id = this.stepperService.addStep(this.formGroup.form.controls[this.formGroupName.name]);
      this.step = this.stepperService.getStepChanges(this.id);
    }

    if (this.isUsingTemplateForms()) {
      this.id = this.stepperService.addStep(this.ngModelGroup);
      this.step = this.stepperService.getStepChanges(this.id);
    }
  }

  selectStep() {
    this.stepperService.setActiveStep(this.id);
  }

  private isUsingReactiveForms() {
    return this.formGroup && this.formGroupName;
  }

  private isUsingTemplateForms() {
    return !!this.ngForm;
  }
}
