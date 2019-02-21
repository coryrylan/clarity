/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AbstractControl, FormGroup } from '@angular/forms';

import { StepStatus } from '../enums/step-status.enum';
import { Step } from './step.model';

let stepperCount = 0;

export class StepCollection {
  private stepperCount = stepperCount++;
  private stepCount = 0;
  private _steps: Step[] = [];

  get steps() {
    return this._steps;
  }

  addStep(group: AbstractControl | FormGroup) {
    const step = new Step(this.stepCount++, this.stepperCount, group);
    this._steps = [...this._steps, step];
    return step.id;
  }

  reset() {
    this._steps = this._steps.map((step, index) => {
      step.status = StepStatus.Inactive;

      if (index === 0) {
        step.status = StepStatus.Active;
      }

      return step;
    });
  }

  nextStep() {
    const nextStep = this.getNextStep();

    if (nextStep) {
      this.setActiveStep(nextStep.id);
    } else {
      this.setActiveStep();
    }
  }

  setActiveStep(stepId?: number) {
    const currentStep = this.getCurrentStep();

    this._steps = this._steps.map(step => {
      if (currentStep.group.valid) {
        if (this.stepIsCurrentActiveStep(step)) {
          step.status = StepStatus.Complete;
        }

        if (this.stepIsCompletedPreviousStep(stepId, step)) {
          step.status = StepStatus.Active;
        }

        if (step.id === stepId) {
          step.status = StepStatus.Active;
        }
      } else if (currentStep.group.invalid && currentStep.id === step.id) {
        step.status = StepStatus.Error;
      }

      return { ...step };
    });
  }

  getCurrentStep() {
    return this._steps.find(
      (s, i) => s.status === StepStatus.Active || s.status === StepStatus.Error || i === this._steps.length - 1
    );
  }

  syncStepOrder(ids: number[]) {
    this._steps = ids
      .map((id, index) => {
        let step = this._steps.find(s => s.id === id);

        if (step) {
          step = {
            ...step,
            index,
            isLastStep: index === ids.length - 1,
          };
        }

        return step;
      })
      .filter(step => step !== undefined);
  }

  private getNextStep() {
    return this._steps.find(s => s.index === this.getCurrentStep().index + 1);
  }

  private stepIsCurrentActiveStep(step: Step) {
    return step.status === StepStatus.Active || step.status === StepStatus.Error;
  }

  private stepIsCompletedPreviousStep(activeStepId: number, step: Step) {
    return step.id === activeStepId && step.id <= activeStepId && step.status === StepStatus.Complete;
  }
}
