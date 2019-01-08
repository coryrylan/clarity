/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

import { StepperService, Step, StepStatus } from './providers/stepper.service';
import { FormGroupDirective, FormGroupName } from '@angular/forms';

@Component({
  selector: 'clr-step',
  template: `
    <ng-container *ngIf="step | async; let step;">  
      <div
        role="group"
        [attr.aria-labelledby]="'clr-step-header-' + step.id + step.stepperId"
        [class.clr-step-complete]="step.status === StepStatus.Complete"
        [class.clr-step-inactive]="step.status === StepStatus.Inactive"
        [class.clr-step-active]="step.status === StepStatus.Active"
        [class.clr-step-error]="step.status === StepStatus.Error">

        <div class="clr-step-header" id="clr-step-header-1">
          <button
            type="button"
            class="clr-step-header-button"
            (click)="selectStep()"
            [id]="'clr-step-header-' + step.id + step.stepperId"
            [attr.aria-controls]="'clr-step-content-' + step.id + step.stepperId"
            [attr.aria-expanded]="step.stepActive"
            [disabled]="step.status !== StepStatus.Complete">
            <div class="clr-step-status">
              <clr-icon shape="angle" dir="down" class="clr-step-angle"></clr-icon>
              <div class="clr-step-number"></div>
              <clr-icon shape="exclamation-circle" class="clr-step-error-icon"></clr-icon>
            </div>
            <ng-content select="clr-step-title"></ng-content>
          </button>
          <ng-content select="clr-step-description"></ng-content>
        </div>

        <div
          role="region"
          [id]="'clr-step-content-' + step.id + step.stepperId"
          [attr.aria-hidden]="step.status !== StepStatus.Active"
          [attr.aria-labelledby]="'clr-step-header-' + step.id + step.stepperId"
        >
          <div *ngIf="step.status === StepStatus.Active || step.status === StepStatus.Error" class="clr-step-content">
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="buttonsTemplateRef"></ng-container>
          </div>
        </div>
      </div>
    </ng-container>
  `,
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

  ngOnDestroy() {
    this.stepperService.removeStep(this.id);
  }

  selectStep() {
    this.stepperService.setActiveStep(this.id);
  }
}
