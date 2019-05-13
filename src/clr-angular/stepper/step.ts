/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ChangeDetectionStrategy, Optional, Input, EventEmitter, Output } from '@angular/core';
import { FormGroupName, NgModelGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { StepperService } from './providers/stepper.service';
import { StepStatus } from './enums/step-status.enum';
import { Step } from './models/step.model';
import { stepAnimation } from './utils/animation';
import { triggerAllFormControlValidation } from '../utils/forms/validation';
import { IfExpandService } from '../utils/conditional/if-expanded.service';
import { ClrStepperStrategy } from './models/step-collection.model';

let stepCount = 0;

@Component({
  selector: 'clr-step, clr-accordion-panel',
  templateUrl: './step.html',
  host: { '[class.clr-step]': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: stepAnimation,
  providers: [IfExpandService],
})
export class ClrStep {
  @Input('name') defaultName = `${stepCount++}`;
  @Input('clrAccordionPanelOpen') stepOpen = false;
  @Output('clrAccordionPanelOpenChange') stepOpenChange = new EventEmitter<boolean>();

  step: Observable<Step>;
  ClrStepperStrategy = ClrStepperStrategy;
  readonly StepStatus = StepStatus;

  get formGroup() {
    return this.formGroupName ? this.formGroupName.control : this.ngModelGroup.control;
  }

  get name() {
    if (this.formGroupName) {
      return this.formGroupName.name;
    } else if (this.ngModelGroup) {
      return this.ngModelGroup.name;
    } else {
      return this.defaultName;
    }
  }

  get strategy() {
    return this.stepperService.strategy;
  }

  constructor(
    @Optional() private formGroupName: FormGroupName,
    @Optional() private ngModelGroup: NgModelGroup,
    private stepperService: StepperService,
    private ifExpandService: IfExpandService
  ) {}

  ngOnInit() {
    this.step = this.stepperService
      .getStepChanges(this.name)
      .pipe(tap(step => this.expandStep(step)), tap(step => this.triggerAllFormControlValidationIfError(step)));

    this.stepperService.addStep(this.name, this.stepOpen);
  }

  selectStep() {
    this.stepperService.navigateToStep(this.name);
  }

  collapseStep(step: Step) {
    if (!step.open) {
      this.toggleStep(false);
    }
  }

  private expandStep(step: Step) {
    if (step.open) {
      this.toggleStep(true);
    }
  }

  private toggleStep(open: boolean) {
    this.ifExpandService.expanded = open;
    this.stepOpen = open;
    this.stepOpenChange.emit(open);
  }

  private triggerAllFormControlValidationIfError(step: Step) {
    if (step.status === StepStatus.Error) {
      triggerAllFormControlValidation(this.formGroup);
    }
  }
}
