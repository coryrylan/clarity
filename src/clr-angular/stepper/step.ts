/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ChangeDetectionStrategy, Optional } from '@angular/core';
import { FormGroupDirective, FormGroupName, NgModelGroup, AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { StepperService } from './providers/stepper.service';
import { StepStatus } from './enums/step-status.enum';
import { Step } from './models/step-collection.model';

@Component({
  selector: 'clr-step',
  templateUrl: './step.html',
  host: { '[class.clr-step]': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrStep {
  id: number;
  step: Observable<Step>;
  group: AbstractControl | FormGroup | NgModelGroup;
  readonly StepStatus = StepStatus;

  constructor(
    @Optional() private formGroup: FormGroupDirective,
    @Optional() private formGroupName: FormGroupName,
    @Optional() private ngModelGroup: NgModelGroup,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    if (this.isUsingReactiveForms()) {
      this.group = this.formGroup.form.controls[this.formGroupName.name];
      this.id = this.stepperService.addStep();
      this.step = this.stepperService.getStepChanges(this.id);
    } else {
      this.group = this.ngModelGroup;
      this.id = this.stepperService.addStep();
      this.step = this.stepperService.getStepChanges(this.id);
    }
  }

  selectStep() {
    this.stepperService.setActiveStep(this.id, this.group.valid);
  }

  private isUsingReactiveForms() {
    return this.formGroup && this.formGroupName;
  }
}
