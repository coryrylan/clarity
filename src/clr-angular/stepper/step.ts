/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ChangeDetectionStrategy, Optional, ChangeDetectorRef } from '@angular/core';
import { FormGroupDirective, FormGroupName, NgModelGroup, AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { StepperService } from './providers/stepper.service';
import { StepStatus } from './enums/step-status.enum';
import { Step } from './models/step.model';
import { stepAnimation } from './utils/animation';
import { Expand } from './../utils/expand/providers/expand';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'clr-step',
  templateUrl: './step.html',
  host: { '[class.clr-step]': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: stepAnimation,
  providers: [Expand],
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
    private stepperService: StepperService,
    private expand: Expand
  ) {}

  ngOnInit() {
    this.group = this.isUsingReactiveForms()
      ? this.formGroup.form.controls[this.formGroupName.name]
      : this.ngModelGroup;

    this.id = this.stepperService.addStep();
    this.step = this.stepperService
      .getStepChanges(this.id)
      .pipe(tap(async step => ((await step.open) ? (this.expand.expanded = true) : null))); // chocolate/animation fix
  }

  selectStep() {
    this.stepperService.setActiveStep(this.id, this.group.valid);
  }

  collapseStepOnAnimationComplete(step: Step) {
    if (!step.open) {
      this.expand.expanded = false;
    }
  }

  private isUsingReactiveForms() {
    return this.formGroup && this.formGroupName;
  }
}
